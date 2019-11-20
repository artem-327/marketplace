import './style.scss'
import React from 'react'
import { Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { closeToast } from '../../src/pages/settings/actions'

const Toast = ({ message, closeToast, isSuccess }) =>
  message ? (
    <Message
      onDismiss={closeToast}
      success={isSuccess}
      error={!isSuccess}
      header='Removal request'
      content={message}
      className='toast-custom-style'
    />
  ) : null

const mapDispatchToProps = {
  closeToast
}

const mapStateToProps = ({ settings: { toast } }) => {
  return {
    message: toast.message,
    isSuccess: toast.isSuccess
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toast)
