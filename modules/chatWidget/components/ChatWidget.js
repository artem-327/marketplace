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

    if (sidebars !== prevProps.sidebars || sidebars > 0 || isVerticalMoved !== prevProps.isVerticalMoved) {
      //if (sidebars) chatWidget_hide()
      //else chatWidget_showLabel()
      console.log('sidebars')
      console.log(sidebars)
      console.log('isVerticalMoved')
      console.log(isVerticalMoved)
      if (isVerticalMoved || (prevProps.isVerticalMoved && !isVerticalMoved)) chatWidget_setVerticalOffset(sidebars)
      else chatWidget_setHorizontalOffset(sidebars)
    }
  }

  render() {
    return null
  }
}
