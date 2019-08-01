import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Container, Segment, Grid, GridRow, GridColumn, Radio, Divider, Header, FormGroup } from 'semantic-ui-react'
import { Form, Input, Button } from 'formik-semantic-ui'
import { bool, func, object } from 'prop-types'

import * as Yup from 'yup'
import styled from 'styled-components'

import { withToastManager } from 'react-toast-notifications'

import { PHONE_REGEXP } from '../../../src/utils/constants'

const BottomMargedGrid = styled(Grid)`
  margin-bottom: 1rem !important;
`

import { AddressForm } from '~/modules/address-form'
import { addressValidationSchema } from '~/modules/address-form/constants'
import { generateToastMarkup } from '~/utils/functions'

const initialValues = {
  name: '',
  email: '',
  phoneNumber: '',
  address: {
    zip: '',
    city: '',
    streetAddress: '',
    province: '',
    country: ''
  },
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

    return (
      Yup.object().shape({
        name: Yup.string(invalidString).required(requiredMessage),
        // lastName: Yup.string(invalidString).required(requiredMessage),
        email: Yup.string().email(invalidEmail).required(requiredMessage),
        phoneNumber: Yup.string().matches(PHONE_REGEXP, invalidPhoneNumber).required(requiredMessage),
        address: addressValidationSchema()
      })
    )
  }

  markup = ({ setFieldValue, values }) => {
    return (
      <>
        <FormGroup widths='equal' data-test='purchase_order_shipping_edit_name_inp' >
          <Input
            label={<FormattedMessage id='global.name' default='Name' />}
            name='name' />
        </FormGroup>
        <AddressForm displayHeader={false} values={values} setFieldValue={setFieldValue} />

        <FormGroup widths='equal' data-test='purchase_order_shipping_edit_emailPhone_inp'>
          <Input
            label={<FormattedMessage id='global.email' defaultMessage='E-mail Address' />}
            name='email' />

          <Input
            label={<FormattedMessage id='global.phoneNumber' defaultMessage='Phone Number' />}
            name='phoneNumber' />

        </FormGroup>
      </>
    )
  }


  handleSubmit = async (values, { setSubmitting }) => {
    let { email, name, phoneNumber } = values
    let { isNewAddress } = this.props

    const { postNewDeliveryAddress, updateDeliveryAddress, toastManager } = this.props

    let payload = {
      address: {
        ...values.address,
        country: JSON.parse(values.address.country).countryId
      },
      email, name, phoneNumber,
    }

    try {
      if (isNewAddress) await postNewDeliveryAddress(payload)
      else await updateDeliveryAddress({
        ...payload,
        id: this.props.selectedAddress.id
      })

      let status = isNewAddress ? 'Created' : 'Updated'

      toastManager.add(generateToastMarkup(
        <FormattedMessage id={`notifications.address${status}.header`} />,
        <FormattedMessage id={`notifications.address${status}.content`} values={{ name }} />
      ), { appearance: 'success' })


    }
    catch (e) { console.error(e) }
    finally { setSubmitting(false) }

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
                <FormattedMessage
                  id='cart.1shipping'
                  defaultMessage='1. Shipping'
                />
              </Header>

            </GridColumn>
          </GridRow>
        </BottomMargedGrid>

        <Form
          onSubmit={this.handleSubmit}
          enableReinitialize
          initialValues={this.props.initialValues ? { ...this.props.initialValues } : initialValues}
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
                    />
                  </Form.Field>

                  <Form.Field>
                    <Radio
                      onChange={() => shippingChanged({ isNewAddress: true })}
                      checked={isNewAddress}
                      label={formatMessage({ id: 'global.addNewAddress', defaultMessage: 'Add New' })}
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
                          <Button fieldProps={{ width: 4 }} onClick={() => shippingChanged({ isShippingEdit: false })} fluid data-test='purchase_order_shipping_edit_cancel_btn'>
                            <FormattedMessage
                              id='global.cancel'
                              defaultMessage='Cancel'
                            />
                          </Button>
                        </GridColumn>
                        <GridColumn computer={4}>
                          <Button.Submit loading={this.props.isFetching} primary fluid type='submit' data-test='purchase_order_shipping_edit_submit_btn'>
                            <FormattedMessage
                              id={`global.${!isNewAddress ? 'edit' : 'addNew'}`}
                              defaultMessage={!isNewAddress ? 'Edit' : 'Add New'}
                            />
                          </Button.Submit>
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
