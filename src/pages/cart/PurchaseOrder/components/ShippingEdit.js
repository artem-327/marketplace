import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "./ShippingEdit.scss"


import { FormattedMessage, injectIntl } from 'react-intl'

import styled from 'styled-components'

import { Container, Segment, Grid, GridRow, GridColumn, Radio, Divider, Header, FormGroup } from 'semantic-ui-react'
import { Form, Input, Dropdown, Button } from 'formik-semantic-ui'
import * as Yup from 'yup'
import { PHONE_REGEXP } from '../../../../utils/constants';

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
    }
  },
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string(<FormattedMessage id='validation.invalidString' />).required(<FormattedMessage id='validation.required' />),
  lastName: Yup.string(<FormattedMessage id='validation.invalidString' />).required(<FormattedMessage id='validation.required' />),
  email: Yup.string().email(<FormattedMessage id='validation.invalidEmail' />).required(<FormattedMessage id='validation.required' />),
  phoneNumber: Yup.string().matches(PHONE_REGEXP, <FormattedMessage id='validation.phoneNumber' />),
  address: Yup.object().shape({
    zip: Yup.object().shape({ zip: Yup.string().required(<FormattedMessage id='validation.required' />) }),
    city: Yup.string(<FormattedMessage id='validation.invalidString' />).required(<FormattedMessage id='validation.required' />),
    streetAddress: Yup.string(<FormattedMessage id='validation.invalidString' />).required(<FormattedMessage id='validation.required' />),
    province: Yup.object().shape({
      name: Yup.string().when('$hasProvinces', {
        is: false, then: (s) => {
          console.log('hmmm?', s)
          s.required(<FormattedMessage id='validation.required' />)
        }
      })
    })
  })
})


class ShippingEdit extends Component {

  state = {
    stateId: null,
    hasProvinces: false,
    selectedProvince: null
  }

  componentDidMount() {
    let { selectedAddress, getStates } = this.props
    getStates()
    if (selectedAddress) {
      let { id, hasProvinces } = selectedAddress.address.country
      this.handleStateChange({ id, hasProvinces })
    }
  }


  handleStateChange = ({ id, hasProvinces }) => {
    if (this.state.stateId !== id) {
      this.setState({ stateId: id, hasProvinces, selectedProvince: null })

      if (hasProvinces) {
        this.props.getProvinces(id)
      }
    }
  }

  newAddressMarkup = () => {
    const { formatMessage } = this.props.intl
    let { location } = this.props

    return (
      <>
        <FormGroup>
          <Input
            fieldProps={{ width: 6 }}
            label={
              <label>
                {formatMessage({
                  id: 'global.firstName',
                  defaultMessage: 'First Name'
                })}
              </label>
            }
            name='firstName' />

          <Input
            fieldProps={{ width: 6 }}
            label={
              <label>
                {formatMessage({
                  id: 'global.lastName',
                  defaultMessage: 'Last Name'
                })}
              </label>
            }
            name='lastName' />
        </FormGroup>
        <FormGroup>
          <Input
            fieldProps={{ width: 8 }}
            label={
              <label>
                {formatMessage({
                  id: 'global.address',
                  defaultMessage: 'Address'
                })}
              </label>
            }
            name='address.streetAddress' />

          <Input
            fieldProps={{ width: 4 }}
            label={
              <label>
                {formatMessage({
                  id: 'global.zip',
                  defaultMessage: 'Postal Code'
                })}
              </label>
            }
            name='address.zip.zip' />

        </FormGroup>

        <FormGroup>
          <Input
            fieldProps={{ width: 4 }}
            label={
              <label>
                {formatMessage({
                  id: 'global.city',
                  defaultMessage: 'City'
                })}
              </label>
            }
            name='address.city' />

          <Dropdown
            fieldProps={{ width: 4 }}
            inputProps={{
              onChange: (e, { value }) => this.handleStateChange(value)
            }}
            options={location.states.map((state) => ({
              text: state.name,
              key: state.id,
              value: state
            }))}
            id='address.country'
            name='address.country'
            loading={location.statesAreFetching} selection fluid
            label={
              <label>
                {formatMessage({
                  id: 'global.state',
                  defaultMessage: 'State'
                })}
              </label>
            } />
          <Dropdown

            fieldProps={{ width: 4 }}
            inputProps={{
              disabled: !this.state.hasProvinces,
              onChange: (e, { value }) => this.setState({ selectedProvince: value }),
              value: this.state.selectedProvince,
              loading: location.provincesAreFetching
            }}
            options={location.provinces.map((province) => ({
              text: province.name,
              key: province.id,
              value: province
            }))}
            id='address.province'
            name='address.province'
            selection fluid
            label={
              <label>
                {formatMessage({
                  id: 'global.province',
                  defaultMessage: 'Province'
                })}
              </label>
            } />

        </FormGroup>

        <FormGroup>
          <Input
            fieldProps={{ width: 6 }}
            label={
              <label>
                {formatMessage({
                  id: 'global.email',
                  defaultMessage: 'E-mail Address'
                })}
              </label>
            }
            name='email' />

          <Input
            fieldProps={{ width: 6 }}
            label={
              <label>
                {formatMessage({
                  id: 'global.phoneNumber',
                  defaultMessage: 'Phone Number'
                })}
              </label>
            }
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
        province: address.province.id,
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

    // validationSchema.isValid('hi', { context: { hasProvinces: this.state.hasProvinces } })

    return (
      <Segment>
        <BottomMargedGrid className='bottom-padded'>
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
          loading={true}
          enableReinitialize
          initialValues={selectedAddress ? { ...selectedAddress } : initialValues}
          validationSchema={validationSchema}
        // TODO Yup validation
        // }}
        // validationSchema={Yup.object().shape({
        //   address: Yup.object().shape({
        //     city: Yup.string().required(),
        //     country: Yup.object().shape({ id: Yup.number().required() }),

        //   }),
        //   email: Yup.string()
        //     .email('Neplatný email')
        //     .required('Povinné pole'),
        // })}
        >

          {props => {
            let { values } = props

            return (
              <Container>
                <FormGroup>
                  <Form.Field width={6}>
                    <Radio
                      onChange={() => shippingChanged({ isNewAddress: true })}
                      checked={isNewAddress}
                      disabled={!selectedAddress}
                      label={formatMessage({
                        id: 'global.savedAddress'
                      })} />
                  </Form.Field>

                  <Form.Field width={6}>
                    <Radio
                      onChange={() => shippingChanged({ isNewAddress: false })}
                      checked={!isNewAddress}
                      label={formatMessage({
                        id: 'global.addNewAddress'
                      })} />
                  </Form.Field>
                </FormGroup>
                {this.newAddressMarkup()}

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
                          <Button loading={this.props.isFetching} onClick={() => this.handleSubmit(values)} primary fluid type='submit'>
                            <FormattedMessage
                              id={`global.${isNewAddress ? 'edit' : 'addNew'}`}
                              defaultMessage={isNewAddress ? 'Edit' : 'Add New'}
                            />
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

export default injectIntl(ShippingEdit)