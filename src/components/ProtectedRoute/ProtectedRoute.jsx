import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ isLoggedIn, onUnauthorized, children }) {
  useEffect(() => {
    if (!isLoggedIn && onUnauthorized) {
      onUnauthorized()
    }
  }, [isLoggedIn, onUnauthorized])

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
