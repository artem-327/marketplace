import React from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, Header } from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'

import {
  closePopup,
  updateDeliveryAddresses,
  createDeliveryAddress,
  getCountries,
  getProvinces,
  getAddressSearch
} from '../../actions'

import { Form, Input, Button, Dropdown } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import Router from 'next/router'
import { FormattedMessage, injectIntl } from 'react-intl'

import { generateToastMarkup, getSafe } from '~/utils/functions'
import { errorMessages, provinceObjectRequired } from '~/constants/yupValidation'

import { AddressForm } from '~/modules/address-form'
import { PhoneNumber } from '~/modules/phoneNumber'


const initialFormValues = {
  name: '',
  email: '',
  phoneNumber: '',
  address: {
    city: '',
    country: '',
    province: '',
    streetAddress: '',
    zip: '',
  }
}



const formValidation = () => Yup.lazy((values) => (
  Yup.object().shape({
    name: Yup.string().trim()
      .min(3, errorMessages.minLength(3))
      .required(errorMessages.requiredMessage),
    email: Yup.string().trim()
      .email(errorMessages.invalidEmail)
      .required(errorMessages.requiredMessage),
    phoneNumber: Yup.string().trim()
      .min(3, errorMessages.minLength(3))
      .required(errorMessages.requiredMessage),
    address: Yup.object().shape({
      city: Yup.string().trim().min(3, errorMessages.minLength(2)).required(errorMessages.requiredMessage),
      streetAddress: Yup.string().trim().min(3, errorMessages.minLength(2)).required(errorMessages.requiredMessage),
      zip: Yup.string().trim().required(errorMessages.requiredMessage),
      country: Yup.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
      province: provinceObjectRequired(getSafe(() => JSON.parse(values.address.country).hasProvinces))
    })
  })
))

