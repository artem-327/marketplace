import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
// Components
import StandardModal from './StandardModal'
import AppealModal from './AppealModal'
// Hooks
import { usePrevious } from '../../../hooks'

/**
 * Immediate Modal Popup
 * @category Alert
 * @component
 */
const ImmediateModal = props => {
  const {
    nextImmediate,
    getNextImmediate,
    sendMessageToSupport
  } = props

  const prevNextImmediate = usePrevious(nextImmediate)
  
  const [state, setState] = useState({
    type: 'standard',
    open: false,
    icon: '',
    title: '',
    text: '',
    leftButtonText: '',
    leftButtonRedirect: '',
    rightButtonText: '',
    rightButtonRedirect: ''
  })
  
  useEffect(() => {
    getNextImmediate()
  }, [])

  useEffect(() => {
    if (typeof prevNextImmediate !== 'undefined') {
      if(nextImmediate && nextImmediate.info && nextImmediate.info.infoType && nextImmediate.immediate) {
        setState({
          ...state,
          type: 'standard',
          open: true,
          icon: nextImmediate.info.icon,
          title: nextImmediate.info.title,
          text: nextImmediate.text,
          leftButtonText: nextImmediate.info.leftButton.title,
          leftButtonRedirect: nextImmediate.info.leftButton.redirect,
          rightButtonText: nextImmediate.info.rightButton.title,
          rightButtonRedirect: nextImmediate.info.rightButton.redirect
        })
      } else {
        setState({
          ...state,
          type: '',
          open: false,
          icon: '',
          title: '',
          text: '',
          leftButtonText: '',
          leftButtonRedirect: '',
          rightButtonText: '',
          rightButtonRedirect: ''
        })
      }
    }
  }, [nextImmediate])

  return (
    <>
      {state.type === 'standard' && <StandardModal state={state} setState={setState} />}
      {state.type === 'appeal' && <AppealModal state={state} setState={setState} sendMessageToSupport={sendMessageToSupport} />}
    </>
  )
}

ImmediateModal.propTypes = {
  nextImmediate: PropTypes.any,
  getNextImmediate: PropTypes.func,
  sendMessageToSupport: PropTypes.func
}

ImmediateModal.defaultProps = {
  nextImmediate: null,
  getNextImmediate: () => {},
  sendMessageToSupport: () => {}
}

export default ImmediateModal
