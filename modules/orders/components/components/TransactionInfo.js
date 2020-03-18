import React, { Component } from 'react'
import { OrderSegment, OrderList } from '~/modules/orders/components/Detail'
import { Grid, GridRow, GridColumn, List } from 'semantic-ui-react'
import styled from 'styled-components'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'

const SmallerTextColumn = styled(GridColumn)`
  font-size: 12px !important;
`

const RightSpan = styled.span`
  font-weight: bold;
  float: right;
  font-size: 14px !important;
  color: #20273a;
`
// code: 'APP_SUPPORT_PHONE_NUMBER


class TransactionInfo extends Component {
  render() {
    const StyledSegment = styled(OrderSegment)`
      padding-top: 0px !important;
      padding-bottom: 0px !important;
    `

    const { order } = this.props
    const { buyerCompanyName } = order
    const echoSystemTransaction = getSafe(() => order.dwollaTransfers[0].transferId, 'N/A')
    
    return (
      <StyledSegment compact>
        <Grid divided verticalAlign='middle'>
          <GridRow columns={3}>
            <SmallerTextColumn>
              <FormattedMessage id='order.detail.nameOfOppositeParty' defaultMessage='Name of Opposite Party' />
              <RightSpan>{buyerCompanyName}</RightSpan>
            </SmallerTextColumn>
            <GridColumn>
              <FormattedMessage id='order.detail.echoSystemTransaction' defaultMessage='Echo System Transaction' />
              <RightSpan>{echoSystemTransaction}</RightSpan>
            </GridColumn>
            <GridColumn>
              <FormattedMessage id='order.detail.echoSupportPhone' defaultMessage='Echo Support phone number' />
              {/* TODO - Add real value from settings when BE allows access */}
              <RightSpan>833-321-3246</RightSpan> 
            </GridColumn>
          </GridRow>
        </Grid>
      </StyledSegment>
    )
  }
}

TransactionInfo.defaultProps = {
  order: {
    buyerCompanyName: '',
    dwollaTransfers: []
  }
}

export default injectIntl(TransactionInfo)
