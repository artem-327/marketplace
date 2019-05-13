import React, { Component } from 'react'
import axios from 'axios'
import { Message, Container } from 'semantic-ui-react'
import styled from 'styled-components'

import { object } from 'prop-types'

const MessageContainer = styled(Container)`
  padding: 5px;
`

export default class ErrorMessage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      error: null,
      display: true
    }

    this.onError = this.onError.bind(this)
  }

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
    axios.interceptors.request.eject(this.interceptor)
  }

  onError(errorMessage) {


    if (errorMessage) {
      let key = this.state.error && this.state.error.list ? 'list' : this.props.messageProps.contentAsHeader ? 'header' : 'content'

      // If we already had an error, make it display as list
      if (this.state.error) {
        var err = {
          list: [errorMessage]
        }

        let element = this.state.error[key]
        if (element instanceof Array) err.list = element.concat(err.list)
        else err.list.push(element)

      } else {
        // Else display just one message, either as content or as header, depending on prop contentAsHeader
        var err = {
          [key]: this.props.content ? this.props.content : errorMessage
        }
      }
      this.setState({ display: true, error: err })
    }
  }

  render() {
    if (!this.state.error || !this.state.display) return null

    return (
      <MessageContainer fluid>
        <Message icon
          onDismiss={() => this.setState({ display: false })}
          {...this.props.messageProps}
          {...this.state.error} 
        />
      </MessageContainer>
    )
  }
}

ErrorMessage.propTypes = {
  messageProps: object,
}

ErrorMessage.defaultProps = {
  messageProps: {
    size: 'small',
    contentAsHeader: false,
    error: true,
    icon: 'warning',
  }
}