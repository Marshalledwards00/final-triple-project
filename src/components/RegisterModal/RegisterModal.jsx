import { useMemo, useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function RegisterModal({ isOpen, onClose, onSwitchToLogin, onSubmit, isLoading, errorText }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const emailError = email && !EMAIL_REGEX.test(email) ? 'Invalid email address' : ''
  const passwordError = password && password.length < 6 ? 'Password must be at least 6 characters' : ''
  const nameError = name && name.trim().length < 2 ? 'Username must be at least 2 characters' : ''

  const isFormValid = useMemo(
    () => name.trim().length >= 2
      && email.trim().length > 0
      && password.length >= 6
      && !emailError
      && !passwordError
      && !nameError,
    [name, email, password, emailError, passwordError, nameError],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ name, email, password })
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      submitText={isLoading ? 'Signing up...' : 'Sign up'}
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
        <p className="modal__field-error">{emailError}</p>
      </label>
      <label className="modal__label">
        Password
        <div className="modal__password-row">
          <input
            className="modal__input modal__input_password"
            type={isPasswordVisible ? 'text' : 'password'}
            minLength="6"
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
        <p className="modal__field-error">{passwordError}</p>
      </label>
      <label className="modal__label">
        Username
        <input
          className="modal__input"
          type="text"
          minLength="2"
          required
          placeholder="Username"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <p className="modal__field-error">{nameError}</p>
      </label>
      <div className="modal__footer modal__footer_below">
        or{' '}
        <button className="modal__switch" type="button" onClick={onSwitchToLogin}>
          Sign in
        </button>
      </div>
    </ModalWithForm>
  )
}

export default RegisterModal