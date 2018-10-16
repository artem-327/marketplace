import React from 'react'
import PropTypes from 'prop-types'
import CartItem from '../../components/CartItem/CartItem'
import Button from '../../../../components/Button/Button'
import DropdownRedux from '../../../../components/Dropdown/DropdownRedux'
import { required, messages } from '../../../../utils/validation'
import { Control, Form, Errors } from 'react-redux-form';

//there is no name in real data!
const mockAddress = [
  {
    id: 5,
    name: 'adresa1',
    firstName: 'FirstName',
    lastName: 'LastName',
    address: 'TestAddress',
    city: 'CityName',
    location: { id: 2, country: 'USA', state: 'Dallas' },
    zipCode: '97 201',
    email: 'mail@mail.com',
    phoneNumber: '721 584 362'
  }
]

const ShippingEdit = ({ toggleShippingEdit }) => {
  return (
    <CartItem headerTitle="1. Shipping">
      <div className="purchase-order-section">

        <Form model="forms.shippingEdit" onSubmit={(values) => console.log(values)} >
          <div>
            <Errors
              className="form-error"
              model=".firstName"
              show="touched"
              messages={{
                required: messages.required,
              }}
            />
            <div className='group-item-wr'>
              <label htmlFor=".firstName">First Name</label>
              <Control.text model=".firstName"
                validators={{ required }}
                id=".firstName"
                defaultValue="" />
            </div>

            <Errors
              className="form-error"
              model=".lastName"
              show="touched"
              messages={{
                required: messages.required,
              }}
            />
            <div className='group-item-wr'>
              <label htmlFor=".lastName">Last Name</label>
              <Control.text model=".lastName"
                validators={{ required }}
                id=".lastName"
                defaultValue="" />
            </div>

            <Errors
              className="form-error"
              model=".address"
              show="touched"
              messages={{
                required: messages.required,
              }}
            />
            <div className='group-item-wr'>
              <label htmlFor=".address">Address</label>
              <Control.text model=".address"
                validators={{ required }}
                id=".address"
                defaultValue="" />
            </div>

            <Errors
              className="form-error"
              model=".city"
              show="touched"
              messages={{
                required: messages.required,
              }}
            />
            <div className='group-item-wr'>
              <label htmlFor=".city">City</label>
              <Control.text model=".city"
                validators={{ required }}
                id=".city"
                defaultValue="" />
            </div>

            <Errors
              className="form-error"
              model=".state"
              show="touched"
              messages={{
                required: messages.required,
              }}
            />
            <div className='group-item-wr'>
              <label htmlFor=".state">State</label>
              <Control.text model=".state"
                validators={{ required }}
                id=".state"
                defaultValue="" />
            </div>

            <Errors
              className="form-error"
              model=".zip"
              show="touched"
              messages={{
                required: messages.required,
              }}
            />
            <div className='group-item-wr'>
              <label htmlFor=".zip">Postal Code</label>
              <Control.text model=".zip"
                validators={{ required }}
                id=".zip"
                defaultValue="" />
            </div>


            <Errors
              className="form-error"
              model=".email"
              show="touched"
              messages={{
                required: messages.required,
              }}
            />
            <div className='group-item-wr'>
              <label htmlFor=".email">E-mail Address</label>
              <Control.text model=".email"
                validators={{ required }}
                id=".email"
                defaultValue="" />
            </div>

            <Errors
              className="form-error"
              model=".phoneNumber"
              show="touched"
              messages={{
                required: messages.required,
              }}
            />
            <div className='group-item-wr'>
              <label htmlFor=".phoneNumber">Phone Number</label>
              <Control.text model=".phoneNumber"
                validators={{ required }}
                id=".phoneNumber"
                defaultValue="" />
            </div>

          </div>
        </Form>

        <footer className="add-cart-footer">
          <Button color="grey" onClick={toggleShippingEdit}>Cancel</Button>
          <Button color="blue">Save</Button>
        </footer>
      </div>

    </CartItem>
  )
}

export default ShippingEdit

ShippingEdit.propTypes = {
  toggleShippingEdit: PropTypes.func
}
