import React, { Component } from 'react'
import axios from 'axios'
import { Message, Container } from 'semantic-ui-react'

import { object } from 'prop-types'

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
        self.onError(error)
        return Promise.reject(error)
      })
    }
  }

  componentWillUnmount() {
    axios.interceptors.request.eject(this.interceptor)
  }

  onError(error) {
    let { response } = error
    if (response) {
      this.setState({ display: true, error: response.data ? response.data : `Request failed with status code: ${response.status}` })
    }
  }

  render() {
    let { messageProps } = this.props
    let { contentAsHeader } = messageProps

    let key = contentAsHeader ? 'header' : 'content'

    let content = {
      [key]: this.props.content ? this.props.content : this.state.error
    }

    if (!content[key] || !this.state.display) return null

    return (
      <Container fluid>
        <Message
          onDismiss={() => this.setState({ display: false })}
          {...messageProps}
          {...content} />
      </Container>
    )
  }
}

ErrorMessage.propTypes = {
  messageProps: object,
}

ErrorMessage.defaultProps = {
  messageProps: {
    size: 'large',
    contentAsHeader: false,
    error: true,
    icon: 'warning',
  }
}