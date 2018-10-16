import React from 'react'
import PropTypes from 'prop-types'
import CartItem from '../../components/CartItem/CartItem'
import DropdownRedux from '../../../../components/Dropdown/DropdownRedux'
import {required} from '../../../../utils/validation'

//there is no name in real data!
const mockAddress = [
  {
    id: 5,
    name: 'adresa1',
    firstName: 'FirstName',
    lastName: 'LastName',
    address: 'TestAddress',
    city: 'CityName',
    location: {id: 2, country: 'USA', state: 'Dallas'},
    zipCode: '97 201',
    email: 'mail@mail.com',
    phoneNumber: '721 584 362'
  }
]

const Shipping = ({deliveryAddresses, dispatch, getAddress, selectedAddress}) => {
  return (
    <CartItem headerTitle="1. Shipping">
      <div className="purchase-order-section">
        <div className="group-item-wr">
          <DropdownRedux
            model="forms.cart.selectedAddressId"
            dispatch={dispatch}
            opns={mockAddress}
            validators={{required}}
            onChange={id => getAddress(id)}
            placeholder="Select Location"
          />
        </div>
        {!!Object.keys(selectedAddress).length && <div className="text-section">
          <div><b>Shipping address</b></div>
          <div>{selectedAddress.firstName} {selectedAddress.lastName}</div>
          <div>{selectedAddress.address}</div>
          <div>{selectedAddress.city}, {selectedAddress.zipCode}</div>
          <div>{selectedAddress.phoneNumber}</div>
        </div>}
      </div>
    </CartItem>
  )
}

export default Shipping

Shipping.propTypes = {
  deliveryAddresses: PropTypes.array,
  dispatch: PropTypes.func,
  getAddress: PropTypes.func,
  selectedAddress: PropTypes.object,
}
