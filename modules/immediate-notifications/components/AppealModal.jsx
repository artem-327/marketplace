import { useState } from 'react'
import { Modal, TextArea } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
// Components
import BasicButton from '../../../components/buttons/BasicButton'
// Styles
import { ModalAppeal } from './styles'

/**
 * Immediate Success Modal Popup
 * @category Alert
 * @component
 */
const ImmediateAppealModal = props => {
  const {
    state,
    setState,
    sendMessageToSupport
  } = props

  const [appealValue, setAppealValue] = useState('')
  const [requiredLength, setRequiredLength] = useState(false)

  const submitHandler = async () => {
    setRequiredLength(false)
    if(appealValue.length > 4) {
      const {value} = await sendMessageToSupport(appealValue)
      if(value && value.messages) {
        setState({
          ...state,
          type: 'standard',
          open: true,
          icon: 'SUCCESS',
          title: 'Your Message has Been Sent.',
          text: 'A representative will review your appeal and will reach out within 24 hours.',
          leftButtonText: 'Explore BluePallet Marketplace',
          leftButtonRedirect: '',
          rightButtonText: '',
          rightButtonRedirect: ''
        })
      } else {
        setState({
          ...state,
          open: false
        })
      }
    } else {
      setRequiredLength(true)
    }
  }

  return (
    <ModalAppeal closeIcon centered={false} open={state.open} onClose={() => setState({...state, open: false})}>
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
          value={appealValue}
          onChange={(e, {value}) => setAppealValue(value)}
        />
        {requiredLength ? <small style={{color: '#9f3a38'}}><FormattedMessage id='validation.minLength' values={{ min: 5 }} defaultMessage='Field should have at least 5 characters' /></small> : <></>}
      </Modal.Content>

      <Modal.Actions>
        <BasicButton 
          onClick={() => setState({...state, open: false})} 
        >
          <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
        </BasicButton>
        <BasicButton 
          onClick={submitHandler} 
          noBorder
          textcolor='#ffffff !important'
          background='#00c7f9 !important'
        >
          <FormattedMessage id='global.send' defaultMessage='Send' />
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
