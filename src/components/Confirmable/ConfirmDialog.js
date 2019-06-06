import React from 'react'
import PropTypes from 'prop-types'
import { confirmable } from 'react-confirm'

import { Modal, Button } from 'semantic-ui-react'

const ConfirmDialog = ({ show, proceed, dismiss, cancel, title, confirmation, options }) => {
  let { cancelText, proceedText } = options
  return (
    <Modal closeIcon size='tiny' centered={false} open={show} onClose={dismiss}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>{confirmation}</Modal.Content>

      <Modal.Actions>
        <Button primary inverted onClick={cancel}>{cancelText}</Button>
        <Button onClick={proceed} primary>{proceedText}</Button>
      </Modal.Actions>
    </Modal>
  )
}

ConfirmDialog.propTypes = {
  show: PropTypes.bool,            // from confirmable. indicates if the dialog is shown or not.
  proceed: PropTypes.func,         // from confirmable. call to close the dialog with promise resolved.
  cancel: PropTypes.func,          // from confirmable. call to close the dialog with promise rejected.
  dismiss: PropTypes.func,         // from confirmable. call to only close the dialog.
  title: PropTypes.string,         // arguments of your confirm function
  confirmation: PropTypes.string,  // arguments of your confirm function
  options: PropTypes.object        // arguments of your confirm function
}

// confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component.
export default confirmable(ConfirmDialog)