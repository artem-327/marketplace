import React, {Component} from 'react'
// import PropTypes from 'prop-types'
import './ShippingEdit.scss'

import {FormattedMessage} from 'react-intl'

import styled from 'styled-components'

import {Container, Segment, Grid, GridRow, GridColumn, Radio, Divider, Header, FormGroup} from 'semantic-ui-react'
import {Form, Input, Dropdown, Button} from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import {PHONE_REGEXP} from '../../../../utils/constants'
import {errorMessages, provinceObjectRequired} from '~/constants/yupValidation'

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
    province: {
      name: ''
    },
    country: ''
  }
}

export default class ShippingEdit extends Component {
  state = {
    stateId: null,
    hasProvinces: false,
    selectedProvince: null
  }

  validationSchema = (opts = {}) => {
    let defaultOpts = errorMessages

    let newOpts = {...defaultOpts, ...opts}

    let {invalidString, invalidEmail, requiredMessage, invalidPhoneNumber} = newOpts

    return Yup.object().shape({
      firstName: Yup.string(invalidString).required(requiredMessage),
      lastName: Yup.string(invalidString).required(requiredMessage),
      email: Yup.string()
        .email(invalidEmail)
        .required(requiredMessage),
      phoneNumber: Yup.string()
        .matches(PHONE_REGEXP, invalidPhoneNumber)
        .required(requiredMessage),
      address: Yup.object().shape({
        zip: Yup.object().shape({zip: Yup.string().required(requiredMessage)}),
        city: Yup.string(invalidString).required(requiredMessage),
        country: Yup.string(invalidString).required(requiredMessage),
        streetAddress: Yup.string(invalidString).required(requiredMessage),
        province: provinceObjectRequired(this.state.hasProvinces)
      })
    })
  }

  componentDidMount() {
    let {selectedAddress, getStates} = this.props
    getStates()
    if (selectedAddress) {
      let {id, hasProvinces} = selectedAddress.address.country

      this.handleStateChange({id, hasProvinces})
    }
  }

  handleStateChange = ({id, hasProvinces, selectedProvince = null}) => {
    if (this.state.stateId !== id) {
      this.setState({stateId: id, hasProvinces, selectedProvince})

      if (hasProvinces) {
        this.props.getProvinces(id)
      }
    }
  }

  newAddressMarkup = props => {
    let {location} = this.props
    let {errors, setFieldValue, values} = props
    return (
      <>
        <FormGroup data-test='cart_shipping_edit_name_inp'>
          <Input
            fieldProps={{width: 8}}
            label={<FormattedMessage id='global.firstName' default='First Name' />}
            name='firstName'
          />

          <Input
            fieldProps={{width: 8}}
            label={<FormattedMessage id='global.lastName' defaultMessage='Last Name' />}
            name='lastName'
          />
        </FormGroup>

        <FormGroup data-test='cart_shipping_edit_streetZip_inp'>
          <Input
            fieldProps={{width: 10}}
            label={<FormattedMessage id='global.address' defaultMessage='Address' />}
            name='address.streetAddress'
          />

          <Input
            fieldProps={{width: 6}}
            label={<FormattedMessage id='global.zip' defaultMessage='Postal Code' />}
            name='address.zip.zip'
          />
        </FormGroup>

        <FormGroup widths='equal' data-test='cart_shipping_edit_city_inp'>
          <Input label={<FormattedMessage id='global.city' defaultMessage='City' />} name='address.city' />

          <Dropdown
            inputProps={{
              'data-test': 'cart_shipping_edit_country_drpdn',
              onChange: (e, {value}) => {
                this.handleStateChange(value)
                setFieldValue('address.province.name', '')
              },
              search: true,
              error: !!(errors.address && errors.address.country)
            }}
            options={location.states.map(state => ({
              text: state.name,
              key: state.id,
              value: state
            }))}
            id='address.country'
            name='address.country'
            loading={location.statesAreFetching}
            selection
            fluid
            label={<FormattedMessage id='global.state' defaultMessage='State' />}
          />

          <Dropdown
            inputProps={{
              'data-test': 'cart_shipping_edit_province_drpdn',
              disabled: !this.state.hasProvinces,
              onChange: (e, {value}) => this.setState({selectedProvince: value}),
              loading: location.provincesAreFetching,
              error: !!(this.state.hasProvinces && errors.address && errors.address.province),
              search: true
            }}
            options={location.provinces.map(province => ({
              text: province.name,
              key: province.id,
              value: {id: province.id, name: province.name, abbreviation: province.abbreviation || ''}
            }))}
            id='address.province'
            name='address.province'
            selection
            fluid
            label={<FormattedMessage id='global.stateProvince' defaultMessage='State/Province' />}
          />
        </FormGroup>

        <FormGroup widths='equal' data-test='cart_shipping_edit_emailPhone_inp'>
          <Input label={<FormattedMessage id='global.email' defaultMessage='E-mail Address' />} name='email' />

          <Input
            label={<FormattedMessage id='global.phoneNumber' defaultMessage='Phone Number' />}
            name='phoneNumber'
          />
        </FormGroup>
      </>
    )
  }

  handleSubmit = values => {
    let {address, email, firstName, lastName, phoneNumber} = values
    let {isNewAddress, postNewDeliveryAddress, updateDeliveryAddress} = this.props

    let payload = {
      address: {
        city: address.city,
        country: address.country.id,
        province: address.province.id,
        streetAddress: address.streetAddress,
        zip: address.zip.zip
      },
      email,
      firstName,
      lastName,
      phoneNumber
    }

    if (!isNewAddress) postNewDeliveryAddress(payload)
    else
      updateDeliveryAddress({
        ...payload,
        id: this.props.selectedAddress.id
      })
  }

