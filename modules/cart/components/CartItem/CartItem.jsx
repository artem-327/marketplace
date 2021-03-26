/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { GridColumn, GridRow } from 'semantic-ui-react'
import moment from 'moment'
import confirm from '~/components/Confirmable/confirm'
import { currency } from '~/constants/index'
import { getLocaleDateFormat } from '~/components/date-format'

// Styles
import {
  CapitalizedText,
  CustomHeader,
  ItemDescriptionGrid,
  Item,
  DescriptionValue,
  GridStyled,
  StyledGridRow,
  DivIconsWrapper,
  DivIconRectangle,
  IconTrash2,
  IconEdit2
} from '../StyledComponents'

// Services
import { sidebarChanged, getProductOffer, deleteCartItem } from '../../../purchase-order/actions'

// Constants
import { CART_ITEM_TYPES } from './CartItem.constants'

const CartItem = props => {
  const {
    intl: { formatMessage },
    cart,
    deleteCartItem,
    item,
    index
  } = props

  const packagingType = getSafe(() => item.productOffer.companyProduct.packagingType.name, '')
  const unitName = getSafe(() => item.productOffer.companyProduct.packagingUnit.nameAbbreviation, '')
  const packagingSize = getSafe(() => item.productOffer.companyProduct.packagingSize, 0)
  const pkgAmount = getSafe(() => item.pkgAmount, 0)

  const editCart = cartItem => {
    let { id, pkgAmount } = cartItem
    props.getProductOffer(cartItem?.productOffer?.id, cartItem?.productOffer?.sellerId, true)
    props.sidebarChanged({ isOpen: true, id, pkgAmount })
  }

  const editDisabled =
    item.cartItemType === CART_ITEM_TYPES.INVENTORY_HOLD ||
    item.cartItemType === CART_ITEM_TYPES.PURCHASE_REQUEST_OFFER ||
    item.cartItemType === CART_ITEM_TYPES.PRODUCT_OFFER_BID

  return (
    <Item key={index} bottomshadow={index !== cart.cartItems.length - 1}>
      <GridStyled>
        <StyledGridRow padding='11px 0 7px'>
          <GridColumn largeScreen={8}>
            <CustomHeader>{item.productOffer.companyProduct.companyGenericProduct.name}</CustomHeader>
            <FormattedMessage id='cart.manufacturer' defaultMessage='Manufacturer:' />{' '}
            {getSafe(() => item.productOffer.companyProduct.companyGenericProduct.manufacturer.name, '')}
          </GridColumn>
          <GridColumn textAlign='right' largeScreen={8}>
            <DivIconsWrapper>
              <DivIconRectangle>
                <IconTrash2
                  onClick={() =>
                    confirm('Remove item', 'Are you sure you want to remove item from Shopping Cart?').then(() =>
                      deleteCartItem(item.id)
                    )
                  }
                />
              </DivIconRectangle>
              <DivIconRectangle disabled={editDisabled}>
                <IconEdit2 disabled={editDisabled} onClick={() => (editDisabled ? {} : editCart(item))} />
              </DivIconRectangle>
            </DivIconsWrapper>
          </GridColumn>
        </StyledGridRow>
      </GridStyled>
      <ItemDescriptionGrid columns={2} divided>
        <GridRow>
          <GridColumn>
            <FormattedMessage id='cart.packaging' defaultMessage='Packaging:' />{' '}
            <DescriptionValue>
              <FormattedNumber minimumFractionDigits={0} value={packagingSize} /> {unitName} &nbsp;
              <CapitalizedText>{packagingType}</CapitalizedText>
            </DescriptionValue>
          </GridColumn>
          <GridColumn>
            <FormattedMessage id='cart.origin' defaultMessage='Origin:' />{' '}
            <DescriptionValue>{getSafe(() => item.productOffer.origin.name, 'N/A')}</DescriptionValue>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <FormattedMessage id='cart.numOfPackages' defaultMessage='# of Packages:' />{' '}
            <DescriptionValue>
              <FormattedNumber minimumFractionDigits={0} value={pkgAmount} />
            </DescriptionValue>
          </GridColumn>

          <GridColumn>
            <FormattedMessage id='cart.location' defaultMessage='Location:' />{' '}
            <DescriptionValue>{getSafe(() => item.locationStr, 'N/A')}</DescriptionValue>
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn>
            <FormattedMessage id='cart.totalQuantity' defaultMessage='Total Quantity:' />{' '}
            <DescriptionValue>
              <FormattedNumber minimumFractionDigits={0} value={pkgAmount * packagingSize} />
              {unitName && ` ${unitName}`}
            </DescriptionValue>
          </GridColumn>

          <GridColumn>
            <FormattedMessage id='cart.expiration' defaultMessage='Expiration:' />{' '}
            <DescriptionValue>
              {item.productOffer && item.productOffer.lotExpirationDate
                ? moment(item.productOffer.lotExpirationDate).format(getLocaleDateFormat())
                : 'N/A'}
            </DescriptionValue>
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn>
            <FormattedMessage id='cart.fobPrice' defaultMessage='FOB Price:' />{' '}
            <DescriptionValue>
              <FormattedNumber id='cart.fobPrice' style='currency' currency={currency} value={item.cfPricePerUOM} />
              {unitName && ` / ${unitName}`}
            </DescriptionValue>
          </GridColumn>
          <GridColumn>
            <FormattedMessage id='cart.productForm' defaultMessage='Form:' />{' '}
            <DescriptionValue>{getSafe(() => item.productOffer.form.name, 'N/A')}</DescriptionValue>
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn>
            <FormattedMessage id='cart.totalPerItem' defaultMessage='Total per Item:' />{' '}
            <DescriptionValue>
              <FormattedNumber
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                id='cart.totalPerItem'
                style='currency'
                currency={currency}
                value={item.cfPriceSubtotal}
              />
            </DescriptionValue>
          </GridColumn>

          <GridColumn>
            <FormattedMessage id='cart.condition' defaultMessage='Condition:' />{' '}
            <DescriptionValue>
              {item.productOffer.conforming ? (
                <FormattedMessage id='global.conforming' defaultMessage='Conforming' />
              ) : (
                <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />
              )}
            </DescriptionValue>
          </GridColumn>
        </GridRow>
      </ItemDescriptionGrid>
    </Item>
  )
}

function mapStateToProps(store) {
  return {}
}

export default injectIntl(connect(mapStateToProps, { sidebarChanged, getProductOffer, deleteCartItem })(CartItem))
