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
    'first name': 'FirstName',
    'last name': 'LastName',
    address: 'TestAddress',
    city: 'CityName',
    location: {id: 2, country: 'USA', state: 'Dallas'},
    zipCode: '97 201',
    email: 'mail@mail.com',
    'phone number': '721 584 362'
  }
]

const Shipping = ({deliveryAddresses, dispatch, getAddress}) => {
  return (
    <CartItem headerTitle="1. Shipping">
      <div className="purchase-order-section">
        <div className="group-item-wr">
          <label> Shipping Address</label>
          <DropdownRedux
            model="forms.cart.selectedAddressId"
            dispatch={dispatch}
            opns={mockAddress}
            validators={{required}}
            onChange={id => getAddress(id)}
            placeholder="Select Location"
          />
        </div>
      </div>
    </CartItem>
  )
}

export default Shipping

Shipping.propTypes = {
  deliveryAddresses: PropTypes.array,
  dispatch: PropTypes.func
}
