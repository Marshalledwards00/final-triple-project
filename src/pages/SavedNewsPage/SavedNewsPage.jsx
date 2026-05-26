import { useContext } from 'react'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import Header from '../../components/Header/Header'
import Main from '../../components/Main/Main'
import NewsCardList from '../../components/NewsCardList/NewsCardList'

function SavedNewsPage({
  isLoggedIn,
  onSignInClick,
  onSignOut,
  onDeleteArticle,
  articles,
}) {
  const currentUser = useContext(CurrentUserContext)

  const keywordSet = [...new Set(articles.map((item) => item.keyword))]
  const keywordText = keywordSet.length
    ? `${keywordSet.slice(0, 2).join(', ')}${keywordSet.length > 2 ? `, and ${keywordSet.length - 2} other` : ''}`
    : 'No keywords yet'

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        onSignOut={onSignOut}
        heroLabel="Saved articles"
        heroTitle={`${currentUser?.name || 'User'}, you have ${articles.length} saved articles`}
        heroText={`By keywords: ${keywordText}`}
      />
      <Main hideHeading>
        <NewsCardList
          articles={articles}
          isSavedPage
          onDeleteArticle={onDeleteArticle}
        />
      </Main>
    </>
  )
}

export default SavedNewsPage