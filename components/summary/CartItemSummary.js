import React, { Component } from 'react'
import { array, string, func } from 'prop-types'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import {Grid, GridRow, GridColumn, Header, Divider, Segment, Icon, Popup, List, Label} from 'semantic-ui-react'

import './styles.scss'
import { RelaxedRow, HeaderTextRow, WiderPopup, CustomSpan, CustomHeader } from './styledComponents'
import { FormattedUnit } from '~/components/formatted-messages'
import { Form, Input, Checkbox } from 'formik-semantic-ui'


class CartItemSummary extends Component {

  state = {
    edittingHazmatInfo: false
  }

  handleHazBtnClick = () => {
    if (!this.state.edittingHazmatInfo) this.setState({ edittingHazmatInfo: true })
    else {
      //save



      this.setState({ edittingHazmatInfo: false })
    }
  }

  hazmatMarkup = (item) => {
    let { intl: { formatMessage } } = this.props
    let { productOffer: { product } } = item

    let initialValues = {
      hazardClass: product.hazardClasses.toString(), // TODO - no data - dunno what's there...
      packaging: product.packagingGroup.groupCode,
      stackable: product.stackable
    }

    let disabled = !this.state.edittingHazmatInfo
    return (
      <Form initialValues={initialValues}>
        <Segment basic>
          <Grid verticalAlign='middle'>
            <GridRow>
              <GridColumn computer={12}>
                <CustomHeader as='h2'>
                  <FormattedMessage id='cart.hazmatInfo' defaultMessage='Hazmat Information' />
                </CustomHeader>
              </GridColumn>

              <GridColumn computer={4}>
                <CustomSpan positive={this.state.edittingHazmatInfo}
                  onClick={this.handleHazBtnClick}
                  data-test='shopping_cart_hazmat'>
                  <FormattedMessage id={`global.${this.state.edittingHazmatInfo ? 'save' : 'edit'}`} />
                </CustomSpan>
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn data-test='shopping_cart_unCode_inp'>
                <Input inputProps={{ disabled }} name='unCode' label={formatMessage({ id: 'cart.unCode', defaultMessage: 'UN Code' })} />
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn data-test='shopping_cart_packagingGroup_inp'>
                <Input inputProps={{ disabled }} name='packaging' label={formatMessage({ id: 'cart.packagingGroup', defaultMessage: 'Packaging Group' })} />
              </GridColumn>
            </GridRow>


            <GridRow>
              <GridColumn data-test='shopping_cart_hazardClass_inp'>
                <Input inputProps={{ disabled }} name='hazardClass' label={formatMessage({ id: 'cart.hazardClass', defaultMessage: 'Hazard Class' })} />
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn data-test='shopping_cart_freightClass_inp'>
                <Input inputProps={{ disabled }} name='freightClass' label={formatMessage({ id: 'cart.freightClass', defaultMessage: 'Freight Class' })} />
              </GridColumn>
            </GridRow>

            <GridRow>
              <GridColumn data-test='shopping_cart_nmfcNumber_inp'>
                <Input inputProps={{ disabled }} name='nmfcNumber' label={formatMessage({ id: 'cart.nmfcNumber', defaultMessage: 'NMFC Number' })} />
              </GridColumn>
            </GridRow>


            <GridRow>
              <GridColumn>
                <Checkbox inputProps={{ disabled, 'data-test': 'shopping_cart_stackable_chckb' }} name='stackable' label={formatMessage({ id: 'cart.stackable', defaultMessage: 'Stackable' })} />
              </GridColumn>
            </GridRow>

          </Grid>
        </Segment>
      </Form>


    )

  }

  casArrayToMultiple = (obj)=> {
    if (!obj || obj.length === 0) return <div></div>
    if (obj.length > 1) {
      let onMouseoverText = obj.map(d => (d.casProduct.casNumber + ' / ' + d.casProduct.chemicalName))
      return (
        <div>
          <Popup
            wide='very'
            data-test='add_cart_product_info_onMouseoverText'
            content={<List items={onMouseoverText} />}
            trigger={<Label><FormattedMessage id='global.multiple' defaultMessage='Multiple' /></Label>}
          />
        </div>
      )
    }
    else {
      return <div> {obj[0].casProduct.casNumber + ' / ' + obj[0].casProduct.chemicalName} </div>
    }
  }

