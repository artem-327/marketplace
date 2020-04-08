import React, { Component } from 'react'
import moment from 'moment'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Grid, GridRow, GridColumn, Header, Divider, Radio, Dimmer, Loader } from 'semantic-ui-react'
import styled from 'styled-components'

import { getLocaleDateFormat } from '~/components/date-format'
import { getSafe } from '~/utils/functions'

const InnerGrid = styled(Grid)`
  display: block !important;
  width: 100%;
  height: 260px;
  overflow-y: auto;
`

const RelaxedColumn = styled(GridColumn)`
  padding-bottom: 0px !important;
`

const RelaxedRow = styled(GridRow)`
  padding-bottom: 0px !important;
  padding-top: 0px !important;
`

const RelaxedRowPaddingTop = styled(GridRow)`
  padding-bottom: 0px !important;
  padding-top: 5px !important;
`

const EllipsisColumn = styled(GridColumn)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export default class ShippingQuote extends Component {
  state = {
    selectedItem: null
  }

  renderItem = (item, index) => {
    let timeObj = item && item.estimatedDeliveryDate && moment(item.estimatedDeliveryDate)
    let deliveryTime =
      item && item.estimatedDeliveryDate && moment(item.estimatedDeliveryDate).format(getLocaleDateFormat())
    let daysLeft = timeObj && timeObj.fromNow()

    let { handleQuoteSelect, selectedShippingQuote, currency } = this.props

    return (
      <>
        {index > 0 ? <Divider /> : null}
        <RelaxedRow key={index}>
          <GridColumn computer={1}>
            <Radio
              checked={selectedShippingQuote && selectedShippingQuote.index === index}
              onChange={() => handleQuoteSelect(index)}
              data-test={`purchase_order_shipping_quote_${index}_rad`}
            />
          </GridColumn>
          <EllipsisColumn computer={4}>{item.carrierName}</EllipsisColumn>
          <GridColumn computer={2}>
            <FormattedNumber style='currency' currency={currency} value={item.estimatedPrice} />
          </GridColumn>
          <GridColumn computer={4}>{deliveryTime}</GridColumn>
          <GridColumn computer={2}>{daysLeft}</GridColumn>
          <GridColumn computer={3}>{item.serviceType}</GridColumn>
        </RelaxedRow>
      </>
    )
  }

  render() {
    let { shippingQuotes, shippingQuotesAreFetching, selectedAddress } = this.props

    if (shippingQuotesAreFetching) {
      return (
        <InnerGrid>
          <Dimmer active inverted>
            <Loader size='big' />
          </Dimmer>
        </InnerGrid>
      )
    }

    if (!selectedAddress) {
      return (
        <GridColumn computer={16}>
          <Grid>
            <GridRow>
              <GridColumn computer={16}>
                <FormattedMessage
                  id='cart.nothing'
                  defaultMessage='Please, first select a shipping destination Warehouse or Delivery Address.'
                />
              </GridColumn>
            </GridRow>
          </Grid>
        </GridColumn>
      )
    }

    if (!getSafe(() => shippingQuotes.rates.length, false)) {
      return (
        <RelaxedRowPaddingTop>
          <GridColumn computer={16}>
            <FormattedMessage
              id='cart.noShippingQuotes'
              defaultMessage='We are sorry, but no matching Shipping Quotes were provided by logistics company.'
            />
          </GridColumn>
        </RelaxedRowPaddingTop>
      )
    }

    return (
      <>
        <RelaxedColumn computer={16}>
          <Grid padded>
            <GridColumn computer={1} />
            <GridColumn computer={4}>
              <Header as='h4'>
                <FormattedMessage id='cart.carrier' defaultMessage='Carrier' />
              </Header>
            </GridColumn>
            <GridColumn computer={2}>
              <Header as='h4'>
                <FormattedMessage id='cart.cost' defaultMessage='Cost' />
              </Header>
            </GridColumn>

            <GridColumn computer={4}>
              <Header as='h4'>
                <FormattedMessage id='cart.estimatedDelivery' defaultMessage='Estimated Delivery' />
              </Header>
            </GridColumn>

            <GridColumn computer={2}>
              <Header as='h4'>
                <FormattedMessage id='cart.etd' defaultMessage='ETD' />
              </Header>
            </GridColumn>

            <GridColumn computer={3}>
              <Header as='h4'>
                <FormattedMessage id='cart.serviceType' defaultMessage='Service Type' />
              </Header>
            </GridColumn>
          </Grid>
        </RelaxedColumn>

        <InnerGrid padded verticalAlign='middle'>
          {getSafe(() => shippingQuotes.rates, []).map((el, i) => this.renderItem(el, i))}
        </InnerGrid>
      </>
    )
  }
}
