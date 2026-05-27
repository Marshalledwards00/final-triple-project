import { newsData } from './newsData'

function getDefaultApiBaseUrl() {
  if (typeof window === 'undefined') {
    return 'http://localhost:3000/api'
  }

  const { hostname, protocol } = window.location

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3000/api'
  }

  return `${protocol}//${hostname}/api`
}

const APP_API_BASE_URL = getDefaultApiBaseUrl().replace(/\/$/, '')

function stripHtml(value = '') {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function normalizeText(value = '') {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getQueryTokens(query) {
  return normalizeText(query).split(' ').filter(Boolean)
}

function scoreArticleMatch({ title = '', text = '' }, tokens, normalizedQuery) {
  const normalizedTitle = normalizeText(title)
  const normalizedTextValue = normalizeText(text)

  let score = 0

  if (normalizedTitle.includes(normalizedQuery)) {
    score += 120
  }

  if (normalizedTextValue.includes(normalizedQuery)) {
    score += 50
  }

  if (normalizedTitle.startsWith(normalizedQuery)) {
    score += 20
  }

  tokens.forEach((token) => {
    if (normalizedTitle.includes(token)) {
      score += 25
    }

    if (normalizedTextValue.includes(token)) {
      score += 10
    }
  })

  return {
    score,
    strictMatch: tokens.every(
      (token) => normalizedTitle.includes(token) || normalizedTextValue.includes(token),
    ),
  }
}

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
    provider: 'newsapi',
  }
}

function filterLocalNews(query) {
  const normalizedQuery = normalizeText(query)
  const tokens = getQueryTokens(query)

  if (!normalizedQuery) {
    return newsData
  }

  const scored = newsData
    .map((article) => ({
      article,
      ...scoreArticleMatch(article, tokens, normalizedQuery),
    }))
    .filter(({ score }) => score > 0)

  const strictMatches = scored.filter(({ strictMatch }) => strictMatch)
  const relevantMatches = strictMatches.length > 0 ? strictMatches : scored

  return relevantMatches
    .sort((a, b) => b.score - a.score)
    .map(({ article }) => article)
}

