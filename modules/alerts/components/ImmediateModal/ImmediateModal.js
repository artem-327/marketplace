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
    modalType
  } = props
  
  return (
    <>
      { modalType === "accept" && <ImmediateAcceptModal /> }
      { modalType === "reject" && <ImmediateRejectModal /> }
      { modalType === "appeal" && <ImmediateAppealModal /> }
    </>
  )
}

ImmediateModal.propTypes = {
  modalType: PropTypes.string
}

ImmediateModal.defaultProps = {
  modalType: "appeal"
}

export default injectIntl(ImmediateModal)
