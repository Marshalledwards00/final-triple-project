const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

function checkResponse(response) {
  if (!response.ok) {
    return response.json()
      .catch(() => ({ message: 'Request failed' }))
      .then((payload) => Promise.reject(new Error(payload.message || 'Request failed')))
  }

  return response.json()
}

function request(path, { method = 'GET', token, body } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  return fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  }).then(checkResponse)
}

export function register({ name, email, password }) {
  return request('/signup', {
    method: 'POST',
    body: { name, email, password },
  })
}

export function authorize({ email, password }) {
  return request('/signin', {
    method: 'POST',
    body: { email, password },
  })
}

export function requestPasswordReset({ email, newPassword }) {
  return request('/reset-password', {
    method: 'POST',
    body: { email, newPassword },
  })
}

export function getUserInfo(token) {
  return request('/users/me', { token })
}

export function getSavedArticles(token) {
  return request('/articles', { token })
}

export function saveArticle(token, article, keyword) {
  return request('/articles', {
    method: 'POST',
    token,
    body: {
      keyword,
      title: article.title,
      text: article.text,
      date: article.publishedAt,
      source: article.source,
      link: article.link,
      image: article.image,
    },
  })
}

export function deleteArticle(token, articleId) {
  return request(`/articles/${articleId}`, {
    method: 'DELETE',
    token,
  })
}
