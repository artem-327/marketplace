import PropTypes from 'prop-types'
import { confirmable } from 'react-confirm'
import { Modal as SemanticModal, Button } from 'semantic-ui-react'
//Components
import BasicButton from '../buttons/BasicButton'
//Styles
import { ModalCustom } from './ConfirmDialog.styles'
/**
 * Modal with header, content and actions.
 * @component
 */

const ConfirmDialog = ({ show, proceed, dismiss, cancel, title, confirmation, options, basicModal }) => {
  const { cancelText, proceedText } = options
  return (
    <ModalCustom basicModal closeIcon size='tiny' centered={false} open={show} onClose={dismiss}>
      <ModalCustom.Header>{title}</ModalCustom.Header>
      <ModalCustom.Content>{confirmation}</ModalCustom.Content>

      <ModalCustom.Actions>
        <BasicButton noBorder onClick={cancel} data-test='confirm_dialog_cancel_btn'>
          {cancelText}
        </BasicButton>
        <BasicButton onClick={proceed} data-test='confirm_dialog_proceed_btn'>
          {proceedText}
        </BasicButton>
      </ModalCustom.Actions>
    </ModalCustom>
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
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  /** Arguments of your confirm function */
  confirmation: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  /** Arguments of your confirm function */
  options: PropTypes.object, //
  /** Shows our basic modal or original from Semantic */
  basicModal: PropTypes.bool
}

/** @description confirmable HOC pass props `show`, `dismiss`, `cancel` and `proceed` to your component. */
export default confirmable(ConfirmDialog)
