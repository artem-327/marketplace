import './AddCart.scss'
import { getUnit } from '../../../../utils/functions'
import file from '../../../../images/file.svg'
import { checkToken } from '../../../../utils/auth'

import React, { Component } from 'react'
import { object, func, number, string } from 'prop-types'
import { Sidebar, Button, Header, Grid, GridRow, GridColumn, Loader, Dimmer, Dropdown, Input, Divider, Segment } from 'semantic-ui-react'
import Router from 'next/router'

export default class AddCart extends Component {
  constructor(props) {
    super(props)

    this.state = {
      warning: null
    }
  }
  componentDidMount() {
    if (this.props.isEdit) this.props.getOrderDetail(this.props.orderId)
    this.props.getProductOffer(this.props.id)
  }

  createOrder = async () => {

    if (checkToken(this.props)) return

    const { postNewOrder, quantity, offer } = this.props

    const offerpayload = {
      productOffer: offer.id,
      quantity
    }

    await postNewOrder(offerpayload)

    Router.push('/cart')
  }

  editOrder = async () => {
    const { postOrderEdit, offer, quantity, pricing, orderId, hideSidebar } = this.props

    // TODO, wrong id??
    const orderpayload = {
      id: orderId,
      quantity,
      selectedOfferPrice: pricing
    }

    await postOrderEdit(orderpayload)
    hideSidebar()
    Router.push('/cart')
  }

  handleQuantity = e => {
    const { minimum, splits, pkgAmount } = this.props.offer
    const value = parseInt(e.target.value, 10)
    let warning = null

    if (value < minimum || !value) {
      warning = `minimum is ${minimum}`
    } else if (value > pkgAmount) {
      warning = `maximum is ${pkgAmount}`
    } else if (!(value % parseInt(splits, 10) === 0 || value === parseInt(minimum, 10))) {
      warning = `split is ${splits}`
    }

    this.setState({ warning })
    this.props.valueChanged({ quantity: value, warning })
  }



