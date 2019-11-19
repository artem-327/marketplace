import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, Header, Segment, Image, Divider } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import styled from 'styled-components'
import * as val from 'yup'
import Router from 'next/router'

import Logo from '~/assets/images/login/logo-login.png'

import { dunsValidation, addressValidationSchema, errorMessages, einValidation, phoneValidation } from '~/constants/yupValidation'

import { getSafe } from '~/utils/functions'
import { AddressForm } from '~/modules/address-form'
import { PhoneNumber } from '~/modules/phoneNumber'

const ConfirmSegment = styled(Segment.Group)`
  position: relative;
  display: flex !important;
  width: 800px;
  margin: 100px auto 0 !important;
  border: 0 none !important;
  padding: 40px 40px 0 !important;
  background: #fff;
  box-shadow: 0 0 0 3000px #1B3454 !important;
`

const InnerSegment = styled(Segment)`
  margin: 0 !important;
  border: 0 none !important;
  padding: 0 0 40px !important;
  background: #fff !important;
  box-shadow: 0 0 0 transparent !important;
`

const ButtonsSegment = styled(Segment)`
  padding: 40px 0 !important
`

const LogoWrapper = styled(Segment)`
  position: absolute !important;
  top: -165px;
  left: 50%;
  width: 348px;
  max-width: 348px;
  margin: 0 0 0 -174px !important;
  border: 0 none !important;
  padding: 0 !important;
  background: transparent !important;
  box-shadow: 0 0 0 0 transparent !important;
`

const LogoImage = styled(Image)`
  width: 100%;
  height: auto;
`

const LoginHeader = styled.div`
  position: relative;
  margin: -31px 0 1.8571429rem -40px;
  padding: 0 0 4px 40px;
  text-decoration: none !important;
  font-size: 1.7857143em;
  font-weight: 400;
  line-height: 2.44;
  
  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 103px;
    height: 4px;
    background: #1B3454;
  }
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
              <InnerSegment>
                <LogoWrapper basic textAlign='center'>
                  <LogoImage src={Logo} />
                </LogoWrapper>

                <LoginHeader as='h1'>
                  <FormattedMessage id='laststep.header' defaultMessage='Last Step' />
                </LoginHeader>

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
                  <Grid.Row columns={1}>
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
              </InnerSegment>
              <ButtonsSegment>
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
              </ButtonsSegment>
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