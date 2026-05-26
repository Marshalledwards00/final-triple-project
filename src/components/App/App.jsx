import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import LoginModal from '../LoginModal/LoginModal'
import RegisterModal from '../RegisterModal/RegisterModal'
import ResetPasswordModal from '../ResetPasswordModal/ResetPasswordModal'
import SuccessModal from '../SuccessModal/SuccessModal'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import HomePage from '../../pages/HomePage/HomePage'
import SavedNewsPage from '../../pages/SavedNewsPage/SavedNewsPage'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import { getNewsByQuery } from '../../utils/newsApi'
import {
  authorize,
  deleteArticle,
  getSavedArticles,
  getUserInfo,
  requestPasswordReset,
  register,
  saveArticle,
} from '../../utils/mainApi'
import { TOKEN_KEY, VISIBLE_CARDS_STEP } from '../../utils/constants'
import './App.css'

function normalizeSearchText(value = '') {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getSavedMatches(savedItems, query) {
  const normalizedQuery = normalizeSearchText(query)

  if (!normalizedQuery) {
    return []
  }

  const tokens = normalizedQuery.split(' ').filter(Boolean)

  return savedItems.filter((item) => {
    const haystack = normalizeSearchText(
      `${item.title || ''} ${item.text || ''} ${item.keyword || ''} ${item.source || ''}`,
    )

    return tokens.every((token) => haystack.includes(token))
  })
}

function App() {
  const navigate = useNavigate()
  const [activeModal, setActiveModal] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [savedArticles, setSavedArticles] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [searchKeyword, setSearchKeyword] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [visibleCardsCount, setVisibleCardsCount] = useState(VISIBLE_CARDS_STEP)
  const [authError, setAuthError] = useState('')
  const [isAuthLoading, setIsAuthLoading] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetModalSeed, setResetModalSeed] = useState(0)

  const getToken = () => localStorage.getItem(TOKEN_KEY)

  const openLoginModal = () => setActiveModal('login')
  const openRegisterModal = () => setActiveModal('register')
  const openResetPasswordModal = (email = '') => {
    setResetEmail(email)
    setResetModalSeed((state) => state + 1)
    setAuthError('')
    setActiveModal('reset-password')
  }
  const closeModal = () => {
    setActiveModal('')
    setAuthError('')
  }

  const visibleResults = useMemo(
    () => {
      const savedByLink = new Map(savedArticles.map((item) => [item.link, item]))

      return searchResults
        .map((article) => {
          const savedItem = savedByLink.get(article.link)
          return {
            ...article,
            savedId: savedItem?._id,
            isSaved: Boolean(savedItem),
          }
        })
        .slice(0, visibleCardsCount)
    },
    [searchResults, savedArticles, visibleCardsCount],
  )

  useEffect(() => {
    const token = getToken()

    if (!token) {
      return
    }

    Promise.all([getUserInfo(token), getSavedArticles(token)])
      .then(([user, articles]) => {
        setCurrentUser(user)
        setSavedArticles(articles)
        setIsLoggedIn(true)
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
      })
  }, [])

  const handleSearch = (query) => {
    setHasSearched(true)
    setSearchKeyword(query)
    setVisibleCardsCount(VISIBLE_CARDS_STEP)
    setIsSearchLoading(true)

    const savedMatches = getSavedMatches(savedArticles, query).map((item) => ({
      ...item,
      id: item._id,
      publishedAt: item.date,
      text: item.text,
      image: item.image,
      isSaved: true,
      savedId: item._id,
      keyword: item.keyword,
    }))

    getNewsByQuery(query)
      .then((articles) => {
        const merged = [...savedMatches]
        const seen = new Set(savedMatches.map((item) => item.link || item.id || item.savedId))

        articles.forEach((article) => {
          const key = article.link || article.id

          if (!seen.has(key)) {
            merged.push(article)
            seen.add(key)
          }
        })

        setSearchResults(merged)
      })
      .catch(() => setSearchResults(savedMatches))
      .finally(() => setIsSearchLoading(false))
  }

  const handleRegister = ({ name, email, password }) => {
    setIsAuthLoading(true)
    setAuthError('')

    register({ name, email, password })
      .then(() => {
        setActiveModal('success')
      })
      .catch((error) => {
        setAuthError(error.message)
      })
      .finally(() => setIsAuthLoading(false))
  }

  const handleLogin = ({ email, password }) => {
    setIsAuthLoading(true)
    setAuthError('')

    authorize({ email, password })
      .then(({ token }) => {
        localStorage.setItem(TOKEN_KEY, token)
        return Promise.all([getUserInfo(token), getSavedArticles(token)])
      })
      .then(([user, articles]) => {
        setCurrentUser(user)
        setSavedArticles(articles)
        setIsLoggedIn(true)
        closeModal()
      })
      .catch((error) => {
        setAuthError(error.message)
      })
      .finally(() => setIsAuthLoading(false))
  }

  const handleResetPassword = ({ email, newPassword }) => {
    if (!email.trim()) {
      setAuthError('Enter your email first, then click Reset password.')
      return
    }

    setIsAuthLoading(true)
    setAuthError('')

    requestPasswordReset({ email, newPassword })
      .then(({ message }) => {
        setAuthError(message)
        setActiveModal('login')
      })
      .catch((error) => {
        setAuthError(error.message)
      })
      .finally(() => setIsAuthLoading(false))
  }

  const handleSignOut = () => {
    localStorage.removeItem(TOKEN_KEY)
    setCurrentUser(null)
    setIsLoggedIn(false)
    setSavedArticles([])
    navigate('/')
  }

  const handleToggleSave = (article) => {
    if (!isLoggedIn) {
      openLoginModal()
      return
    }

    const token = getToken()

    if (article.savedId) {
      deleteArticle(token, article.savedId)
        .then(() => {
          setSavedArticles((prevState) => prevState.filter((item) => item._id !== article.savedId))
        })
      return
    }

    saveArticle(token, article, searchKeyword || 'general')
      .then((savedArticle) => {
        setSavedArticles((prevState) => [savedArticle, ...prevState])
      })
  }

  const handleDeleteFromSaved = (articleId) => {
    const token = getToken()
    deleteArticle(token, articleId)
      .then(() => {
        setSavedArticles((prevState) => prevState.filter((item) => item._id !== articleId))
      })
  }

  const handleShowMore = () => {
    setVisibleCardsCount((prevState) => prevState + VISIBLE_CARDS_STEP)
  }

  const savedPageArticles = useMemo(
    () => savedArticles.map((item) => ({
      ...item,
      id: item._id,
      publishedAt: item.date,
      text: item.text,
      image: item.image,
      isSaved: true,
      savedId: item._id,
      keyword: item.keyword,
    })),
    [savedArticles],
  )

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={(
              <HomePage
                isLoggedIn={isLoggedIn}
                onSignInClick={openLoginModal}
                onSignOut={handleSignOut}
                onSearch={handleSearch}
                onToggleSave={handleToggleSave}
                articles={visibleResults}
                isLoading={isSearchLoading}
                hasSearched={hasSearched}
                hasMore={visibleCardsCount < searchResults.length}
                onShowMore={handleShowMore}
              />
            )}
          />
          <Route
            path="/saved-news"
            element={(
              <ProtectedRoute isLoggedIn={isLoggedIn} onUnauthorized={openLoginModal}>
                <SavedNewsPage
                  isLoggedIn={isLoggedIn}
                  onSignInClick={openLoginModal}
                  onSignOut={handleSignOut}
                  onDeleteArticle={handleDeleteFromSaved}
                  articles={savedPageArticles}
                />
              </ProtectedRoute>
            )}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />

        <LoginModal
          isOpen={activeModal === 'login'}
          onClose={closeModal}
          onSwitchToRegister={openRegisterModal}
          onSubmit={handleLogin}
          onOpenResetPassword={openResetPasswordModal}
          isLoading={isAuthLoading}
          errorText={authError}
        />
        <ResetPasswordModal
          key={resetModalSeed}
          isOpen={activeModal === 'reset-password'}
          onClose={closeModal}
          onSubmit={handleResetPassword}
          initialEmail={resetEmail}
          isLoading={isAuthLoading}
          errorText={authError}
        />
        <RegisterModal
          isOpen={activeModal === 'register'}
          onClose={closeModal}
          onSwitchToLogin={openLoginModal}
          onSubmit={handleRegister}
          isLoading={isAuthLoading}
          errorText={authError}
        />
        <SuccessModal
          isOpen={activeModal === 'success'}
          onClose={closeModal}
          onSignInClick={openLoginModal}
        />
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App