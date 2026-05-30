import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import './Navigation.css'

function Navigation({ onSignInClick, onSignOut, isHome, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const getLinkClassName = ({ isActive }) =>
    `navigation__link ${isActive ? 'navigation__link_active' : ''}`

  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  const handleSignIn = () => {
    closeMobileMenu()
    onSignInClick()
  }

  const handleSignOut = () => {
    closeMobileMenu()
    onSignOut()
  }

  return (
    <nav className={`navigation ${isMobileMenuOpen ? 'navigation_open' : ''}`}>
      <NavLink to="/" className="navigation__logo">
        NewsExplorer
      </NavLink>

      <button
        type="button"
        className={`navigation__menu-button ${isMobileMenuOpen ? 'navigation__menu-button_open' : ''}`}
        onClick={() => setIsMobileMenuOpen((state) => !state)}
        aria-expanded={isMobileMenuOpen}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <span className="navigation__menu-line" />
        <span className="navigation__menu-line" />
      </button>

      <div className="navigation__links">
        <NavLink to="/" className={getLinkClassName} onClick={closeMobileMenu}>
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/saved-news" className={getLinkClassName} onClick={closeMobileMenu}>
            Saved news
          </NavLink>
        )}
        {!isLoggedIn ? (
          <button
            className={`navigation__button ${isHome ? 'navigation__button_light' : ''}`}
            type="button"
            onClick={handleSignIn}
          >
            Sign in
          </button>
        ) : (
          <button
            className={`navigation__button ${isHome ? 'navigation__button_light' : ''}`}
            type="button"
            onClick={handleSignOut}
          >
            Log out {currentUser?.name || ''}
            <img className="navigation__logout-icon" src="/logout.svg" alt="" aria-hidden="true" />
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navigation