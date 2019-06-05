import React from 'react'
import { connect } from 'react-redux'

import { Modal, FormGroup } from 'semantic-ui-react'

import {
  closePopup,
  handlerSubmitWarehouseEditPopup,
  postNewWarehouseRequest,
  getProvinces,
} from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'
import Router from "next/router"

const formValidation = hasProvinces => Yup.object().shape({
  name: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  contactName: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  phone: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  city: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  address: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  email: Yup.string().trim()
    .min(3, 'Too short')
    .required('Required'),
  zip: Yup.string().trim()
    .min(1, 'Too short')
    .required('Required'),
  country: Yup.number().required(),
  province: hasProvinces && Yup.number('').required('Province is required')
})

class WarehousePopup extends React.Component {
  state = {
    hasProvinces: this.props.hasProvinces,
  }

  componentDidMount() {
    this.props.popupValues && this.props.popupValues.hasProvinces && this.props.getProvinces(this.props.popupValues.countryId)
  }

  submitHandler = (values, actions) => {
    if (this.props.popupValues) {
      this.props.handlerSubmitWarehouseEditPopup(
        {
          ...values,
          tab: this.props.currentTab.type === 'branches' ? 'branches' : null
        },
        this.props.popupValues.branchId
      )
    } else {
      this.props.postNewWarehouseRequest({
        ...values,
        tab: this.props.currentTab.type === 'branches' ? 'branches' : null
      })
    }
    actions.setSubmitting(false)
  }

  getInitialFormValues = () => {
    const { popupValues } = this.props
    const [address, city] =
      popupValues && popupValues.address
        ? popupValues.address.split(',')
        : ['', '']
    const {
      name = '',
      contactName = '',
      countryId = '',
      provinceId = '',
      phone = '',
      email = '',
      zip = ''
    } = popupValues || {}

    return {
      name,
      contactName,
      address,
      city,
      zip,
      phone,
      email,
      country: countryId,
      province: provinceId,
    }
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
      hasProvinces,
    } = this.state

    const { closePopup, popupValues, country, currentTab, provincesDropDown } = this.props
    const title = popupValues ? 'Edit ' : 'Add'

    const name = currentTab.type === 'branches' ? 'Branch Name' : 'Warehouse Name'
    const modalTitle = currentTab.type === 'branches' ? 'Branch' : 'Warehouse'

    return (
      <Modal open centered={false}>
        <Modal.Header>
          {`${title} `} {modalTitle}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
            validationSchema={formValidation(hasProvinces)}
            onReset={closePopup}
            onSubmit={this.submitHandler}
          >
            {({ values, errors, setFieldValue }) => (
            <>
              <FormGroup widths="equal">
                <Input type="text" label={name} name="name" />
                <Input type="text" label="Contact Name" name="contactName" />
              </FormGroup>
              <FormGroup widths="equal">
                <Input type="text" label="Street Address" name="address" />
                <Input type="text" label="City" name="city" />
              </FormGroup>
              <FormGroup widths="equal">
                <Input type="text" label="Zip" name="zip" />
                <Input type="text" label="Phone" name="phone" />
              </FormGroup>
              <FormGroup widths="equal">
                <Dropdown label="Country" name="country" options={country}
                          inputProps={{search: true, onChange:  (e, d) => {
                              setFieldValue('province', ''); this.handleCountry(e, d)}}} />
                <Dropdown label="Province" name="province" options={provincesDropDown}
                          inputProps={{search: true, disabled: !hasProvinces}} />
              </FormGroup>
              <FormGroup widths="equal">
                <Input type="text" label="Email" name="email" />
              </FormGroup>
              <div style={{ textAlign: 'right' }}>
                <Button.Reset onClick={closePopup}>Cancel</Button.Reset>
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
  postNewWarehouseRequest,
  handlerSubmitWarehouseEditPopup,
  closePopup,
  getProvinces,
}
const mapStateToProps = state => {
  return {
    hasProvinces: state.settings.popupValues ? state.settings.popupValues.hasProvinces : false,
    popupValues: state.settings.popupValues,
    country: state.settings.country,
    countries: state.settings.countries,
    provincesDropDown: state.settings.provincesDropDown,
    currentTab: Router && Router.router ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarehousePopup)
