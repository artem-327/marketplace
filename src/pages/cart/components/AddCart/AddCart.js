import './AddCart.scss'
// import file from '../../../../images/file.svg'
import { checkToken } from '../../../../utils/auth'

import styled from 'styled-components'
import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { Sidebar, Button, Header, Grid, GridRow, GridColumn, Loader, Dimmer, Dropdown, Input, Divider, Segment, List, Popup } from 'semantic-ui-react'
import Router from 'next/router'
import { FormattedNumber, FormattedMessage } from 'react-intl'
import { FormattedUnit, UnitOfPackaging } from '~/components/formatted-messages'
import { errorMessages } from '~/constants/yupValidation'
import { getPricing } from "~/src/utils/functions"

import { isEqual } from 'lodash'


const CapitalizedColumn = styled(GridColumn)`
  text-transform: capitalize;
`

const FlexContent = styled(Segment)`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 0px !important;
`

const RelaxedSegment = styled(Segment)`
  padding-top: 0px;
  margin: 0 !important;
`

const ErrorLabel = styled.label`
  color: red;
`

const CustomList = styled(List)`
  pointer-events: none;
  margin-top: 0px !important;
`

const ListHeader = styled(List.Header)`
  font-size: 1rem !important;
  padding-bottom: 15px;
`

export default class AddCart extends Component {
  componentDidMount() {
    // this.props.getProductOffer(this.props.id, this.props.isEdit)
    // if (this.props.isEdit) this.props.getOrderDetail(this.props.orderId)
  }


  createOrder = async () => {

    if (checkToken(this.props)) return
    const { addCartItem } = this.props
    let { sidebar } = this.props
    let { quantity, id } = sidebar

    await addCartItem({ productOffer: id, quantity })
    Router.push('/cart')
  }

