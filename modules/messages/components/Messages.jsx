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
    let { data } = response
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
        this.onMessage(message)
      })
    }
  }

  onMessage = message => {
    let { toastManager } = this.props
    const msg =
      message && message.level
        ? message.descriptionMessage
          ? `${getSafe(() => message.clientMessage, '')} ${getSafe(() => message.descriptionMessage, '')} ${
              process.env.NODE_ENV === 'production' ? '' : getSafe(() => message.exceptionMessage, '')
            }`
          : `${getSafe(() => message.clientMessage, '')} ${
              process.env.NODE_ENV === 'production' ? '' : getSafe(() => message.exceptionMessage, '')
            }`
        : message

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
        { appearance: themes[message.level], pauseOnHover: true }
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
