import React from 'react'
import { connect } from 'react-redux'
import { Modal, FormGroup, Header } from 'semantic-ui-react'

import {
  closePopup,
  updateDeliveryAddresses,
  createDeliveryAddress,
  getCountries,
  getProvinces,
  getAddressSearch
} from '../../actions'

import { Form, Input, Button, Dropdown, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import Router from 'next/router'
import { FormattedMessage, injectIntl } from 'react-intl'

import { getSafe } from '~/utils/functions'
import { errorMessages, provinceObjectRequired, minOrZeroLength } from '~/constants/yupValidation'

import { AddressForm } from '~/modules/address-form'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'
import { removeEmpty } from '~/utils/functions'

const initialFormValues = {
  addressName: '',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  address: {
    city: '',
    country: '',
    province: '',
    streetAddress: '',
    zip: ''
  },
  readyTime: null,
  closeTime: null,
  liftGate: false,
  forkLift: false,
  callAhead: false,
  deliveryNotes: ''
}

const formValidation = () =>
  Yup.lazy(values =>
    Yup.object().shape({
      addressName: minOrZeroLength(3),
      contactName: Yup.string()
        .trim()
        .min(3, errorMessages.minLength(3))
        .required(errorMessages.requiredMessage),
      contactEmail: Yup.string()
        .trim()
        .email(errorMessages.invalidEmail)
        .required(errorMessages.requiredMessage),
      contactPhone: Yup.string()
        .trim()
        .min(3, errorMessages.minLength(3))
        .required(errorMessages.requiredMessage),
      address: Yup.object().shape({
        city: Yup.string()
          .trim()
          .min(3, errorMessages.minLength(2))
          .required(errorMessages.requiredMessage),
        streetAddress: Yup.string()
          .trim()
          .min(3, errorMessages.minLength(2))
          .required(errorMessages.requiredMessage),
        zip: Yup.string()
          .trim()
          .required(errorMessages.requiredMessage),
        country: Yup.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
        province: provinceObjectRequired(getSafe(() => JSON.parse(values.address.country).hasProvinces))
      })
    })
  )

class DeliveryAddressesPopup extends React.Component {
  render() {
    const {
      closePopup,
      popupValues,
      rowId,
      updateDeliveryAddresses,
      createDeliveryAddress,
      reloadFilter,
      intl: { formatMessage }
    } = this.props

    return (
      <Modal closeIcon onClose={() => closePopup()} open centered={false} size='small'>
        <Modal.Header>
          {popupValues ? (
            <FormattedMessage id='settings.editDeliveryAddress' defaultMessage='Edit Delivery Address' />
          ) : (
            <FormattedMessage id='settings.addDeliveryAddress' defaultMessage='Add Delivery Address' />
          )}
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
              removeEmpty(payload)
              try {
                if (values.address.province === '') delete payload.address['province']
                if (popupValues) await updateDeliveryAddresses(rowId, payload, reloadFilter)
                else await createDeliveryAddress(payload, reloadFilter)

              } catch {
              } finally {
                setSubmitting(false)
              }
            }}>
            {({ values, setFieldValue, setFieldTouched, errors, touched, isSubmitting }) => {
              return (
                <>
                  {/* {AddressSuggestInput} */}
                  <FormGroup data-test='settings_delivery_address_name_inp'>
                    <Input
                      type='text'
                      label={formatMessage({ id: 'global.addressName', defaultMessage: 'Address Name' })}
                      name='addressName'
                      fieldProps={{ width: 16 }}
                    />
                  </FormGroup>
                  <Header as='h3'>
                    <FormattedMessage id='global.address' defaultMessage='Address' />
                  </Header>
                  <AddressForm values={values} displayHeader={false} setFieldValue={setFieldValue} required={true}/>
                  <Header as='h3'>
                    <FormattedMessage id='settings.contactInfo' defaultMessage='Contact Info' />
                  </Header>
                  <FormGroup data-test='settings_delivery_address_contact_inp'>
                    <Input
                      type='text'
                      label={
                        <>
                          {formatMessage({ id: 'global.contactName', defaultMessage: 'Contact Name' })}
                          <Required />
                        </>
                      }
                      name='contactName'
                      fieldProps={{ width: 8 }}
                    />
                  </FormGroup>
                  <FormGroup widths='equal' data-test='settings_delivery_address_emailPhone_inp'>
                    <Input
                      type='text'
                      label={
                        <>
                          {formatMessage({ id: 'settings.contactEmail', defaultMessage: 'Contact Email' })}
                          <Required />
                        </>
                      }
                      name='contactEmail'
                    />
                    <PhoneNumber
                      name='contactPhone'
                      values={values}
                      label={
                        <>
                          <FormattedMessage id='settings.contactPhone' defaultMessage='Contact Phone' />
                          <Required />
                        </>
                      }
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      errors={errors}
                      touched={touched}
                      isSubmitting={isSubmitting}
                    />
                  </FormGroup>

                  <Header as='h3'>
                    <FormattedMessage id='global.additionalInfo' defaultMessage='Additional Info' />
                  </Header>
                  <FormGroup
                    widths='equal'
                    data-test='settings_delivery_address_notes_inp'
                    style={{ alignItems: 'center' }}>
                    <Input
                      inputProps={{ type: 'time' }}
                      label={formatMessage({ id: 'global.readyTime', defaultMessage: 'Ready Time' })}
                      name='readyTime'
                    />
                    <Input
                      inputProps={{ type: 'time' }}
                      label={formatMessage({ id: 'global.closeTime', defaultMessage: 'Close Time' })}
                      name='closeTime'
                    />
                  </FormGroup>
                  <FormGroup widths='equal'>
                    <Checkbox
                      label={formatMessage({ id: 'global.liftGate', defaultMessage: 'Lift Gate' })}
                      name='liftGate'
                      inputProps={{ 'data-test': 'settings_delivery_address_liftGate_inp' }}
                    />
                    <Checkbox
                      label={formatMessage({ id: 'global.forkLift', defaultMessage: 'Fork Lift' })}
                      name='forkLift'
                      inputProps={{ 'data-test': 'settings_delivery_address_forklift_inp' }}
                    />
                    <Checkbox
                      label={formatMessage({ id: 'global.callAhead', defaultMessage: 'Call Ahead' })}
                      name='callAhead'
                      inputProps={{ 'data-test': 'settings_delivery_address_callAhead_inp' }}
                    />
                  </FormGroup>
                  <FormGroup widths='equal' data-test='settings_delivery_address_emailPhone_inp'>
                    <TextArea
                      name='deliveryNotes'
                      label={formatMessage({ id: 'global.deliveryNotes', defaultMessage: 'Delivery Notes' })}
                    />
                  </FormGroup>
                  <div style={{ textAlign: 'right' }}>
                    <Button.Reset data-test='settings_delivery_address_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Reset>
                    <Button.Submit data-test='settings_delivery_address_submit_btn'>
                      <FormattedMessage id='global.save' defaultMessage='Save'>
                        {text => text}
                      </FormattedMessage>
                    </Button.Submit>
                  </div>
                </>
              )
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
    popupValues:
      popupValues && address
        ? {
            addressName: popupValues.addressName,
            contactName: popupValues.contactName,
            contactEmail: popupValues.contactEmail,
            contactPhone: popupValues.contactPhone,
            address: {
              city: address.city,
              country: JSON.stringify({
                countryId: getSafe(() => address.country.id),
                hasProvinces: getSafe(() => address.country.hasProvinces, false)
              }),
              province: !!address.province ? address.province.id : '',
              streetAddress: address.streetAddress,
              zip: address.zip.zip
            },
            readyTime: getSafe(() => popupValues.readyTime, null),
            closeTime: getSafe(() => popupValues.closeTime, null),
            liftGate: getSafe(() => popupValues.liftGate, false),
            forkLift: getSafe(() => popupValues.forkLift, false),
            callAhead: getSafe(() => popupValues.callAhead, false),
            deliveryNotes: getSafe(() => popupValues.deliveryNotes, '')
          }
        : null,
    countriesDropDown: state.settings.countriesDropDown,
    provincesDropDown: state.settings.provincesDropDown,
    countries: state.settings.countries,
    reloadFilter: {
      props: {
        currentTab:
          Router && Router.router && Router.router.query && Router.router.query.type
            ? state.settings.tabsNames.find(tab => tab.type === Router.router.query.type)
            : state.settings.tabsNames[0],
        deliveryAddressesFilter: state.settings.deliveryAddressesFilter
      },
      value: state.settings.filterValue
    }
  }
}

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(DeliveryAddressesPopup))
