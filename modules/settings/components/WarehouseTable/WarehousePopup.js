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
import { Form, Input, Button, Dropdown, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import Router from 'next/router'

import { generateToastMarkup } from '~/utils/functions'
import { FormattedMessage, injectIntl } from 'react-intl'

import { addressValidationSchema, errorMessages } from '~/constants/yupValidation'

import { AddressForm } from '~/modules/address-form/'

import { getSafe } from '~/utils/functions'
import { PhoneNumber } from '~/modules/phoneNumber'


const minLength = errorMessages.minLength(3)

const formValidation = () => Yup.object().shape({
  name: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
  contactName: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
  contactPhone: Yup.string().trim().min(3, minLength).required(errorMessages.requiredMessage),
  contactEmail: Yup.string().trim().email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
  deliveryAddress: Yup.object().shape({
    address: addressValidationSchema()
  })
})

class WarehousePopup extends React.Component {
  componentDidMount() {
    this.props.popupValues && this.props.popupValues.hasProvinces && this.props.getProvinces(this.props.popupValues.countryId)
  }

  submitHandler = async (values, actions) => {
    let { toastManager, popupValues, currentTab } = this.props
    const { handlerSubmitWarehouseEditPopup, postNewWarehouseRequest } = this.props
    let country = JSON.parse(values.deliveryAddress.address.country).countryId

    let requestData = {
      ...values,
      deliveryAddress: {
        ...values.deliveryAddress,
        address: {
          ...values.deliveryAddress.address,
          country
        },
      },
      warehouse: currentTab.type !== 'branches',
    }

    try {
      if (popupValues) {
        await handlerSubmitWarehouseEditPopup({
            ...requestData,
            company: this.props.company
          },
          popupValues.branchId
        )
      } else {
        await postNewWarehouseRequest({
          ...requestData,
          deliveryAddress: {
            ...requestData.deliveryAddress,
            email: requestData.contactEmail,
            name: requestData.contactName,
            phoneNumber: requestData.contactPhone,
          }
        })
      }

      let status = currentTab === 'branches' ? 'branch' : 'warehouse'

      status += popupValues ? 'Updated' : 'Created'

      toastManager.add(generateToastMarkup(
        <FormattedMessage id={`notifications.${status}.header`}/>,
        <FormattedMessage id={`notifications.${status}.content`} values={{name: values.name}}/>
        ),
        {
          appearance: 'success'
        })

    }
    catch { }
    finally {
      actions.setSubmitting(false)
    }
  }

  getInitialFormValues = () => {
    let { popupValues } = this.props

    return getSafe(() => popupValues.initialValues, {
      name: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      deliveryAddress: {
        address: {
          streetAddress: '',
          city: '',
          country: '',
          zip: '',
          province: '',
        },
        readyTime: '',
        closeTime: '',
        liftGate: false,
        forkLift: false,
        deliveryNotes: '',
        email: '',
        phoneNumber: '',
        name: '',
        callAhead: false,
      }
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


    const { closePopup, popupValues, country, currentTab, provincesDropDown, intl: { formatMessage } } = this.props

    const name = currentTab.type === 'branches'
      ? <FormattedMessage id='settings.branchName' defaultMessage='Branch Name' />
      : <FormattedMessage id='settings.warehouseName' defaultMessage='Warehouse Name' />

    let initialValues = this.getInitialFormValues()

    const modalTitle = currentTab.type === 'branches'
      ? (popupValues
        ? <FormattedMessage id='settings.EditBranch' defaultMessage='Edit Branch' />
        : <FormattedMessage id='settings.AddBranch' defaultMessage='Add Branch' />
        )
      : (popupValues
        ? <FormattedMessage id='settings.EditWarehouse' defaultMessage='Edit Warehouse' />
        : <FormattedMessage id='settings.AddWarehouse' defaultMessage='Add Warehouse' />
      )

    return (
      <Modal closeIcon onClose={() => closePopup()} open centered={false}>
        <Modal.Header>
          {modalTitle}
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={initialValues}
            validationSchema={formValidation()}
            enableReinitialize
            onReset={closePopup}
            onSubmit={this.submitHandler} >
            {({ setFieldValue, values, setFieldTouched, errors, touched, isSubmitting }) => (
              <>
                <FormGroup widths='equal' data-test='settings_warehouse_popup_name_inp'>
                  <Input type='text' label={name} name='name' />
                </FormGroup>
                <AddressForm
                  prefix={'deliveryAddress'}
                  setFieldValue={setFieldValue}
                  values={values} />

                <Header as='h3'><FormattedMessage id='settings.contactInfo' defaultMessage='Contact Info' /></Header>
                <FormGroup data-test='settings_warehouse_popup_contactName_inp'>
                  <Input type='text' label='Contact Name' name='contactName' fieldProps={{ width: 8 }} />
                </FormGroup>
                <FormGroup widths='equal' data-test='settings_warehouse_popup_phoneEmail_inp'>
                  <PhoneNumber
                    name='contactPhone'
                    values={values}
                    label={<FormattedMessage id='global.phone' defaultMessage='Phone' />}
                    setFieldValue={setFieldValue}

                    setFieldTouched={setFieldTouched} errors={errors}
                    touched={touched} isSubmitting={isSubmitting}
                  />
                  <Input type='text' label='Email' name='contactEmail' />
                </FormGroup>
                <Header as='h3'><FormattedMessage id='global.additionalInfo' defaultMessage='Additional Info' /></Header>
                <FormGroup data-test='settings_delivery_address_notes_inp' style={{ alignItems: 'center' }}>
                  <Input
                    fieldProps={{ width: 5 }}
                    type='text'
                    label={formatMessage({ id: 'global.readyTime', defaultMessage: 'Ready Time' })}
                    name='deliveryAddress.readyTime'
                  />
                  <Input
                    fieldProps={{ width: 5 }}
                    type='text' label={formatMessage({ id: 'global.closeTime', defaultMessage: 'Close Time' })}
                    name='deliveryAddress.closeTime'
                  />
                  <Checkbox
                    fieldProps={{ width: 3 }}
                    label={formatMessage({ id: 'global.liftGate', defaultMessage: 'Lift Gate' })}
                    name='deliveryAddress.liftGate'
                    inputProps={{ 'data-test': 'settings_delivery_address_liftGate_inp' }}
                  />
                  <Checkbox
                    fieldProps={{ width: 3 }}
                    label={formatMessage({ id: 'global.forkLift', defaultMessage: 'fork Lift' })}
                    name='deliveryAddress.forkLift'
                    inputProps={{ 'data-test': 'settings_delivery_address_forklift_inp' }}
                  />
                </FormGroup>
                <FormGroup widths='equal' data-test='settings_delivery_address_emailPhone_inp'>
                    <TextArea
                      name='deliveryAddress.deliveryNotes'
                      label={formatMessage({ id: 'global.deliveryNotes', defaultMessage: 'Delivery Notes' })}
                    />
                </FormGroup>
                <div style={{ textAlign: 'right' }}>
                  <Button.Reset onClick={closePopup} data-test='settings_warehouse_popup_reset_btn'>
                    <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{(text) => text}</FormattedMessage>
                  </Button.Reset>
                  <Button.Submit data-test='settings_warehouse_popup_submit_btn'>
                    <FormattedMessage id='global.save' defaultMessage='Save'>{(text) => text}</FormattedMessage>
                  </Button.Submit>
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

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(WarehousePopup)))
