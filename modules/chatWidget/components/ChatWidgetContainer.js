import { connect } from 'react-redux'
import ChatWidget from './ChatWidget'
import * as Actions from '../actions'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'

function mapStateToProps(state) {
  const sidebars = () => {
    return (
      getSafe(() => state.admin.currentEditForm, false) ||
      getSafe(() => state.admin.currentEdit2Form, false) ||
      getSafe(() => state.admin.currentAddForm, false) ||
      getSafe(() => state.admin.currentAddDwolla, false) ||
      getSafe(() => state.simpleAdd.sidebarDetailOpen, false) ||
      getSafe(() => state.cart.sidebar.isOpen, false) ||
      getSafe(() => state.wantedBoard.editWindowOpen, false) ||
      getSafe(() => state.settings.isOpenSidebar, false)
    )
  }

  return {
    ...state.chatWidget,
    sidebars: sidebars(),
    identity: {
      name: getSafe(() => state.auth.identity.name, ''),
      email: getSafe(() => state.auth.identity.email, ''),
      lang: getSafe(() => state.auth.identity.preferredLanguage.languageAbbreviation, 'us')
    }
  }
}

export default connect(mapStateToProps, { ...Actions })(injectIntl(withToastManager(ChatWidget)))
