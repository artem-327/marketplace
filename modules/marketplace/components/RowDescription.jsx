import PropTypes from 'prop-types'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
// Constants
import { currency } from '../../../constants/index'
// Styles
import { DivRowDescriptionWrapper, DivBlueText } from '../styles'
// Services
import { getSafe } from '../../../utils/functions'

const RowDescription = props => {
  const {
    currentUserId,
    history,
    index,
    lastHistory,
    productName,
    listFobPriceUnit,
    packagingType,
    packagingUnit,
    packagingSize
  } = props

  const { status, historyType, createdBy } = history
  const thisUser = createdBy.id === currentUserId

  const quantity = `${history.pkgAmount} (${packagingSize} ${packagingUnit} ${packagingType})`
  const fob = (
    <>
      <FormattedNumber
        minimumFractionDigits={3}
        maximumFractionDigits={3}
        style='currency'
        currency={currency}
        value={history.pricePerUOM}
      />
      {listFobPriceUnit}
    </>
  )
  let messageId = thisUser ? 'marketplace.detailRow.youHaveOffered' : 'marketplace.detailRow.userCompanyHasBid'

  if (lastHistory) {
    if (status === 'ACCEPTED') {
      messageId = thisUser ? 'marketplace.detailRow.youHaveAccepted' : 'marketplace.detailRow.userCompanyHasAccepted'
    } else if (status === 'REJECTED') {
      messageId = thisUser ? 'marketplace.detailRow.youHaveDeclined' : 'marketplace.detailRow.userCompanyHasDeclined'
    } else if (status === 'NEW' && historyType === 'COUNTER') {
      messageId = thisUser
        ? 'marketplace.detailRow.youHaveCountered'
        : 'marketplace.detailRow.userCompanyHasCountered'
    }

    if (index && status === 'NEW' && historyType === 'NORMAL') {
      // work around
      messageId = thisUser
        ? 'marketplace.detailRow.youHaveCountered'
        : 'marketplace.detailRow.userCompanyHasCountered'
    }
  } else {
    // not last history
    if (index) {
      messageId = thisUser
        ? 'marketplace.detailRow.youHaveCountered'
        : 'marketplace.detailRow.userCompanyHasCountered'
    } else {
      // First history - Bid
      messageId = thisUser ? 'marketplace.detailRow.youHaveOffered' : 'marketplace.detailRow.userCompanyHasBid'
    }
  }

  return (
    <DivRowDescriptionWrapper>
      <FormattedMessage
        id={messageId}
        values={{
          name: <DivBlueText>{createdBy.name}</DivBlueText>,
          company: <DivBlueText>{getSafe(() => createdBy.company.name, '')}</DivBlueText>,
          fob: <DivBlueText>{fob}</DivBlueText>,
          quantity: <DivBlueText>{quantity}</DivBlueText>,
          product: <DivBlueText>{productName}</DivBlueText>
        }}
      />
    </DivRowDescriptionWrapper>
  )
}

RowDescription.propTypes = {
  currentUserId: PropTypes.number,
  history: PropTypes.object,
  index: PropTypes.number,
  lastHistory: PropTypes.bool,
  productName: PropTypes.string,
  listFobPriceUnit: PropTypes.string,
  packagingType: PropTypes.string,
  packagingUnit: PropTypes.string,
  packagingSize: PropTypes.number
}

RowDescription.defaultProps = {
  currentUserId: 0,
  history: {},
  index: 0,
  lastHistory: false,
  productName: 'N/A',
  listFobPriceUnit: '',
  packagingType: '',
  packagingUnit: '',
  packagingSize: 1
}

export default injectIntl(RowDescription)