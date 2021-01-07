import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
//Components
import SystemSettings from '~/components/settings'

const UsersPopup = ({ isOpenPopup, closePopup, editedId }) => {
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
        <SystemSettings asModal={false} role='user' scrolling={false} isUserSettings={true} editedId={editedId} />
      </Modal.Content>
    </Modal>
  )
}

UsersPopup.propTypes = {
  isOpenPopup: PropTypes.bool,
  closePopup: PropTypes.func,
  editedId: PropTypes.number
}

UsersPopup.defaultProps = {
  isOpenPopup: false,
  closePopup: () => {},
  editedId: null
}

export default UsersPopup
