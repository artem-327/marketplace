import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'

//Components
import ImmediateAcceptModal from './ImmediateAcceptModal'
import ImmediateRejectModal from './ImmediateRejectModal'

/**
 * Immediate Modal Popup
 * @category Alert
 * @component
 */
const ImmediateModal = props => {
  const {
    modalType
  } = props
  
  return (
    <>
      { modalType === "accept" && <ImmediateAcceptModal /> }
      { modalType === "reject" && <ImmediateRejectModal /> }
    </>
  )
}

ImmediateModal.propTypes = {
  modalType: PropTypes.string
}

ImmediateModal.defaultProps = {
  modalType: "reject"
}

export default injectIntl(ImmediateModal)
