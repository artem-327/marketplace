import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
//Components
import SystemSettings from '../../../../../components/settings'
/**
 * Show modal window with form to set up user's attributes.
 * @category Settings - Users
 * @component
 */
const UserSettingsModal = ({ isOpenPopup, closePopup, editedId, isUserAdmin, isCompanyAdmin }) => {
  return (
    <Modal
      open={isOpenPopup}
      closeIcon
      size='small'
      onClose={e => {
        closePopup(e)
      }}>
      <Modal.Header>
        <FormattedMessage id='settings.user.userSettings' defaultMessage='User Settings' />
      </Modal.Header>
      <Modal.Content>
        <SystemSettings
          isUserAdmin={isUserAdmin}
          isCompanyAdmin={isCompanyAdmin}
          asModal={false}
          role={`company-user/${editedId}`}
          scrolling={false}
          isUserSettings={true}
          editedId={editedId}
        />
      </Modal.Content>
    </Modal>
  )
}

UserSettingsModal.propTypes = {
  isOpenPopup: PropTypes.bool,
  isUserAdmin: PropTypes.bool,
  isCompanyAdmin: PropTypes.bool,
  closePopup: PropTypes.func,
  editedId: PropTypes.number
}

UserSettingsModal.defaultProps = {
  isOpenPopup: false,
  isUserAdmin: false,
  isCompanyAdmin: false,
  closePopup: () => {},
  editedId: null
}

export default UserSettingsModal
