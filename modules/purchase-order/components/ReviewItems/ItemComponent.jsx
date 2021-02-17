/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, FormattedNumber } from 'react-intl'
import { getSafe, getPrice, uniqueArrayByKey } from '~/utils/functions'
import { currency } from '~/constants/index'
import { Dropdown, Input } from 'formik-semantic-ui-fixed-validation'

//Components
import { GridColumn, GridRow } from 'semantic-ui-react'
import ShippingInformation from '../ShippingInformation/ShippingInformation'

// Styles
import { DivSectionName, DivSectionDescription } from '../Checkout.styles'

import {
  GridItemDetail,
  GridColumnLeftDivider,
  GridRowHeader,
  IconTrash2,
  DivHeader,
  GridColumnLessPadding,
  DivDropdownQuantityWrapper
} from './ItemComponent.styles'

// Constants
import { OPTIONS_QUANTITY, CART_ITEM_TYPES } from './ItemComponent.constants'

// Services
import { deleteCart } from './ItemComponent.services'

import ErrorFocus from '../../../../components/error-focus'

const ItemComponent = props => {
  const { onClickDelete, onValueChange, value, index, item } = props

  const pkgAmount = item.pkgAmount
  const pricePerUOM = getPrice(pkgAmount, item.productOffer.pricingTiers)

  let allOptions = value ? OPTIONS_QUANTITY.concat([{ key: value, text: value.toString(), value }]) : OPTIONS_QUANTITY
  allOptions = uniqueArrayByKey(allOptions, 'text')

  return (
    <GridItemDetail verticalAlign='middle'>
      <GridRowHeader>
        <DivHeader>{item.productName}</DivHeader>
        <IconTrash2
          size='18'
          onClick={async () => {
            const result = await deleteCart(item.id, props)
            if (result) onClickDelete(item.id)
          }}
        />
      </GridRowHeader>
      <GridRow>
        <GridColumn width={3}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.packaging' defaultMessage='Packaging' />
          </DivSectionDescription>
        </GridColumn>
        <GridColumn width={5}>
          <DivSectionName>{`${item.packagingSize} ${item.packaging}`}</DivSectionName>
        </GridColumn>
        <GridColumnLeftDivider width={4}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.location' defaultMessage='Location' />
          </DivSectionDescription>
        </GridColumnLeftDivider>
        <GridColumn width={4}>
          <DivSectionName>{item.locationStr}</DivSectionName>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={3}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.price' defaultMessage='Price' />
          </DivSectionDescription>
        </GridColumn>
        <GridColumn width={5}>
          <DivSectionName>
            <FormattedNumber
              minimumFractionDigits={2}
              maximumFractionDigits={2}
              style='currency'
              currency={currency}
              value={pkgAmount * pricePerUOM * item.packagingSize}
            />
            {' ('}
            <FormattedNumber
              minimumFractionDigits={3}
              maximumFractionDigits={3}
              style='currency'
              currency={currency}
              value={pricePerUOM}
            />
            {`/${props.packageWeightUnit})`}
          </DivSectionName>
        </GridColumn>
        <GridColumnLeftDivider width={4}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.shippingInformation' defaultMessage='Shipping Information' />
          </DivSectionDescription>
        </GridColumnLeftDivider>
        <GridColumn width={4}>
          <DivSectionName>
            <ShippingInformation {...props} item={item} />
          </DivSectionName>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={3}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.quantity' defaultMessage='Quantity' />
          </DivSectionDescription>
        </GridColumn>
        <GridColumnLessPadding width={5}>
          <DivSectionName>
            <DivDropdownQuantityWrapper>
              {parseInt(value) < 9 ? (
                <Dropdown
                  name={`items[${index}].quantity`}
                  selection
                  inputProps={{
                    search: true,
                    onSearchChange: (_, { searchQuery }) => onValueChange(searchQuery),
                    onChange: (_, { value }) => onValueChange(value),
                    disabled:
                      item.cartItemType === CART_ITEM_TYPES.INVENTORY_HOLD ||
                      item.cartItemType === CART_ITEM_TYPES.PURCHASE_REQUEST_OFFER ||
                      item.cartItemType === CART_ITEM_TYPES.PRODUCT_OFFER_BID
                  }}
                  options={allOptions}
                />
              ) : (
                <Input
                  name={`items[${index}].quantity`}
                  selection
                  inputProps={{
                    onChange: (_, { value }) => onValueChange(value),
                    disabled:
                      item.cartItemType === CART_ITEM_TYPES.INVENTORY_HOLD ||
                      item.cartItemType === CART_ITEM_TYPES.PURCHASE_REQUEST_OFFER ||
                      item.cartItemType === CART_ITEM_TYPES.PRODUCT_OFFER_BID
                  }}
                />
              )}
            </DivDropdownQuantityWrapper>
          </DivSectionName>
        </GridColumnLessPadding>
        <GridColumnLeftDivider width={4}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.leadTime' defaultMessage='Lead Time' />
          </DivSectionDescription>
        </GridColumnLeftDivider>
        <GridColumn width={4}>
          <DivSectionName>
            <FormattedMessage
              id='checkout.reviewItems.days'
              defaultMessage={`${props.leadTime} days`}
              values={{ days: props.leadTime }}
            />
          </DivSectionName>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={3}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.grossWeight' defaultMessage='grossWeight' />
          </DivSectionDescription>
        </GridColumn>
        <GridColumn width={5}>
          <DivSectionName>
            <FormattedNumber
              minimumFractionDigits={0}
              maximumFractionDigits={2}
              value={props.packageWeight * item.packagingSize}
            />
            {props.packageWeightUnit}
          </DivSectionName>
        </GridColumn>
        <GridColumnLeftDivider width={4}>
          <DivSectionDescription>
            <FormattedMessage id='checkout.reviewItems.paymentTerms' defaultMessage='Payment Terms' />
          </DivSectionDescription>
        </GridColumnLeftDivider>
        <GridColumn width={4}>
          <DivSectionName>{props.cfPaymentTerms}</DivSectionName>
        </GridColumn>
      </GridRow>
    </GridItemDetail>
  )
}

ItemComponent.propTypes = {}

ItemComponent.defaultProps = {}

function mapStateToProps(store, { item }) {
  return {
    minPkg: getSafe(() => item.productOffer.minPkg, 1),
    splitPkg: getSafe(() => item.productOffer.splitPkg, 1),
    leadTime: getSafe(() => item.productOffer.leadTime, ''),
    packageWeightUnit: getSafe(() => item.productOffer.companyProduct.packageWeightUnit.nameAbbreviation, ''),
    packageWeight: getSafe(() => item.productOffer.companyProduct.packageWeight, 0),
    cfPaymentTerms: getSafe(() => item.productOffer.cfPaymentTerms, ''),
    cartItemType: getSafe(() => item.cartItemType, '')
  }
}

export default injectIntl(connect(mapStateToProps, {})(ItemComponent))