class DeliveryAddressesPopup extends React.Component {
  render() {
    const {
      closePopup,
      popupValues,
      rowId,
      updateDeliveryAddresses,
      createDeliveryAddress,
      reloadFilter,
      toastManager,
      intl: { formatMessage }
    } = this.props


    return (
      <Modal closeIcon onClose={() => closePopup()} open centered={false} size='small'>
        <Modal.Header>
          {popupValues
            ? <FormattedMessage id='settings.editDeliveryAddress' defaultMessage='Edit Delivery Address' />
            : <FormattedMessage id='settings.addDeliveryAddress' defaultMessage='Add Delivery Address' />
          }
        </Modal.Header>
        <Modal.Content>
          <Form
            enableReinitialize
            initialValues={popupValues ? popupValues : initialFormValues}
            validationSchema={formValidation()}
            onReset={closePopup}
            onSubmit={async (values, { setSubmitting }) => {
              let payload = {
                ...values,
                address: {
                  ...values.address,
                  country: JSON.parse(values.address.country).countryId
                }
              }
              try {

                if (values.address.province === '') delete payload.address['province']
                if (popupValues) await updateDeliveryAddresses(rowId, payload, reloadFilter)
                else await createDeliveryAddress(payload, reloadFilter)

                let status = popupValues ? 'deliveryAddressUpdated' : 'deliveryAddressCreated'

                toastManager.add(generateToastMarkup(
                  <FormattedMessage id={`notifications.${status}.header`} />,
                  <FormattedMessage id={`notifications.${status}.content`} values={{ name: values.name }} />
                ), { appearance: 'success' })
              }
              catch { }
              finally {
                setSubmitting(false)
              }

            }}
          >
            {({ values, setFieldValue, setFieldTouched, errors, touched, isSubmitting }) => {
              return (
                <>
                  {/* {AddressSuggestInput} */}
                  <Header as='h3'><FormattedMessage id='global.address' defaultMessage='Address' /></Header>
                  <AddressForm values={values} displayHeader={false} setFieldValue={setFieldValue} />
                  {/* <FormGroup widths='equal' data-test='settings_delivery_address_streetCity_inp' >
                    <Input
                      inputProps={{ list: 'addresses', onChange: (e, d) => { this.handleAddressSelect(d, values, setFieldValue) } }}
                      type='text' label='Street Address' name='address.streetAddress' />
                    <Input
                      inputProps={{ list: 'addresses', onChange: (e, d) => { this.handleAddressSelect(d, values, setFieldValue) } }}
                      type='text' label='City' name='address.city' />
                  </FormGroup>
                  <FormGroup widths='equal' data-test='settings_delivery_address_zipCountry_inp' >
                    <Input
                      inputProps={{ list: 'addresses', onChange: (e, d) => { this.handleAddressSelect(d, values, setFieldValue) } }}
                      type='text' label='Zip' name='address.zip' />
                    <Dropdown label='Country' name='address.country' options={countriesDropDown}
                      inputProps={{
                        'data-test': 'settings_delivery_address_country_drpdn',
                        search: true, onChange: (e, d) => {
                          setFieldValue('address.province', ''); this.handleCountry(e, d)
                        }
                      }} />
                    <Dropdown label='State/Province' name='address.province' options={provincesDropDown}
                      inputProps={{ search: true, disabled: !this.state.hasProvinces, 'data-test': 'settings_delivery_address_province_drpdn', }} />
                  </FormGroup> */}
                  <Header as='h3'><FormattedMessage id='settings.contactInfo' defaultMessage='Contact Info' /></Header>
                  <FormGroup data-test='settings_delivery_address_name_inp'>
                    <Input type='text' label={formatMessage({ id: 'global.name', defaultMessage: 'Name' })} name='name' fieldProps={{ width: 8 }} />
                  </FormGroup>
                  <FormGroup widths='equal' data-test='settings_delivery_address_emailPhone_inp'>
                    <Input type='text' label={formatMessage({ id: 'settings.contactEmail', defaultMessage: 'Contact Email' })} name='email' />
                    <PhoneNumber
                      name='phoneNumber'
                      values={values}
                      label={<FormattedMessage id='settings.contactPhone' defaultMessage='Contact Phone' />}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      errors={errors}
                      touched={touched}
                      isSubmitting={isSubmitting}
                    />
                  </FormGroup>
                  <div style={{ textAlign: 'right' }}>
                    <Button.Reset data-test='settings_delivery_address_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{(text) => text}</FormattedMessage>
                    </Button.Reset>
                    <Button.Submit data-test='settings_delivery_address_submit_btn'>
                      <FormattedMessage id='global.save' defaultMessage='Save'>{(text) => text}</FormattedMessage>
                    </Button.Submit>
                  </div>
                </>)
            }}
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

// const prepareAddressSuggest = (AddressSuggestOptions) => (
//   <datalist id='addresses'>
//     {AddressSuggestOptions.map((a, id) => <option key={id} value={a} />)}
//   </datalist>
// )

const mapStateToProps = state => {
  const { popupValues } = state.settings
  let address = getSafe(() => popupValues.address)
  // const AddressSuggestOptions = state.settings.addressSearch.map((a) => (
  //   a.streetAddress + ', ' + a.city + ', ' + a.zip.zip + ', ' + a.country.name + (a.province ? ', ' + a.province.name : '')
  // ))


  return {
    // AddressSuggestInput: prepareAddressSuggest(AddressSuggestOptions),
    // AddressSuggestOptions: AddressSuggestOptions,
    AddressSuggestData: state.settings.addressSearch,
    rowId: getSafe(() => popupValues.id),
    // hasProvinces: getSafe(() => address.country.hasProvinces, false),
    popupValues: popupValues && address ? {
      // firstName: popupValues.firstName,
      // lastName: popupValues.lastName,
      name: popupValues.name,
      email: popupValues.email,
      phoneNumber: popupValues.phoneNumber,
      address: {
        city: address.city,
        country: JSON.stringify({ countryId: getSafe(() => address.country.id), hasProvinces: getSafe(() => address.country.hasProvinces, false) }),
        province: !!address.province ? address.province.id : '',
        streetAddress: address.streetAddress,
        zip: address.zip.zip

      }
    } : null,
    countriesDropDown: state.settings.countriesDropDown,
    provincesDropDown: state.settings.provincesDropDown,
    countries: state.settings.countries,
    reloadFilter: {
      props: {
        currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
          state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
        deliveryAddressesFilter: state.settings.deliveryAddressesFilter
      },
      value: state.settings.filterValue
    },
  }
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(DeliveryAddressesPopup)))
