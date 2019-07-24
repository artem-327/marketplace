import React, { Component } from 'react'
import axios from 'axios'
import { Icon } from 'semantic-ui-react'
import { array } from 'prop-types'

import { MessageContainer, StyledMessage, CloseIcon, themes } from '../constants'
import { FormattedMessage } from 'react-intl'

export default class Messages extends Component {
  componentDidMount() {
    let self = this

    if (!this.interceptor) {
      this.interceptor = axios.interceptors.response.use(response => response, function (error) {
        var errorMessage = null
        if (error.response)
          errorMessage = error.response.data ? error.response.data : `Request failed with status code: ${error.response.status}`
        else if (error.clientMessage)
          errorMessage = process.env.NODE_ENV !== 'production' ? `${error.clientMessage} ${error.exceptionMessage}` : error.clientMessage

        self.onError(errorMessage)

        return Promise.reject(error)
      })
    }
  }

  componentWillUnmount() {
    axios.interceptors.response.eject(this.interceptor)
  }

  onError = (errorMessage) => {
    let { addMessage, toastManager } = this.props

    if (errorMessage) {
      toastManager.add(
        <div>
          <strong><FormattedMessage id='global.error' defaultMessage='Error!' /></strong>
          <div>{errorMessage}</div>
        </div>, { appearance: themes.ERROR, pauseOnHover: true })
      // addMessage({ theme: themes.ERROR, content: errorMessage })
    }
  }

  handleMessageDismiss = (index) => {
    this.props.removeMessage(index)
  }

  getMessage = (message, index) => {
    let { theme, content } = message
    let color = 'red', iconName = 'warning sign'

    switch (theme) {
      case themes.ERROR: {
        break
      }

      case themes.SUCCESS: {
        color = 'green', iconName = 'check'
        break
      }
      default: break
    }

    return (
      <StyledMessage floating key={index} color={color} size='large'>
        <Icon size='big' name={iconName} /> {content}
        <CloseIcon size='large' name='x' onClick={() => this.handleMessageDismiss(index)} />
      </StyledMessage>
    )
  }

  render() {
    // let { messages } = this.props

    return (
      null
      // <MessageContainer fluid>
      //   {messages.map((message, i) => this.getMessage(message, i))}
      // </MessageContainer>
    )
  }
}

Messages.propTypes = {
  messages: array,
}

Messages.defaultProps = {
  messages: []
}