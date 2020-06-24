import React, { Component } from 'react'

import { themes } from '../constants'
import { FormattedMessage } from 'react-intl'

import { generateToastMarkup, getSafe } from '~/utils/functions'

let Message
class Messages extends Component {
  constructor(props) {
    super(props)

    Message = this
  }

  checkForMessages = response => {
    if (!response) return
    let { data, config } = response
    let messages = data.clientMessage
      ? [data]
      : Array.isArray(data)
      ? data.filter(d => d && !!d.clientMessage)
      : data && data.messages && data.messages.length > 0
      ? data.messages
      : []
    // let messages = getSafe(
    //   () => data.messages,
    //   data.clientMessage ? [data] : Array.isArray(data) ? data.filter(d => !!d.clientMessage) : []
    // )
    if (messages.length > 0) {
      messages.forEach(message => {
        this.onMessage(message, config)
      })
    }
  }

  createTaggedMessage = message => {
    if (message) {
      const msg = message.split('\n')
      return msg.map(m => (
        <>
          {m}
          <br />
        </>
      ))
    }
    return null
  }

  onMessage = (message, config) => {
    let { toastManager } = this.props

    const clientMessage = getSafe(() => message.clientMessage, null)
    const descriptionMessage = getSafe(() => message.descriptionMessage, null)
    const exceptionMessage = getSafe(() => message.exceptionMessage, null)

    const url = getSafe(() => config.url, '')
    const isPaymentEndpoint = url.startsWith('/prodex/api/payments')
    const dwollaValidationError =
      isPaymentEndpoint &&
      (clientMessage.startsWith('Dwolla validation error') ||
        clientMessage.startsWith('Uploading documents for customer failed'))

    const msg =
      message && message.level ? (
        <>
          {this.createTaggedMessage(clientMessage)}
          {this.createTaggedMessage(descriptionMessage)}
          {process.env.NODE_ENV === 'production' && !dwollaValidationError
            ? ''
            : this.createTaggedMessage(exceptionMessage)}
        </>
      ) : (
        message
      )

    let autoDismissTimeout =
      (getSafe(() => clientMessage.length, 0) +
        getSafe(() => descriptionMessage.length, 0) +
        getSafe(() => exceptionMessage.length, 0)) *
      50
    if (autoDismissTimeout < 2000) {
      autoDismissTimeout = 2000
    } else if (autoDismissTimeout > 7000) {
      autoDismissTimeout = 7000
    }

    if (msg && message.level) {
      const lowerCaseLevel = message.level.toLowerCase()
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage
            id={`global.${lowerCaseLevel}`}
            defaultMessage={`${lowerCaseLevel.charAt(0).toUpperCase()}${lowerCaseLevel.slice(1)}!`}
          />,
          msg
        ),
        {
          appearance: themes[message.level],
          pauseOnHover: true,
          autoDismissTimeout
        }
      )
      // this 'else if' can be remove in the future if backend will give all levels in all responses.
    } else if (msg && !message.level) {
      toastManager.add(generateToastMarkup(<FormattedMessage id='global.error' defaultMessage='Error!' />, msg), {
        appearance: themes.ERROR,
        pauseOnHover: true
      })
    }
  }

  render() {
    return null
  }
}

export { Messages, Message }
