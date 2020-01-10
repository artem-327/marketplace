import { connect } from 'react-redux'
import PurchaseOrder from './PurchaseOrder'
import * as Actions from '../actions'

import { getSafe } from '~/utils/functions'

function mapStateToProps(store) {
  let preferredBankAccountId = getSafe(() => store.cart.identity.company.preferredBankAccountId)
  let { selectedAddress } = store.cart.shipping
  if (selectedAddress) {
    if (selectedAddress.deliveryAddress) var { address } = selectedAddress.deliveryAddress
    else var { address } = selectedAddress
  }

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
    selectedAddressId: store.forms.cart.selectedAddressId,
    initialValues: selectedAddress && {
      ...selectedAddress,
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
    companyName: getSafe(() => store.auth.identity.company.name, null)
  }
}

export default connect(mapStateToProps, Actions)(PurchaseOrder)
