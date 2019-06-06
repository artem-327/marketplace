import './AddCart.scss'
import file from '../../../../images/file.svg'
import { checkToken } from '../../../../utils/auth'

import styled from 'styled-components'
import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { Sidebar, Button, Header, Grid, GridRow, GridColumn, Loader, Dimmer, Dropdown, Input, Divider, Segment } from 'semantic-ui-react'
import Router from 'next/router'
import { FormattedNumber, FormattedMessage } from 'react-intl'
import { FormattedUnit } from '~/components/formatted-messages'
import { errorMessages } from '~/constants/yupValidation'


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


    let { packagingUnit, packagingSize, packagingType } = offer.product

    let totalPrice = (quantity && pricing) ? pricing.price * quantity * packagingSize : null
    let error = null


    var dropdownOptions = []
    let currencyCode = offer.price.currency.code || 'USD'

    if (pricingTiers.length > 0) {
      pricingTiers.forEach((tier, i) => {
        let quantityTo = (i + 1) >= pricingTiers.length ? pkgAmount : (tier.quantityFrom > pricingTiers[i + 1].quantityFrom ? tier.quantityFrom : pricingTiers[i + 1].quantityFrom - 1)


        let text = <>
          <FormattedUnit unit='' separator=' - ' value={tier.quantityFrom} /><FormattedUnit unit='' value={quantityTo} />
          <FormattedNumber style='currency' value={tier.price} currency={currencyCode} />
        </>
        dropdownOptions.push({
          key: i,
          value: { quantityFrom: tier.quantityFrom, price: tier.price },
          text
        })
      })
    }
    else {
      let value = offer.pricing.price

      dropdownOptions.push({
        key: 0,
        value: { quantityFrom: 0, price: value },
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

    let canProceed = !warning && pricing



    return (
      <>
        <FlexContent basic>
          <Grid verticalAlign='top'>
            <GridRow className='action' columns={1}>
              <GridColumn>
                <Header>1. Product Information</Header>
              </GridColumn>
            </GridRow>

            <GridRow columns={1}>
              <GridColumn>
                <Header as='h4'>{offer.product.casProduct.casIndexName}</Header>
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}>
                Merchant:
          </GridColumn>
              <GridColumn computer={10}>
                {offer.owner && offer.owner.company.name ? offer.owner.company.name : 'Anonymous'}
              </GridColumn>
            </GridRow>


            <GridRow>
              <GridColumn computer={6}>
                Location:
           </GridColumn>
              <GridColumn computer={10}>
                {offer.locationStr}
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}>
                Available Product:
          </GridColumn>
              <GridColumn computer={10}>
                <FormattedNumber minimumFractionDigits={0} value={pkgAmount} /> {packagingType.name} / <FormattedUnit unit={packagingUnit.nameAbbreviation} separator={' '} value={pkgAmount * packagingSize} />
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

              <GridColumn company={10}>
                <FormattedUnit unit={packagingUnit.nameAbbreviation} separator={' '} value={packagingSize} />  {offer.product.packagingType.name}
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
                <Header>2. Purchase Info</Header>
              </GridColumn>
            </GridRow>


            <GridRow columns={2}>
              <GridColumn>
                Select Quantity
              </GridColumn>

              <GridColumn className='purchase-info'>
                Select Pricing Level
              </GridColumn>
            </GridRow>

            <GridRow stretched columns={2}>
              <GridColumn>
                <Input
                  step={offer.splits}
                  error={!!error}
                  value={this.props.sidebar.quantity}
                  onChange={this.handleQuantity} type='number' />
                {error}
              </GridColumn>
              <GridColumn className='purchase-info'>
                <Dropdown
                  placeholder='Select Price Level'
                  value={this.props.sidebar.pricing}
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
                {(quantity && quantity > 0 ? <> <FormattedNumber minimumFractionDigits={0} value={quantity} /> {`${packagingType.name}`} </> : null)
                  || (isEdit && <> <FormattedNumber minimumFractionDigits={0} value={order.quantity} /> {`${packagingType.name}`} </>)}
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn computer={6}>Price:</GridColumn>
              <GridColumn computer={10}>
                {
                  pricing && !isNaN(pricing.price) ? <><FormattedNumber
                    style='currency'
                    currency={currencyCode}
                    value={pricing && pricing.price} /> / {packagingUnit.nameAbbreviation}</> : null
                }


              </GridColumn>
            </GridRow>
            <Divider />
            <GridRow>
              <GridColumn computer={6}>Subtotal:</GridColumn>
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
                <Button fluid floated='right' onClick={() => this.props.sidebarChanged({ isOpen: false })}>Cancel</Button>
              </GridColumn>

              <GridColumn>
                {!isEdit
                  ? <Button disabled={!canProceed} fluid floated='right' primary onClick={this.createOrder}>
                    Continue
              </Button>
                  : <Button disabled={!canProceed} fluid floated='right' primary onClick={this.editOrder}>
                    Save
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
  // id: number,
  // quantity: number,
  // pricing: object,
  // warning: string
}
