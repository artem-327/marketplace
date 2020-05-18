import React, { Component } from 'react'
import { bool } from 'prop-types'
import { Segment, Grid, GridRow, GridColumn, Header } from 'semantic-ui-react'

import { Input, Button, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import Link from 'next/link'
import Router from 'next/router'

import { setPassword } from '../api'

import { LoginSegment, LogoWrapper, LoginHeader, LogoImage, StyledForm, BottomMargedRow, LoginField, LoginButton } from '../constants/layout'
import { initialValues, validationSchema } from '../constants/validation'

import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'

import Logo from '~/assets/images/login/logo-login.png'

class Password extends Component {

  render() {
    let { forgottenPassword, intl: { formatMessage }, toastManager } = this.props

    let hello = <FormattedMessage id={`verification.${forgottenPassword ? 'helloAgain' : 'hello'}`} />
    let header = <FormattedMessage id={`verification.${forgottenPassword ? 'provideSecurityCode' : 'verification'}`} />

    return (
      <LoginSegment raised padded='very'>
        <LogoWrapper>
          <LogoImage src={Logo} />
        </LogoWrapper>

        <LoginHeader as='h1'>
          {hello}
        </LoginHeader>

        <StyledForm
          validateOnChange={true}
          initialValues={initialValues(forgottenPassword)}
          validationSchema={validationSchema()}
          onSubmit={async (values, { setSubmitting }) => {

            try {
              await setPassword({
                email: values.email.trim(),
                newPassword: values.password,
                securityCode: values.securityCode,
                // ...(values.termsOfAgreement && { approveTOS: true })
              })

              toastManager.add(generateToastMarkup(
                <FormattedMessage id='notifications.passwordResetSuccess.header' />,
                <FormattedMessage id='notifications.passwordResetSuccess.content' />
              ), { appearance: 'success' })

              Router.push('/auth/login')

            } catch (_) { } finally {
              setSubmitting(false)
            }
          }}
          enableReinitialize={true}>
          {(_) => {
            return (
              <>
                <Grid columns={1}>
                  <BottomMargedRow>
                    <GridColumn textAlign='center'>
                      <Header as='h3'>{header}</Header>
                    </GridColumn>
                  </BottomMargedRow>
                </Grid>

                <LoginField>
                  <Input name='securityCode' label={formatMessage({ id: 'verification.labels.securityCode', defaultMessage: 'Security Code' })} />
                </LoginField>
                <LoginField>
                  <Input name='email' label={formatMessage({ id: 'verification.labels.email', defaultMessage: 'E-mail Address' })} />
                </LoginField>
                <LoginField>
                  <Input inputProps={{ type: 'password' }} name='password' label={formatMessage({ id: 'verification.labels.password', defaultMessage: 'Password' })} />
                </LoginField>
                <LoginField>
                  <Input inputProps={{ type: 'password' }} name='passwordConfirm' label={formatMessage({ id: 'verification.labels.passwordConfirm', defaultMessage: 'Password Confirmation' })} />
                </LoginField>

                <LoginButton size='big' fluid>
                  <FormattedMessage id='global.continue' defaultMessage='Continue'>{(text) => text}</FormattedMessage>
                </LoginButton>
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

export default injectIntl(withToastManager(Password))