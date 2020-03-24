import React, { Component } from 'react'
import { getSafe } from '~/utils/functions'
import { chatWidget_hide, chatWidget_show, chatWidget_isConnected, chatWidget_showLable } from './chatWidgetFunctions'

import { generateToastMarkup } from '~/utils/functions'
import { FormattedMessage } from 'react-intl'

export default class ChatWidget extends Component {
  componentDidMount() {
    if (!this.props.initialized) {
      this.props.chatWidgetCreate(this.props.identity, this.props)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.sidebarDetailOpen !== prevProps.sidebarDetailOpen) {
      if (this.props.sidebarDetailOpen) chatWidget_hide()
      else chatWidget_showLable()
    }
    if (this.props.supportChatEnabled !== prevProps.supportChatEnabled) {
      if (!chatWidget_isConnected()) {
        if (this.props.supportChatEnabled) {
          this.props.chatWidgetHide()
          return
        }
        // Try to connect again
        this.props.chatWidgetCreate(this.props.identity, this.props)
        if (!chatWidget_isConnected()) {
          this.props.toastManager.add(
            generateToastMarkup(
              <FormattedMessage id='notifications.supportChatError.header' defaultMessage='Support chat error' />,
              <FormattedMessage
                id='notifications.supportChatError.content'
                defaultMessage='Support chat is not available'
              />
            ),
            { appearance: 'error' }
          )
          return
        }
      }

    if (this.props.supportChatEnabled) chatWidget_show()
      else chatWidget_hide()
    }
  }

  render() {
    return null
  }
}
