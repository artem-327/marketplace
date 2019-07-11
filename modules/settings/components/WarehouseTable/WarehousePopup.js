import React from 'react'
import { connect } from 'react-redux'

import { Header, Modal, FormGroup } from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'
import {
  closePopup,
  handlerSubmitWarehouseEditPopup,
  postNewWarehouseRequest,
  getProvinces,
  getAddressSearch,
  removeEmpty
} from '../../actions'
import { Form, Input, Button, Dropdown } from 'formik-semantic-ui'
import * as Yup from 'yup'
import Router from "next/router"

import { generateToastMarkup } from '~/utils/functions'
import { FormattedMessage } from 'react-intl';

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

  submitHandler = async (values, actions) => {
    let { toastManager, popupValues, currentTab } = this.props
    const { handlerSubmitWarehouseEditPopup, postNewWarehouseRequest } = this.props

    if (popupValues) {
      await handlerSubmitWarehouseEditPopup(
        {
          ...values,
          tab: currentTab.type === 'branches' ? 'branches' : null
        },
        popupValues.branchId
      )
    } else {
      await postNewWarehouseRequest({
        ...values,
        tab: currentTab.type === 'branches' ? 'branches' : null
      })
    }

    let status = currentTab === 'branches' ? 'branch' : 'warehouse'

    status += popupValues ? 'Updated' : 'Created'

    toastManager.add(generateToastMarkup(
      <FormattedMessage id={`notifications.${status}.header`} />,
      <FormattedMessage id={`notifications.${status}.content`} values={{ name: values.name }} />
    ),
      {
        appearance: 'success'
      })

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
    this.setState({ hasProvinces: country.hasProvinces })
  }

  handleAddressSelect = (d, values, setFieldValue) => {
    const i = this.props.AddressSuggestOptions.indexOf(d.value)
    if (i >= 0) {
      setFieldValue('address', this.props.AddressSuggestData[i].streetAddress)
      setFieldValue('city', this.props.AddressSuggestData[i].city)
      setFieldValue('zip', this.props.AddressSuggestData[i].zip && this.props.AddressSuggestData[i].zip.zip)
      setFieldValue('country', this.props.AddressSuggestData[i].country.id)
      setFieldValue('province', this.props.AddressSuggestData[i].province ? this.props.AddressSuggestData[i].province.id : '')
      this.setState({ hasProvinces: this.props.AddressSuggestData[i].country.hasProvinces })
      if (this.props.AddressSuggestData[i].country.hasProvinces) this.props.getProvinces(this.props.AddressSuggestData[i].country.id)
    }
    else {
      let newValues = { ...values, [d.name]: d.value }
      const body = {
        city: newValues.city,
        countryId: newValues.country,
        provinceId: newValues.province,
        streetAddress: newValues.address,
        zip: newValues.zip
      }
      removeEmpty(body)
      if (Object.entries(body).length === 0) return
      this.props.getAddressSearch(body)
    }
  }

  render() {
    const {
      AddressSuggestInput,
    } = this.props

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
                {AddressSuggestInput}
                <FormGroup widths="equal">
                  <Input type="text" label={name} name="name" />
                </FormGroup>
                <Header as='h3'>Address</Header>
                <FormGroup widths="equal">
                  <Input
                    inputProps={{ list: 'addresses', onChange: (e, d) => { this.handleAddressSelect(d, values, setFieldValue) } }}
                    type="text" label="Street Address" name="address"
                  />
                  <Input
                    type="text" label="City" name="city"
                    inputProps={{ list: 'addresses', onChange: (e, d) => { this.handleAddressSelect(d, values, setFieldValue) } }}
                  />
                </FormGroup>
                <FormGroup widths="equal">
                  <Input
                    type="text" label="Zip" name="zip"
                    inputProps={{ list: 'addresses', onChange: (e, d) => { this.handleAddressSelect(d, values, setFieldValue) } }}
                  />
                  <Dropdown label="Country" name="country" options={country}
                    inputProps={{
                      search: true, onChange: (e, d) => {
                        setFieldValue('province', ''); this.handleCountry(e, d)
                      }
                    }} />
                  <Dropdown label="State/Province" name="province" options={provincesDropDown}
                    inputProps={{ search: true, disabled: !hasProvinces }} />
                </FormGroup>
                <Header as='h3'>Contact Info</Header>
                <FormGroup>
                  <Input type="text" label="Contact Name" name="contactName" fieldProps={{ width: 8 }} />
                </FormGroup>
                <FormGroup widths="equal">
                  <Input type="text" label="Phone" name="phone" />
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

const prepareAddressSuggest = (AddressSuggestOptions) => (
  <datalist id='addresses'>
    {AddressSuggestOptions.map((a, id) => <option key={id} value={a} />)}
  </datalist>
)

const mapDispatchToProps = {
  postNewWarehouseRequest,
  handlerSubmitWarehouseEditPopup,
  closePopup,
  getProvinces,
  getAddressSearch,
  removeEmpty
}
const mapStateToProps = state => {
  const AddressSuggestOptions = state.settings.addressSearch.map((a) => (
    a.streetAddress + ', ' + a.city + ', ' + a.zip.zip + ', ' + a.country.name + (a.province ? ', ' + a.province.name : '')
  ))
  return {
    AddressSuggestInput: prepareAddressSuggest(AddressSuggestOptions),
    AddressSuggestOptions: AddressSuggestOptions,
    AddressSuggestData: state.settings.addressSearch,
    hasProvinces: state.settings.popupValues ? state.settings.popupValues.hasProvinces : false,
    popupValues: state.settings.popupValues,
    country: state.settings.country,
    countries: state.settings.countries,
    provincesDropDown: state.settings.provincesDropDown,
    currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
      state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(WarehousePopup))
