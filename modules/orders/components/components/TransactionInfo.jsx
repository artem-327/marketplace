import { Component } from 'react'
import { connect } from 'react-redux'
import { OrderSegment, OrderList } from '../Detail.styles'
import { Grid, GridRow, GridColumn, List } from 'semantic-ui-react'
import styled from 'styled-components'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe } from '../../../../utils/functions'

const SmallerTextColumn = styled(GridColumn)`
  .page-wrapper .segment .grid > .row > & {
    padding: 5px 25px !important;
    vertical-align: baseline;
    font-size: 12px !important;
    line-height: 20px !important;
  }
`

const RightSpan = styled.span`
  font-weight: bold;
  float: right;
  font-size: 14px !important;
  color: #20273a;
`

const TransactionInfo = props => {
  const StyledSegment = styled(OrderSegment)`
    margin: 14px 32px !important;
    padding: 0px !important;

    [class*='OrderSegment'] + & {
      margin-top: -20px !important;
    }

    + div.ui.hidden.divider {
      margin: 14px 0 0 !important;
      border: 0 none !important;
    }

    > .grid {
      margin: 0 !important;
      padding: 10px 0 !important;

      > .row {
        padding: 0 !important;

        + .row {
          margin-top: 10px !important;
        }
      }
    }
  `

  const { order, echoSupportPhone, applicationName } = props
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
          <SmallerTextColumn>
            <FormattedMessage id='order.detail.echoSystemTransaction' defaultMessage='{companyName} Transaction' values={{ companyName: applicationName }} />
            <RightSpan>{echoSystemTransaction}</RightSpan>
          </SmallerTextColumn>
          <SmallerTextColumn>
            <FormattedMessage id='order.detail.echoSupportPhone' defaultMessage='{companyName} Support Phone' values={{ companyName: applicationName }} />
            <RightSpan>{echoSupportPhone}</RightSpan>
          </SmallerTextColumn>
        </GridRow>
      </Grid>
    </StyledSegment>
  )
}

function mapStateToProps(store) {
  return {
    applicationName: store?.auth?.identity?.appInfo?.applicationName
  }
}

TransactionInfo.defaultProps = {
  order: {
    buyerCompanyName: '',
    dwollaTransfers: []
  },
  echoSupportPhone: ''
}

export default connect(mapStateToProps)(injectIntl(TransactionInfo))
