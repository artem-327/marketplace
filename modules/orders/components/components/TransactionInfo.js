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

class TransactionInfo extends Component {
  render() {
    const StyledSegment = styled(OrderSegment)`
      padding-top: 0px !important;
      padding-bottom: 0px !important;
    `

    const { order, echoSupportPhone } = this.props
    const echoSystemTransaction = getSafe(() => order.dwollaTransfers[0].transferId, 'N/A')

    return (
      <StyledSegment compact>
        <Grid divided verticalAlign='middle'>
          <GridRow columns={3}>
            <SmallerTextColumn>
              <FormattedMessage id='order.detail.nameOfOppositeParty' defaultMessage='Name of Opposite Party' />
              <RightSpan>
                {getSafe(() => order.orderType, '') === 'Purchase'
                  ? getSafe(() => order.sellerCompanyName, '')
                  : getSafe(() => order.buyerCompanyName, '')}
              </RightSpan>
            </SmallerTextColumn>
            <GridColumn>
              <FormattedMessage id='order.detail.echoSystemTransaction' defaultMessage='Echo System Transaction' />
              <RightSpan>{echoSystemTransaction}</RightSpan>
            </GridColumn>
            <GridColumn>
              <FormattedMessage id='order.detail.echoSupportPhone' defaultMessage='Echo Support phone number' />
              <RightSpan>{echoSupportPhone}</RightSpan>
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
  },
  echoSupportPhone: ''
}

export default injectIntl(TransactionInfo)
