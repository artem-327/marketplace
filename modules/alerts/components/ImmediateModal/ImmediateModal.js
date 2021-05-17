import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
//Components
import ImmediateAcceptModal from './ImmediateAcceptModal'
import ImmediateRejectModal from './ImmediateRejectModal'
import ImmediateAppealModal from './ImmediateAppealModal'

/**
 * Immediate Modal Popup
 * @category Alert
 * @component
 */
const ImmediateModal = props => {
  const {
    modalType,
    nextImmediate,
    getNextImmediate
  } = props
  
  useEffect(() => {
    getNextImmediate()
  }, [])

  useEffect(() => {
    console.log(nextImmediate)
  }, [nextImmediate])

  return (
    <>
      { modalType === "accept" && <ImmediateAcceptModal /> }
      { modalType === "reject" && <ImmediateRejectModal /> }
      { modalType === "appeal" && <ImmediateAppealModal /> }
    </>
  )
}

ImmediateModal.propTypes = {
  modalType: PropTypes.string,
  nextImmediate: PropTypes.object,
  getNextImmediate: PropTypes.func
}

ImmediateModal.defaultProps = {
  modalType: "appeal",
  nextImmediate: {},
  getNextImmediate: () => {}
}

export default injectIntl(ImmediateModal)
