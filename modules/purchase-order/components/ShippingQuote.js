import React, { Component } from 'react'
import moment from 'moment'
import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Grid, GridRow, GridColumn, Header, Divider, Radio, Dimmer, Loader } from 'semantic-ui-react'
import styled from 'styled-components'

import { getLocaleDateFormat } from '~/components/date-format'
import { getSafe } from '~/utils/functions'
import ProdexGrid from '~/components/table'

const GridContainer = styled.div`
  padding-top: 15px !important;
  overflow-x: hidden;
`

const columns = [
  {
    name: 'selected',
    title: true,
    width: 50,
    align: 'center'
  },
  {
    name: 'carrierName',
    title: (
      <FormattedMessage id='cart.carrier' defaultMessage='Carrier'>
        {text => text}
      </FormattedMessage>
    ),
    width: 85
  },
  {
    name: 'estimatedPrice',
    title: (
      <FormattedMessage id='cart.cost' defaultMessage='Cost'>
        {text => text}
      </FormattedMessage>
    ),
    width: 90
  },
  {
    name: 'deliveryTime',
    title: (
      <FormattedMessage id='cart.estimatedDelivery' defaultMessage='Estimated Delivery'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150
  },
  {
    name: 'etd',
    title: (
      <FormattedMessage id='cart.etd' defaultMessage='ETD'>
        {text => text}
      </FormattedMessage>
    ),
    width: 85
  },
  {
    name: 'serviceType',
    title: (
      <FormattedMessage id='cart.serviceType' defaultMessage='Service Type'>
        {text => text}
      </FormattedMessage>
    ),
    width: 120
  }
]

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
  getRows = () => {
    const { handleQuoteSelect, selectedShippingQuote, shippingQuotes: { rates }, currency } = this.props
    if (!rates) return []

    return rates.map((rate, index) => {
      let timeObj = rate.estimatedDeliveryDate && moment(rate.estimatedDeliveryDate)
      let deliveryTime = rate.estimatedDeliveryDate ? moment(rate.estimatedDeliveryDate).format(getLocaleDateFormat()) : ''
      return {
        id: index,
        selected: <Radio
          checked={selectedShippingQuote && selectedShippingQuote.index === index}
          onChange={() => handleQuoteSelect(index)}
          data-test={`purchase_order_shipping_quote_${index}_rad`}
        />,
        carrierName: rate.carrierName,
        estimatedPrice: <FormattedNumber style='currency' currency={currency} value={rate.estimatedPrice} />,
        deliveryTime,
        etd: timeObj ? timeObj.fromNow() : '',
        serviceType: rate.serviceType

      }
    })
  }

  render() {
    let { shippingQuotes, shippingQuotesAreFetching, selectedAddress } = this.props

    return (
      <GridContainer>
        <ProdexGrid tableName='checkout_freight_table' loading={shippingQuotesAreFetching} columns={columns} rows={this.getRows()} />
      </GridContainer>
    )
  }
}