  renderItem = ({ item, lastChild }) => {
    let { productOffer } = item
    let { deleteCart, currency } = this.props

    return (
      <>
        <GridColumn computer={16}>
          <Grid columns={2} className='light-gray cart-item-summary'>
            <HeaderTextRow>
              <GridColumn>
                {productOffer.product.productCode + ' ' + productOffer.product.productName}
              </GridColumn>

              <GridColumn floated='right'>
                <span
                  className='headerAddtext'
                  onClick={() => deleteCart(item.id)}
                  data-test={`shopping_cart_remove_${item.id}_btn`}>
                  <FormattedMessage
                    id='global.remove'
                    defaultMessage='Remove'
                  />
                </span>
              </GridColumn>
            </HeaderTextRow>

            <RelaxedRow >
              <GridColumn>
                <FormattedMessage
                  id='global.CASChemicalName'
                  defaultMessage='CAS # / Chemical name'
                />
              </GridColumn>

              <GridColumn floated='right'>
                {this.casArrayToMultiple(productOffer.product.casProducts)}
              </GridColumn>
            </RelaxedRow>

            <RelaxedRow >
              <GridColumn>
                <FormattedMessage
                  id='global.location'
                  defaultMessage='Location'
                />
              </GridColumn>

              <GridColumn floated='right'>
                {item.locationStr}
              </GridColumn>
            </RelaxedRow>

            <RelaxedRow columns={2}>
              <GridColumn>
                <FormattedMessage id='cart.hazmatInfo' defaultMessage='Hazmat Information' />
              </GridColumn>

              <GridColumn floated='right'>
                <WiderPopup
                  wide
                  onClose={() => this.setState({ edittingHazmatInfo: false })}
                  position='left center'
                  on='click'
                  trigger={
                    <Icon name='info circle' color='blue' />
                  }
                  content={this.hazmatMarkup(item)} />
              </GridColumn>
            </RelaxedRow>



            <RelaxedRow >
              <GridColumn>
                <FormattedMessage
                  id='global.quantity'
                  defaultMessage='Quantity'
                />
              </GridColumn>

              <GridColumn floated='right'>
                <FormattedUnit
                  unit={productOffer.product.packagingType.name}
                  separator=' '
                  value={item.quantity}
                />
              </GridColumn>
            </RelaxedRow>



            <RelaxedRow >
              <GridColumn>
                <FormattedMessage
                  id='global.weight'
                  defaultMessage='Weight'
                />
              </GridColumn>

              <GridColumn floated='right'>
                <FormattedUnit
                  separator=''
                  unit={productOffer.product.packagingUnit.nameAbbreviation}
                  value={item.quantity * productOffer.product.packagingSize}
                />
              </GridColumn>
            </RelaxedRow>


            <RelaxedRow >
              <GridColumn>
                <FormattedMessage
                  id='global.pricePer'
                  values={{ unit: productOffer.product.packagingUnit.nameAbbreviation }}
                />
              </GridColumn>

              <GridColumn floated='right'>
                <FormattedNumber
                  style='currency'
                  currency={currency}
                  id='cart.packs'
                  value={item.pricing.price}
                />
              </GridColumn>
            </RelaxedRow>


            <HeaderTextRow>
              <GridColumn>
                <FormattedMessage
                  id='cart.productTotal'
                  defaultMessage='Product Total'
                />
              </GridColumn>

              <GridColumn floated='right'>
                <FormattedNumber
                  style='currency'
                  currency={currency}
                  value={item.price}
                />
              </GridColumn>
            </HeaderTextRow>

            {!lastChild ? <Divider /> : null}
          </Grid>
        </GridColumn>

      </>
    )

  }

  render() {
    let { cartItems, header } = this.props


    return (
      <Segment>
        <Grid className='bottom-padded'>
          <GridRow className='header'>
            <GridColumn>
              <Header>{header}</Header>
            </GridColumn>
          </GridRow>
          {
            cartItems.map((item, i) => this.renderItem({ item, i, lastChild: (cartItems.length - 1) === i }))
          }

        </Grid>

      </Segment>
    )
  }
}


CartItemSummary.propTypes = {
  cartItems: array,
  deleteCart: func,
  header: string,
  currency: string
}

CartItemSummary.defaultProps = {
  header: <FormattedMessage id='cart.yourOrder' defaultMessage='YOUR ORDER' />,
  currency: 'USD'
}


export default injectIntl(CartItemSummary)