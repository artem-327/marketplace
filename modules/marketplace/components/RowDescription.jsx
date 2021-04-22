/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'

// Constants
import { currencyId, currency } from '~/constants/index'

// Styles
import { DivRowDescriptionWrapper, DivBlueText } from './RowDescription.styles'

// Services
import { getSafe } from '~/utils/functions'

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
  itemsCount: PropTypes.number
}

RowDescription.defaultProps = {
  itemsCount: 0
}

function mapStateToProps(store, { productOffer }) {
  const companyProduct = getSafe(() => productOffer.companyProduct, null)
  const priceUnit = getSafe(() => companyProduct.packagingUnit.nameAbbreviation, '')

  return {
    currentUserId: getSafe(() => store.auth.identity.id, ''),
    productName: getSafe(() => companyProduct.intProductName, 'N/A'),
    listFobPriceUnit: priceUnit ? `/${priceUnit}` : '',
    packagingType: getSafe(() => companyProduct.packagingType.name, ''),
    packagingUnit: getSafe(() => companyProduct.packagingUnit.nameAbbreviation, ''),
    packagingSize: getSafe(() => companyProduct.packagingSize, 1)
  }
}

export default injectIntl(connect(mapStateToProps, {  })(RowDescription))