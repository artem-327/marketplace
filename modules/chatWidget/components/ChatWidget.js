import { Component } from 'react'

import {
  chatWidget_hide,
  chatWidget_showLabel,
  chatWidget_setHorizontalOffset,
  chatWidget_setVerticalOffset
} from './chatWidgetFunctions'

export default class ChatWidget extends Component {
  componentDidMount() {
    if (!this.props.initialized) {
      this.props.chatWidgetCreate(this.props.identity, this.props)
    }
  }

  componentDidUpdate(prevProps) {
    const { sidebars, isVerticalMoved } = this.props

    if (sidebars !== prevProps.sidebars || sidebars > 0) {
      if (
        (sidebars === 60 && isVerticalMoved) || // Condition checks first vertical movement after initialized chat widget.
        prevProps.isVerticalMoved !== isVerticalMoved
      )
        chatWidget_setVerticalOffset(sidebars)
      else chatWidget_setHorizontalOffset(sidebars)
    }
  }

  render() {
    return null
  }
}
