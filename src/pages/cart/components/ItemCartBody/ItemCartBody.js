import React, { Component } from 'react'
import { object, func } from 'prop-types'
import confirm from '../../../../components/Confirmable/confirm'
import { FormattedMessage, FormattedNumber } from 'react-intl'

import { Button, Grid, GridRow, GridColumn } from 'semantic-ui-react'
import { FormattedAssay } from '~/components/formatted-messages'
import { currency } from '~/constants/index'
import moment from 'moment/moment'
import { getSafe } from '~/utils/functions'
import styled from 'styled-components'
import { FormattedUnit } from '~/components/formatted-messages'
import { getLocaleDateFormat } from '~/components/date-format'

const CapitalizedText = styled.span`
  text-transform: capitalize;
`

export default class ItemCartBody extends Component {
  render() {
    let { cartItem, deleteCartItem, casNumberChemName } = this.props
    let { productOffer } = cartItem

    const packagingType = getSafe(() => productOffer.companyProduct.packagingType.name, '')
    const unitName = getSafe(() => productOffer.companyProduct.packagingUnit.nameAbbreviation, '')
    const packagingSize = getSafe(() => productOffer.companyProduct.packagingSize, 0)
    const pkgAmount = getSafe(() => cartItem.pkgAmount, 0)

    const leftWidth1 = 5
    const rightWidth1 = 11
    const leftWidth2 = 6
    const rightWidth2 = 10

    return (
      <div className='item-cart'>
        <Grid className='item-cart-body'>
          <GridColumn width={9}>
            <div className='item-cart-body-section'>
              <GridRow className='item-cart-body-section-name'>{productOffer.companyProduct.echoProduct.name}</GridRow>
              <Grid columns={2}>
                <GridColumn width={leftWidth1}>
                  <FormattedMessage id='cart.packaging' defaultMessage='Packaging:' />
                </GridColumn>
                <GridColumn width={rightWidth1}>
                  <>
                    <FormattedNumber minimumFractionDigits={0} value={packagingSize} />
                    {` ${unitName} `}
                    <CapitalizedText>{packagingType}</CapitalizedText>{' '}
                  </>
                </GridColumn>

                <GridColumn width={leftWidth1}>
                  <FormattedMessage id='cart.numOfPackages' defaultMessage='# of Packages:' />
                </GridColumn>
                <GridColumn width={rightWidth1}>
                  <FormattedNumber minimumFractionDigits={0} value={pkgAmount} />
                </GridColumn>

                <GridColumn width={leftWidth1}>
                  <FormattedMessage id='cart.totalQuantity' defaultMessage='Total Quantity:' />
                </GridColumn>
                <GridColumn width={rightWidth1}>
                  <>
                    <FormattedNumber minimumFractionDigits={0} value={pkgAmount * packagingSize} />
                    {unitName && ` ${unitName}`}
                  </>
                </GridColumn>

                <GridColumn width={leftWidth1}>
                  <FormattedMessage id='cart.fobPrice' defaultMessage='FOB Price:' />
                </GridColumn>
                <GridColumn width={rightWidth1}>
                  <>
                    <FormattedNumber
                      id='cart.fobPrice'
                      style='currency'
                      currency={currency}
                      value={cartItem.cfPricePerUOM}
                    />
                    {unitName && ` / ${unitName}`}
                  </>
                </GridColumn>

                <GridColumn width={leftWidth1}>
                  <FormattedMessage id='cart.totalPerItem' defaultMessage='Total per Item:' />
                </GridColumn>
                <GridColumn width={rightWidth1}>
                  <FormattedNumber
                    id='cart.totalPerItem'
                    style='currency'
                    currency={currency}
                    value={cartItem.cfPriceSubtotal}
                  />
                </GridColumn>
              </Grid>
            </div>
          </GridColumn>
          <GridColumn width={7}>
            <div className='item-cart-body-section'>
              <Grid columns={2}>
                <GridRow />
                <GridColumn width={leftWidth2}>
                  <FormattedMessage id='cart.manufacturer' defaultMessage='Manufacturer:' />
                </GridColumn>
                <GridColumn width={rightWidth2}>
                  {getSafe(() => productOffer.companyProduct.echoProduct.manufacturer.name, '')}
                </GridColumn>

                <GridColumn width={leftWidth2}>
                  <FormattedMessage id='cart.origin' defaultMessage='Origin:' />
                </GridColumn>
                <GridColumn width={rightWidth2}>{productOffer.origin ? productOffer.origin.name : 'N/A'}</GridColumn>

                <GridColumn width={leftWidth2}>
                  <FormattedMessage id='cart.location' defaultMessage='Location:' />
                </GridColumn>
                <GridColumn width={rightWidth2}>{cartItem.locationStr ? cartItem.locationStr : 'N/A'}</GridColumn>

                <GridColumn width={leftWidth2}>
                  <FormattedMessage id='cart.expiration' defaultMessage='Expiration:' />
                </GridColumn>
                <GridColumn width={rightWidth2}>
                  {productOffer && productOffer.lotExpirationDate
                    ? moment(productOffer.lotExpirationDate).format(getLocaleDateFormat())
                    : 'N/A'}
                </GridColumn>

                <GridColumn width={leftWidth2}>
                  <FormattedMessage id='cart.productForm' defaultMessage='Form:' />
                </GridColumn>
                <GridColumn width={rightWidth2}>{productOffer.form ? productOffer.form.name : 'N/A'}</GridColumn>

                <GridColumn width={leftWidth2}>
                  <FormattedMessage id='cart.condition' defaultMessage='Condition:' />
                </GridColumn>
                <GridColumn width={rightWidth2}>
                  {productOffer.conforming ? (
                    <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
                  ) : (
                    <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
                  )}
                </GridColumn>

                {productOffer.companyProduct.conditionNotes && (
                  <>
                    <GridColumn width={leftWidth2}>
                      <FormattedMessage id='cart.conditionNotes' defaultMessage='Condition Notes:' />
                    </GridColumn>
                    <GridColumn width={rightWidth2}>{productOffer.companyProduct.conditionNotes}</GridColumn>
                  </>
                )}
              </Grid>
            </div>
          </GridColumn>
        </Grid>

        <footer className='popup-footer'>
          <Button
            control={Button}
            basic
            primary
            onClick={() =>
              confirm('Remove item', 'Are you sure you want to remove item from Shopping Cart?').then(
                () => {
                  // `proceed`
                  // remove Edit Cart popup if opened currently deleted offer
                  deleteCartItem(cartItem.id)
                },
                result => {
                  // `cancel`
                }
              )
            }
            data-test='item_cart_remove_btn'>
            <FormattedMessage id='global.remove' defaultMessage='Remove'>
              {text => text}
            </FormattedMessage>
          </Button>
          <Button control={Button} primary onClick={() => this.props.editCart(cartItem)} data-test='item_cart_edit_btn'>
            <FormattedMessage id='global.edit' defaultMessage='Edit'>
              {text => text}
            </FormattedMessage>
          </Button>
        </footer>
      </div>
    )
  }
}

ItemCartBody.propTypes = {
  cartItem: object,
  editCart: func,
  deleteCartItem: func,
  casNumberChemName: object
}
