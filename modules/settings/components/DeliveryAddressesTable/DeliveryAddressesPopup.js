import React from 'react'
import { connect } from 'react-redux'
import {Modal, FormGroup, Item, Divider} from 'semantic-ui-react'

import {
  closePopup,
  updateDeliveryAddresses,
  createDeliveryAddress,
  getCountries,
  getProvinces,
} from '../../actions'

import { Form, Input, Button, Dropdown, Checkbox } from 'formik-semantic-ui'
import * as Yup from 'yup'

const initialFormValues = {
  'firstName':    '',
  'lastName':     '',
  'email':        '',
  'phoneNumber':  '',
  'address': {
    'city':           '',
    'country':        '',
    'province':       '',
    'streetAddress':  '',
    'zip':            '',
  }
}

const formValidation = Yup.object().shape({
  firstName: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  lastName: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  email: Yup.string().trim()
    .email('Invalid email')
    .required('Emails is required'),
  phoneNumber: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  address: Yup.object().shape({
    city: Yup.string().trim().min(3, 'Enter at least 2 characters').required('Enter at least 2 characters'),
    streetAddress: Yup.string().trim().min(3, 'Enter at least 2 characters').required('Enter at least 2 characters'),
    zip: Yup.string().trim().required('Enter zip code'),
    country: Yup.number().required()
  })
})

class DeliveryAddressesPopup extends React.Component {
  state = {
    hasProvinces: this.props.hasProvinces,
  }

  componentDidMount() {
    this.props.getCountries()
    this.props.popupValues && this.props.hasProvinces && this.props.getProvinces(this.props.popupValues.address.country)
  }

  handleCountry = (e, d) => {
    let country = this.props.countries.find(obj => obj.id === d.value);
    if (country.hasProvinces) {
      this.props.getProvinces(country.id)
    }
    this.setState({hasProvinces: country.hasProvinces})
  }

  render() {
    const {
      closePopup,
      popupValues,
      rowId,
      updateDeliveryAddresses,
      createDeliveryAddress,
      countriesDropDown,
      provincesDropDown,
      reloadFilter
    } = this.props

    const {
      hasProvinces,
    } = this.state


    return (
      <Modal open centered={false} size="small">
        <Modal.Header>{popupValues ? ('Edit') : ('Add')} Delivery Address</Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={popupValues ? popupValues : initialFormValues}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={async (values, actions) => {
              if (values.address.province === '') delete values.address['province']
              if (popupValues) await updateDeliveryAddresses(rowId, values, reloadFilter)
              else await createDeliveryAddress(values, reloadFilter)

              actions.setSubmitting(false)
            }}
          >
            {({ values, errors, setFieldValue }) => (
              <>
                <h4>User Contact</h4>
                <FormGroup widths="equal">
                  <Input type="text" label="First Name" name="firstName" />
                  <Input type="text" label="Last Name" name="lastName" />
                </FormGroup>
                <FormGroup widths="equal">
                  <Input type="text" label="Contact Email" name="email" />
                  <Input type="text" label="Contact Phone" name="phoneNumber" />
                </FormGroup>
                <Divider />
                <h4>Address</h4>
                <FormGroup widths="equal">
                  <Input type="text" label="Street Address" name="address.streetAddress" />
                  <Input type="text" label="City" name="address.city" />
                </FormGroup>
                <FormGroup widths="equal">
                  <Input type="text" label="Zip" name="address.zip" />
                  <Dropdown label="Country" name="address.country" options={countriesDropDown}
                            inputProps={{search: true, onChange:  (e, d) => {
                                setFieldValue('address.province', ''); this.handleCountry(e, d)}}} />
                  <Dropdown label="Province" name="address.province" options={provincesDropDown}
                            inputProps={{search: true, disabled: !this.state.hasProvinces, clearable: true}} />
                </FormGroup>
                <div style={{ textAlign: 'right' }}>
                  <Button.Reset>Cancel</Button.Reset>
                  <Button.Submit>Save</Button.Submit>
                </div>
              </>)}
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  updateDeliveryAddresses,
  createDeliveryAddress,
  getCountries,
  getProvinces,
}

const mapStateToProps = state => {
  const popupValues = state.settings.popupValues
  return {
    rowId: popupValues ? popupValues.id : null,
    hasProvinces: popupValues ? popupValues.address.country.hasProvinces : false,
    popupValues: popupValues ? {
      firstName: popupValues.firstName,
      lastName: popupValues.lastName,
      email: popupValues.email,
      phoneNumber: popupValues.phoneNumber,
      address: {
        city: popupValues.address.city,
        country: popupValues.address.country.id,
        province: !!popupValues.address.province ? popupValues.address.province.id : '',
        streetAddress: popupValues.address.streetAddress,
        zip: popupValues.address.zip.zip
    }} : null,
    countriesDropDown: state.settings.countriesDropDown,
    provincesDropDown: state.settings.provincesDropDown,
    countries: state.settings.countries,
    reloadFilter: {props: {
        currentTab: state.settings.currentTab,
        deliveryAddressesFilter: state.settings.deliveryAddressesFilter},
      value: state.settings.filterValue},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAddressesPopup)
