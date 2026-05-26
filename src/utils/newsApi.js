import { newsData } from './newsData'

const NEWS_API_BASE_URL = 'https://newsapi.org/v2/everything'

function mapRemoteArticle(article, index) {
  return {
    id: article.url || index + 1,
    link: article.url || `https://example.com/article-${index + 1}`,
    title: article.title || 'Untitled article',
    text: article.description || article.content || 'No description available.',
    source: article.source?.name || 'Unknown source',
    publishedAt: new Date(article.publishedAt).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    image:
      article.urlToImage ||
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80',
  }
}

function filterLocalNews(query) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return newsData
  }

  return newsData.filter(({ title, text }) => {
    const haystack = `${title} ${text}`.toLowerCase()
    return haystack.includes(normalizedQuery)
  })
}

export function getNewsByQuery(query) {
  const normalizedQuery = query.trim().toLowerCase()
  const apiKey = import.meta.env.VITE_NEWS_API_KEY

  if (!normalizedQuery) {
    return Promise.resolve(filterLocalNews(query))
  }

  if (!apiKey) {
    return Promise.resolve(filterLocalNews(query))
  }

  const url = new URL(NEWS_API_BASE_URL)
  url.searchParams.set('q', query)
  url.searchParams.set('language', 'en')
  url.searchParams.set('pageSize', '30')
  url.searchParams.set('apiKey', apiKey)

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`News API request failed with status ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      if (!Array.isArray(data.articles)) {
        return filterLocalNews(query)
      }
      return data.articles.map(mapRemoteArticle)
    })
    .catch(() => filterLocalNews(query))
}