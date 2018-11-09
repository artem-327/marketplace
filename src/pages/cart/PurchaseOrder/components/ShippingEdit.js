import React from 'react'
import PropTypes from 'prop-types'
import "./ShippingEdit.css"
import Button from '../../../../components/Button/Button'
import {FormInput /*, FormSelect*/} from '../../../../components/Form/FormInput'
import Radio from "../../../../components/Radio/Radio";
import { Form } from 'react-redux-form';

const ShippingEdit = ({ toggleShippingEdit, isNewAddress, handleIsEdit, selectedAddress, createDeliveryAddress, editDeliveryAddress }) => {
  const radioOptions = [{value:"isEdit", label:'Saved Address'}, {value:"isNew", label:'Add New Address'}]
  
  return (
    <div className="shopping-cart-items">
      <header><h1>1. Shipping</h1></header>
      <div className="purchase-order-section">
      <Radio onChange={value => handleIsEdit(value)}
          name='isNewAddress'
          className='br-config-radio'
          opns={radioOptions}
          checked={isNewAddress}
          disabled={!Object.keys(selectedAddress).length ? true : false}
      />
        {/* TODO: send id instead of string to province - waiting for backend endpoint */}
        {/* TODO: which fields are required? */}
        <Form model="forms.shippingEdit" onSubmit={values => isNewAddress === "isNew" ? createDeliveryAddress(values) : editDeliveryAddress({id: selectedAddress.id, ...values})} className="shipping-edit">
          <FormInput name=".firstName" label="First Name" />
          <FormInput name=".lastName" label="Last Name" />
          <FormInput name=".address.streetAddress" label="Address" />
          <FormInput name=".address.city" label="City" />
          <FormInput name=".address.province" label="State"/>
          <FormInput name=".zipCode" label="Postal Code" />
          <FormInput name=".email" label="E-mail Address" />
          <FormInput name=".phoneNumber" label="Phone Number" />
          <footer className="popup-footer">
            <Button color="grey" onClick={toggleShippingEdit}>Cancel</Button>
            {isNewAddress === "isNew" && <Button color="blue">Save</Button>}
            {isNewAddress !== "isNew" && <Button color="blue">Edit</Button>}
          </footer>
        </Form>
      </div>
    </div>
  )
}

export default ShippingEdit

ShippingEdit.propTypes = {
  toggleShippingEdit: PropTypes.func,
  handleIsEdit: PropTypes.func,
}
