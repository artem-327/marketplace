import React, { Component } from 'react'
import { bool } from 'prop-types'
import { Grid, GridRow, GridColumn, Header } from 'semantic-ui-react'

import Logo from '~/assets/images/logos/logo-dark.png'
import { Input, Button, Checkbox } from 'formik-semantic-ui'
import { FormattedMessage, injectIntl } from 'react-intl'
import Link from 'next/link'

import { setPassword } from '../api'


import { LoginSegment, LogoImage, StyledForm, BottomMargedRow } from '../constants/layout'
import { initialValues, validationSchema } from '../constants/validation'


class Password extends Component {

  render() {
    let { forgottenPassword, intl } = this.props
    const { formatMessage } = intl

    let hello = <FormattedMessage id={`verification.${forgottenPassword ? 'helloAgain' : 'hello'}`} />
    let header = <FormattedMessage id={`verification.${forgottenPassword ? 'provideSecurityCode' : 'verification'}`} />

    return (
      <LoginSegment raised padded='very'>
        <LogoImage src={Logo} />
        <StyledForm
          validateOnChange={true}
          initialValues={initialValues(forgottenPassword)}
          validationSchema={validationSchema()}
          onSubmit={async (values, { setSubmitting }) => {

            try {
              await setPassword({
                email: values.email,
                newPassword: values.password,
                securityCode: values.securityCode
              })
            } catch (_) { } finally {
              setSubmitting(false)
            }


          }}
          enableReinitialize={true}>
          {(props) => {
            let { values } = props

            return (
              <>
                <Grid columns={1}>
                  <GridRow>
                    <GridColumn textAlign='center'>
                      <Header as='h2'>{hello}</Header>
                    </GridColumn>
                  </GridRow>

                  <BottomMargedRow>
                    <GridColumn textAlign='center'>
                      <Header as='h3'>{header}</Header>
                    </GridColumn>
                  </BottomMargedRow>
                </Grid>

                <Input name='securityCode' label={formatMessage({ id: 'verification.labels.securityCode', defaultMessage: 'Security Code' })} />
                <Input name='email' label={formatMessage({ id: 'verification.labels.email', defaultMessage: 'E-mail Address' })} />
                <Input inputProps={{ type: 'password' }} name='password' label={formatMessage({ id: 'verification.labels.password', defaultMessage: 'Password' })} />
                <Input inputProps={{ type: 'password' }} name='passwordConfirm' label={formatMessage({ id: 'verification.labels.passwordConfirm', defaultMessage: 'Password Confirmation' })} />

                <Grid columns={1}>
                  {!forgottenPassword &&
                    <GridRow>
                      <GridColumn computer={2}>
                        <Checkbox name='termsOfAgreement' labelPosition='right' />
                      </GridColumn>
                      <GridColumn computer={14}>
                        <FormattedMessage id='verification.termsOfAgreement' values={{
                          echosTermsAndServices: <Link href='https://echoexchange.net/docs/terms-and-services'>{formatMessage({ id: 'verification.termsAndServices' })}</Link>,
                          echosTermsOfUse: <Link href='https://echoexchange.net/docs/terms-of-use'>{formatMessage({ id: 'verification.termsOfUse' })}</Link>,
                          echosPrivacyPolicy: <Link href='https://echoexchange.net/docs/privacy-policy'>{formatMessage({ id: 'verification.privacyPolicy' })}</Link>,
                          dwollasTermsOfServices: <Link href='https://www.dwolla.com/legal/tos/'>{formatMessage({ id: 'verification.termsAndServices' })}</Link>,
                          dwollasPrivacyPolicy: <Link href='https://www.dwolla.com/legal/privacy/'>{formatMessage({ id: 'verification.privacyPolicy' })}</Link>
                        }} />
                      </GridColumn>
                    </GridRow>
                  }

                  <GridRow>
                    <GridColumn>
                      <Button.Submit disabled={!!!values.termsOfAgreement && !forgottenPassword} size='big' fluid><FormattedMessage id='verification.nextStep' /></Button.Submit>
                    </GridColumn>
                  </GridRow>
                </Grid>
              </>
            )
          }}
        </StyledForm>
      </LoginSegment >
    )
  }
}

Password.propTypes = {
  forgottenPassword: bool
}

Password.defaultProps = {
  forgottenPassword: false
}

export default injectIntl(Password)