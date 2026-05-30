import About from '../../components/About/About'
import Header from '../../components/Header/Header'
import Main from '../../components/Main/Main'
import NewsCardList from '../../components/NewsCardList/NewsCardList'
import Preloader from '../../components/Preloader/Preloader'

function HomePage({
  isLoggedIn,
  onSignInClick,
  onSignOut,
  onSearch,
  onToggleSave,
  articles,
  isLoading,
  hasSearched,
  hasMore,
  onShowMore,
}) {
  return (
    <>
      <Header
        isHome
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        onSignOut={onSignOut}
        onSearch={onSearch}
      />
      <Main
        title="Search results"
        subtitle={hasSearched ? `Found ${articles.length} articles` : 'Enter a keyword to start searching'}
        hasMore={hasMore}
        onShowMore={onShowMore}
      >
        {isLoading ? (
          <Preloader />
        ) : hasSearched ? (
          <NewsCardList
            articles={articles}
            onToggleSave={onToggleSave}
            isLoggedIn={isLoggedIn}
            hasMore={hasMore}
            onShowMore={onShowMore}
          />
        ) : (
          <></>
        )}
      </Main>
      <About />
    </>
  )
}

export default HomePage