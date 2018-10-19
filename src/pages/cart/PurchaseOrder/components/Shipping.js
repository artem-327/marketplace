import React from 'react'
import PropTypes from 'prop-types'
import DropdownRedux from '../../../../components/Dropdown/DropdownRedux'
import {required} from '../../../../utils/validation'

const Shipping = ({deliveryAddresses, dispatch, getAddress, selectedAddress, toggleShippingEdit}) => {
  //dropdown component requires object with name key
  const deliveryAddressesWithName = deliveryAddresses.map(i => {
    i.name = `${i.address.streetAddress}, ${i.address.city}`;
    return i;
  })
  return (
    <div className="shopping-cart-items">
      <header><h1>1. Shipping<span className="headerAddtext" onClick={toggleShippingEdit}>edit</span></h1></header>
      <div className="purchase-order-section">
        <div className="group-item-wr">
          <DropdownRedux
            model="forms.cart.selectedAddressId"
            dispatch={dispatch}
            opns={deliveryAddressesWithName}
            validators={{required}}
            onChange={id => getAddress(id)}
            placeholder="Select Location"
          />
        </div>
        {!!Object.keys(selectedAddress).length && <div className="text-section">
          <div><b>Shipping address</b></div>
          <div>{selectedAddress["first name"]} {selectedAddress["last name"]}</div>
          <div>{selectedAddress.address.streetAddress}</div>
          <div>{selectedAddress.address.city}, {selectedAddress.address.province.name}, {selectedAddress.address.zip.zip}</div>
          <div>{selectedAddress["phone number"]}</div>
          <div>{selectedAddress.email}</div>
        </div>}
      </div>
      </div>
  )
}

export default Shipping

Shipping.propTypes = {
  deliveryAddresses: PropTypes.array,
  dispatch: PropTypes.func,
  getAddress: PropTypes.func,
  selectedAddress: PropTypes.object,
  toggleShippingEdit: PropTypes.func
}
