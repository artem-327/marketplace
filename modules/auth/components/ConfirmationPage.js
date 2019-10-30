import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, Header, Segment, Image, Divider } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import styled from 'styled-components'
import * as val from 'yup'
import Router from 'next/router'
import Logo from '~/assets/images/logos/logo-dark.png'

import { dunsValidation, addressValidationSchema, errorMessages, einValidation, phoneValidation } from '~/constants/yupValidation'

import { getSafe } from '~/utils/functions'
import { AddressForm } from '~/modules/address-form'
import { PhoneNumber } from '~/modules/phoneNumber'

const ConfirmSegment = styled(Segment.Group)`
  position: relative;
  display: flex !important;
  width: 800px;
  margin: 55px auto auto !important;
  padding-top: 85px !important;
  background-color: #fff !important;
`
const LogoWrapper = styled(Segment)`
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-50%);
`
const LogoImage = styled(Image)`
  width: 126px;
  max-width: 100%;
  margin: auto;
`

const initValues = {
  address: {
    address: {
      city: '',
      country: '',
      province: '',
      streetAddress: '',
      zip: ''
    },
    addressName: '',
    callAhead: false,
    closeTime: '',
    contactEmail: '',
    contactName: '',
    contactPhone: '',
    deliveryNotes: '',
    forkLift: false,
    liftGate: false,
    readyTime: '',
  },
  companyAdminUser: {
    name: '',
    jobTitle: '',
    phone: '',
    email: ''
  },
  dba: '',
  dunsNumber: '',
  name: '',
  tin: ''
}

