import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, GridColumn, Modal, Divider, FormGroup, Segment } from 'semantic-ui-react'
import { Form, Input, Button, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import { bool, func, object } from 'prop-types'
import { removeEmpty } from '~/utils/functions'

import * as Yup from 'yup'
import styled from 'styled-components'

import { withToastManager } from 'react-toast-notifications'

import { PHONE_REGEXP } from '../../../src/utils/constants'
import { PhoneNumber } from '~/modules/phoneNumber'
import { Required } from '~/components/constants/layout'

const CustomSegment = styled(Segment)`
  background-color: #f8f9fb !important;
  ${props => props.placeholder && `
    > .grid > .divider:after {
      height: 100% !important;
    }
  `}
`

import { AddressForm } from '~/modules/address-form'
import { addressValidationSchema } from '~/constants/yupValidation'
import { generateToastMarkup } from '~/utils/functions'

const initialValues = {
  addressName: '',
  contactPhone: '',
  contactName: '',
  contactEmail: '',
  address: {
    zip: '',
    city: '',
    streetAddress: '',
    province: '',
    country: ''
  },
  readyTime: null,
  closeTime: null,
  liftGate: false,
  forkLift: false,
  callAhead: false,
  deliveryNotes: ''
}

class ShippingEdit extends Component {
  state = {
    clickedNewAddressInEditMode: false
  }

  validationSchema = (opts = {}) => {
    let defaultOpts = {
      invalidString: <FormattedMessage id='validation.invalidString' defaultMessage='Invalid value' />,
      invalidEmail: <FormattedMessage id='validation.invalidEmail' defaultMessage='Invalid e-mail address' />,
      requiredMessage: <FormattedMessage id='validation.required' defaultMessage='Required' />,
      invalidPhoneNumber: <FormattedMessage id='validation.phoneNumber' defaultMessage='Enter valid phone number' />
    }

    let newOpts = { ...defaultOpts, ...opts }

    let { invalidString, invalidEmail, requiredMessage, invalidPhoneNumber } = newOpts

    return Yup.object().shape({
      contactName: Yup.string(invalidString).required(requiredMessage),
      //addressName: Yup.string(invalidString).required(requiredMessage),
      // lastName: Yup.string(invalidString).required(requiredMessage),
      contactEmail: Yup.string()
        .trim()
        .email(invalidEmail)
        .required(requiredMessage),
      contactPhone: Yup.string()
        .matches(PHONE_REGEXP, invalidPhoneNumber)
        .required(requiredMessage),
      address: addressValidationSchema()
    })
  }

  markup = ({ setFieldValue, values, setFieldTouched, errors, touched, isSubmitting }) => {
    const {
      intl: { formatMessage }
    } = this.props

    return (
      <>
        <label><b><FormattedMessage id='global.address' defaultMessage='Address' /></b></label>
        <AddressForm required displayHeader={false} values={values} setFieldValue={setFieldValue} />
        <label><b><FormattedMessage id='checkout.contactInfo' defaultMessage='Contact Info' /></b></label>
        <CustomSegment>
          <FormGroup widths='equal'>
            <Input
              label={<FormattedMessage id='global.addressName' defaultMessage='Address Name' />}
              name='addressName'
            />
            <Input
              label={
                <>
                  <FormattedMessage id='global.contactName' default='Contact Name' />
                  <Required />
                </>
              }
              name='contactName'
            />
          </FormGroup>

          <FormGroup widths='equal'>
            <PhoneNumber
              name='contactPhone'
              values={values}
              label={
                <>
                  <FormattedMessage id='global.phoneNumber' defaultMessage='Phone Number' />
                  <Required />
                </>
              }
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              errors={errors}
              touched={touched}
              isSubmitting={isSubmitting}
            />

            <Input
              label={
                <>
                  <FormattedMessage id='global.email' defaultMessage='E-mail Address' />
                  <Required />
                </>
              }
              name='contactEmail'
            />
          </FormGroup>

        </CustomSegment>
        <label><b> <FormattedMessage id='global.additionalInfo' defaultMessage='Additional Info' /></b></label>
        <CustomSegment>
          <Grid columns={2} stackable>
            <Divider vertical />
            <GridColumn>
              <FormGroup widths='equal'>
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
            </GridColumn>

            <GridColumn>
              <Input name='taxId'
                label={formatMessage({ id: 'global.taxId', defaultMessage: 'Tax ID' })}
                inputProps={{ placeholder: formatMessage({ id: 'global.placeholder.taxId', defaultMessage: '!Enter Tax ID' }) }} />
              < TextArea
                inputProps={{ rows: 2 }}
                name='deliveryNotes'
                label={formatMessage({ id: 'global.deliveryNotes', defaultMessage: 'Delivery Notes' })}
                inputProps={{ placeholder: formatMessage({ id: 'global.placeholder.deliveryNotes', defaultMessage: '!Write delivery notes here...' }) }}
              />

            </GridColumn>

          </Grid>
        </CustomSegment>
      </>
    )
  }

  handleSubmit = async (values, { setSubmitting }) => {
    let { isNewAddress, onClose, isWarehouse } = this.props

    const { handleSubmit, toastManager } = this.props

    let payload = {}

    try {
      if (isWarehouse) {
        payload = {
          deliveryAddress: {
            ...values,
            contactEmail: values.contactEmail.trim(),
            address: {
              ...values.address,
              country: JSON.parse(values.address.country).countryId
            }
          },
          taxId: values.taxId,
          warehouse: true
        }


      }
      else {
        payload = {
          ...values,
          contactEmail: values.contactEmail.trim(),
          address: {
            ...values.address,
            country: JSON.parse(values.address.country).countryId
          }
        }

      }
      removeEmpty(payload)
      await handleSubmit(payload)


      onClose()

      let status = isNewAddress ? 'Created' : 'Updated'
      let type = isWarehouse ? 'warehouse' : 'address'

      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id={`notifications.${type}${status}.header`} />,
          <FormattedMessage id={`notifications.${type}${status}.content`} values={{ name: payload.contactName }} />
        ),
        { appearance: 'success' }
      )
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  render() {
    let { isWarehouse, isNewAddress, shippingChanged, onClose } = this.props
    let header = null
    if (isWarehouse) {
      header = isNewAddress ? { id: 'checkout.addNewWarehouse', defaultMessage: '!Add New Warehouse' } : { id: 'checkout.editWarehouse', defaultMessage: '!Edit Warehouse' }
    } else {
      header = isNewAddress ? { id: 'checkout.addNewAddress', defaultMessage: 'Add New Address' } : { id: 'checkout.editAddress', defaultMessage: 'Edit Address' }
    }

    return (
      <Modal closeIcon open onClose={onClose}>
        <Modal.Header>
          <FormattedMessage {...header} />
        </Modal.Header>
        <Modal.Content>
          <Form
            onSubmit={this.handleSubmit}
            enableReinitialize
            initialValues={this.props.initialValues ? { ...initialValues, ...this.props.initialValues } : initialValues}
            validationSchema={this.validationSchema}>
            {props => {
              this.submitForm = props.submitForm
              return (
                this.markup(props)
              )
            }}
          </Form>
        </Modal.Content>

        <Modal.Actions>
          <Button
            onClick={onClose}
            data-test='purchase_order_shipping_edit_cancel_btn'>
            <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
              {text => text}
            </FormattedMessage>
          </Button>

          <Button
            onClick={e => {
              this.submitForm()
              e.stopPropagation()
            }}
            loading={this.props.isFetching}
            primary
            data-test='purchase_order_shipping_edit_submit_btn'>
            <FormattedMessage
              id={`global.${!isNewAddress ? 'save' : 'addNew'}`}
              defaultMessage={!isNewAddress ? 'Save' : 'Add New'}>
              {text => text}
            </FormattedMessage>
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

ShippingEdit.propTypes = {
  isNewAddress: bool,
  shippingChanged: func,
  selectedAddress: object,
  savedShippingPreferences: bool
}

ShippingEdit.defaultProps = {
  isNewAddress: false,
  selectedAddress: null,
  savedShippingPreferences: false
}

export default withToastManager(injectIntl(ShippingEdit))
