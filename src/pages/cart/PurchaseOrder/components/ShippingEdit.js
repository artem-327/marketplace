import React, { Component } from 'react'
import PropTypes from 'prop-types'
import "./ShippingEdit.scss"


import { FormattedMessage, injectIntl } from 'react-intl'

import { Formik, ErrorMessage } from 'formik'
import { Container, Form, Segment, Grid, GridRow, GridColumn, Input, Button, Radio, Divider, Header } from 'semantic-ui-react'
import * as Yup from 'yup'

import ShippingAddress from './ShippingAddress'

class ShippingEdit extends Component {
  
  newAddressMarkup = (handleChange) => {
    const { formatMessage } = this.props.intl

    return (
     <>

          <GridRow>
            <GridColumn computer={6}>
              <Form.Field>
                <label>
                  {formatMessage({
                    id: 'global.firstName',
                    defaultMessage: 'First Name'
                  })}
                </label>
                <Input onChange={handleChange} id='firstName' />
              </Form.Field>

            </GridColumn>

            <GridColumn computer={6}>
              <Form.Field>
                <label>
                  {formatMessage({
                    id: 'global.lastName',
                    defaultMessage: 'Last Name'
                  })}
                </label>
                <Input onChange={handleChange} id='lastName' />
              </Form.Field>
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn computer={12}>

              <Form.Field>
                <label>
                  {formatMessage({
                    id: 'global.address',
                    defaultMessage: 'Address'
                  })}
                </label>
                <Input onChange={handleChange} id='address.streetAddress' />
              </Form.Field>

            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn computer={4}>
              <Form.Field>
                <label>
                  {formatMessage({
                    id: 'global.city',
                    defaultMessage: 'City'
                  })}
                </label>
                <Input onChange={handleChange} id='address.city' />
              </Form.Field>
            </GridColumn>

            <GridColumn computer={4}>
              <Form.Field>

                <label>
                  {formatMessage({
                    id: 'global.state',
                    defaultMessage: 'State'
                  })}
                </label>
                <Input onChange={handleChange} id='address.state' />
              </Form.Field>
            </GridColumn>

            <GridColumn computer={4}>
              <Form.Field>
                <label>
                  {formatMessage({
                    id: 'global.zip',
                    defaultMessage: 'Postal Code'
                  })}
                </label>
                <Input onChange={handleChange} id='address.zip' />
              </Form.Field>
            </GridColumn>
          </GridRow>

          <GridRow>
            <GridColumn computer={8}>
              <Form.Field>
                <label>
                  {formatMessage({
                    id: 'global.email',
                    defaultMessage: 'E-mail Address'
                  })}
                </label>
                <Input onChange={handleChange} id='email' />
              </Form.Field>
            </GridColumn>

            <GridColumn computer={4}>
              <Form.Field>
                <label>
                  {formatMessage({
                    id: 'global.phoneNumber',
                    defaultMessage: 'Phone Number'
                  })}
                </label>
                <Input onChange={handleChange} id='phoneNumber' />
              </Form.Field>
            </GridColumn>
          </GridRow>
       </>
    )
  }


  render() {
    let { toggleRadio, isNewAddress, handleIsEdit, selectedAddress, savedShippingPreferences, postNewDeliveryAddress, putDeliveryAddressEdit, intl } = this.props

    const { formatMessage } = intl

    return (
      <Segment>
      <Grid className='bottom-padded'>
        <GridRow  className='header'>
          <GridColumn>
            <Header as='h2'>
              <FormattedMessage
                id='cart.1shipping'
                defaultMessage='1. Shipping'
              />
            </Header>

          </GridColumn>
        </GridRow>
      <Formik

        //  initialValues={{
        //   email: '',

        // TODO Yup validation
        // }}
        // validationSchema={Yup.object().shape({
        //   email: Yup.string()
        //     .email('Neplatný email')
        //     .required('Povinné pole'),
        // })}
        onSubmit={(values, { setSubmitting }) => {
          // TODO, not working
          if (isNewAddress) postNewDeliveryAddress(values)
          else putDeliveryAddressEdit(values)
        }}>

        {props => {
          const { values, handleChange, errors, isSubmitting, handleSubmit } = props

          return (

            <Container fluid>
              <Form onSubmit={handleSubmit} loading={this.props.isFetching}>
                <Grid padded>
                  <GridRow>
                    <GridColumn computer={6}>
                      <Form.Field>
                        <Radio
                          onChange={() => toggleRadio()}
                          checked={isNewAddress} label={formatMessage({
                            id: 'global.savedAddress'
                          })} />
                      </Form.Field>
                    </GridColumn>
                    <GridColumn computer={6}>
                      <Form.Field>
                        <Radio
                          onChange={() => toggleRadio()}
                          checked={!isNewAddress} label={formatMessage({
                            id: 'global.addNewAddress'
                          })} />
                      </Form.Field>
                    </GridColumn>

                  </GridRow>

                  {isNewAddress ? <ShippingAddress selectedAddress={this.props.selectedAddress} /> : this.newAddressMarkup(handleChange)}
                  {/* <GridRow>
                    <GridColumn computer={3}>
                      <Form.Field error={!!errors.email}>
                        <Input onChange={handleChange} id='email' />
                        <ErrorMessage name='email' />
                      </Form.Field>
                    </GridColumn>
                    <GridColumn computer={2}>
                      <Button positive fluid type='submit'>OK</Button>
                    </GridColumn>
                  </GridRow> */}


                  <Divider />
                  <GridRow>
                    <GridColumn computer={6}>
                      <Radio checked={savedShippingPreferences} onChange={() => toggleRadio('savedShippingPreferences')} label={formatMessage({
                        id: 'global.savedShippingPreferences'
                      })
                      } />
                    </GridColumn>

                    <GridColumn computer={6}>
                      <Radio checked={!savedShippingPreferences} onChange={() => toggleRadio('savedShippingPreferences')} label={formatMessage({
                        id: 'global.newShippingType'
                      })} />
                    </GridColumn>
                  </GridRow>

                  <GridRow>

                    <GridColumn floated='right' computer={6}>
                      <Grid columns={2}>
                        <GridRow>

                          <GridColumn>
                            <Button fluid onClick={() => handleIsEdit(false)}>
                              <FormattedMessage
                                id='global.cancel'
                                defaultMessage='Cancel'
                              />
                            </Button>
                          </GridColumn>

                          <GridColumn>
                            <Button primary fluid type='submit'>
                              <FormattedMessage
                                id={`global.${isNewAddress ? 'save' : 'edit'}`}
                                defaultMessage={isNewAddress ? 'Save' : 'Edit'}
                              />
                            </Button>

                          </GridColumn>
                        </GridRow>
                      </Grid>
                    </GridColumn>

                  </GridRow>
                </Grid>
              </Form>

            </Container>
          )
        }}

      </Formik>
      </Grid>
      </Segment>
    )
  }
}

// const ShippingEdit = ({ toggleRadio, isNewAddress, handleIsEdit, selectedAddress, postNewDeliveryAddress, putDeliveryAddressEdit, intl }) => {
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
//               : putDeliveryAddressEdit({ id: selectedAddress.id, ...values })
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

ShippingEdit.propTypes = {
  toggleRadio: PropTypes.func,
  handleIsEdit: PropTypes.func,
};
