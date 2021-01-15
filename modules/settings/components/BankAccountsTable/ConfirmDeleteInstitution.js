import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { Modal } from 'semantic-ui-react'
import { Trash2 } from 'react-feather'

//Components
import BasicButton from '../../../../components/buttons/BasicButton'
//Styles
import { ModalActions, ModalContent, DivCircleIcon, DivIcon } from './styles'

const ConfirmDeleteInstitution = ({ isOpenPopup, closePopup, deleteInstitution, institutId }) => {
  return (
    <Modal
      closeIcon
      size='tiny'
      centered={true}
      open={isOpenPopup}
      onClose={e => {
        closePopup()
      }}>
      <ModalContent>
        <DivCircleIcon>
          <DivIcon>
            <Trash2 color='#f16844' size='48' />
          </DivIcon>
        </DivCircleIcon>
        <span>
          <FormattedMessage
            id='settings.accounts.confirm.deleteInstitutions'
            defaultMessage='Deleting this institution will remove all accounts associated with it. Do you wish to continue?'
          />
        </span>
      </ModalContent>

      <ModalActions>
        <BasicButton
          type='button'
          noBorder
          inverted
          onClick={() => closePopup()}
          data-test='settings_account_confirm_delete_institution_cancel_btn'>
          <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
        </BasicButton>

        <BasicButton
          onClick={async () => {
            try {
              await deleteInstitution(institutId)
            } catch (e) {
              console.error(e)
            }
          }}
          primary
          data-test='settings_account_confirm_delete_institution_proceed_btn'>
          <FormattedMessage id='global.delete' defaultMessage='Delete' />
        </BasicButton>
      </ModalActions>
    </Modal>
  )
}

ConfirmDeleteInstitution.propTypes = {
  isOpenPopup: PropTypes.bool,
  closePopup: PropTypes.func,
  deleteInstitution: PropTypes.func,
  institutId: PropTypes.number
}

ConfirmDeleteInstitution.defaultProps = {
  isOpenPopup: false,
  closePopup: () => {},
  deleteInstitution: () => {},
  institutId: null
}

export default ConfirmDeleteInstitution
