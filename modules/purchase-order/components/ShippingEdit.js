import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Container, Segment, Grid, GridRow, GridColumn, Radio, Divider, Header, FormGroup } from 'semantic-ui-react'
import { Form, Input, Dropdown, Button } from 'formik-semantic-ui'
import { bool, func, object } from 'prop-types'

import * as Yup from 'yup'
import styled from 'styled-components'

import { provinceObjectRequired } from '~/constants/yupValidation'
import { PHONE_REGEXP } from '../../../src/utils/constants'

const BottomMargedGrid = styled(Grid)`
  margin-bottom: 1rem !important;
`

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  address: {
    zip: {
      zip: ''
    },
    city: '',
    streetAddress: '',
    province: '',
    country: ''
  },
}

class ShippingEdit extends Component {

  state = {
    stateId: null,
    hasProvinces: false,
    selectedProvince: null,
    provinceValidation: Yup.mixed().notRequired()
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

    return (
      Yup.object().shape({
        firstName: Yup.string(invalidString).required(requiredMessage),
        lastName: Yup.string(invalidString).required(requiredMessage),
        email: Yup.string().email(invalidEmail).required(requiredMessage),
        phoneNumber: Yup.string().matches(PHONE_REGEXP, invalidPhoneNumber).required(requiredMessage),
        address: Yup.object().shape({
          zip: Yup.object().shape({ zip: Yup.string().required(requiredMessage) }),
          city: Yup.string(invalidString).required(requiredMessage),
          country: Yup.string(invalidString).required(requiredMessage),
          streetAddress: Yup.string(invalidString).required(requiredMessage),
          province: this.state.provinceValidation
        })
      })
    )
  }

  componentDidMount() {
    let { selectedAddress, getStates } = this.props
    getStates()
    if (selectedAddress) {
      let { id, hasProvinces } = selectedAddress.address.country

      this.handleStateChange({ id, hasProvinces, provinceValidation: provinceObjectRequired(hasProvinces) })
    }
  }


  handleStateChange = ({ id, hasProvinces, selectedProvince = null }) => {
    if (this.state.stateId !== id) {
      this.setState({ stateId: id, hasProvinces, selectedProvince, provinceValidation: provinceObjectRequired(hasProvinces) })

      if (hasProvinces) {
        this.props.getProvinces(id)
      }
    }
  }

  newAddressMarkup = ({ errors, setFieldValue }) => {
    let { provinces, states, statesAreFetching, provincesAreFetching } = this.props

    return (
      <>
        <FormGroup>
          <Input
            fieldProps={{ width: 8 }}
            label={<FormattedMessage id='global.firstName' default='First Name' />}
            name='firstName' />

          <Input
            fieldProps={{ width: 8 }}
            label={<FormattedMessage id='global.lastName' defaultMessage='Last Name' />}
            name='lastName' />
        </FormGroup>

        <FormGroup>
          <Input
            fieldProps={{ width: 10 }}
            label={<FormattedMessage id='global.address' defaultMessage='Address' />}
            name='address.streetAddress' />

          <Input
            fieldProps={{ width: 6 }}
            label={<FormattedMessage id='global.zip' defaultMessage='Postal Code' />}
            name='address.zip.zip' />

        </FormGroup>

        <FormGroup widths='equal'>
          <Input
            label={<FormattedMessage id='global.city' defaultMessage='City' />}
            name='address.city' />

          <Dropdown
            inputProps={{
              onChange: (e, { value }) => {
                this.handleStateChange(value)
                setFieldValue('address.province', '')
              },
              error: !!(errors.address && errors.address.country),
              search: true
            }}
            options={states.map((state) => ({
              text: state.name,
              key: state.id,
              value: state
            }))}
            id='address.country'
            name='address.country'
            loading={statesAreFetching} selection fluid
            label={<FormattedMessage id='global.state' defaultMessage='State' />}
          />

          <Dropdown
            inputProps={{
              disabled: !this.state.hasProvinces,
              onChange: (e, { value }) => this.setState({ selectedProvince: value }),
              loading: provincesAreFetching,
              error: !!(this.state.hasProvinces && errors.address && errors.address.province),
              search: true
            }}
            options={provinces.map((province) => ({
              text: province.name,
              key: province.id,
              value: { id: province.id, name: province.name, abbreviation: province.abbreviation || '' }
            }))}
            id='address.province'
            name='address.province'
            selection fluid
            label={<FormattedMessage id='global.province' defaultMessage='Province' />}
          />

        </FormGroup>

        <FormGroup widths='equal'>
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


  handleSubmit = (values) => {
    let { address, email, firstName, lastName, phoneNumber } = values
    let { isNewAddress, postNewDeliveryAddress, updateDeliveryAddress } = this.props

    let payload = {
      address: {
        city: address.city,
        country: address.country.id,
        province: address.province && address.province.id,
        streetAddress: address.streetAddress,
        zip: address.zip.zip
      },
      email, firstName, lastName, phoneNumber,
    }


    if (!isNewAddress) postNewDeliveryAddress(payload)
    else updateDeliveryAddress({
      ...payload,
      id: this.props.selectedAddress.id
    })

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
          initialValues={selectedAddress ? { ...selectedAddress } : initialValues}
          validationSchema={this.validationSchema}>

          {props => {
            return (
              <Container>
                <FormGroup widths='equal'>
                  <Form.Field>
                    <Radio
                      onChange={() => shippingChanged({ isNewAddress: true })}
                      checked={isNewAddress}
                      disabled={!selectedAddress}
                      label={formatMessage({ id: 'global.savedAddress', defaultMessage: 'Saved Address' })}
                    />
                  </Form.Field>

                  <Form.Field>
                    <Radio
                      onChange={() => shippingChanged({ isNewAddress: false })}
                      checked={!isNewAddress}
                      label={formatMessage({ id: 'global.addNewAddress', defaultMessage: 'Add New' })}
                    />
                  </Form.Field>
                </FormGroup>
                {this.newAddressMarkup(props)}

                <Divider />
                <Grid>
                  {/* <GridRow>
                    <GridColumn computer={6}>
                      <Radio checked={savedShippingPreferences} onChange={() => shippingChanged({ savedShippingPreferences: true })} label={formatMessage({
                        id: 'global.savedShippingPreferences'
                      })
                      } />
                    </GridColumn>

                    <GridColumn computer={6}>
                      <Radio checked={!savedShippingPreferences} onChange={() => shippingChanged({ savedShippingPreferences: false })} label={formatMessage({
                        id: 'global.newShippingType'
                      })} />
                    </GridColumn>
                  </GridRow> */}
                  <GridRow>
                    <GridColumn>
                      <Grid>
                        <GridColumn floated='right' computer={4}>
                          <Button fieldProps={{ width: 4 }} onClick={() => shippingChanged({ isShippingEdit: false })} fluid >
                            <FormattedMessage
                              id='global.cancel'
                              defaultMessage='Cancel'
                            />
                          </Button>
                        </GridColumn>
                        <GridColumn computer={4}>
                          <Button.Submit loading={this.props.isFetching} primary fluid type='submit'>
                            <FormattedMessage
                              id={`global.${isNewAddress ? 'edit' : 'addNew'}`}
                              defaultMessage={isNewAddress ? 'Edit' : 'Add New'}
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

export default injectIntl(ShippingEdit)
