import { connect } from 'react-redux'
import ChatWidget from './ChatWidget'
import * as Actions from '../actions'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'

function mapStateToProps(state) {
  const sidebars = () => {
    const adminTab =
      (getSafe(() => state.admin.currentEditForm, false) ||
        getSafe(() => state.admin.currentEdit2Form, false) ||
        getSafe(() => state.admin.currentAddForm, false) ||
        getSafe(() => state.admin.currentAddDwolla, false)) &&
      getSafe(() => state.admin.currentTab.name, '')

    if (getSafe(() => state.wantedBoard.editWindowOpen, false)) return 430

    if (
      adminTab === 'Product Catalog' ||
      ((getSafe(() => state.productsAdmin.currentEditForm, false) ||
        getSafe(() => state.productsAdmin.currentAddForm, false)) &&
        getSafe(() => state.productsAdmin.currentTab.name, false) === 'Product Catalog')
    )
      return 500

    const settingsTab = getSafe(() => state.settings.currentTab.type, '')

    if (
      getSafe(() => state.companyProductInfo.isOpen, false) ||
      getSafe(() => state.settings.isOpenSidebar, false) ||
      getSafe(() => state.cart.sidebar.isOpen, false) ||
      getSafe(() => state.simpleAdd.sidebarDetailOpen, false) ||
      getSafe(() => state.simpleAdd.isExportInventoryOpen, false) ||
      getSafe(() => state.companyProductInfo.isOpen, false) ||
      getSafe(() => state.companiesAdmin.isOpenSidebar, false) ||
      (getSafe(() => state.settings.isOpenPopup, false) &&
        (settingsTab === 'products' || (settingsTab === 'users'))) ||
      adminTab === 'Users' ||
      adminTab === 'Companies'
    )
      return 630

    return 0
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
