import { getSafe } from '~/utils/functions'
import { showSupportChat } from '~/modules/profile/actions'

export const createChatWidget = (props) => {
  if (typeof window.$zopim === 'undefined') {
    var script = document.createElement("script")
    script.type = "text/javascript"

    if (script.readyState) {  //IE
      script.onreadystatechange = () => {
        if (script.readyState == "loaded" ||
          script.readyState == "complete") {
          script.onreadystatechange = null
          chatWidgetScriptLoaded(props)
        }
      };
    } else {  //Others
      script.onload = () => {
        chatWidgetScriptLoaded(props)
      };
    }

    script.async = true
    script.id = "ze-snippet"
    script.src = "https://static.zdassets.com/ekr/snippet.js?key=c9ecb4b1-1c91-482b-bce2-aac2a343619b"
    document.getElementsByTagName("head")[0].appendChild(script)
  } else {
    chatWidgetScriptLoaded(props)
  }
}

const chatWidgetScriptLoaded = (props) => {
  const name = getSafe(() => props.auth.identity.name, '')
  const email = getSafe(() => props.auth.identity.email, '')
  const lang = getSafe(() => props.auth.identity.preferredLanguage.languageAbbreviation, 'us')

  // Working API: https://api.zopim.com/files/meshim/widget/controllers/LiveChatAPI-js.html
  // Not 100% working API: https://developer.zendesk.com/embeddables/docs/widget/api#ze.identify
  // https://support.zendesk.com/hc/en-us/articles/115000566208-Web-Widget-Chat-advanced-customization

  zE(function() {
    $zopim(function() {
      $zopim.livechat.setLanguage(lang);
      $zopim.livechat.setName(name);
      $zopim.livechat.setEmail(email);
      $zopim.livechat.window.hide();
      $zopim.livechat.setStatus('online');
      $zopim.livechat.setOnUnreadMsgs(function(cnt) {
        unreadMessages(cnt)
      })
    });
  })

  // ! ! ! !! !
  // Jak zjistim pocet neprectenych zprav po prihlaseni??? ! ! !
  // https://develop.zendesk.com/hc/en-us/articles/360001075368-Using-the-Chat-SDK-APIs-to-show-the-number-of-unread-messages-iOS-
  // po prihlaseni vzdy ukazuje pocet unread messages = 0, i kdyz predchozi zpravy nebyly zobrazene, proc?
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

const unreadMessages = (cnt) => {
  console.log('!!!!!! chatWidget unread messages', cnt)

  showSupportChat(cnt)

  //chatWidgetShow()
}

export const chatWidgetHide = () => {
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function () {
      $zopim(function () {
        $zopim.livechat.window.hide()
      });
    })
  }
}

export const chatWidgetShow = () => {
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function () {
      $zopim(function () {
        $zopim.livechat.window.show()
      });
    })
  }
}

export const chatWidgetToggle = () => {
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

export const chatWidgetEndSession = () => {
  if (typeof window !== 'undefined' && typeof window.zE !== 'undefined' && typeof window.$zopim !== 'undefined') {
    zE(function () {
      $zopim(function () {
        $zopim.livechat.endChat()
      });
    })
  }
}

export const chatWidgetTerminate = () => {
  // odhlasit se
  chatWidgetEndSession()
  // jak se pak prihlasit??
  //  - ve skutecnosti se neodhlasi -> na strane operatora vypada odhlaseny, ale operator ho muze znovu pripojit a poslat userovi zpravu.

  chatWidgetHide()
}