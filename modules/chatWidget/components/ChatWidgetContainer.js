import { connect } from 'react-redux'
import ChatWidget from './ChatWidget'
import * as Actions from '../actions'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'

function mapStateToProps(state) {
  const openGlobalAddFormName = getSafe(() => state.layout.openGlobalAddFormName, '')
  const sidebars = () => {
    const adminTab =
      (getSafe(() => state.admin.currentEditForm, false) ||
        getSafe(() => state.admin.currentEdit2Form, false) ||
        getSafe(() => state.admin.currentAddForm, false) ||
        getSafe(() => state.admin.currentAddDwolla, false)) &&
      getSafe(() => state.admin.currentTab.name, '')

    if (
      getSafe(() => state.wantedBoard.openSidebar, false) ||
      getSafe(() => state.wantedBoard.editWindowOpen, false) ||
      openGlobalAddFormName === 'wanted-board-listings'
    )
      return 430

    if (
      adminTab === 'Product Catalog' ||
      getSafe(() => state.productsAdmin.currentEditForm, false) ||
      getSafe(() => state.productsAdmin.currentAddForm, false) ||
      getSafe(() => state.cart.isOpenSidebar, false)
    )
      return 500

    const settingsTab = getSafe(() => state.settings.currentTab.type, '')

    if (
      getSafe(() => state.companyProductInfo.isOpen, false) ||
      getSafe(() => state.settings.isOpenSidebar, false) ||
      getSafe(() => state.cart.sidebar.isOpen, false) ||
      getSafe(() => state.companyProductInfo.isOpen, false) ||
      getSafe(() => state.companiesAdmin.isOpenSidebar, false) ||
      getSafe(() => state.simpleAdd.isOpenPopup, false) ||
      (getSafe(() => state.settings.isOpenPopup, false) && (settingsTab === 'users' || settingsTab === 'documents')) ||
      adminTab === 'Users' ||
      adminTab === 'Companies' ||
      getSafe(() => state.manageGuests.isOpenPopup, false) ||
      openGlobalAddFormName === 'inventory-my-products' ||
      openGlobalAddFormName === 'inventory-my-listings' ||
      openGlobalAddFormName === 'my-account-users' ||
      openGlobalAddFormName === 'manage-guests-guests' ||
      openGlobalAddFormName === 'my-account-locations'
    )
      return 630

    // Modal in Purchase order - Checkout - Address scroll-up from bottom to up of the page.
    if (getSafe(() => state.cart.isOpenModal, false) && getSafe(() => state.chatWidget.isVerticalMoved, false)) {
      if (typeof window !== 'undefined' && window.innerHeight) {
        return window.innerHeight * 0.89 // Height of Modal is 88% height of page
      }
    }

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
