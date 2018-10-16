import React from 'react'
import PropTypes from 'prop-types'
import CartItem from '../../components/CartItem/CartItem'
import DropdownRedux from '../../../../components/Dropdown/DropdownRedux'
import {required} from '../../../../utils/validation'

//there is no name in real data!
const mockCreditCards = [
  {
    id: 5,
    name: 'kreditka1',
  }
]

const Payment = ({dispatch, selectedAddress}) => {
  return (
    <CartItem headerTitle="2. Payment">
      <div className="purchase-order-section">
        <div className="group-item-wr">
          <DropdownRedux
            model="forms.cart.selectedCardId"
            dispatch={dispatch}
            opns={mockCreditCards}
            validators={{required}}
            onChange={id => console.log(id)}
            placeholder="Select Credit Card"
          />
        </div>
        <div  className="text-section">
            <div>Payment Method</div>
            <div>--- --- Exp: ---</div>
            <div>Billing Info</div>
        </div>
        {!!Object.keys(selectedAddress).length && <div className="text-section">
          <div>{selectedAddress.firstName} {selectedAddress.lastName}</div>
          <div>{selectedAddress.address}</div>
          <div>{selectedAddress.city}, {selectedAddress.zipCode}</div>
        </div>}
      </div>
    </CartItem>
  )
}

export default Payment

Payment.propTypes = {
  dispatch: PropTypes.func,
  selectedAddress: PropTypes.object,
}
