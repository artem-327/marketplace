import React from 'react'
import { connect } from 'react-redux'
import {Modal, FormGroup, Item, Divider, Popup, Label} from 'semantic-ui-react'

import {
  closePopup,
  updateDeliveryAddresses,
  createDeliveryAddress,
  getCountries,
  getProvinces,
  getAddressSearch,
  removeEmpty
} from '../../actions'

import { Form, Input, Button, Dropdown, Checkbox } from 'formik-semantic-ui'
import * as Yup from 'yup'
import Router from "next/router"

const initialFormValues = {
  'name':    '',
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

const formValidation = hasProvinces => Yup.object().shape({
  name: Yup.string().trim()
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
    country: Yup.number().required(),
    province: hasProvinces && Yup.number('').required('Province is required')
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

  handleAddressSelect = (d, values, setFieldValue) => {
    const i = this.props.AddressSuggestOptions.indexOf(d.value)
    if (i >= 0) {
      setFieldValue('address.streetAddress', this.props.AddressSuggestData[i].streetAddress)
      setFieldValue('address.city', this.props.AddressSuggestData[i].city)
      setFieldValue('address.zip', this.props.AddressSuggestData[i].zip &&  this.props.AddressSuggestData[i].zip.zip)
      setFieldValue('address.country', this.props.AddressSuggestData[i].country.id)
      setFieldValue('address.province', this.props.AddressSuggestData[i].province ? this.props.AddressSuggestData[i].province.id : '')
      this.setState({hasProvinces: this.props.AddressSuggestData[i].country.hasProvinces})
      if (this.props.AddressSuggestData[i].country.hasProvinces) this.props.getProvinces(this.props.AddressSuggestData[i].country.id)
    }
    else {
      let newValues = {...values.address, [d.name.split('.')[1]]: d.value}

      const body = {
        city:           newValues.city,
        countryId:      newValues.country,
        provinceId:     newValues.province,
        streetAddress:  newValues.streetAddress,
        zip:            newValues.zip
      }
      removeEmpty(body)
      if (Object.entries(body).length === 0) return
      this.props.getAddressSearch(body)
    }
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
      reloadFilter,
      AddressSuggestInput,
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
            validationSchema={formValidation(hasProvinces)}
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
                {AddressSuggestInput}
                <h4>Address</h4>
                <FormGroup widths="equal">
                  <Input
                    inputProps={{list: 'addresses', onChange: (e, d) => { this.handleAddressSelect(d, values, setFieldValue)}}}
                    type="text" label="Street Address" name="address.streetAddress" />
                  <Input
                    inputProps={{list: 'addresses', onChange: (e, d) => { this.handleAddressSelect(d, values, setFieldValue)}}}
                    type="text" label="City" name="address.city" />
                </FormGroup>
                <FormGroup widths="equal">
                  <Input
                    inputProps={{list: 'addresses', onChange: (e, d) => { this.handleAddressSelect(d, values, setFieldValue)}}}
                    type="text" label="Zip" name="address.zip" />
                  <Dropdown label="Country" name="address.country" options={countriesDropDown}
                            inputProps={{search: true, onChange:  (e, d) => {
                                setFieldValue('address.province', ''); this.handleCountry(e, d)}}} />
                  <Dropdown label="Province" name="address.province" options={provincesDropDown}
                            inputProps={{search: true, disabled: !this.state.hasProvinces}} />
                </FormGroup>
                <h4>Contact Info</h4>
                <FormGroup>
                  <Input type="text" label="Name" name="name" fieldProps={{width: 8}} />
                </FormGroup>
                <FormGroup widths="equal">
                  <Input type="text" label="Contact Email" name="email" />
                  <Input type="text" label="Contact Phone" name="phoneNumber" />
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
  getAddressSearch
}

const prepareAddressSuggest = (AddressSuggestOptions) => (
  <datalist id='addresses'>
    {AddressSuggestOptions.map((a, id) => <option key={id} value={a} />)}
  </datalist>
)

const mapStateToProps = state => {
  const popupValues = state.settings.popupValues
  const AddressSuggestOptions = state.settings.addressSearch.map((a) => (
      a.streetAddress + ', ' + a.city + ', ' + a.zip.zip + ', ' + a.country.name + (a.province ? ', ' + a.province.name : '')
  ))
  return {
    AddressSuggestInput: prepareAddressSuggest(AddressSuggestOptions),
    AddressSuggestOptions: AddressSuggestOptions,
    AddressSuggestData: state.settings.addressSearch,
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
        currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
            state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
        deliveryAddressesFilter: state.settings.deliveryAddressesFilter},
      value: state.settings.filterValue},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAddressesPopup)