  render() {
    let {isNewAddress, shippingChanged, selectedAddress, savedShippingPreferences} = this.props

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
          loading={true}
          enableReinitialize
          initialValues={selectedAddress ? {...selectedAddress} : initialValues}
          validationSchema={this.validationSchema}>
          {props => {
            return (
              <Container>
                <FormGroup widths='equal'>
                  <Form.Field>
                    <Radio
                      onChange={() => shippingChanged({isNewAddress: true})}
                      checked={isNewAddress}
                      disabled={!selectedAddress}
                      label={
                        <label>
                          <FormattedMessage id='global.savedAddress' defaultMessage='Saved Address' />{' '}
                        </label>
                      }
                      data-test='cart_shipping_edit_savedAddress_rad'
                    />
                  </Form.Field>

                  <Form.Field>
                    <Radio
                      onChange={() => shippingChanged({isNewAddress: false})}
                      checked={!isNewAddress}
                      label={
                        <label>
                          <FormattedMessage id='global.addNewAddress' defaultMessage='Add New' />{' '}
                        </label>
                      }
                      data-test='cart_shipping_edit_addNewAddress_rad'
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
                          <Button
                            fieldProps={{width: 4}}
                            onClick={() => shippingChanged({isShippingEdit: false})}
                            fluid
                            data-test='cart_shipping_edit_cancel_btn'>
                            <FormattedMessage id='global.cancel' defaultMessage='Cancel' />
                          </Button>
                        </GridColumn>
                        <GridColumn computer={4}>
                          <Button.Submit
                            loading={this.props.isFetching}
                            primary
                            fluid
                            type='submit'
                            data-test='cart_shipping_edit_submit_btn'>
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

// const ShippingEdit = ({toggleRadio, isNewAddress, handleIsEdit, selectedAddress, postNewDeliveryAddress, updateDeliveryAddress, intl }) => {
//   const radioOptions = [
//     {
//       value: "isEdit",
//       label: 'Saved Address'
//     },
//     {
//       value: "isNew",
//       label: 'Add New Address'
//     }
//   ];
//   const { formatMessage } = intl;
//   return (
//     <div className="shopping-cart-items">
//       <header>
//         <h1>
//           <FormattedMessage
//             id='cart.1shipping'
//             defaultMessage='1. Shipping'
//           />
//         </h1>
//       </header>
//       <div className="purchase-order-section">
//         <Radio onChange={value => handleIsEdit(value)}
//           name='isNewAddress'
//           className='br-config-radio'
//           opns={radioOptions}
//           checked={isNewAddress}
//           disabled={!Object.keys(selectedAddress).length}
//         />
//         {/* TODO: send id instead of string to province - waiting for backend endpoint */}
//         {/* TODO: which fields are required? */}
//         <Form
//           model="forms.shippingEdit"
//           onSubmit={values =>
//             isNewAddress === "isNew" ?
//               postNewDeliveryAddress(values)
//               : updateDeliveryAddress({ id: selectedAddress.id, ...values })
//           }
//           className="shipping-edit">
//           <FormInput
//             name=".firstName"
//             label={formatMessage({
//               id: 'global.firstName',
//               defaultMessage: 'First Name'
//             })}
//           />
//           <FormInput
//             name=".lastName"
//             label={formatMessage({
//               id: 'global.lastName',
//               defaultMessage: 'Last Name'
//             })}
//           />
//           <FormInput
//             name=".address.streetAddress"
//             label={formatMessage({
//               id: 'global.address',
//               defaultMessage: 'Address'
//             })}
//           />
//           <FormInput
//             name=".address.city"
//             label={formatMessage({
//               id: 'global.city',
//               defaultMessage: 'City'
//             })}
//           />
//           <FormInput
//             name=".address.province"
//             label={formatMessage({
//               id: 'global.state',
//               defaultMessage: 'State'
//             })}
//           />
//           <FormInput
//             name=".zipCode"
//             label={formatMessage({
//               id: 'global.postalCode',
//               defaultMessage: 'Postal Code'
//             })}
//           />
//           <FormInput
//             name=".email"
//             label={formatMessage({
//               id: 'global.email',
//               defaultMessage: 'E-mail'
//             })}
//           />
//           <FormInput
//             name=".phoneNumber"
//             label={formatMessage({
//               id: 'global.phoneNumber',
//               defaultMessage: 'Phone Number'
//             })}
//           />
//           <footer className="popup-footer">
//             <Button
//               color="grey"
//               onClick={toggleRadio}>
//               <FormattedMessage
//                 id='global.cancel'
//                 defaultMessage='Cancel'
//               />
//             </Button>
//             {
//               isNewAddress === "isNew"
//               &&
//               <Button color="blue">
//                 <FormattedMessage
//                   id='global.save'
//                   defaultMessage='Save'
//                 />
//               </Button>
//             }
//             {
//               isNewAddress !== "isNew"
//               &&
//               <Button color="blue">
//                 <FormattedMessage
//                   id='global.edit'
//                   defaultMessage='Edit'
//                 />
//               </Button>
//             }
//           </footer>
//         </Form>
//       </div>
//     </div>
//   )
// }
