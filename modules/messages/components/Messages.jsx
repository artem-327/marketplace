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

  createTaggedMessage = message => {
    if (message) {
      const msg = message.split('\n')
      return msg.map(m => (
        <>
          {m}<br/>
        </>
      ))
    }
    return null
  }

  onMessage = message => {
    let { toastManager } = this.props

    const clientMessage = getSafe(() => message.clientMessage, null)
    const descriptionMessage = getSafe(() => message.descriptionMessage, null)
    const exceptionMessage = getSafe(() => message.exceptionMessage, null)

    const msg =
      message && message.level
        ? (
          <>
            {this.createTaggedMessage(clientMessage)}
            {this.createTaggedMessage(descriptionMessage)}
            {process.env.NODE_ENV === 'production' ? '' : this.createTaggedMessage(exceptionMessage)}
          </>
        )
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
