import React, { Component } from 'react'
import moment from 'moment'

import { FormattedMessage, FormattedNumber } from 'react-intl'
import { Grid, GridRow, GridColumn, Header, Divider, Radio, Dimmer, Loader } from 'semantic-ui-react'
import styled from 'styled-components'



const InnerGrid = styled(Grid)`
  height: 260px;
  overflow-y: auto;
  padding-right: 5px !important;
`

const RelaxedColumn = styled(GridColumn)`
  padding-bottom: 0px !important;
`

const RelaxedRow = styled(GridRow)`
  padding-bottom: 0px !important;
  padding-top: 0px !important;
`

export default class ShippingQuote extends Component {
  state = {
    selectedItem: null
  }

  renderItem = (item, index) => {
    let timeObj = moment(item.estimatedDeliveryDate)
    let deliveryTime = timeObj.format('MMM D, YYYY')
    let daysLeft = timeObj.fromNow()

    let { handleQuoteSelect, selectedShippingQuote, currency } = this.props

    return (
      <>
        <RelaxedRow key={index}>
          <GridColumn computer={1}><Radio checked={selectedShippingQuote && selectedShippingQuote.index === index} onChange={() => handleQuoteSelect(index)} data-test={`purchase_order_shipping_quote_${index}_rad`}/></GridColumn>
          <GridColumn computer={4}>{item.carrierName}</GridColumn>
          <GridColumn computer={2}><FormattedNumber style='currency' currency={currency} value={item.estimatedPrice} /></GridColumn>
          <GridColumn computer={4}>{deliveryTime}</GridColumn>
          <GridColumn computer={2}>{daysLeft}</GridColumn>
          <GridColumn computer={3}>{item.serviceType}</GridColumn>
        </RelaxedRow>
        <Divider />
      </>
    )
  }

  render() {
    let { shippingQuotes, shippingQuotesAreFetching } = this.props


    if (shippingQuotesAreFetching) {
      return (
        <InnerGrid>
          <Dimmer active inverted>
            <Loader size='big' />
          </Dimmer>
        </InnerGrid>
      )
    }


    if (!shippingQuotes || shippingQuotes.length === 0) {
      return (
        <GridColumn computer={16}>
          <Grid>
            <GridRow>
              <GridColumn computer={16}>
                <FormattedMessage
                  id='cart.nothing'
                  defaultMessage='Nothing to show'
                />
              </GridColumn>
            </GridRow>
          </Grid>
        </GridColumn>
      )
    }

    return (
      <>

        <RelaxedColumn computer={16}>

          <Grid padded>
            <GridColumn computer={1} />
            <GridColumn computer={4}>
              <Header as='h4'>
                <FormattedMessage
                  id='cart.carrier'
                  defaultMessage='Carrier'
                />
              </Header>
            </GridColumn>
            <GridColumn computer={2}>
              <Header as='h4'>
                <FormattedMessage
                  id='cart.cost'
                  defaultMessage='Cost'
                />
              </Header>
            </GridColumn>

            <GridColumn computer={4}>
              <Header as='h4'>
                <FormattedMessage
                  id='cart.estimatedDelivery'
                  defaultMessage='Estimated Delivery'
                />
              </Header>
            </GridColumn>

            <GridColumn computer={2}>
              <Header as='h4'>
                <FormattedMessage
                  id='cart.etd'
                  defaultMessage='ETD'
                />
              </Header>
            </GridColumn>

            <GridColumn computer={3}>
              <Header as='h4'>
                <FormattedMessage
                  id='cart.serviceType'
                  defaultMessage='Service Type'
                />
              </Header>
            </GridColumn>
          </Grid>

        </RelaxedColumn>

        <InnerGrid padded verticalAlign='middle'>
          {shippingQuotes.map((el, i) => this.renderItem(el, i))}
        </InnerGrid>
      </>
    )
  }
}