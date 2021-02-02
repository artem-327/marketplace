import { connect } from 'react-redux'
import PurchaseOrder from './PurchaseOrder'
import TmpBoth from './TmpBoth'
import Checkout from './Checkout'
import * as Actions from '../actions'

import { getSafe } from '~/utils/functions'

function mapStateToProps(store) {
  let preferredBankAccountId = getSafe(() => store.cart.identity.company.preferredBankAccountId)
  let { selectedAddress } = store.cart.shipping
  if (selectedAddress) {
    if (selectedAddress.deliveryAddress) var { address } = selectedAddress.deliveryAddress
    else var { address } = selectedAddress
  }
  let taxId =
    getSafe(() => selectedAddress.warehouse, false) &&
    getSafe(() => store.cart.warehouses.length, '') &&
    getSafe(() => selectedAddress.id, '')
      ? getSafe(() => store.cart.warehouses.find(warehouse => warehouse.id === selectedAddress.id).taxId, '')
      : ''

  function getAddressName() {
    if (selectedAddress.addressName) {
      return selectedAddress.addressName
    }
    if (!selectedAddress.addressName && !selectedAddress.deliveryAddress) {
      return selectedAddress.cfName
    }
    if (selectedAddress.deliveryAddress && selectedAddress.deliveryAddress.addressName) {
      return selectedAddress.deliveryAddress.addressName
    }
    if (selectedAddress.deliveryAddress && !selectedAddress.deliveryAddress.addressName) {
      return selectedAddress.deliveryAddress.cfName
    }
    return ''
  }

  return {
    ...store.cart,
    paymentProcessor: getSafe(() => store.auth.identity.company.paymentProcessor, ''),
    selectedAddressId: store.forms.cart.selectedAddressId,
    initialValues: selectedAddress && {
      ...selectedAddress,
      taxId: taxId,
      addressName: getAddressName(),
      address: {
        ...address,
        country: JSON.stringify({ countryId: address.country.id, hasProvinces: address.country.hasProvinces }),
        zip: address.zip.zip,
        province: getSafe(() => address.province.id)
      }
    },
    selectedCardId: store.forms.cart.selectedCardId,
    location: store.location,
    preferredBankAccountId,
    logisticsAccount: getSafe(() => store.auth.identity.company.logisticsAccount, false),
    billingInfo: getSafe(() => store.auth.identity.company.primaryBranch.deliveryAddress, null),
    companyName: getSafe(() => store.auth.identity.company.name, null),
    shippingQuotes: getSafe(() => store.cart.shippingQuotes, {}),
    purchaseHazmatEligible: getSafe(() => store.auth.identity.company.purchaseHazmatEligible),
    cartItems: getSafe(() => store.cart.cart.cartItems, []),
    isOpenSidebar: getSafe(() => store.cart.isOpenSidebar, false)
  }
}

export default connect(mapStateToProps, Actions)(TmpBoth)
