import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'

import { Grid, Segment, GridRow, GridColumn, Dropdown, Divider, Header } from 'semantic-ui-react'
import ShippingAddress from './ShippingAddress'


class Shipping extends Component {
  render() {
    let { deliveryAddresses, getAddress, selectedAddress, intl } = this.props

    let dropdownOptions = deliveryAddresses.map(i => ({
      text: `${i.address.streetAddress}, ${i.address.city}`,
      value: i.id,
      key: i.id
    }))

    const { formatMessage } = intl

    
    return (
      <Segment>
        <Grid className='bottom-padded'>
          <GridRow columns={2} className='header'>
            <GridColumn>
              <Header as='h2'>
                <FormattedMessage
                  id='cart.1shipping'
                  defaultMessage='1. Shipping'
                />
              </Header>

            </GridColumn>

            <GridColumn floated='right'>
              <span
                className="headerAddtext"
                onClick={() => this.props.shippingChanged({ isShippingEdit: true, isNewAddress: !!selectedAddress })}>
                <FormattedMessage
                  id='global.edit'
                  defaultMessage='Edit'
                />
              </span>
            </GridColumn>
          </GridRow>
          <GridRow>
            <GridColumn computer={8}>
              <Dropdown
                fluid
                selection
                options={dropdownOptions}
                onChange={(e, { value }) => getAddress(value)}
                value={selectedAddress ? selectedAddress.id : null}
                placeholder={formatMessage({
                  id: 'global.selectLocation',
                  defaultMessage: 'Select Location'
                })}
              />
            </GridColumn>
          </GridRow>
          <Divider />
          <ShippingAddress selectedAddress={selectedAddress} />
        </Grid>
      </Segment>

    )

  }
}

// const Shipping = ({deliveryAddresses, dispatch, getAddress, selectedAddress, toggleShippingEdit, intl}) => {
//   //dropdown component requires object with name key
//   const deliveryAddressesWithName = deliveryAddresses.map(i => {
//     i.name = `${i.address.streetAddress}, ${i.address.city}`;
//     return i;
//   });
//   const { formatMessage } = intl;
//   return (
//     <div className="shopping-cart-items">
//       <header>
//           <h2>
//               <FormattedMessage
//                 id='cart.1shipping'
//                 defaultMessage='1. Shipping'
//               />
//               <span
//                   className="headerAddtext"
//                   onClick={toggleShippingEdit}>
//                     <FormattedMessage
//                         id='global.edit'
//                         defaultMessage='Edit'
//                     />
//               </span>
//           </h2>
//       </header>
//       <div className="purchase-order-section">
//         <div className="group-item-wr">
//           <DropdownRedux
//             model="forms.cart.selectedAddressId"
//             dispatch={dispatch}
//             opns={deliveryAddressesWithName}
//             validators={{required}}
//             onChange={id => getAddress(id)}
//             placeholder={formatMessage({
//                 id: 'global.selectLocation',
//                 defaultMessage: 'Select Location'
//             })}
//           />
//         </div>
//         {!!Object.keys(selectedAddress).length && <div className="text-section">
//           <div className="subtitle">
//               <FormattedMessage
//                   id='cart.shippingAddress'
//                   defaultMessage='Shipping Address'
//               />
//           </div>
//           <div>{selectedAddress["first name"]} {selectedAddress["last name"]}</div>
//           <div>{selectedAddress.address.streetAddress}</div>
//           <div>{selectedAddress.address.city}, {selectedAddress.address.province.name}, {selectedAddress.address.zip.zip}</div>
//           <div>{selectedAddress["phone number"]}</div>
//           <div>{selectedAddress.email}</div>
//         </div>}
//       </div>
//       </div>
//   )
// };

export default injectIntl(Shipping);

Shipping.propTypes = {
  deliveryAddresses: PropTypes.array,
  dispatch: PropTypes.func,
  getAddress: PropTypes.func,
  selectedAddress: PropTypes.object,
  toggleShippingEdit: PropTypes.func
}
