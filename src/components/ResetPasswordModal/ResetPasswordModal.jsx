import { useMemo, useState } from 'react'
import ModalWithForm from '../ModalWithForm/ModalWithForm'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function ResetPasswordModal({
  isOpen,
  onClose,
  onSubmit,
  initialEmail,
  isLoading,
  errorText,
}) {
  const [email, setEmail] = useState(initialEmail || '')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const emailError = email && !EMAIL_REGEX.test(email) ? 'Invalid email address' : ''
  const passwordError = newPassword && newPassword.length < 6
    ? 'Password must be at least 6 characters'
    : ''
  const confirmError = confirmPassword && newPassword !== confirmPassword
    ? 'Passwords do not match'
    : ''

  const isFormValid = useMemo(
    () => email.trim().length > 0
      && newPassword.length >= 6
      && newPassword === confirmPassword
      && !emailError
      && !passwordError
      && !confirmError,
    [email, newPassword, confirmPassword, emailError, passwordError, confirmError],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({ email, newPassword })
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Reset password"
      submitText={isLoading ? 'Resetting...' : 'Reset password'}
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
        New password
        <div className="modal__password-row">
          <input
            className="modal__input modal__input_password"
            type={isPasswordVisible ? 'text' : 'password'}
            minLength="6"
            required
            placeholder="New password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
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
        Confirm password
        <input
          className="modal__input"
          type={isPasswordVisible ? 'text' : 'password'}
          minLength="6"
          required
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <p className="modal__field-error">{confirmError}</p>
      </label>
    </ModalWithForm>
  )
}

export default ResetPasswordModal
