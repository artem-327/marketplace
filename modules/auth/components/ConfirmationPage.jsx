import { useEffect } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Grid, Header, Segment, Image, Divider } from 'semantic-ui-react'
import { Form, Input, Button, Dropdown, Checkbox, TextArea } from 'formik-semantic-ui-fixed-validation'
import Router from 'next/router'
import { Required } from '../../../components/constants/layout'
import Logo from '../../../assets/images/login/logo-bluepallet.svg'

import { getSafe, removeEmpty } from '../../../utils/functions'
import { AddressForm } from '../../address-form'
import { PhoneNumber } from '../../phoneNumber'

import { ConfirmSegment, InnerSegment, ButtonsSegment, LogoWrapper, LogoImage, LoginHeader } from '../styles'

import { initConfirmPageValues, validationConfirmPageScheme } from '../constants'

const ConfirmationPage = props => {
  useEffect(() => {
    if (getSafe(() => props.identity.branches[0].address.country.id, false)) {
      props.searchProvinces(props.identity.branches[0].address.country.id)
    }
  }, [])

  const {
    confirmationForm,
    identity,
    intl,
    reviewCompany,
    searchedCountries,
    searchedProvinces,
    searchCountries,
    searchProvinces
  } = props
  const isAdmin = identity.roles.map(r => r.id).indexOf(1) > -1
  const companyName = getSafe(() => identity?.appInfo?.applicationName, 'Blue Pallet')

  let { formatMessage } = intl

  return (
    <Form
      enableReinitialize
      initialValues={{ ...initConfirmPageValues, ...confirmationForm }}
      validationSchema={validationConfirmPageScheme}
      onSubmit={async (values, actions) => {
        let payload = {
          ...values,
          address: {
            ...values.address,
            address: {
              ...values.address.address,
              country: JSON.parse(values.address.address.country).countryId
            }
          }
        }
        removeEmpty(payload)

        try {
          await reviewCompany(payload)
          actions.setSubmitting(false)
          Router.push('/settings/company-details')
        } catch (err) {
          console.error(err)
        } finally {
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

              <Header
                as='h2'
                textAlign='center'
                style={{ marginTop: '0', paddingTop: '0.5em', fontSize: '1.14285714em' }}>
                <FormattedMessage
                  id='laststep.subheader'
                  defaultMessage='Please verify the company information below.'
                />
              </Header>

              <Header as='h3'>
                <FormattedMessage id='laststep.company.header' defaultMessage='Company Profile' />
              </Header>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column data-test='auth_confirm_companyName_inp'>
                    <Input
                      label={
                        <>
                          {formatMessage({ id: 'laststep.company.name', defaultMessage: 'Company Legal Name' })}
                          <Required />
                        </>
                      }
                      name='name'
                    />
                  </Grid.Column>
                  <Grid.Column data-test='auth_confirm_companyDBA_inp'>
                    <Input label={formatMessage({ id: 'laststep.company.dba', defaultMessage: 'DBA' })} name='dba' />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Header as='h3'>
                <FormattedMessage id='laststep.address.header' defaultMessage='Company Primary Address' />
              </Header>
              <AddressForm
                setFieldValue={setFieldValue}
                values={values}
                displayHeader={false}
                prefix='address'
                required={true}
              />

              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column data-test='auth_confirm_addressEIN_inp'>
                    <Input
                      label={
                        <>
                          {formatMessage({ id: 'laststep.address.ein', defaultMessage: 'EIN Number' })}
                          <Required />
                        </>
                      }
                      name='tin'
                    />
                  </Grid.Column>
                  <Grid.Column data-test='auth_confirm_addressDUNS_inp'>
                    <Input
                      label={formatMessage({ id: 'laststep.address.duns', defaultMessage: 'DUNS Number' })}
                      name='dunsNumber'
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Header as='h3'>
                <FormattedMessage id='global.additionalInfo' defaultMessage='Additional Info' />
              </Header>

              <Grid>
                <Grid.Row columns={1}>
                  <Grid.Column data-test='auth_confirm_addressContactName_inp'>
                    <Input
                      label={
                        <>
                          {formatMessage({ id: 'laststep.address.contactName', defaultMessage: 'Contact Name' })}
                          <Required />
                        </>
                      }
                      name='address.contactName'
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column data-test='auth_confirm_addressContactPhone_inp'>
                    <PhoneNumber
                      label={
                        <>
                          {formatMessage({ id: 'laststep.address.contactPhone', defaultMessage: 'Contact Phone' })}
                          <Required />
                        </>
                      }
                      name='address.contactPhone'
                      values={values}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      errors={errors}
                      touched={touched}
                      isSubmitting={isSubmitting}
                    />
                  </Grid.Column>
                  <Grid.Column data-test='auth_confirm_addressContactEmail_inp'>
                    <Input
                      label={
                        <>
                          {formatMessage({ id: 'laststep.address.contactEmail', defaultMessage: 'Contact E-Mail' })}
                          <Required />
                        </>
                      }
                      name='address.contactEmail'
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Header as='h3'>
                <FormattedMessage id='laststep.admin.header' defaultMessage='Company Primary Admin' />
              </Header>
              <Grid>
                <Grid.Row columns={2}>
                  <Grid.Column data-test='auth_confirm_adminName_inp'>
                    <Input
                      label={
                        <>
                          {formatMessage({ id: 'laststep.admin.name', defaultMessage: 'Name' })}
                          <Required />
                        </>
                      }
                      name='companyAdminUser.name'
                    />
                  </Grid.Column>
                  <Grid.Column data-test='auth_confirm_adminTitle_inp'>
                    <Input
                      label={formatMessage({ id: 'laststep.admin.title', defaultMessage: 'Title' })}
                      name='companyAdminUser.jobTitle'
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={2}>
                  <Grid.Column data-test='auth_confirm_adminPhone_inp'>
                    <PhoneNumber
                      label={formatMessage({ id: 'laststep.admin.phone', defaultMessage: 'Phone' })}
                      name='companyAdminUser.phone'
                      values={values}
                      setFieldValue={setFieldValue}
                      setFieldTouched={setFieldTouched}
                      errors={errors}
                      touched={touched}
                      isSubmitting={isSubmitting}
                    />
                  </Grid.Column>
                  <Grid.Column data-test='auth_confirm_adminEmail_inp'>
                    <Input
                      label={
                        <>
                          {formatMessage({ id: 'laststep.admin.email', defaultMessage: 'E-Mail' })}
                          <Required />
                        </>
                      }
                      name='companyAdminUser.email'
                    />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </InnerSegment>
            <ButtonsSegment>
              <Grid>
                <Grid.Row>
                  <Grid.Column aligned='right' textAlign='right'>
                    <Button
                      style={{ marginRight: '1em' }}
                      onClick={() => {
                        isAdmin ? Router.push('/admin/units-of-measure') : Router.push('/inventory/my-listings')
                      }}
                      data-test='auth_confirm_cancel_btn'>
                      <FormattedMessage id='laststep.cancel' defaultMessage='Cancel'>
                        {text => text}
                      </FormattedMessage>
                    </Button>
                    <Button.Submit color='blue' data-test='auth_confirm_submit_btn'>
                      <FormattedMessage
                        id='laststep.submit'
                        defaultMessage={`Enter ${companyName}`}
                        values={{ companyName }}>
                        {text => text}
                      </FormattedMessage>
                    </Button.Submit>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </ButtonsSegment>
          </ConfirmSegment>
        )
      }}
    </Form>
  )
}

const stateToProps = ({ auth: { confirmationForm, identity } }) => ({ confirmationForm, identity })

export default connect(stateToProps, Actions)(injectIntl(ConfirmationPage))
