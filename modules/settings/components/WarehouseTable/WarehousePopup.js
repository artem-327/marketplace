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
import Router from 'next/router'

import { generateToastMarkup } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'

import { provinceObjectRequired, errorMessages } from '~/constants/yupValidation'

import { AddressForm } from '~/modules/address-form/'
import { addressValidationSchema } from '~/modules/address-form/constants'

import { getSafe } from '~/utils/functions'


const minLength = errorMessages.minLength(3)

const formValidation = () => Yup.object().shape({
  name: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
  contactName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
  contactPhone: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
  contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
  address: addressValidationSchema()
})

class WarehousePopup extends React.Component {
  componentDidMount() {
    this.props.popupValues && this.props.popupValues.hasProvinces && this.props.getProvinces(this.props.popupValues.countryId)
  }

  submitHandler = async (values, actions) => {
    let { toastManager, popupValues, currentTab } = this.props
    const { handlerSubmitWarehouseEditPopup, postNewWarehouseRequest } = this.props
    let country = JSON.parse(values.address.country).countryId

    let requestData = {
      ...values,
      address: {
        ...values.address,
        country
      },
      warehouse: currentTab.type !== 'branches',
    }

    if (popupValues) {
      await handlerSubmitWarehouseEditPopup({
        ...requestData,
        company: this.props.company
      },
        popupValues.branchId
      )
    } else {
      await postNewWarehouseRequest(requestData)
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
    let { popupValues } = this.props

    return getSafe(() => popupValues.initialValues, {
      name: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      address: {
        streetAddress: '',
        city: '',
        country: '',
        zip: '',
        province: '',
      },
    })


  }

  // handleCountry = (e, d) => {
  //   let country = this.props.countries.find(obj => obj.id === d.value);
  //   if (country.hasProvinces) {
  //     this.props.getProvinces(country.id)
  //   }
  //   this.setState({ hasProvinces: country.hasProvinces })
  // }

  // handleAddressSelect = (d, name, values, setFieldValue) => {
  //   const i = this.props.AddressSuggestOptions.indexOf(d.value)

  //   if (i >= 0) {
  //     setFieldValue('address.streetAddress', this.props.AddressSuggestData[i].streetAddress)
  //     setFieldValue('address.city', this.props.AddressSuggestData[i].city)
  //     setFieldValue('address.zip', this.props.AddressSuggestData[i].zip && this.props.AddressSuggestData[i].zip.zip)
  //     setFieldValue('address.country', this.props.AddressSuggestData[i].country.id)
  //     setFieldValue('address.province', this.props.AddressSuggestData[i].province ? this.props.AddressSuggestData[i].province.id : '')
  //     this.setState({ hasProvinces: this.props.AddressSuggestData[i].country.hasProvinces })
  //     if (this.props.AddressSuggestData[i].country.hasProvinces) this.props.getProvinces(this.props.AddressSuggestData[i].country.id)
  //   }

  //   else {
  //     let newValues = { ...values, address: { ...values.address, [name]: d.value } }
  //     const body = {
  //       city: getSafe(() => newValues.address.city),
  //       countryId: getSafe(() => JSON.parse(newValues.address.country).countryId),
  //       provinceId: getSafe(() => newValues.address.province),
  //       streetAddress: getSafe(() => newValues.address.streetAddress),
  //       zip: newValues.address.zip
  //     }

  //     removeEmpty(body)
  //     if (Object.entries(body).length === 0) return
  //     this.props.getAddressSearch(body)
  //   }
  // }

  render() {
    // const {
    //   AddressSuggestInput,
    // } = this.props


    const { closePopup, popupValues, country, currentTab, provincesDropDown } = this.props
    const title = popupValues ? 'Edit ' : 'Add'


    const name = currentTab.type === 'branches' ? 'Branch Name' : 'Warehouse Name'
    const modalTitle = currentTab.type === 'branches' ? 'Branch' : 'Warehouse'
    let initialValues = this.getInitialFormValues()


    return (
      <Modal open centered={false}>
        <Modal.Header>
          {`${title} `} {modalTitle}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialValues}
            validationSchema={formValidation()}
            enableReinitialize
            onReset={closePopup}
            onSubmit={this.submitHandler} >
            {({ setFieldValue, values }) => (
              <>
                <FormGroup widths='equal'>
                  <Input type='text' label={name} name='name' />
                </FormGroup>
                <AddressForm
                  setFieldValue={setFieldValue}
                  values={values} />

                <Header as='h3'>Contact Info</Header>
                <FormGroup>
                  <Input type='text' label='Contact Name' name='contactName' fieldProps={{ width: 8 }} />
                </FormGroup>
                <FormGroup widths='equal'>
                  <Input type='text' label='Phone' name='contactPhone' />
                  <Input type='text' label='Email' name='contactEmail' />
                </FormGroup>
                <div style={{ textAlign: 'right' }}>
                  <Button.Reset onClick={closePopup} data-test='settings_warehouse_popup_reset_btn'>Cancel</Button.Reset>
                  <Button.Submit data-test='settings_warehouse_popup_submit_btn'>Save</Button.Submit>
                </div>
              </>)}
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

// const prepareAddressSuggest = (AddressSuggestOptions) => (
//   <datalist id='addresses'>
//     {AddressSuggestOptions.map((a, id) => <option key={id} value={a} />)}
//   </datalist>
// )

const mapDispatchToProps = {
  postNewWarehouseRequest,
  handlerSubmitWarehouseEditPopup,
  closePopup,
  getProvinces,
  getAddressSearch,
  removeEmpty
}
const mapStateToProps = state => {
  // const AddressSuggestOptions = state.settings.addressSearch.map((a) => (
  //   a.streetAddress + ', ' + a.city + ', ' + a.zip.zip + ', ' + a.country.name + (a.province ? ', ' + a.province.name : '')
  // ))

  return {
    // AddressSuggestInput: prepareAddressSuggest(AddressSuggestOptions),
    // AddressSuggestOptions,
    // AddressSuggestData: state.settings.addressSearch,
    hasProvinces: state.settings.popupValues ? state.settings.popupValues.hasProvinces : false,
    popupValues: state.settings.popupValues,
    country: state.settings.country,
    countries: state.settings.countries,
    provincesDropDown: state.settings.provincesDropDown,
    currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
      state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
    company: getSafe(() => state.auth.identity.company.id, null)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(WarehousePopup))
