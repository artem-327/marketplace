import React from 'react'
import PropTypes from 'prop-types'
import "./ShippingEdit.css"
import CartItem from '../../components/CartItem/CartItem'
import Button from '../../../../components/Button/Button'
import FormInput from '../../../../components/Form/FormInput'
import Radio from "../../../../components/Radio/Radio";
import { Form } from 'react-redux-form';

const ShippingEdit = ({ toggleShippingEdit, isNewAddress, handleIsEdit, selectedAddress, createDeliveryAddress }) => {
  const radioOptions = [{value:"isEdit", label:'Saved Address'}, {value:"isNew", label:'Add New Address'}]
  return (
    <CartItem headerTitle="1. Shipping">
      <div className="purchase-order-section">
      <Radio onChange={value => handleIsEdit(value)}
          name='isNewAddress'
          className='br-config-radio'
          opns={radioOptions}
          checked={isNewAddress}
          disabled={!Object.keys(selectedAddress).length ? true : false}
      />
        {/* TODO: send id instead of string to province - waiting for backend endpoint */}
        {/* TODO: now just create new address, add PUT in future - waiting for backend endpoint */}
        {/* TODO: which fields are required? */}
        <Form model="forms.shippingEdit" onSubmit={(values) => createDeliveryAddress(values)} className="shipping-edit">
          <FormInput name=".firstName" label="First Name" />
          <FormInput name=".lastName" label="Last Name" />
          <FormInput name=".address.streetAddress" label="Address" />
          <FormInput name=".address.city" label="City" />
          <FormInput name=".address.province" label="State" />
          <FormInput name=".zipCode" label="Postal Code" />
          <FormInput name=".email" label="E-mail Address" />
          <FormInput name=".phoneNumber" label="Phone Number" />
          <footer className="add-cart-footer">
            <Button color="grey" onClick={toggleShippingEdit}>Cancel</Button>
            <Button color="blue">Save</Button>
          </footer>
        </Form>
      </div>
    </CartItem>
  )
}

export default ShippingEdit

ShippingEdit.propTypes = {
  toggleShippingEdit: PropTypes.func,
  handleIsEdit: PropTypes.func,
}
