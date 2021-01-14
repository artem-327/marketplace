import React from 'react'
import { connect } from 'react-redux'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { getSafe } from '~/utils/functions'
import { currencyId, currency } from '~/constants/index'

const RowDescriptionWrapper = styled.div`
  white-space: nowrap;
  display: flex;
  text-overflow: ellipsis;
  overflow: hidden;
`

const BlueText = styled.div`
  color: #2599d5;
  margin: 0 4px;
`

class RowDescription extends React.Component {

  render() {
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
    } = this.props

    const { status, historyType, createdBy } = history
    const thisUser = createdBy.id === currentUserId

    const quantity = `${history.pkgAmount} (${packagingSize} ${packagingUnit} ${packagingType})`
    const fob = (
      <>
        <FormattedNumber
          minimumFractionDigits={2}
          maximumFractionDigits={2}
          style='currency'
          currency={currency}
          value={history.pricePerUOM}
        />
        {listFobPriceUnit}
      </>
    )

    let messageId = thisUser
      ? 'marketplace.detailRow.youHaveOffered'
      : 'marketplace.detailRow.userCompanyHasBid'

    if (lastHistory) {
      if (status === 'ACCEPTED') {
        messageId = thisUser
          ? 'marketplace.detailRow.youHaveAccepted'
          : 'marketplace.detailRow.userCompanyHasAccepted'
      }  else if (status === 'REJECTED') {
        messageId = thisUser
          ? 'marketplace.detailRow.youHaveDeclined'
          : 'marketplace.detailRow.userCompanyHasDeclined'
      } else if (status === 'NEW' && historyType === 'COUNTER') {
        messageId = thisUser
          ? 'marketplace.detailRow.youHaveCountered'
          : 'marketplace.detailRow.userCompanyHasCountered'
      }

      if (index && (status === 'NEW' && historyType === 'NORMAL')) {  // work around
        messageId = thisUser
          ? 'marketplace.detailRow.youHaveCountered'
          : 'marketplace.detailRow.userCompanyHasCountered'
      }
    } else { // not last history
      if (index) {
        messageId = thisUser
          ? 'marketplace.detailRow.youHaveCountered'
          : 'marketplace.detailRow.userCompanyHasCountered'
      } else {
        messageId = thisUser
          ? 'marketplace.detailRow.youHaveOffered'
          : 'marketplace.detailRow.userCompanyHasBid'
      }
    }

    return (
      <RowDescriptionWrapper>
        <FormattedMessage
          id={messageId}
          values={{
            name: <BlueText>{createdBy.name}</BlueText>,
            company: <BlueText>{createdBy.company.name}</BlueText>,
            fob: <BlueText>{fob}</BlueText>,
            quantity: <BlueText>{quantity}</BlueText>,
            product: <BlueText>{productName}</BlueText>
          }}
        />
      </RowDescriptionWrapper>
    )
  }
}

function mapStateToProps(store, { productOffer }) {
  const companyProduct = productOffer.companyProduct
  const priceUnit = getSafe(() => companyProduct.packagingUnit.nameAbbreviation, '')

  return {
    currentUserId: getSafe(() => store.auth.identity.id, ''),
    productName: getSafe(() => companyProduct.intProductName, ''),
    listFobPriceUnit: priceUnit ? `/${priceUnit}` : '',
    packagingType: getSafe(() => companyProduct.packagingType.name, ''),
    packagingUnit: getSafe(() => companyProduct.packagingUnit.nameAbbreviation, ''),
    packagingSize: getSafe(() => companyProduct.packagingSize, 1)
  }
}

export default connect(mapStateToProps, {})(injectIntl(RowDescription))