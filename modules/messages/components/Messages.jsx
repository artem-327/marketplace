import React, {Component} from 'react'
import axios from 'axios'

import {themes} from '../constants'
import {FormattedMessage} from 'react-intl'

import {generateToastMarkup} from '~/utils/functions'

export default class Messages extends Component {
  componentDidMount() {
    let self = this

    if (!this.interceptor) {
      this.interceptor = axios.interceptors.response.use(
        response => response,
        function(error) {
          var errorMessage = null
          if (error.response)
            errorMessage = error.response.data
              ? error.response.data
              : `Request failed with status code: ${error.response.status}`
          else if (error.clientMessage)
            errorMessage =
              process.env.NODE_ENV === 'production'
                ? error.descriptionMessage
                  ? `${error.clientMessage} ${error.descriptionMessage}`
                  : `${error.clientMessage}`
                : error

          self.onError(errorMessage)

          return Promise.reject(error)
        }
      )
    }
  }

  componentWillUnmount() {
    axios.interceptors.response.eject(this.interceptor)
  }

  onError = errorMessage => {
    let {toastManager} = this.props

    const errMessage =
      errorMessage && errorMessage.level
        ? errorMessage.descriptionMessage
          ? `${errorMessage.clientMessage} ${errorMessage.descriptionMessage} ${errorMessage.exceptionMessage}`
          : `${errorMessage.clientMessage} ${errorMessage.exceptionMessage}`
        : errorMessage

    // errorMessage.level can be ERROR, WARNING, INFO
    if (errMessage && errorMessage.level) {
      const lowerCaseLevel = errorMessage.level.toLowerCase()
      toastManager.add(
        generateToastMarkup(
          <FormattedMessage
            id={`global.${lowerCaseLevel}`}
            defaultMessage={`${lowerCaseLevel.charAt(0).toUpperCase()}${lowerCaseLevel.slice(1)}!`}
          />,
          errMessage
        ),
        {appearance: themes[errorMessage.level], pauseOnHover: true}
      )
      // this 'else if' can be remove in the future if backend will give all levels in all responses.
    } else if (errMessage && !errorMessage.level) {
      toastManager.add(
        generateToastMarkup(<FormattedMessage id='global.error' defaultMessage='Error!' />, errMessage),
        {appearance: themes.ERROR, pauseOnHover: true}
      )
    }
  }

  render() {
    return null
  }
}
