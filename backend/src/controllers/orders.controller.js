const { getConnectionPool } = require('../database/connection');
const { readJsonBody } = require('../utils/request');

function mapOrderRows(rows) {
  const orderMap = new Map();

  rows.forEach((row) => {
    if (!orderMap.has(row.id)) {
      orderMap.set(row.id, {
        id: `BN${String(row.id).padStart(6, '0')}`,
        numericId: row.id,
        createdAt: new Date(row.created_at).toLocaleDateString('vi-VN'),
        status: row.status,
        subtotal: Number(row.subtotal),
        discount: Number(row.discount),
        shipping: Number(row.shipping_fee),
        total: Number(row.total),
        customer: {
          fullName: row.customer_name,
          email: row.customer_email,
          phone: row.customer_phone,
          address: row.customer_address,
          paymentMethod: row.payment_method
        },
        items: []
      });
    }

    if (row.book_id) {
      orderMap.get(row.id).items.push({
        bookId: row.book_id,
        quantity: row.quantity,
        book: {
          id: row.book_id,
          title: row.title,
          author: row.author,
          price: Number(row.price),
          oldPrice: Number(row.price),
          discount: 0,
          rating: 5,
          reviews: 0,
          imageUrl: row.image_url || '',
          color: row.cover_color || '#8a5834',
          accent: row.cover_accent || '#ffffff'
        }
      });
    }
  });

  return Array.from(orderMap.values());
}

async function getOrders(req, res, sendJson) {
  const url = new URL(req.url, 'http://localhost');
  const userId = Number(url.searchParams.get('userId'));

  if (!userId) {
    sendJson(res, 400, { success: false, message: 'Thiếu mã người dùng' });
    return;
  }

  const pool = await getConnectionPool();
  const result = await pool.request()
    .input('userId', userId)
    .query(`
      SELECT
        o.*,
        oi.book_id,
        oi.quantity,
        oi.price,
        b.title,
        b.author,
        b.image_url,
        b.cover_color,
        b.cover_accent
      FROM dbo.orders o
      LEFT JOIN dbo.order_items oi ON oi.order_id = o.id
      LEFT JOIN dbo.books b ON b.id = oi.book_id
      WHERE o.user_id = @userId
      ORDER BY o.created_at DESC
    `);

  sendJson(res, 200, { success: true, data: mapOrderRows(result.recordset) });
}

async function createOrder(req, res, sendJson) {
  const body = await readJsonBody(req);
  const { userId, customer, items, subtotal, discount, shipping, total } = body;

  if (!customer || !items?.length) {
    sendJson(res, 400, { success: false, message: 'Đơn hàng chưa đủ thông tin' });
    return;
  }

  const pool = await getConnectionPool();
  const transaction = pool.transaction();
  await transaction.begin();

  try {
    const orderResult = await transaction.request()
      .input('userId', userId || null)
      .input('customerName', customer.fullName)
      .input('customerEmail', customer.email)
      .input('customerPhone', customer.phone)
      .input('customerAddress', customer.address)
      .input('note', customer.note || '')
      .input('paymentMethod', customer.paymentMethod)
      .input('subtotal', subtotal)
      .input('discount', discount)
      .input('shipping', shipping)
      .input('total', total)
      .query(`
        INSERT INTO dbo.orders (
          user_id, customer_name, customer_email, customer_phone, customer_address,
          note, payment_method, subtotal, discount, shipping_fee, total
        )
        OUTPUT inserted.id
        VALUES (
          @userId, @customerName, @customerEmail, @customerPhone, @customerAddress,
          @note, @paymentMethod, @subtotal, @discount, @shipping, @total
        )
      `);

    const orderId = orderResult.recordset[0].id;

    for (const item of items) {
      await transaction.request()
        .input('orderId', orderId)
        .input('bookId', item.bookId)
        .input('quantity', item.quantity)
        .input('price', item.book.price)
        .query(`
          INSERT INTO dbo.order_items (order_id, book_id, quantity, price)
          VALUES (@orderId, @bookId, @quantity, @price)
        `);
    }

    await transaction.commit();
    sendJson(res, 201, { success: true, data: { id: `BN${String(orderId).padStart(6, '0')}` } });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
}

module.exports = { getOrders, createOrder };
