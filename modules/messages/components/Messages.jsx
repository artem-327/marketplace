import { Component } from 'react'

import { themes } from '../constants'
import { FormattedMessage } from 'react-intl'

import { generateToastMarkup, getSafe } from '../../../utils/functions'
import { isJsonString } from '../../../services'

let Message
class Messages extends Component {
  constructor(props) {
    super(props)

    Message = this
  }

  checkForMessages = response => {
    if (!response) return
    const {
      intl: { formatMessage }
    } = this.props
    let { data, config } = response
    let messages = data.clientMessage
      ? [data]
      : Array.isArray(data)
      ? data.filter(d => d && !!d.clientMessage)
      : data && data.messages && data.messages.length > 0
      ? data.messages
      : data.error === 'access_denied'
      ? [
          {
            level: 'ERROR',
            clientMessage: formatMessage({
              id: 'error.accessDenied',
              defaultMessage: "You don't have sufficient role to perform this action."
            })
          }
        ]
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

    let clientMessage = getSafe(() => message.clientMessage, null)
    const descriptionMessage = getSafe(() => message.descriptionMessage, null)
    const exceptionMessage = getSafe(() => message.exceptionMessage, null)

    const exceptionErrorJSON = isJsonString(exceptionMessage) ? JSON.parse(exceptionMessage) : null
    const errorTypeDuplicateItem =
      (exceptionErrorJSON &&
        getSafe(() => exceptionErrorJSON.description, '') &&
        getSafe(() => exceptionErrorJSON.error_type, '') === 'DUPLICATE_ITEM') ||
      getSafe(() => exceptionMessage.indexOf('DUPLICATE_ITEM'), -1) >= 0
        ? getSafe(() => exceptionErrorJSON.description, 'This institution has already been added.')
        : null
    const url = getSafe(() => config.url, '')

    if (errorTypeDuplicateItem && url.startsWith('/prodex/api/payments/bank-accounts/velloci')) {
      clientMessage = errorTypeDuplicateItem
    }

    if (
      exceptionErrorJSON &&
      (getSafe(() => exceptionErrorJSON.description, '') ||
        getSafe(() => exceptionMessage.indexOf('description'), -1) >= 0) &&
      (getSafe(() => exceptionErrorJSON.error_type, '') === 'DATA_VALIDATION' ||
        getSafe(() => exceptionMessage.indexOf('DATA_VALIDATION'), -1) >= 0)
    ) {
      const dataValidation = exceptionMessage.split('description={')[1].split('}')[0]
      clientMessage = `${clientMessage} ${dataValidation}`
    }

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
