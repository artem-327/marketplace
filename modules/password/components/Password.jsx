import { Component } from 'react'
import { bool } from 'prop-types'
import { Segment, Grid, GridRow, GridColumn, Header } from 'semantic-ui-react'

import { Input, Button, Checkbox } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import Link from 'next/link'
import Router from 'next/router'

import { setPassword } from '../api'

import {
  LogoWrapper,
  LoginContainer,
  LoginSegment,
  LoginHeader,
  LogoImage,
  LogoIcon,
  StyledForm,
  BottomMargedRow,
  LoginField,
  LoginButton,
  DivTerms,
  LinkLabel
} from '../constants/layout'
import { initialValues, validationSchema } from '../constants/validation'

import { withToastManager } from 'react-toast-notifications'

import Logo from '~/assets/images/login/logo-bluetrade.svg'
import Icon from '~/assets/images/login/icon-bluetrade.svg'
//Constants
import { URL_TERMS } from '../../../constants'

class Password extends Component {
  render() {
    let {
      forgottenPassword,
      intl: { formatMessage }
    } = this.props

    let hello = <FormattedMessage id={`verification.${forgottenPassword ? 'helloAgain' : 'hello'}`} />
    let header = <FormattedMessage id={`verification.${forgottenPassword ? 'provideSecurityCode' : 'verification'}`} />

    return (
      <>
        <LogoWrapper>
          <LogoImage src={Logo} />
        </LogoWrapper>
        <LoginContainer>
          <LoginSegment raised padded='very'>
            <LoginHeader as='h1'>
              <LogoIcon src={Icon} />
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
                    securityCode: values.securityCode
                    // ...(values.termsOfAgreement && { approveTOS: true })
                  })

                  Router.push('/auth/login')
                } catch (_) {
                } finally {
                  setSubmitting(false)
                }
              }}
              enableReinitialize={true}>
              {_ => {
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
                      <Input
                        name='securityCode'
                        label={formatMessage({
                          id: 'verification.labels.securityCode',
                          defaultMessage: 'Security Code'
                        })}
                      />
                    </LoginField>
                    <LoginField>
                      <Input
                        name='email'
                        label={formatMessage({ id: 'verification.labels.email', defaultMessage: 'E-mail Address' })}
                      />
                    </LoginField>
                    <LoginField>
                      <Input
                        inputProps={{ type: 'password' }}
                        name='password'
                        label={formatMessage({ id: 'verification.labels.password', defaultMessage: 'Password' })}
                      />
                    </LoginField>
                    <LoginField>
                      <Input
                        inputProps={{ type: 'password' }}
                        name='passwordConfirm'
                        label={formatMessage({
                          id: 'verification.labels.passwordConfirm',
                          defaultMessage: 'Password Confirmation'
                        })}
                      />
                    </LoginField>

                    <LoginButton size='big' fluid>
                      <FormattedMessage id='global.signUp' defaultMessage='Sign up'>
                        {text => text}
                      </FormattedMessage>
                    </LoginButton>

                    {!forgottenPassword && (
                      <DivTerms>
                        <FormattedMessage
                          id='verification.termsText'
                          defaultMessage='By signing up you agree to the Terms and Conditions'
                          values={{
                            terms: (
                              <LinkLabel href={URL_TERMS} target='_blank'>
                                <FormattedMessage
                                  id='verification.termsAndConditions'
                                  defaultMessage='Terms and Conditions'
                                />
                              </LinkLabel>
                            )
                          }}
                        />
                      </DivTerms>
                    )}
                  </>
                )
              }}
            </StyledForm>
          </LoginSegment>
        </LoginContainer>
      </>
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
