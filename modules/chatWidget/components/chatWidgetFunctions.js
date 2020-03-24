import { getSafe } from '~/utils/functions'

/*
 Working API: https://api.zopim.com/files/meshim/widget/controllers/LiveChatAPI-js.html
 Not 100% working API: https://developer.zendesk.com/embeddables/docs/widget/api#ze.identify
 https://support.zendesk.com/hc/en-us/articles/115000566208-Web-Widget-Chat-advanced-customization
 https://develop.zendesk.com/hc/en-us/articles/360001075368-Using-the-Chat-SDK-APIs-to-show-the-number-of-unread-messages-iOS-
 https://gist.github.com/kylejmhudson/216dab3c2f158dba8b5727568c95f07b
*/

export const ChatWidget_create = (identity, props) => {
  if (typeof window.$zopim === 'undefined') {
    var script = document.createElement('script')
    script.type = 'text/javascript'

    if (script.readyState) {
      //IE
      script.onreadystatechange = () => {
        if (script.readyState == 'loaded' || script.readyState == 'complete') {
          script.onreadystatechange = null
          chatWidget_scriptLoaded(identity, false)
          chatWidget_addCallBack(identity, props)
        }
      }
    } else {
      //Others
      script.onload = () => {
        chatWidget_scriptLoaded(identity, false)
        chatWidget_addCallBack(identity, props)
      }
    }
    script.async = true
    script.id = 'ze-snippet'
    //script.src = "https://static.zdassets.com/ekr/snippet.js?key=c9ecb4b1-1c91-482b-bce2-aac2a343619b"  // https://echoexchange.zendesk.com
    script.src = 'https://static.zdassets.com/ekr/snippet.js?key=81eee0c3-a17e-470e-a004-a62dffb77870' // https://echosystem.zendesk.com
    document.getElementsByTagName('head')[0].appendChild(script)
  } else {
    chatWidget_scriptLoaded(identity, false) // In case user was changed
  }
}

const chatWidget_updateIdentity = identity => {
  zE(function() {
    $zopim(function() {
      $zopim.livechat.setLanguage(identity.lang)
      $zopim.livechat.setName(identity.name)
      $zopim.livechat.setEmail(identity.email)
    })
  })
}

const chatWidget_scriptLoaded = (identity, hide) => {
  zE(function() {
    $zopim(function() {
      if (hide) $zopim.livechat.window.hide()
      $zopim.livechat.setStatus('online')
    })
  })
  chatWidget_updateIdentity(identity)
}

const chatWidget_onConnected = identity => {
  zE(function() {
    $zopim(function() {
      $zopim.livechat.setLanguage(identity.lang)
      $zopim.livechat.setName(identity.name)
      $zopim.livechat.setEmail(identity.email)
      $zopim.livechat.setStatus('online')
    })
  })
}

const chatWidget_onChatStart = () => {}

const chatWidget_onChatEnd = () => {}

const chatWidget_addCallBack = (identity, props) => {
  zE(function() {
    $zopim(function() {
      $zopim.livechat.setOnConnected(function() {
        chatWidget_onConnected(identity)
      })
      $zopim.livechat.setOnUnreadMsgs(function(cnt) {
        props.chatUnreadMessages(cnt)
      })
      $zopim.livechat.setOnChatStart(function() {
        chatWidget_onChatStart()
      })
      $zopim.livechat.setOnChatEnd(function() {
        chatWidget_onChatEnd()
      })
    })
  })
}

export const chatWidget_hide = () => {
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function() {
      $zopim(function() {
        $zopim.livechat.hideAll()
      })
    })
  }
}

export const chatWidget_showLable = () => {
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function() {
      $zopim(function() {
        $zopim.livechat.button.show()
      })
    })
  }
}

export const chatWidget_show = () => {
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function() {
      $zopim(function() {
        $zopim.livechat.window.show()
      })
    })
  }
}

export const chatWidget_toggle = () => {
  // Not used, $zopim.livechat.window.getDisplay() not working correctly in current widget version
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function() {
      $zopim(function() {
        $zopim.livechat.window.getDisplay() // after 3rd call getDisplay() returns true even the window is hidden (?)
          ? $zopim.livechat.window.hide()
          : $zopim.livechat.window.show()
      })
    }) // ! ! $zopim.livechat.window.toggle(); // Not working at all
  }
}

export const chatWidget_EndSession = () => {
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function() {
      $zopim(function() {
        $zopim.livechat.endChat()
      })
    })
  }
}

export const chatWidget_isChatting = () => {
  let result = false
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function() {
      $zopim(function() {
        result = $zopim.livechat.isChatting()
      })
    })
  }
  return result
}

export const chatWidget_isConnected = () => {
  if (
    typeof window === 'undefined' ||
    typeof window.zE === 'undefined' ||
    typeof window.$zopim === 'undefined' ||
    typeof window.$zopim.livechat === 'undefined'
  )
    return false
  else return true
}
