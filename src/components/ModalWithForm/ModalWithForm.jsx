import { useEffect } from 'react'
import './ModalWithForm.css'

function ModalWithForm({
  isOpen,
  onClose,
  title,
  submitText,
  onSubmit,
  isSubmitDisabled,
  errorText,
  isInfo,
  footer,
  children,
}) {
  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscClose)
    return () => document.removeEventListener('keydown', handleEscClose)
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal" onMouseDown={handleOverlayClick}>
      <div
        className={`modal__content ${isInfo ? 'modal__content_info' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <button className="modal__close" type="button" onClick={onClose} aria-label="Close">
          &times;
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          {errorText && <p className="modal__error">{errorText}</p>}
          {!isInfo && (
            <button className="modal__submit" type="submit" disabled={isSubmitDisabled}>
              {submitText}
            </button>
          )}
          {footer}
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm