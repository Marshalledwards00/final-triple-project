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
  const keywordText = keywordSet.length ? keywordSet.join(', ') : 'No keywords yet'

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        onSignOut={onSignOut}
        heroTitle="Saved articles"
        heroText={`${currentUser?.name || 'User'}, you have ${articles.length} saved articles. By keywords: ${keywordText}`}
      />
      <Main title="Saved news" subtitle={`You saved ${articles.length} articles`}>
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