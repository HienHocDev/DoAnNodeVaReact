const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });
  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(data.message || 'Có lỗi xảy ra khi gọi API');
  }

  return data.data;
}

export function getBooks() {
  return request('/books');
}

export function loginUser(formData) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
}

export function registerUser(formData) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
}

export function createOrder(orderData) {
  return request('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData)
  });
}

export function getOrders(userId) {
  return request(`/orders?userId=${userId}`);
}

export function updateUser(userId, userData) {
  return request(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  });
}
