import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import CurrentUserContext from '../../contexts/CurrentUserContext'
import './Navigation.css'

function Navigation({ onSignInClick, onSignOut, isHome, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext)

  const getLinkClassName = ({ isActive }) =>
    `navigation__link ${isActive ? 'navigation__link_active' : ''}`

  return (
    <nav className="navigation">
      <NavLink to="/" className="navigation__logo">
        NewsExplorer
      </NavLink>

      <div className="navigation__links">
        <NavLink to="/" className={getLinkClassName}>
          Home
        </NavLink>
        {isLoggedIn && (
          <NavLink to="/saved-news" className={getLinkClassName}>
            Saved news
          </NavLink>
        )}
        {!isLoggedIn ? (
          <button
            className={`navigation__button ${isHome ? 'navigation__button_light' : ''}`}
            type="button"
            onClick={onSignInClick}
          >
            Sign in
          </button>
        ) : (
          <button
            className={`navigation__button ${isHome ? 'navigation__button_light' : ''}`}
            type="button"
            onClick={onSignOut}
          >
            Log out {currentUser?.name || ''}
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navigation