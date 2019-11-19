import React, { Component } from 'react'
import { getSafe } from '~/utils/functions'
import { chatWidgetCreate, chatUnreadMessages } from '../actions'

export default class ChatWidget extends Component {
  // currently not used (used only actions & reducer)
  componentDidMount() {
    //chatWidgetCreate(this.props.identity)
  }

  render() {
    return null
  }
}
