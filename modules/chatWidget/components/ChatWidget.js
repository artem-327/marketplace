import { Component } from 'react'

import { chatWidget_hide, chatWidget_showLable } from './chatWidgetFunctions'

export default class ChatWidget extends Component {
  componentDidMount() {
    if (!this.props.initialized) {
      this.props.chatWidgetCreate(this.props.identity, this.props)
    }
  }

  componentDidUpdate(prevProps) {
    const { sidebars } = this.props

    if (sidebars !== prevProps.sidebars) {
      if (sidebars) chatWidget_hide()
      else chatWidget_showLable()
    }
  }

  render() {
    return null
  }
}