const validationScheme = val.object().shape({
  address: val.object().shape({
    address: addressValidationSchema(),
    addressName: val.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
    contactName: val.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
    contactEmail: val.string(errorMessages.invalidEmail).email(errorMessages.invalidEmail).required(errorMessages.requiredMessage),
    contactPhone: phoneValidation().required(errorMessages.requiredMessage),
  }),
  companyAdminUser: val.object().shape({
    name: val.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
    jobTitle: val.string(),
    phone: phoneValidation(),
    email: val.string(errorMessages.invalidEmail).email(errorMessages.invalidEmail).required(errorMessages.requiredMessage)
  }),
  dba: val.string(),
  dunsNumber: dunsValidation(),
  name: val.string(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
  tin: einValidation()
})

class ConfirmationPage extends Component {

  componentDidMount() {
    if (getSafe(() => this.props.identity.branches[0].address.country.id, false)) {
      this.props.searchProvinces(this.props.identity.branches[0].address.country.id)
    }
  }

  render() {
    const {
      confirmationForm,
      identity,
      intl,
      reviewCompany,
      searchedCountries,
      searchedProvinces,
      searchCountries,
      searchProvinces
    } = this.props
    const isAdmin = identity.roles.map(r => r.id).indexOf(1) > -1

    let { formatMessage } = intl
    
    return (
      <Form
        enableReinitialize
        initialValues={{ ...initValues, ...confirmationForm }}
        validationSchema={validationScheme}
        onSubmit={async (values, actions) => {

          let payload = {
            ...values,
            dunsNumber: values.dunsNumber ? parseInt(values.dunsNumber, 10) : null,
            address: {
              ...values.address,
              address: {
                ...values.address.address,
                country: JSON.parse(values.address.address.country).countryId
              }
            }
          }

          try {
            await reviewCompany(payload)
            actions.setSubmitting(false)
            Router.push('/dwolla-register')
          }
          catch { }
          finally {
            actions.setSubmitting(false)
          }
        }}
        className='flex stretched'
        style={{ padding: '20px' }}>
        {({ values, setFieldValue, validateForm, submitForm, setFieldTouched, errors, touched, isSubmitting }) => {
          return (
            <ConfirmSegment raised compact>
              <Segment padded='very' style={{ position: 'static', paddingTop: '0' }}>
                <LogoWrapper basic textAlign='center'>
                  <LogoImage src={Logo} />
                </LogoWrapper>
                <Header as='h2' textAlign='center'>
                  <FormattedMessage id='laststep.header' defaultMessage='Last Step' />
                </Header>
                <Header as='h2' textAlign='center' style={{ marginTop: '0', paddingTop: '0.5em', fontSize: '1.14285714em' }}>
                  <FormattedMessage id='laststep.subheader' defaultMessage='Please verify the company information below.' />
                </Header>

                <Header as='h3'>
                  <FormattedMessage id='laststep.company.header' defaultMessage='Company Profile' />
                </Header>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column data-test='auth_confirm_companyName_inp' >
                      <Input label={formatMessage({ id: 'laststep.company.name', defaultMessage: 'Company Legal Name *' })}
                        name='name' />
                    </Grid.Column>
                    <Grid.Column data-test='auth_confirm_companyDBA_inp' >
                      <Input label={formatMessage({ id: 'laststep.company.dba', defaultMessage: 'DBA' })}
                        name='dba' />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Header as='h3'>
                  <FormattedMessage id='laststep.address.header' defaultMessage='Company Primary Address' />
                </Header>
                <AddressForm setFieldValue={setFieldValue} values={values} displayHeader={false} prefix='address' />

                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column data-test='auth_confirm_addressEIN_inp' >
                      <Input label={formatMessage({ id: 'laststep.address.ein', defaultMessage: 'EIN Number *' })}
                        name='tin' />
                    </Grid.Column>
                    <Grid.Column data-test='auth_confirm_addressDUNS_inp'>
                      <Input label={formatMessage({ id: 'laststep.address.duns', defaultMessage: 'DUNS Number' })}
                        name='dunsNumber' />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Header as='h3'>
                  <FormattedMessage id='global.additionalInfo' defaultMessage='Additional Info' />
                </Header>

                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column data-test='auth_confirm_addressAddressName_inp' >
                      <Input label={formatMessage({ id: 'laststep.address.addressName', defaultMessage: 'Address Name *' })}
                             name='address.addressName' />
                    </Grid.Column>
                    <Grid.Column data-test='auth_confirm_addressContactName_inp'>
                      <Input label={formatMessage({ id: 'laststep.address.contactName', defaultMessage: 'Contact Name *' })}
                             name='address.contactName' />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column data-test='auth_confirm_addressContactPhone_inp' >
                      <PhoneNumber
                        label={formatMessage({ id: 'laststep.address.contactPhone', defaultMessage: 'Contact Phone *' })}
                        name='address.contactPhone'
                        values={values} setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched} errors={errors}
                        touched={touched} isSubmitting={isSubmitting}
                      />
                    </Grid.Column>
                    <Grid.Column data-test='auth_confirm_addressContactEmail_inp'>
                      <Input label={formatMessage({ id: 'laststep.address.contactEmail', defaultMessage: 'Contact E-Mail *' })}
                             name='address.contactEmail' />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column data-test='auth_confirm_addressReadyTime_inp' >
                      <Input label={formatMessage({ id: 'laststep.address.readyTime', defaultMessage: 'Ready Time' })}
                             name='address.readyTime' />
                    </Grid.Column>
                    <Grid.Column data-test='auth_confirm_addressCloseTime_inp'>
                      <Input label={formatMessage({ id: 'laststep.address.closeTime', defaultMessage: 'Close Time' })}
                             name='address.closeTime' />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <Grid>
                  <Grid.Row columns={3}>
                    <Grid.Column data-test='auth_confirm_addressCallAhead_inp' >
                      <Checkbox label={formatMessage({ id: 'global.callAhead', defaultMessage: 'Call Ahead' })}
                             name='address.callAhead' />
                    </Grid.Column>
                    <Grid.Column data-test='auth_confirm_addressForkLift_inp'>
                      <Checkbox label={formatMessage({ id: 'global.forkLift', defaultMessage: 'Fork Lift' })}
                             name='address.forkLift' />
                    </Grid.Column>
                    <Grid.Column data-test='auth_confirm_addressLiftGate_inp'>
                      <Checkbox label={formatMessage({ id: 'global.liftGate', defaultMessage: 'Lift Gate' })}
                                name='address.liftGate' />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>

                <TextArea
                  name='address.deliveryNotes'
                  label={formatMessage({ id: 'global.deliveryNotes', defaultMessage: 'Delivery Notes' })}
                  data-test='auth_confirm_addressDeliveryNotes_textArea'
                />

                <Header as='h3'>
                  <FormattedMessage id='laststep.admin.header' defaultMessage='Company Admin Profile' />
                </Header>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column data-test='auth_confirm_adminName_inp' >
                      <Input label={formatMessage({ id: 'laststep.admin.name', defaultMessage: 'Name *' })}
                        name='companyAdminUser.name' />
                    </Grid.Column>
                    <Grid.Column data-test='auth_confirm_adminTitle_inp'>
                      <Input label={formatMessage({ id: 'laststep.admin.title', defaultMessage: 'Title' })}
                        name='companyAdminUser.jobTitle' />
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row columns={2}>
                    <Grid.Column data-test='auth_confirm_adminPhone_inp'>
                      <PhoneNumber
                        label={formatMessage({ id: 'laststep.admin.phone', defaultMessage: 'Phone' })}
                        name='companyAdminUser.phone'
                        values={values} setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched} errors={errors}
                        touched={touched} isSubmitting={isSubmitting}
                      />
                    </Grid.Column>
                    <Grid.Column data-test='auth_confirm_adminEmail_inp'>
                      <Input label={formatMessage({ id: 'laststep.admin.email', defaultMessage: 'E-Mail *' })}
                        name='companyAdminUser.email' />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
              <Segment padded='very'>
                <Grid>
                  <Grid.Row>
                    <Grid.Column aligned='right' textAlign='right'>
                      <Button style={{ marginRight: '1em' }} onClick={() => { isAdmin ? Router.push('/admin') : Router.push('/inventory/my') }} data-test='auth_confirm_cancel_btn'>
                        <FormattedMessage id='laststep.cancel' defaultMessage='Cancel'>{(text) => text}</FormattedMessage>
                      </Button>
                      <Button.Submit color='blue' data-test='auth_confirm_submit_btn'>
                        <FormattedMessage id='laststep.submit' defaultMessage='Enter Echo Exchange'>{(text) => text}</FormattedMessage>
                      </Button.Submit>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </ConfirmSegment>
          )
        }
        }
      </Form>
    )
  }
}

const stateToProps = ({ auth: { confirmationForm, identity } }) => ({ confirmationForm, identity })

export default connect(stateToProps, Actions)(injectIntl(ConfirmationPage))