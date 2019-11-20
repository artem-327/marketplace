import React from 'react'

import Form from './components/Form'
import './registration.scss'
import './registration.scss'
import regLogin from '../../images/login/logo_echo.png'
import { FormattedMessage } from 'react-intl'

const Registration = props => {
  return (
    <div className='registration'>
      <div className='registration-wr'>
        <div className='form-place'>
          <div className='regForm'>
            <img src={regLogin} alt='Login' />
            <h3 className='form-header'>
              <FormattedMessage id='registration.header' defaultMessage='Header' />
            </h3>
            <Form {...props} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration
