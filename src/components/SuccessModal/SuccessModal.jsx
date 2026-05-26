import ModalWithForm from '../ModalWithForm/ModalWithForm'

function SuccessModal({ isOpen, onClose, onSignInClick }) {
  const handleSwitch = () => {
    onSignInClick()
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Registration successfully completed!"
      submitText=""
      onSubmit={(event) => event.preventDefault()}
      isSubmitDisabled
      isInfo
    >
      <p className="modal__footer modal__footer_left">
        <button className="modal__switch" type="button" onClick={handleSwitch}>
          Sign in
        </button>
      </p>
    </ModalWithForm>
  )
}

export default SuccessModal
