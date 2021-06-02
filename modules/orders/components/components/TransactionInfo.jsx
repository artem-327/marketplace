import { Grid, GridRow } from 'semantic-ui-react'
import { FormattedMessage, injectIntl } from 'react-intl'
// Services
import { getSafe } from '../../../../utils/functions'
// Styles
import { SmallerTextColumn, RightSpan, StyledSegment } from '../../styles'

const TransactionInfo = props => {

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

export default injectIntl(TransactionInfo)
