import PropTypes from 'prop-types'
import { confirmable } from 'react-confirm'

import { Modal, Button } from 'semantic-ui-react'
/**
 * Modal with header, content and actions.
 * @component
 */
const ConfirmDialog = ({ show, proceed, dismiss, cancel, title, confirmation, options }) => {
  const { cancelText, proceedText } = options
  return (
    <Modal closeIcon size='tiny' centered={false} open={show} onClose={dismiss}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{confirmation}</Modal.Content>

      <Modal.Actions>
        <Button primary inverted onClick={cancel} data-test='confirm_dialog_cancel_btn'>
          {cancelText}
        </Button>
        <Button onClick={proceed} primary data-test='confirm_dialog_proceed_btn'>
          {proceedText}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

ConfirmDialog.propTypes = {
  /** From confirmable. Indicates if the dialog is shown or not. */
  show: PropTypes.bool,
  /** From confirmable. Call to close the dialog with promise resolved. */
  proceed: PropTypes.func,
  /** From confirmable. Call to close the dialog with promise rejected. */
  cancel: PropTypes.func,
  /** From confirmable. Call to only close the dialog. */
  dismiss: PropTypes.func,
  /** Arguments of your confirm function */
  title: PropTypes.string,
  /** Arguments of your confirm function */
  confirmation: PropTypes.string,
  /** Arguments of your confirm function */
  options: PropTypes.object //
}

/** @description confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component. */
export default confirmable(ConfirmDialog)
