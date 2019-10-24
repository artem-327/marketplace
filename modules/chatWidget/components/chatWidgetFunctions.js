import { getSafe } from '~/utils/functions'
import { chatUnreadMessages } from '../actions'

export const ChatWidget_create = (identity) => {
  if (typeof window.$zopim === 'undefined') {
    //console.log('!!!!!!!! Loading script')

    var script = document.createElement("script")
    script.type = "text/javascript"

    if (script.readyState) {  //IE
      script.onreadystatechange = () => {
        if (script.readyState == "loaded" ||
          script.readyState == "complete") {
          script.onreadystatechange = null
          chatWidget_scriptLoaded(identity)
          chatWidget_addCallBack(chatUnreadMessages)
        }
      };
    } else {  //Others
      script.onload = () => {
        chatWidget_scriptLoaded(identity)
        chatWidget_addCallBack(chatUnreadMessages)
      };
    }

    script.async = true
    script.id = "ze-snippet"
    script.src = "https://static.zdassets.com/ekr/snippet.js?key=c9ecb4b1-1c91-482b-bce2-aac2a343619b"
    document.getElementsByTagName("head")[0].appendChild(script)
  } else {
    //console.log('!!!!!!!! Script already loaded')
    chatWidget_scriptLoaded(identity) // In case user chas hanged
  }
}

const chatWidget_scriptLoaded = (identity) => {
  // Working API: https://api.zopim.com/files/meshim/widget/controllers/LiveChatAPI-js.html
  // Not 100% working API: https://developer.zendesk.com/embeddables/docs/widget/api#ze.identify
  // https://support.zendesk.com/hc/en-us/articles/115000566208-Web-Widget-Chat-advanced-customization

  zE(function() {
    $zopim(function() {
      $zopim.livechat.setLanguage(identity.lang);
      $zopim.livechat.setName(identity.name);
      $zopim.livechat.setEmail(identity.email);
      $zopim.livechat.window.hide();
      $zopim.livechat.setStatus('online');
    });
  })

  // ! ! ! !! !
  // Jak zjistim pocet neprectenych zprav po prihlaseni??? ! ! !
  // https://develop.zendesk.com/hc/en-us/articles/360001075368-Using-the-Chat-SDK-APIs-to-show-the-number-of-unread-messages-iOS-
  // po prihlaseni nekdy ukazuje pocet unread messages = 0, i kdyz predchozi zpravy nebyly zobrazene, proc?
  /*
  if (!this.props.profile.supportChatEnabled) {
    zE(function () {
      $zopim(function() {
        $zopim.livechat.window.hide()
      });
    })
  }
  setOnUnreadMsgs
  https://gist.github.com/kylejmhudson/216dab3c2f158dba8b5727568c95f07b
  */
}

const chatWidget_addCallBack = (callBack) => {
  zE(function () {
    $zopim(function () {
      $zopim.livechat.setOnUnreadMsgs(function (cnt) {
        callBack(cnt)
      })
    });
  })
}

export const chatWidget_hide = () => {
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function () {
      $zopim(function () {
        $zopim.livechat.window.hide()
      });
    })
  }
}

export const chatWidget_show = () => {
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function () {
      $zopim(function () {
        $zopim.livechat.window.show()
      });
    })
  }
}

export const chatWidget_toggle = () => {
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function () {
      $zopim(function () {
        //console.log('!!!!! ', $zopim.livechat.window.getDisplay())
        $zopim.livechat.window.getDisplay() // after 3rd call returns true even the window is hidden (?)
          ? $zopim.livechat.window.hide()
          : $zopim.livechat.window.show()
      });
    })// ! ! $zopim.livechat.window.toggle(); // Not working at all, why?
  }
}

export const chatWidget_EndSession = () => {
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function () {
      $zopim(function () {
        $zopim.livechat.endChat()
      });
    })
  }
}