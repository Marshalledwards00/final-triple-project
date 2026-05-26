const GUARDIAN_API_BASE_URL = 'https://content.guardianapis.com/search'

const FALLBACK_GUARDIAN_RESULTS = [
  {
    id: 'us-news/live/2026/may/26/donald-trump-medical-walter-reed-republicans-texas-runoff-iran-latest-news-updates',
    type: 'liveblog',
    sectionId: 'us-news',
    sectionName: 'US news',
    webPublicationDate: '2026-05-26T21:10:28Z',
    webTitle: 'Trump urges Texas Republicans to vote for Ken Paxton as four-term senator John Cornyn fights to hold seat - live',
    webUrl: 'https://www.theguardian.com/us-news/live/2026/may/26/donald-trump-medical-walter-reed-republicans-texas-runoff-iran-latest-news-updates',
  },
  {
    id: 'australia-news/live/2026/may/27/australia-politics-live-quad-wong-jobseeker-capital-gains-tax-budget-anthony-albanese-angus-taylor-labor-coalition-one-nation-question-time-senate-estimates-ntwnfb',
    type: 'liveblog',
    sectionId: 'australia-news',
    sectionName: 'Australia news',
    webPublicationDate: '2026-05-26T21:08:46Z',
    webTitle: 'Australia politics live: Quad countries ink deal to build surveillance network and Fiji port to counter China',
    webUrl: 'https://www.theguardian.com/australia-news/live/2026/may/27/australia-politics-live-quad-wong-jobseeker-capital-gains-tax-budget-anthony-albanese-angus-taylor-labor-coalition-one-nation-question-time-senate-estimates-ntwnfb',
  },
  {
    id: 'politics/2026/may/26/tony-blair-labour-abandon-net-zero-support-donald-trump',
    type: 'article',
    sectionId: 'politics',
    sectionName: 'Politics',
    webPublicationDate: '2026-05-26T21:00:08Z',
    webTitle: 'Tony Blair says Labour must abandon net zero, support Trump and cut benefits',
    webUrl: 'https://www.theguardian.com/politics/2026/may/26/tony-blair-labour-abandon-net-zero-support-donald-trump',
  },
  {
    id: 'world/2026/may/26/deaths-france-linked-record-high-temperatures',
    type: 'article',
    sectionId: 'world',
    sectionName: 'World news',
    webPublicationDate: '2026-05-26T20:47:54Z',
    webTitle: 'Seven heat-related deaths in France as May records set in several countries',
    webUrl: 'https://www.theguardian.com/world/2026/may/26/deaths-france-linked-record-high-temperatures',
  },
  {
    id: 'world/live/2026/may/26/iran-war-live-updates-us-attacks-iran-missile-sites-self-defence-during-peace-talks',
    type: 'liveblog',
    sectionId: 'world',
    sectionName: 'World news',
    webPublicationDate: '2026-05-26T20:41:51Z',
    webTitle: 'Middle East crisis: Iran\'s foreign ministry says US broke ceasefire with overnight strikes - as it happened',
    webUrl: 'https://www.theguardian.com/world/live/2026/may/26/iran-war-live-updates-us-attacks-iran-missile-sites-self-defence-during-peace-talks',
  },
  {
    id: 'world/2026/may/26/iran-peace-deal-talks-us-bombing-ceasefire-strait-hormuz',
    type: 'article',
    sectionId: 'world',
    sectionName: 'World news',
    webPublicationDate: '2026-05-26T20:18:31Z',
    webTitle: 'Iran remains in peace talks despite first US strikes since ceasefire',
    webUrl: 'https://www.theguardian.com/world/2026/may/26/iran-peace-deal-talks-us-bombing-ceasefire-strait-hormuz',
  },
  {
    id: 'science/2026/may/26/nasa-jeff-bezos-blue-origin',
    type: 'article',
    sectionId: 'science',
    sectionName: 'Science',
    webPublicationDate: '2026-05-26T20:14:29Z',
    webTitle: 'Nasa selects Jeff Bezos\'s Blue Origin for first of three uncrewed lunar missions',
    webUrl: 'https://www.theguardian.com/science/2026/may/26/nasa-jeff-bezos-blue-origin',
  },
  {
    id: 'football/2026/may/26/usmnt-world-cup-roster-2026',
    type: 'article',
    sectionId: 'football',
    sectionName: 'Football',
    webPublicationDate: '2026-05-26T19:39:03Z',
    webTitle: 'USMNT World Cup roster confirmed: Zendejas in as Luna, Tessmann and Morris miss out',
    webUrl: 'https://www.theguardian.com/football/2026/may/26/usmnt-world-cup-roster-2026',
  },
  {
    id: 'tv-and-radio/2026/may/26/stephen-colbert-youtube-channel',
    type: 'article',
    sectionId: 'tv-and-radio',
    sectionName: 'Television & radio',
    webPublicationDate: '2026-05-26T19:34:00Z',
    webTitle: 'Colbert launches YouTube channel less than a week after late-night show ends',
    webUrl: 'https://www.theguardian.com/tv-and-radio/2026/may/26/stephen-colbert-youtube-channel',
  },
  {
    id: 'sport/2026/may/26/coco-gauff-says-australian-open-did-not-apologise-over-racket-smash-incident',
    type: 'article',
    sectionId: 'sport',
    sectionName: 'Sport',
    webPublicationDate: '2026-05-26T19:11:13Z',
    webTitle: 'Coco Gauff says Australian Open did not apologise over racket-smash incident',
    webUrl: 'https://www.theguardian.com/sport/2026/may/26/coco-gauff-says-australian-open-did-not-apologise-over-racket-smash-incident',
  },
]

