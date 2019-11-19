import React from 'react'
import classnames from 'classnames'
import {Control, Form} from 'react-redux-form'
import {FormattedMessage, injectIntl} from 'react-intl'

class RegistrationForm extends React.Component {
  handleSubmit(input) {
    this.props.registration(input.email, input.password, input.firstName, input.middleName, input.lastName).then(() => {
      this.props.history.push('/login')
    })
  }

  render() {
    const {formatMessage} = this.props.intl
    let {isFetching, hasError} = this.props.formStatus
    let butLogin = isFetching ? (
      <FormattedMessage id='registration.fetching' defaultMessage='Fetching' />
    ) : (
      <FormattedMessage id='registration.submit' defaultMessage='Submit' />
    )
    const placeholders = {
      email: formatMessage({
        id: 'global.email',
        defaultMessage: 'E-mail'
      }),
      password: formatMessage({
        id: 'global.password',
        defaultMessage: 'Password'
      }),
      firstName: formatMessage({
        id: 'registration.firstName',
        defaultMessage: 'Your First Name'
      }),
      middleName: formatMessage({
        id: 'registration.middleName',
        defaultMessage: 'Your Middle Name'
      }),
      lastName: formatMessage({
        id: 'registration.lastName',
        defaultMessage: 'Your Last Name'
      })
    }
    return (
      <Form model='forms.registrationForm' onSubmit={val => this.handleSubmit(val)}>
        <div>
          {/*<label htmlFor="forms.registrationForm.email"><Translate id="registration.email"/></label>*/}
          <Control.text model='forms.registrationForm.email' placeholder={placeholders.email} required />
        </div>
        <div>
          {/*<label htmlFor="forms.registrationForm.password"><Translate id="registration.password"/></label>*/}
          <Control.password model='forms.registrationForm.password' placeholder={placeholders.password} required />
        </div>
        <div>
          {/*<label htmlFor="forms.registrationForm.firstName"><Translate id="registration.firstName"/></label>*/}
          <Control.text model='forms.registrationForm.firstName' placeholder={placeholders.firstName} required />
        </div>
        <div>
          {/*<label htmlFor="forms.registrationForm.middleName"><Translate*/}
          {/*id="registration.middleName"/></label>*/}
          <Control.text model='forms.registrationForm.middleName' placeholder={placeholders.middleName} required />
        </div>
        <div>
          {/*<label htmlFor="forms.registrationForm.lastName"><Translate id="registration.lastName"/></label>*/}
          <Control.text model='forms.registrationForm.lastName' placeholder={placeholders.lastName} required />
        </div>
        <div className='form-middle'>
          <button className={classnames({'not-valid': hasError}, {loading: isFetching})}>{butLogin}</button>
        </div>
      </Form>
    )
  }
}

export default injectIntl(RegistrationForm)
