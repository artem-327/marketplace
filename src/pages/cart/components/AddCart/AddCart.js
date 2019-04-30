import './AddCart.scss'
import file from '../../../../images/file.svg'
import { checkToken } from '../../../../utils/auth'

import styled from 'styled-components'
import React, { Component } from 'react'
import { object, func, number, string } from 'prop-types'
import { Sidebar, Button, Header, Grid, GridRow, GridColumn, Loader, Dimmer, Dropdown, Input, Divider, Segment } from 'semantic-ui-react'
import Router from 'next/router'
import { FormattedNumber } from 'react-intl'


const CapitalizedColumn = styled(GridColumn)`
  text-transform: capitalize;
`

export default class AddCart extends Component {
  componentDidMount() {
    if (this.props.isEdit) this.props.getOrderDetail(this.props.orderId)
    this.props.getProductOffer(this.props.id)
  }


  createOrder = async () => {

    if (checkToken(this.props)) return
    const { postNewOrder } = this.props
    let { offer } = this.props
    let { quantity } = this.props.sidebar

    let offerpayload = {
      productOffer: offer.id,
      quantity
    }

    await postNewOrder(offerpayload)
    this.props.sidebarChanged({ isOpen: false })
    Router.push('/cart')
  }

  editOrder = async () => {
    const { postOrderEdit, } = this.props
    let { quantity, pricing } = this.props.sidebar
   
    
    // TODO, wrong id??
    const orderpayload = {
      id: this.props.order.id,
      quantity,
      selectedOfferPrice: pricing
    }

    await postOrderEdit(orderpayload)
    this.props.sidebarChanged({ isOpen: false })

    Router.push('/cart')
  }

  handleQuantity = e => {
    let { minimum, splits, pkgAmount } = this.props.offer
    let quantity = parseInt(e.target.value, 10)
    let warning = null

    if (quantity < minimum || !quantity) {
      warning = `minimum is ${minimum}`
    } else if (quantity > pkgAmount) {
      warning = `maximum is ${pkgAmount}`
    } else if (!(quantity % parseInt(splits, 10) === 0 || quantity === parseInt(minimum, 10))) {
      warning = `split is ${splits}`
    }

    this.props.sidebarChanged({ warning, quantity })
  }

  getCartMarkup = () => {
    let { offer, order, isEdit } = this.props
    let { quantity, pricing, warning } = this.props.sidebar

    let { pkgAmount } = offer

    let location = offer.warehouse.address
    let { packagingUnit, packagingSize, packagingType } = offer.product


    let totalPrice = (quantity && pricing) ? pricing.price * quantity * packagingSize : null
    let { tiers } = offer.pricing

    var dropdownOptions = []
    let currencyCode = offer.pricing.price.currency.code

    if (tiers.length > 0) {
      tiers.forEach((tier, i) => {
        let quantityTo = (i + 1) >= tiers.length ? pkgAmount : (tier.quantityFrom > tiers[i + 1].quantityFrom ? tier.quantityFrom : tiers[i + 1].quantityFrom - 1)


        let text = <>
          <FormattedNumber value={tier.quantityFrom} /> - <FormattedNumber value={quantityTo} />
          {` ${packagingType.name}`} <FormattedNumber style='currency' value={tier.price} currency={currencyCode} />
        </>
        dropdownOptions.push({
          key: i,
          value: { quantityFrom: tier.quantityFrom, price: tier.price },
          text
        })
      })
    }
    else {
      let value = offer.pricing.price.amount

      dropdownOptions.push({
        key: 0,
        value: { quantityFrom: 0, price: value },
        text: <><FormattedNumber value={value} style='currency' currency={currencyCode} /></>
      })
    }

    let attachments = offer.attachments.map(att =>
      <div><img src={file} alt='File' className='fileicon'></img><p className='filedescription'>{att.fileName}</p></div>
    )

    let canProceed = !warning && pricing

    console.log(pricing)

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

          <GridRow>
            <GridColumn computer={6}>
              Merchant:
          </GridColumn>
            <GridColumn computer={10}>
              {offer.merchant.company.name ? offer.merchant.company.name : 'Anonymous'}
            </GridColumn>
          </GridRow>


          <GridRow>
            <GridColumn computer={6}>
              Location:
           </GridColumn>
            <GridColumn computer={10}>
              {location.province ? location.province.name : location.city}, {location.country.name}
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn computer={6}>
              Available Product:
          </GridColumn>
            <GridColumn computer={10}>
              <FormattedNumber value={pkgAmount} /> {packagingType.name} / <FormattedNumber value={pkgAmount * packagingSize} /> {packagingUnit.nameAbbreviation}
            </GridColumn>

          </GridRow>

          <GridRow>
            <GridColumn computer={6}>
              Form:
         </GridColumn>
            <GridColumn computer={10}>
              {offer.productForm.name}
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn computer={6}>
              Packaging:
          </GridColumn>

            <CapitalizedColumn company={10}>
              {offer.product.packagingType.name}
            </CapitalizedColumn>
          </GridRow>

          <GridRow>
            <GridColumn computer={6}>
              Package Size:
          </GridColumn>

            <GridColumn computer={10}>
              <FormattedNumber value={packagingSize} /> {packagingUnit.nameAbbreviation}
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn computer={6}>
              Attachments:
          </GridColumn>

            <GridColumn computer={10}>
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
              Select Quantity
          </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn>
              <Input error={warning} value={this.props.sidebar.quantity} onChange={this.handleQuantity} type='number' />
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn>
              Select Pricing Level
          </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn>
              <Dropdown
                placeholder='Select Price Level'
                value={this.props.sidebar.pricing}
                disabled
                selection
                options={dropdownOptions}
              />
            </GridColumn>
          </GridRow>

          <GridRow className='action'>
            <GridColumn>
              <Header>3. Summary</Header>
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn computer={6}>Total Quantity:</GridColumn>
            <GridColumn computer={10}>
              {(quantity && !warning && <> <FormattedNumber value={quantity} /> {`${packagingType.name}`} </>)
                || (isEdit && <> <FormattedNumber value={order.quantity} /> {`${packagingType.name}`} </>)}
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn computer={6}>Price:</GridColumn>
            <GridColumn computer={10}>
              <FormattedNumber
                style='currency'
                currency={offer.pricing.price.currency.code}
                value={pricing && pricing.price} />/{packagingUnit.nameAbbreviation}</GridColumn>
          </GridRow>
          <Divider />
          <GridRow>
            <GridColumn computer={6}>Subtotal:</GridColumn>
            <GridColumn computer={10}>{totalPrice && totalPrice > 0 ?
              <FormattedNumber style='currency' currency={offer.pricing.price.currency.code} value={totalPrice} />
              : null}
            </GridColumn>
          </GridRow>

          <GridRow className='action' columns={2}>
            <GridColumn>
              <Button fluid floated='right' onClick={() => this.props.sidebarChanged({ isOpen: false })}>Cancel</Button>
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
        </Grid >
      </Segment >
    )
  }

  render() {
    let { sidebar, isEdit, orderDetailIsFetching, offerDetailIsFetching } = this.props
    const { sidebarChanged } = this.props
    let { isOpen } = sidebar

    return (
      <Sidebar onHide={() => sidebarChanged({ isOpen: false })} width='very wide' className='cart-sidebar' direction='right' animation='scale down' visible={isOpen}>
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
  // id: number,
  // quantity: number,
  // pricing: object,
  // warning: string
}
