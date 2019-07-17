import { connect } from 'react-redux'
import PurchaseOrder from './PurchaseOrder'
import * as Actions from '../actions'

import { getSafe } from '~/utils/functions'

function mapStateToProps(store) {
  let preferredBankAccountId = getSafe(() => store.auth.identity.company.preferredBankAccountId)
  let { selectedAddress } = store.cart.shipping
  if (selectedAddress) var { address } = selectedAddress
  return {
    ...store.cart,
    selectedAddressId: store.forms.cart.selectedAddressId,
    initialValues: selectedAddress && {
      ...selectedAddress,
      address: {
        ...address,
        country: JSON.stringify({ countryId: address.country.id, hasProvinces: address.country.hasProvinces }),
        zip: address.zip.zip,
        province: getSafe(() => address.province.id)
      }
    },
    selectedCardId: store.forms.cart.selectedCardId,
    location: store.location,
    preferredBankAccountId
  }
}

export default connect(mapStateToProps, Actions)(PurchaseOrder)