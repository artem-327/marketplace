import { connect } from 'react-redux'
import * as Actions from '../../../actions'
import { openGlobalAddForm } from '../../../../layout/actions'
import {
  Modal,
  Button
} from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { withDatagrid } from '../../../../datagrid'
import { withToastManager } from 'react-toast-notifications'

const ModalContent = styled(Modal.Content)`
  padding: 1.5rem !important;
  margin-bottom: 10px !important;
`

const ConfirmModal = props => {

  const {
    closeConfirmModal,
    openRespondModal,
    openGlobalAddForm,
    closeInfoModal
  } = props

  return (
    <Modal onClose={closeConfirmModal} open={true} size='tiny'>
      <ModalContent>
        <p style={{fontSize: '24px', textAlign: 'center', color: '#20273a'}}>
          <FormattedMessage id='wantedboard.respond' defaultMessage='Respond' />
        </p>
        <p style={{fontSize: '14px', textAlign: 'center', color: '#20273a'}}>
          How would you like to respond to this Wanted Board Post?
        </p>
        <div style={{display: 'flex', justifyContent: 'center', margin: '30px auto 10px'}}>
          <Button basic type='button' onClick={() => {
            closeConfirmModal()
            closeInfoModal()
            openRespondModal()
          }}>
            <FormattedMessage id='aa' defaultMessage='Use Existing Listing' tagName='span' />
          </Button>
          <Button primary type='button' onClick={() => {
            closeConfirmModal()
            closeInfoModal()
            openGlobalAddForm('inventory-my-listings')
          }}>
            <FormattedMessage id='aa' defaultMessage='Create New Listing' tagName='span' />
          </Button>
        </div>
      </ModalContent>
    </Modal>
  )
}

function mapStateToProps(store, props) {
  return {
    ...store.wantedBoard,
    row: store?.wantedBoard?.infoModalData
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions, openGlobalAddForm })(withToastManager(injectIntl(ConfirmModal))))