  editOrder = async () => {
    const { updateCartItem } = this.props
    let { sidebar } = this.props
    let { quantity } = sidebar


    await updateCartItem({ cartItemId: sidebar.id, quantity })
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

    let { pkgAmount, pricingTiers } = offer

    const price = pricing ? pricing.price : null

    let { packagingUnit, packagingSize, packagingType } = offer.companyProduct
    let nameAbbreviation = packagingUnit ? packagingUnit.nameAbbreviation : null

    let totalPrice = (quantity && price) ? price * quantity * packagingSize : null
    let error = null

    let dropdownOptions = []
    let currencyCode = offer.pricingTiers[0].price.currency.code || 'USD'

    if (pricingTiers.length > 0) {
      pricingTiers.forEach((tier, i) => {
        let quantityTo = (i + 1) >= pricingTiers.length ? pkgAmount : (tier.quantityFrom > pricingTiers[i + 1].quantityFrom ? tier.quantityFrom : pricingTiers[i + 1].quantityFrom - 1)


        let text = <>
          <FormattedUnit unit='' separator=' - ' value={tier.quantityFrom} /><FormattedUnit unit='' value={quantityTo} />
          <FormattedNumber style='currency' value={tier.price.amount} currency={currencyCode} />
        </>
        dropdownOptions.push({
          key: i,
          value: { quantityFrom: tier.quantityFrom, price: tier.price.amount },
          text
        })
      })
    }
    else {
      let value = price

      dropdownOptions.push({
        key: 0,
        value: { quantityFrom: 1, price: value },
        text: <><FormattedNumber minimumFractionDigits={0} value={value} style='currency' currency={currencyCode} /></>
      })
    }

    if (isNaN(quantity))
      error =
        <ErrorLabel>
          {errorMessages.requiredMessage}
        </ErrorLabel>
    else if (quantity < offer.minimum)
      error =
        <ErrorLabel>
          <FormattedMessage id='validation.minimum' defaultMessage='Minimum is {min}' values={{ min: offer.minimum }} />
        </ErrorLabel>
    else if (quantity > pkgAmount)
      error =
        <ErrorLabel>
          <FormattedMessage id='validation.maximum' defaultMessage='Maximum is {max}' values={{ max: pkgAmount }} />
        </ErrorLabel>
    else if (quantity % offer.splits !== 0)
      error =
        <ErrorLabel>
          <FormattedMessage id='validation.multiplyOfSplit' defaultMessage='Must be multiply of split ({split})' values={{ split: offer.splits }} />
        </ErrorLabel>

    // let attachments = offer.attachments.map(att =>
    //   <div><img src={file} alt='File' className='fileicon'></img><p className='filedescription'>{att.fileName}</p></div>
    // )

    let canProceed = !warning && price

    return (
      <>
        <FlexContent basic>
          <Grid verticalAlign='top'>
            <GridRow className='action' columns={1}>
              <GridColumn>
                <Header><FormattedMessage id='cart.InfoHeader' defaultMessage='1. Product Information' /></Header>
              </GridColumn>
            </GridRow>

            {/* <GridRow columns={1}>
              <GridColumn>
                <Header as='h4'>{offer.product.casProducts[0].casIndexName}</Header>
              </GridColumn>
            </GridRow> */}

            {/* <GridRow>
              <GridColumn computer={6}>
                Merchant:
          </GridColumn>
              <GridColumn computer={10}>
                {offer.owner && offer.owner.company.name ? offer.owner.company.name : 'Anonymous'}
              </GridColumn>
            </GridRow> */}

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.productName' defaultMessage='Product Name:' />
              </GridColumn>
              <GridColumn computer={10}>
                {offer.companyProduct.echoProduct.name}
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.productCode' defaultMessage='Product Code:' />
              </GridColumn>
              <GridColumn computer={10}>
                {offer.companyProduct.echoProduct.code}
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.mixtures' defaultMessage='Mixtures:' />
              </GridColumn>
              <GridColumn computer={10}>
                {this.props.casProductsChemNames}
              </GridColumn>
            </GridRow>

            {/*<GridRow>
              <GridColumn computer={6}>
                Product Code:
              </GridColumn>
              <GridColumn computer={10}>
                {offer.companyProduct.echoProduct.code}
              </GridColumn>
            </GridRow>*/}

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.productLocation' defaultMessage='Location:' />
           </GridColumn>
              <GridColumn computer={10}>
                {offer.locationStr}
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.availableProduct' defaultMessage='Available Product:' />
          </GridColumn>
              <GridColumn computer={10}>
                <FormattedNumber minimumFractionDigits={0} value={pkgAmount} /> <UnitOfPackaging value={packagingType.name} /> / <FormattedUnit unit={nameAbbreviation} separator={' '} value={pkgAmount * packagingSize} />
              </GridColumn>

            </GridRow>

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.productForm' defaultMessage='Form:' />
         </GridColumn>
              <GridColumn computer={10}>
                {offer.productForm.name}
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}>
                <FormattedMessage id='cart.packaging' defaultMessage='Packaging:' />
          </GridColumn>

              <GridColumn company={10}>
                <FormattedUnit unit={nameAbbreviation} separator={' '} value={packagingSize} /> <UnitOfPackaging value={packagingType.name} />
              </GridColumn>
            </GridRow>

            {/* <GridRow>
              <GridColumn computer={6}>
                Attachments:
          </GridColumn>

              <GridColumn computer={10}>
                {attachments}
              </GridColumn>
            </GridRow> */}

            <GridRow className='action'>
              <GridColumn>
                <Header><FormattedMessage id='cart.PurchaseHeader' defaultMessage='2. Purchase Info' /></Header>
              </GridColumn>
            </GridRow>

            <CustomList selection>
              <ListHeader><FormattedMessage id='cart.pricingLevel' defaultMessage='Pricing Level:' /></ListHeader>
              {dropdownOptions.map((el) => (
                <List.Item active={isEqual(el.value, this.props.sidebar.pricing)}>
                  <List.Content>
                    {el.text}
                  </List.Content>
                </List.Item>
              ))}
            </CustomList>
            <GridRow columns={2}>
              <Popup trigger={
                <GridColumn><FormattedMessage id='cart.minimumQQ' defaultMessage='Minimum Order QQ' />:</GridColumn>
              }
                content={<FormattedMessage id='cart.minimumOrderQQ' defaultMessage='Minimum Order Quantity' />}
              />
              <GridColumn>{offer.minimum}</GridColumn>
            </GridRow>


            <GridRow columns={2}>
              <GridColumn><FormattedMessage id='cart.split' defaultMessage='Split' />:</GridColumn>
              <GridColumn>{offer.splits}</GridColumn>
            </GridRow>


            <GridRow verticalAlign='middle' columns={2}>
              <GridColumn>
                <FormattedMessage id='cart.selectQuantity' defaultMessage='Select Quantity:' />
              </GridColumn>
              <GridColumn data-test='add_cart_quantity_inp'>
                <Input
                  step={offer.splits}
                  error={!!error}
                  value={this.props.sidebar.quantity}
                  onChange={this.handleQuantity} type='number' />
              </GridColumn>
            </GridRow>

            {error && <GridRow columns={2}>
              <GridColumn />
              <GridColumn> {error}</GridColumn>
            </GridRow>}

            <GridRow columns={1}>

            </GridRow>

            <GridRow className='action'>
              <GridColumn>
                <Header><FormattedMessage id='cart.SummaryHeader' defaultMessage='3. Summary' /></Header>
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}><FormattedMessage id='cart.totalQuantity' defaultMessage='Total Quantity:' /></GridColumn>
              <GridColumn computer={10}>
                {(quantity && quantity > 0 ? <> <FormattedNumber minimumFractionDigits={0} value={quantity} />  <UnitOfPackaging value={packagingType.name} /> </> : null)
                  || (isEdit && <> <FormattedNumber minimumFractionDigits={0} value={order.quantity} />  <UnitOfPackaging value={packagingType.name} /> </>)}
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}><FormattedMessage id='cart.price' defaultMessage='Price' /></GridColumn>
              <GridColumn computer={10}>
                {
                  price && !isNaN(price) ? <><FormattedNumber
                    style='currency'
                    currency={currencyCode}
                    value={price } /> {nameAbbreviation && `/ ${nameAbbreviation}`}</> : null
                }
              </GridColumn>
            </GridRow>
            <Divider />
            <GridRow>
              <GridColumn computer={6}><FormattedMessage id='cart.subtotal' defaultMessage='Subtotal' />:</GridColumn>
              <GridColumn computer={10}>{totalPrice ?
                <FormattedNumber style='currency' currency={currencyCode} value={totalPrice} />
                : null}
              </GridColumn>
            </GridRow>
          </Grid >
        </FlexContent >

        <RelaxedSegment basic>
          <Grid>
            <GridRow className='action' columns={2}>
              <GridColumn>
                <Button fluid floated='right' onClick={() => this.props.sidebarChanged({ isOpen: false })}
                        data-test='add_cart_cancel_btn'>
                  <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{text => text}</FormattedMessage>
                </Button>
              </GridColumn>

              <GridColumn>
                {!isEdit
                  ? <Button disabled={!canProceed} fluid floated='right' primary onClick={this.createOrder}
                            data-test='add_cart_create_order_btn'>
                    <FormattedMessage id='global.continue' defaultMessage='Continue'>{text => text}</FormattedMessage>
              </Button>
                  : <Button disabled={!canProceed} fluid floated='right' primary onClick={this.editOrder}
                            data-test='add_cart_edit_order_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save'>{text => text}</FormattedMessage>
                </Button>
                }
              </GridColumn>
            </GridRow>
          </Grid>
        </RelaxedSegment>
      </>
    )
  }

  render() {
    let { sidebar, isEdit, orderDetailIsFetching, offerDetailIsFetching } = this.props
    const { sidebarChanged } = this.props
    let { isOpen } = sidebar

    return (
      <Sidebar onHide={() => sidebarChanged({ isOpen: false })} width='very wide' className='cart-sidebar flex' direction='right' animation='scale down' visible={isOpen} style={{ zIndex: 601 }}>
        {
          (offerDetailIsFetching) ? <Dimmer active inverted> <Loader size='large' /> </Dimmer>
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
  casProductsChemNames: object,
  casProductsCasNumbers: object,
  // id: number,
  // quantity: number,
  // pricing: object,
  // warning: string
}
