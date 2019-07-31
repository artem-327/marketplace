import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Dropdown, GridRow, GridColumn, Divider } from 'semantic-ui-react';
import ShippingAddress from './ShippingAddress';


class Payment extends Component {

  render() {
    let { payments, selectedAddress } = this.props
    let { formatMessage } = this.props.intl

    return (
      <>
        <GridRow>
          <GridColumn computer={8}>
            <Dropdown
              options={payments}
              fluid
              selection
              placeholder={formatMessage({
                id: 'cart.selectCreditCard',
                defaultMessage: 'Select Credit Card'
              })}
              data-test='cart_purchase_orders_payments_credit_card_drpdn'/>
          </GridColumn>
        </GridRow>

        <Divider />

        <ShippingAddress selectedAddress={selectedAddress} addressOnly={true} header={{ id: 'cart.billingInfo', defaultMessage: 'Billing Info' }} />
      </>
    )
  }
}


export default injectIntl(Payment)

// const Payment = ({dispatch, payments, selectedAddress, selectedPayment, getPayment, intl}) => {
//   //dropdown component requires object with name key
//   const paymentsWithName = payments.map(i => {
//     i.name = `${i.cardType}`;
//     return i;
//   });
//   const { formatMessage } = intl;
//   return (
//     <div className="shopping-cart-items">
//       <header>
//           <h2>
//               <FormattedMessage
//                 id='cart.3payment'
//                 defaultMessage='3. Payment'
//               />
//           </h2>
//       </header>
//       <div className="purchase-order-section">
//         <div className="group-item-wr">
//           <DropdownRedux
//             model="forms.cart.selectedCardId"
//             dispatch={dispatch}
//             opns={paymentsWithName}
//             validators={{required}}
//             onChange={id => getPayment(id)}
//             placeholder={formatMessage({
//                 id: 'cart.selectCreditCard',
//                 defaultMessage: 'Select Credit Card'
//             })}
//           />
//         </div>
//         {(!!Object.keys(selectedPayment).length || !!Object.keys(selectedAddress).length) &&
//         <div className="text-sections">
//           {!!Object.keys(selectedPayment).length &&
//           <div className="text-section">
//               <div className="subtitle">
//                   <FormattedMessage
//                     id='cart.paymentMethod'
//                     defaultMessage='Payment Method'
//                   />
//               </div>
//               <div>xxxx-xxxx-xxxx-{selectedPayment.cardNumber.slice(-4)}</div>
//               <div>{selectedPayment.cardType}</div>
//               <div>Exp: {new Intl.DateTimeFormat('en-GB', {
//                   year: '2-digit',
//                   month: '2-digit'
//               }).format(new Date(selectedPayment.expirationDate))}</div>
//           </div>}
//           {!!Object.keys(selectedAddress).length &&
//           <React.Fragment>
//           <div className="text-section">
//             <div className="subtitle">Billing Info</div>
//             <div>{selectedAddress["first name"]} {selectedAddress["last name"]}</div>
//             <div>{selectedAddress.address.streetAddress}</div>
//             <div>{selectedAddress.address.city}, {selectedAddress.address.province.name}, {selectedAddress.address.zip.zip}</div>
//           </div>
//           </React.Fragment>}
//         </div>}
//       </div>
//     </div>
//   )
// }

// export default injectIntl(Payment);

// Payment.propTypes = {
//   getPayment: PropTypes.func,
//   dispatch: PropTypes.func,
//   selectedPayment: PropTypes.object,
//   selectedAddress: PropTypes.object,
//   payments: PropTypes.array,
// };
