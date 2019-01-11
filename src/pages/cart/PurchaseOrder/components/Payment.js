import React from 'react'
import PropTypes from 'prop-types'
import DropdownRedux from '../../../../components/Dropdown/DropdownRedux'
import {required} from '../../../../utils/validation'

const Payment = ({dispatch, payments, selectedAddress, selectedPayment, getPayment}) => {
  //dropdown component requires object with name key
  const paymentsWithName = payments.map(i => {
    i.name = `${i.cardType}`;
    return i;
  })
  return (
    <div className="shopping-cart-items">
      <header><h2>3. Payment</h2></header>
      <div className="purchase-order-section">
        <div className="group-item-wr">
          <DropdownRedux
            model="forms.cart.selectedCardId"
            dispatch={dispatch}
            opns={paymentsWithName}
            validators={{required}}
            onChange={id => getPayment(id)}
            placeholder="Select Credit Card"
          />
        </div>
        {(!!Object.keys(selectedPayment).length || !!Object.keys(selectedAddress).length) &&
        <div className="text-sections">
          {!!Object.keys(selectedPayment).length &&
          <div className="text-section">
              <div className="subtitle">Payment Method</div>
              <div>xxxx-xxxx-xxxx-{selectedPayment.cardNumber.slice(-4)}</div>
              <div>{selectedPayment.cardType}</div>
              <div>Exp: {new Intl.DateTimeFormat('en-GB', {
                  year: '2-digit',
                  month: '2-digit'
              }).format(new Date(selectedPayment.expirationDate))}</div>
          </div>}
          {!!Object.keys(selectedAddress).length &&
          <React.Fragment>
          <div className="text-section">
            <div className="subtitle">Billing Info</div>
            <div>{selectedAddress["first name"]} {selectedAddress["last name"]}</div>
            <div>{selectedAddress.address.streetAddress}</div>
            <div>{selectedAddress.address.city}, {selectedAddress.address.province.name}, {selectedAddress.address.zip.zip}</div>
          </div>
          </React.Fragment>}
        </div>}
      </div>
    </div>
  )
}

export default Payment

Payment.propTypes = {
  getPayment: PropTypes.func,
  dispatch: PropTypes.func,
  selectedPayment: PropTypes.object,
  selectedAddress: PropTypes.object,
  payments: PropTypes.array,
}
