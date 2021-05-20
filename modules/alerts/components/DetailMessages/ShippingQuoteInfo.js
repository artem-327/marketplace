import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import * as Actions from '../../actions'
import styled from 'styled-components'
import { openPopup as openPopupOperations } from '~/modules/operations/actions'
import Router from 'next/router'
import moment from 'moment'
import { currency } from '~/constants/index'
import { getLocaleDateFormat } from '../../../../components/date-format'
import BasicButton from '../../../../components/buttons/BasicButton'

import { Grid, GridRow, GridColumn, Segment, List, Button } from 'semantic-ui-react'

import { TableSegment, ListTable, DetailMessage, StyledGrid } from '../Alerts.styles'

const DivSimpleText = styled.div`
  color: #20273a;
`

const DivProductName = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #20273a;
  margin: -3px 0;
`

export const AddressGrid = styled(Grid)`
  border-radius: 4px;
  border: solid 1px #dee2e6;
  background-color: #f8f9fb;
  font-size: 14px;

  &.ui.grid {
    margin: 0;
    padding: 12px 10px;
    width: 240px;

    .row {
      margin: 0;
      padding: 0;
    }

    .column {
      margin: 0;
      padding: 0 5px;
      color: #20273a;

      &.header {
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: normal;
        color: #848893;
        margin-bottom: 3px;
      }

      &.company-name {
        color: #20273a;
        font-weight: bolder;
      }
    }
  }
`

const AddressRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0;
`

const DivBottomButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

const GridRowDescription = styled(GridRow)`
  &.row {
    margin: -5px 0 10px !important;
  }
`

// ! ! TODO  .description { font-weight: bold; }

const ShippingQuoteInfo = props => {
  const displayAddress = ({ address, company }) => {
    return (
      <AddressGrid>
        <GridRow>
          <GridColumn className='company-name'>{company}</GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn>{address.streetAddress}</GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            {`${address.city}${address.province ? `, ${address.province}` : ''}, ${address.country}, ${address.zip}`}
          </GridColumn>
        </GridRow>
      </AddressGrid>
    )
  }

  const { row, cartItems, onClose } = props
  return (
    <DetailMessage>
      <StyledGrid>
        <GridRowDescription>
          <GridColumn width={16}>
            {row.text}
          </GridColumn>
        </GridRowDescription>
        {
          row.info.items && row.info.items.map((item, index) => {
            const packagingUnit = getSafe(() => item.packagingUnit.nameAbbreviation, '')
            const packagingType = getSafe(() => item.packagingType.name, '')
            return (
              <GridRow key={index}>
                <GridColumn width={16}>
                  <DivProductName>
                    {`${item.pkgAmount} x ${item.packagingSize} ${packagingUnit} ${packagingType} ${item.product}`}
                  </DivProductName>
                </GridColumn>
              </GridRow>
            )
          })
        }
        <GridRow>
          <GridColumn width={16}>
            {
              !!getSafe(() => row.info.originCompanyName, false) &&
              !!getSafe(() => row.info.destinationCompanyName, false)
                ? (
                  <AddressRow>
                    {displayAddress({
                      company: getSafe(() => row.info.originCompanyName, ''),
                      address: {
                        country: getSafe(() => row.info.originCountry, ''),
                        province: getSafe(() => row.info.originProvince, ''),
                        city: getSafe(() => row.info.originCity, ''),
                        streetAddress: getSafe(() => row.info.originStreet, ''),
                        zip: getSafe(() => row.info.originZip, '')
                      }
                    })}
                    {displayAddress({
                      company: getSafe(() => row.info.destinationCompanyName, ''),
                      address: {
                        country: getSafe(() => row.info.destinationCountry, ''),
                        province: getSafe(() => row.info.destinationProvince, ''),
                        city: getSafe(() => row.info.destinationCity, ''),
                        streetAddress: getSafe(() => row.info.destinationStreet, ''),
                        zip: getSafe(() => row.info.destinationZip, '')
                      }
                    })}
                  </AddressRow>
                ) : null
            }
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn width={16}>
            <TableSegment>
              <ListTable divided relaxed horizontal size='large'>
                {
                  [
                    {
                      header: <FormattedMessage id='alerts.carrier' defaultMessage='Carrier' />,
                      description: row.info.carrier
                    },
                    {
                      header: <FormattedMessage id='alerts.price' defaultMessage='Price' />,
                      description: row.info.price ?
                        <FormattedNumber
                          minimumFractionDigits={2}
                          maximumFractionDigits={2}
                          style='currency'
                          currency={currency}
                          value={row.info.price}
                        />
                        : ''
                    },
                    {
                      header: <FormattedMessage id='alerts.quoteId' defaultMessage='Quote ID' />,
                      description: row.info.shippingQuoteId
                    },
                    {
                      header: <FormattedMessage id='alerts.validityDate' defaultMessage='Validity Date' />,
                      description: row.info.validityDate
                        ? moment(row.info.validityDate).format(getLocaleDateFormat())
                        : ''
                    }
                  ].map((column, index) =>
                    <List.Item key={index}>
                      <List.Content>
                        <List.Header as='label'>{column.header}</List.Header>
                        <List.Description as='span'>{column.description}</List.Description>
                      </List.Content>
                    </List.Item>
                  )
                }
              </ListTable>
            </TableSegment>
          </GridColumn>
        </GridRow>
        {!!cartItems && (
          <GridRow>
            <GridColumn width={16}>
              <DivSimpleText>
                <FormattedMessage
                  id='alerts.youCanNowApply'
                  defaultMessage='You can now apply the quote to your order by clicking the Checkout button'
                />
              </DivSimpleText>
            </GridColumn>
          </GridRow>
        )}
      </StyledGrid>
      <DivBottomButtons>
        <BasicButton
          noBorder
          size='large'
          inputProps={{ type: 'button' }}
          onClick={() => onClose()}
          data-test='notifications_shipping_quote_info_close_btn'>
          <FormattedMessage id='alerts.close' defaultMessage='Close'>
            {text => text}
          </FormattedMessage>
        </BasicButton>
        <BasicButton
          primary
          disabled={!cartItems}
          size='large'
          inputProps={{ type: 'button' }}
          onClick={() => {
            Router.push(`/purchase-order?shippingQuoteId=${row.info.shippingQuoteId}`)
          }}
          data-test='notifications_shipping_quote_info_checkout_btn'>
          <FormattedMessage id='alerts.checkout' defaultMessage='Checkout'>
            {text => text}
          </FormattedMessage>
        </BasicButton>
      </DivBottomButtons>
    </DetailMessage>
  )
}

const mapStateToProps = state => {
  return {
    cartItems: getSafe(() => state.cart.cartItemsCount, 0)
  }
}

export default connect(mapStateToProps, { ...Actions, openPopupOperations })(
  injectIntl(withToastManager(ShippingQuoteInfo))
)
