import { useMemo, useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'

function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister,
  onSubmit,
  onOpenResetPassword,
  isLoading,
  errorText,
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const isFormValid = useMemo(
    () => email.trim().length > 0 && password.trim().length > 0,
    [email, password],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ email, password })
  }

  const handleResetPassword = () => {
    onOpenResetPassword(email)
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign in"
      submitText={isLoading ? 'Signing in...' : 'Sign in'}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid || isLoading}
      errorText={errorText}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="modal__label">
        Password
        <div className="modal__password-row">
          <input
            className="modal__input modal__input_password"
            type={isPasswordVisible ? 'text' : 'password'}
            required
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="button"
            className="modal__show-password"
            onClick={() => setIsPasswordVisible((state) => !state)}
          >
            {isPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
      </label>
      <button
        type="button"
        className="modal__helper-link"
        onClick={handleResetPassword}
      >
        Reset password
      </button>
      <p className="modal__footer">
        or{' '}
        <button className="modal__switch" type="button" onClick={onSwitchToRegister}>
          Sign up
        </button>
      </p>
    </ModalWithForm>
  )
}

export default LoginModal