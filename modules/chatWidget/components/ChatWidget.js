import { Component } from 'react'

import { chatWidget_hide, chatWidget_showLabel, chatWidget_setHorizontalOffset } from './chatWidgetFunctions'

export default class ChatWidget extends Component {
  componentDidMount() {
    if (!this.props.initialized) {
      this.props.chatWidgetCreate(this.props.identity, this.props)
    }
  }

  componentDidUpdate(prevProps) {
    const { sidebars } = this.props

    if (sidebars !== prevProps.sidebars) {
      //if (sidebars) chatWidget_hide()
      //else chatWidget_showLabel()
      chatWidget_setHorizontalOffset(sidebars)
    }
  }

  render() {
    return null
  }
}
