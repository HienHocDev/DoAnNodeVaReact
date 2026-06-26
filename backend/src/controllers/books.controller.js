const { getConnectionPool } = require('../database/connection');

function mapBook(row) {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    category: row.category,
    price: Number(row.price),
    oldPrice: Number(row.oldPrice || row.price),
    discount: row.discount,
    rating: row.rating,
    reviews: row.reviews,
    sold: row.sold,
    publisher: row.publisher,
    year: row.year,
    sku: row.sku || '',
    isbn: row.isbn || '',
    pageCount: row.pageCount || null,
    language: row.language || 'Tiếng Việt',
    format: row.format || 'Bìa mềm',
    stockQuantity: row.stockQuantity || 0,
    status: row.status || 'Hiển thị',
    imageUrl: row.imageUrl || '',
    color: row.color || '#8a5834',
    accent: row.accent || '#ffffff',
    description: row.description || ''
  };
}

async function getBooks(req, res, sendJson) {
  const pool = await getConnectionPool();
  const result = await pool.request().query(`
    SELECT
      b.id,
      b.title,
      b.author,
      b.sku,
      b.isbn,
      c.name AS category,
      b.price,
      b.old_price AS oldPrice,
      b.discount,
      b.stock_quantity AS stockQuantity,
      b.status,
      b.rating,
      b.reviews,
      b.sold,
      b.publisher,
      b.publish_year AS year,
      b.page_count AS pageCount,
      b.language,
      b.format,
      b.image_url AS imageUrl,
      b.cover_color AS color,
      b.cover_accent AS accent,
      b.description
    FROM dbo.books b
    INNER JOIN dbo.categories c ON c.id = b.category_id
    WHERE b.status = N'Hiển thị'
    ORDER BY b.id DESC
  `);

  sendJson(res, 200, {
    success: true,
    data: result.recordset.map(mapBook)
  });
}

module.exports = { getBooks };