function tokenize(value = '') {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function getFallbackGuardianResults(query) {
  const tokens = tokenize(query)

  if (tokens.length === 0) {
    return FALLBACK_GUARDIAN_RESULTS.slice(0, 10)
  }

  const matches = FALLBACK_GUARDIAN_RESULTS.filter((article) => {
    const haystack = `${article.webTitle} ${article.sectionName}`.toLowerCase()
    return tokens.every((token) => haystack.includes(token))
  })

  return (matches.length > 0 ? matches : FALLBACK_GUARDIAN_RESULTS).slice(0, 10)
}

function buildGuardianUrl({ query, apiKey, includeFields }) {
  const url = new globalThis.URL(GUARDIAN_API_BASE_URL)
  url.searchParams.set('q', query)
  url.searchParams.set('order-by', 'relevance')
  url.searchParams.set('page-size', '50')
  url.searchParams.set('api-key', apiKey)

  if (includeFields) {
    url.searchParams.set('show-fields', 'trailText,thumbnail,bodyText')
  }

  return url.toString()
}

async function fetchGuardian({ query, apiKey, includeFields }) {
  const response = await globalThis.fetch(buildGuardianUrl({ query, apiKey, includeFields }))

  if (!response.ok) {
    const error = new Error(`Guardian API request failed with status ${response.status}`)
    error.status = response.status
    throw error
  }

  return response.json()
}

async function getGuardianNews(req, res) {
  const query = String(req.query.q || '').trim()

  if (!query) {
    return res.status(400).send({ message: 'Query parameter q is required' })
  }

  const keyFromClient = String(req.query.apiKey || '').trim()
  const keyFromEnv = process.env.GUARDIAN_API_KEY || process.env.VITE_GUARDIAN_API_KEY || ''
  const apiKey = keyFromEnv || keyFromClient || 'test'

  try {
    const data = await fetchGuardian({ query, apiKey, includeFields: true })
    return res.send(data)
  } catch {
    try {
      const fallbackData = await fetchGuardian({ query, apiKey, includeFields: false })
      return res.send(fallbackData)
    } catch {
      return res.send({
        response: {
          status: 'ok',
          userTier: 'fallback',
          total: getFallbackGuardianResults(query).length,
          startIndex: 1,
          pageSize: 10,
          currentPage: 1,
          pages: 1,
          orderBy: 'relevance',
          results: getFallbackGuardianResults(query),
        },
      })
    }
  }
}

module.exports = {
  getGuardianNews,
}
