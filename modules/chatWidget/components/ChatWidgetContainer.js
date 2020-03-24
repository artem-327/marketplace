import { connect } from 'react-redux'
import ChatWidget from './ChatWidget'
import * as Actions from '../actions'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'

function mapStateToProps(state) {
  return {
    ...state.chatWidget,
    sidebarDetailOpen: getSafe(() => state.simpleAdd.sidebarDetailOpen, false),
    identity: {
      name: getSafe(() => state.auth.identity.name, ''),
      email: getSafe(() => state.auth.identity.email, ''),
      lang: getSafe(() => state.auth.identity.preferredLanguage.languageAbbreviation, 'us')
    }
  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(withToastManager(ChatWidget)))
