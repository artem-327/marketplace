import React, { Component } from 'react'
import { bool } from 'prop-types'
import { Grid, GridRow, GridColumn, Header } from 'semantic-ui-react'

import Logo from '~/assets/images/logos/logo-dark.png'
import { Input, Button, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import Link from 'next/link'
import Router from 'next/router'

import { setPassword } from '../api'

import { LoginSegment, LogoImage, StyledForm, BottomMargedRow } from '../constants/layout'
import { initialValues, validationSchema } from '../constants/validation'

import { withToastManager } from 'react-toast-notifications'
import { generateToastMarkup } from '~/utils/functions'

class Password extends Component {

  render() {
    let { forgottenPassword, intl: { formatMessage }, toastManager } = this.props

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
                  <GridRow>
                    <GridColumn>
                      <Button.Submit size='big' fluid>
                        <FormattedMessage id='global.agreeAndContinue' defaultMessage='Agree and Continue'>{(text) => text}</FormattedMessage>
                      </Button.Submit>
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

export default injectIntl(withToastManager(Password))