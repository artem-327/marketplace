import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Container, Segment, Grid, GridRow, GridColumn, Radio, Divider, Header, FormGroup } from 'semantic-ui-react'
import { Form, Input, Button, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import { bool, func, object } from 'prop-types'

import * as Yup from 'yup'
import styled from 'styled-components'

import { withToastManager } from 'react-toast-notifications'

import { PHONE_REGEXP } from '../../../src/utils/constants'
import { PhoneNumber } from '~/modules/phoneNumber'

const BottomMargedGrid = styled(Grid)`
  margin-bottom: 1rem !important;
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
  readyTime: '',
  closeTime: '',
  liftGate: false,
  forkLift: false,
  callAhead: false,
  deliveryNotes: ''
}

class ShippingEdit extends Component {
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
        <FormGroup widths='equal' data-test='purchase_order_shipping_edit_name_inp'>
          <Input label={<FormattedMessage id='global.contactName' default='Contact Name' />} name='contactName' />

          <Input
            label={<FormattedMessage id='global.addressName' defaultMessage='Address Name' />}
            name='addressName'
          />
        </FormGroup>
        <AddressForm displayHeader={false} values={values} setFieldValue={setFieldValue} />

        <FormGroup widths='equal' data-test='purchase_order_shipping_edit_emailPhone_inp'>
          <Input label={<FormattedMessage id='global.email' defaultMessage='E-mail Address' />} name='contactEmail' />

          <PhoneNumber
            name='contactPhone'
            values={values}
            label={<FormattedMessage id='global.phoneNumber' defaultMessage='Phone Number' />}
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
        <FormGroup widths='equal' data-test='settings_delivery_address_notes_inp' style={{ alignItems: 'center' }}>
          <Input
            type='text'
            label={formatMessage({ id: 'global.readyTime', defaultMessage: 'Ready Time' })}
            name='readyTime'
          />
          <Input
            type='text'
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
      </>
    )
  }

  handleSubmit = async (values, { setSubmitting }) => {
    let { isNewAddress } = this.props

    const { postNewDeliveryAddress, updateDeliveryAddress, toastManager } = this.props

    let payload = {
      ...values,
      address: {
        ...values.address,
        country: JSON.parse(values.address.country).countryId
      }
    }

    try {
      if (isNewAddress) await postNewDeliveryAddress(payload)
      else
        await updateDeliveryAddress({
          ...payload,
          id: this.props.selectedAddress.id
        })

      let status = isNewAddress ? 'Created' : 'Updated'

      toastManager.add(
        generateToastMarkup(
          <FormattedMessage id={`notifications.address${status}.header`} />,
          <FormattedMessage id={`notifications.address${status}.content`} values={{ name: payload.contactName }} />
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
    let { isNewAddress, shippingChanged, selectedAddress, savedShippingPreferences, intl } = this.props
    const { formatMessage } = intl

    return (
      <Segment>
        <BottomMargedGrid>
          <GridRow className='header'>
            <GridColumn>
              <Header as='h2'>
                <FormattedMessage id='cart.1shipping' defaultMessage='1. Shipping' />
              </Header>
            </GridColumn>
          </GridRow>
        </BottomMargedGrid>

        <Form
          onSubmit={this.handleSubmit}
          enableReinitialize
          initialValues={this.props.initialValues ? { ...initialValues, ...this.props.initialValues } : initialValues}
          validationSchema={this.validationSchema}>
          {props => {
            return (
              <Container>
                <FormGroup widths='equal'>
                  <Form.Field>
                    <Radio
                      onChange={() => shippingChanged({ isNewAddress: false })}
                      checked={!isNewAddress}
                      disabled={!selectedAddress}
                      label={formatMessage({ id: 'global.savedAddress', defaultMessage: 'Saved Address' })}
                      data-test='purchase_order_shipping_edit_savedAddress_rad'
                    />
                  </Form.Field>

                  <Form.Field>
                    <Radio
                      onChange={() => shippingChanged({ isNewAddress: true })}
                      checked={isNewAddress}
                      label={formatMessage({ id: 'global.addNewAddress', defaultMessage: 'Add New' })}
                      data-test='purchase_order_shipping_edit_addNewAddress_rad'
                    />
                  </Form.Field>
                </FormGroup>
                {this.markup(props)}
                <Divider />
                <Grid>
                  <GridRow>
                    <GridColumn>
                      <Grid>
                        <GridColumn floated='right' computer={4}>
                          <Button
                            fieldProps={{ width: 4 }}
                            onClick={() => shippingChanged({ isShippingEdit: false })}
                            fluid
                            data-test='purchase_order_shipping_edit_cancel_btn'>
                            <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                              {text => text}
                            </FormattedMessage>
                          </Button>
                        </GridColumn>
                        <GridColumn computer={4}>
                          <Button
                            onClick={e => {
                              props.submitForm()
                              e.stopPropagation()
                            }}
                            loading={this.props.isFetching}
                            primary
                            fluid
                            type='submit'
                            data-test='purchase_order_shipping_edit_submit_btn'>
                            <FormattedMessage
                              id={`global.${!isNewAddress ? 'edit' : 'addNew'}`}
                              defaultMessage={!isNewAddress ? 'Edit' : 'Add New'}>
                              {text => text}
                            </FormattedMessage>
                          </Button>
                        </GridColumn>
                      </Grid>
                    </GridColumn>
                  </GridRow>
                </Grid>
              </Container>
            )
          }}
        </Form>
      </Segment>
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