  getCartMarkup = () => {
    const { offer, order, isEdit, quantity, pricing, warning } = this.props
    const { pkgAmount } = offer

    const location = `${offer.warehouse.address.city}, ${offer.warehouse.address.country.name}`
    const unit = offer.product.packagingUnit
    const size = offer.product.packagingSize
    const unitName = `${getUnit(unit.name)}`
    const packageSize = `${size} ${unitName}`
    const availableProducts = `${pkgAmount} pck / ${(pkgAmount * size).formatNumber()} ${unitName}`

    const totalPrice = (quantity && pricing) ? pricing.price * quantity * size : null
    const { tiers } = offer.pricing

    var dropdownOptions = []


    if (tiers.length > 0) {
      tiers.forEach((tier, i) => {
        const quantityTo = (i + 1) >= tiers.length ? pkgAmount : (tier.quantityFrom > tiers[i + 1].quantityFrom ? tier.quantityFrom : tiers[i + 1].quantityFrom - 1)
        let key = `${tier.quantityFrom} - ${quantityTo} pck / $${tier.price}`
        dropdownOptions.push({
          key,
          value: { quantityFrom: tier.quantityFrom, quantityTo: quantityTo, price: tier.price },
          text: key
        })
      })
    } else {
      let value = offer.pricing.price.amount
      dropdownOptions.push({
        key: value,
        value: { price: value },
        text: value
      })
    }

    const attachments = offer.attachments.map(att => {
      return <div><img src={file} alt='File' className='fileicon'></img><p className='filedescription'>{att.fileName}</p></div>
    })


    let canProceed = (!warning && !this.state.warning) && pricing



    return (
      <Segment basic>
        <Grid verticalAlign='middle'>
          <GridRow className='action' columns={1}>
            <GridColumn>
              <Header>1. Product Information</Header>
            </GridColumn>
          </GridRow>

          <GridRow columns={1}>
            <GridColumn>
              <b>{offer.product.casProduct.casIndexName}</b>
            </GridColumn>
          </GridRow>

          <GridRow columns={2}>
            <GridColumn>
              Merchant:
          </GridColumn>
            <GridColumn>
              {offer.merchant.company.name}
            </GridColumn>
          </GridRow>


          <GridRow columns={2}>
            <GridColumn>
              Location:
         </GridColumn>
            <GridColumn>
              {location}
            </GridColumn>
          </GridRow>

          <GridRow columns={2}>
            <GridColumn>
              Available Product:
          </GridColumn>
            <GridColumn>
              {availableProducts}
            </GridColumn>

          </GridRow>

          <GridRow columns={2}>
            <GridColumn>
              Form:
         </GridColumn>
            <GridColumn>
              {offer.productForm.name}
            </GridColumn>
          </GridRow>

          <GridRow columns={2}>
            <GridColumn>
              Packaging:
          </GridColumn>

            <GridColumn>
              {offer.product.packagingType.name}
            </GridColumn>
          </GridRow>

          <GridRow columns={2}>
            <GridColumn>
              Package Size:
          </GridColumn>

            <GridColumn>
              {packageSize}
            </GridColumn>
          </GridRow>

          <GridRow columns={2}>
            <GridColumn>
              Attachments:
          </GridColumn>

            <GridColumn>
              {attachments}
            </GridColumn>
          </GridRow>

          <GridRow className='action'>
            <GridColumn>
              <Header>2. Purchase Info</Header>
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn>
              Select Price Level
          </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn>
              <Dropdown
                // error={!pricing}
                placeholder='Select Price Level'
                value={pricing}
                onChange={(e, data) => this.props.valueChanged({ pricing: data.value })}
                selection
                options={dropdownOptions}
              />
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn>
              Select Quantity
          </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn>
              <Input error={warning} value={quantity} onChange={this.handleQuantity} type='number' />
            </GridColumn>
          </GridRow>


          <GridRow className='action'>
            <GridColumn>
              <Header>3. Summary</Header>
            </GridColumn>
          </GridRow>

          <GridRow columns={2}>
            <GridColumn>Total Quantity:</GridColumn>
            <GridColumn>
              {(quantity && !warning && `${quantity} pck`) || (isEdit && `${order.quantity} pck`)}
            </GridColumn>
          </GridRow>

          <GridRow columns={2}>
            <GridColumn>Price/LB:</GridColumn>
            <GridColumn>{offer.pricing.price.currency.symbol}{offer.pricing.price.amount}</GridColumn>
          </GridRow>
          <Divider />
          <GridRow columns={2}>
            <GridColumn>Subtotal:</GridColumn>
            <GridColumn>{totalPrice && totalPrice > 0 ? `$${totalPrice}` : null}</GridColumn>
          </GridRow>


          <GridRow className='action' columns={2}>
            <GridColumn>
              <Button fluid floated='right' onClick={this.props.hideSidebar}>Cancel</Button>
            </GridColumn>

            <GridColumn>
              {!isEdit
                ? <Button disabled={!canProceed} fluid floated='right' primary onClick={this.createOrder}>
                  Continue
              </Button>
                : <Button disabled={!canProceed} fluid floated='right' primary onClick={this.editOrder}>
                  Edit
                </Button>
              }
            </GridColumn>
          </GridRow>

        </Grid>
      </Segment>
    )
  }

  render() {
    let { visible, isEdit, orderDetailIsFetching, offerDetailIsFetching } = this.props
    const { hideSidebar } = this.props

    return (
      <Sidebar onHide={hideSidebar} width='very wide' className='cart-sidebar' direction='right' animation='scale down' visible={visible}>
        {
          (offerDetailIsFetching || (isEdit && orderDetailIsFetching)) ? <Dimmer active inverted> <Loader size='large' /> </Dimmer>
            : this.getCartMarkup()
        }
      </Sidebar>
    )
  }
}

AddCart.propTypes = {
  offer: object,
  order: object,
  postNewOrder: func,
  id: number,
  quantity: number,
  pricing: object,
  warning: string
}