function dedupeRemoteArticles(articles) {
  const seen = new Set()

  return articles.filter((article) => {
    const key = article.url || `${article.title || ''}-${article.publishedAt || ''}`

    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}

function rankRemoteArticles(articles, query) {
  const normalizedQuery = normalizeText(query)
  const tokens = getQueryTokens(query)

  const scored = articles
    .filter((article) => article.title && article.title !== '[Removed]')
    .map((article) => {
      const text = `${article.description || ''} ${article.content || ''}`
      return {
        article,
        ...scoreArticleMatch({ title: article.title, text }, tokens, normalizedQuery),
      }
    })
    .filter(({ score }) => score > 0)

  const strictMatches = scored.filter(({ strictMatch }) => strictMatch)
  const relevantMatches = strictMatches.length > 0 ? strictMatches : scored

  return relevantMatches
    .sort((a, b) => b.score - a.score)
    .map(({ article }) => article)
}

function mapGuardianArticle(article, index) {
  return {
    id: article.webUrl || article.id || index + 1,
    link: article.webUrl || `https://www.theguardian.com/${article.id || `article-${index + 1}`}`,
    title: article.webTitle || 'Untitled article',
    text:
      stripHtml(article.fields?.trailText || article.fields?.bodyText || '') ||
      'No description available.',
    source: article.sectionName || 'The Guardian',
    publishedAt: new Date(article.webPublicationDate).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    image:
      article.fields?.thumbnail ||
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80',
    provider: 'guardian',
  }
}

function ensureGuardianPresence(rankedArticles, guardianCount, maxResults = 30, minGuardian = 5) {
  const top = rankedArticles.slice(0, maxResults)

  if (guardianCount <= 0) {
    return top
  }

  const targetGuardian = Math.min(minGuardian, guardianCount)
  const currentGuardian = top.filter((article) => article.provider === 'guardian')

  if (currentGuardian.length >= targetGuardian) {
    return top
  }

  const topKeys = new Set(top.map((article) => article.link || article.id))
  const needed = targetGuardian - currentGuardian.length
  const additionalGuardian = rankedArticles
    .filter(
      (article) =>
        article.provider === 'guardian' && !topKeys.has(article.link || article.id),
    )
    .slice(0, needed)

  if (additionalGuardian.length === 0) {
    return top
  }

  const nonGuardian = top.filter((article) => article.provider !== 'guardian')
  const keepNonGuardianCount = Math.max(0, nonGuardian.length - additionalGuardian.length)

  return [...currentGuardian, ...additionalGuardian, ...nonGuardian.slice(0, keepNonGuardianCount)]
}

function dedupeMappedArticles(articles) {
  const seen = new Set()

  return articles.filter((article) => {
    const key = article.link || article.id

    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}

function rankMappedArticles(articles, query) {
  const normalizedQuery = normalizeText(query)
  const tokens = getQueryTokens(query)

  if (!normalizedQuery) {
    return articles
  }

  const scored = articles
    .map((article) => ({
      article,
      ...scoreArticleMatch(
        {
          title: article.title || '',
          text: article.text || '',
        },
        tokens,
        normalizedQuery,
      ),
    }))
    .filter(({ score }) => score > 0)

  const strictMatches = scored.filter(({ strictMatch }) => strictMatch)
  const relevantMatches = strictMatches.length > 0 ? strictMatches : scored

  return relevantMatches
    .sort((a, b) => b.score - a.score)
    .map(({ article }) => article)
}

function dedupeGuardianArticles(articles) {
  const seen = new Set()

  return articles.filter((article) => {
    const key = article.webUrl || article.id
    if (seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}

function rankGuardianArticles(articles, query) {
  const normalizedQuery = normalizeText(query)
  const tokens = getQueryTokens(query)

  const scored = articles
    .map((article) => {
      const text = `${stripHtml(article.fields?.trailText || '')} ${stripHtml(article.fields?.bodyText || '')}`

      return {
        article,
        ...scoreArticleMatch({ title: article.webTitle || '', text }, tokens, normalizedQuery),
      }
    })
    .filter(({ score }) => score > 0)

  const strictMatches = scored.filter(({ strictMatch }) => strictMatch)
  const relevantMatches = strictMatches.length > 0 ? strictMatches : scored

  return relevantMatches
    .sort((a, b) => b.score - a.score)
    .map(({ article }) => article)
}

function fetchNewsApiResults(query) {
  const url = new URL(`${APP_API_BASE_URL}/news/newsapi`)
  url.searchParams.set('q', query)

  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`News API request failed with status ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      if (!Array.isArray(data.articles)) {
        return []
      }

      const rankedArticles = rankRemoteArticles(dedupeRemoteArticles(data.articles), query)
      return rankedArticles.slice(0, 30).map(mapRemoteArticle)
    })
}

async function fetchGuardianResults(query) {
  const url = new URL(`${APP_API_BASE_URL}/news/guardian`)
  url.searchParams.set('q', query)

  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Guardian API request failed with status ${response.status}`)
  }

  const data = await response.json()

  if (!Array.isArray(data.response?.results)) {
    return []
  }

  const rankedArticles = rankGuardianArticles(dedupeGuardianArticles(data.response.results), query)

  return rankedArticles.slice(0, 30).map(mapGuardianArticle)
}

export async function getNewsByQuery(query) {
  const normalizedQuery = normalizeText(query)

  if (!normalizedQuery) {
    return filterLocalNews(query)
  }

  let newsApiArticles = []
  let guardianArticles = []

  try {
    newsApiArticles = await fetchNewsApiResults(query)
  } catch {
    // Continue and try Guardian provider.
  }

  try {
    guardianArticles = await fetchGuardianResults(query)
  } catch {
    // Falls through to local mock data.
  }

  const liveArticles = [...newsApiArticles, ...guardianArticles]

  if (liveArticles.length > 0) {
    const rankedArticles = rankMappedArticles(dedupeMappedArticles(liveArticles), query)
    return ensureGuardianPresence(rankedArticles, guardianArticles.length, 30, 5)
  }

  return filterLocalNews(query)
}