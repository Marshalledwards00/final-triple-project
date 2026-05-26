import Navigation from '../Navigation/Navigation'
import SearchForm from '../SearchForm/SearchForm'
import './Header.css'

function Header({
  isHome = false,
  heroTitle = 'What is going on in the world?',
  heroText = 'Find the latest news on any topic and save them in your personal account.',
  isLoggedIn,
  onSignInClick,
  onSignOut,
  onSearch,
}) {
  return (
    <header className={`header ${isHome ? 'header_home' : ''}`}>
      <div className="header__top">
        <Navigation
          onSignInClick={onSignInClick}
          onSignOut={onSignOut}
          isHome={isHome}
          isLoggedIn={isLoggedIn}
        />
      </div>

      <div className="header__hero">
        <h1 className="header__title">{heroTitle}</h1>
        <p className="header__text">{heroText}</p>
        {isHome && <SearchForm onSearch={onSearch} />}
      </div>
    </header>
  )
}

export default Header