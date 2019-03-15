import React from 'react'
import PropTypes from 'prop-types'
import "./ShippingEdit.scss"
import Button from '../../../../components/Button/Button'
import {FormInput /*, FormSelect*/} from '../../../../components/Form/FormInput'
import Radio from "../../../../components/Radio/Radio";
import { Form } from 'react-redux-form';
import { FormattedMessage, injectIntl } from 'react-intl';

const ShippingEdit = ({ toggleShippingEdit, isNewAddress, handleIsEdit, selectedAddress, postNewDeliveryAddress, putDeliveryAddressEdit, intl }) => {
  const radioOptions = [
      {
          value:"isEdit",
          label:'Saved Address'
      },
      {
          value:"isNew",
          label:'Add New Address'
      }
  ];
  const { formatMessage } = intl;
  return (
    <div className="shopping-cart-items">
      <header>
          <h1>
              <FormattedMessage
                id='cart.1shipping'
                defaultMessage='1. Shipping'
              />
          </h1>
      </header>
      <div className="purchase-order-section">
      <Radio onChange={value => handleIsEdit(value)}
          name='isNewAddress'
          className='br-config-radio'
          opns={radioOptions}
          checked={isNewAddress}
          disabled={!Object.keys(selectedAddress).length}
      />
        {/* TODO: send id instead of string to province - waiting for backend endpoint */}
        {/* TODO: which fields are required? */}
        <Form
            model="forms.shippingEdit"
            onSubmit={values =>
                isNewAddress === "isNew" ?
                    postNewDeliveryAddress(values)
                    : putDeliveryAddressEdit({id: selectedAddress.id, ...values})
            }
            className="shipping-edit">
          <FormInput
              name=".firstName"
              label={formatMessage({
                  id: 'global.firstName',
                  defaultMessage: 'First Name'
              })}
          />
          <FormInput
              name=".lastName"
              label={formatMessage({
                  id: 'global.lastName',
                  defaultMessage: 'Last Name'
              })}
          />
          <FormInput
              name=".address.streetAddress"
              label={formatMessage({
                  id: 'global.address',
                  defaultMessage: 'Address'
              })}
          />
          <FormInput
              name=".address.city"
              label={formatMessage({
                  id: 'global.city',
                  defaultMessage: 'City'
              })}
          />
          <FormInput
              name=".address.province"
              label={formatMessage({
                  id: 'global.state',
                  defaultMessage: 'State'
              })}
          />
          <FormInput
              name=".zipCode"
              label={formatMessage({
                  id: 'global.postalCode',
                  defaultMessage: 'Postal Code'
              })}
          />
          <FormInput
              name=".email"
              label={formatMessage({
                  id: 'global.email',
                  defaultMessage: 'E-mail'
              })}
          />
          <FormInput
              name=".phoneNumber"
              label={formatMessage({
                  id: 'global.phoneNumber',
                  defaultMessage: 'Phone Number'
              })}
          />
          <footer className="popup-footer">
            <Button
                color="grey"
                onClick={toggleShippingEdit}>
                <FormattedMessage
                    id='global.cancel'
                    defaultMessage='Cancel'
                />
            </Button>
            {
                isNewAddress === "isNew"
                &&
                <Button color="blue">
                   <FormattedMessage
                        id='global.save'
                        defaultMessage='Save'
                   />
                </Button>
            }
            {
                isNewAddress !== "isNew"
                &&
                <Button color="blue">
                    <FormattedMessage
                        id='global.edit'
                        defaultMessage='Edit'
                    />
                </Button>
            }
          </footer>
        </Form>
      </div>
    </div>
  )
}

export default injectIntl(ShippingEdit);

ShippingEdit.propTypes = {
  toggleShippingEdit: PropTypes.func,
  handleIsEdit: PropTypes.func,
};
