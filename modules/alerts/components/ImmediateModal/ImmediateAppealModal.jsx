import { useState } from 'react'
import { Modal, TextArea } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
// Components
import BasicButton from '../../../../components/buttons/BasicButton'
// Styles
import { ModalAppeal } from './styles'

/**
 * Immediate Success Modal Popup
 * @category Alert
 * @component
 */
const ImmediateAppealModal = props => {
  const {
    open
  } = props
  
  const [openModal, setOpenModal] = useState(open)

  return (
    <ModalAppeal closeIcon centered={false} open={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>
        <FormattedMessage
          id='immediateNotification.appeal'
          defaultMessage='Appeal'
        />  
      </Modal.Header>
      
      <Modal.Content>
        <FormattedMessage
          id='immediateNotification.appealcontent'
          defaultMessage='Please provide the following information to our Customer Support team. A representative will review your appeal and will reach out within 24 hours.'
        />  
        <br/><br/>
        <TextArea
          style={{resize: "none", width: "100%", height:"150px", padding: "10px", color: "#666"}}
          placeholder= 'Please type why you feel this decision is incorrect.'
        />
      </Modal.Content>

      <Modal.Actions>
        <BasicButton 
          onClick={() => setOpenModal(false)} 
        >
          <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
            {text => text}
          </FormattedMessage>
        </BasicButton>
        <BasicButton 
          onClick={() => setOpenModal(false)} 
          noBorder
          textcolor='#ffffff !important'
          background='#00c7f9 !important'
        >
          <FormattedMessage id='global.send' defaultMessage='Send'>
            {text => text}
          </FormattedMessage>
        </BasicButton>
      </Modal.Actions>
    </ModalAppeal>
  )
}

ImmediateAppealModal.propTypes = {
  open: PropTypes.bool
}

ImmediateAppealModal.defaultProps = {
  open: true
}

export default injectIntl(ImmediateAppealModal)
