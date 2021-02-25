import { connect } from 'react-redux'
import ChatWidget from './ChatWidget'
import * as Actions from '../actions'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
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

    // Vertical movement chat widget above buttons in Sidebars.
    if (
      getSafe(() => state.chatWidget.isVerticalMoved, false) &&
      (getSafe(() => state.settings.isOpenSidebar, false) ||
        getSafe(() => state.productsAdmin.currentAddForm, false) ||
        getSafe(() => state.productsAdmin.currentEditForm, false) ||
        getSafe(() => state.cart.isOpenModal, false))
    ) {
      return 60
    }

    if (
      getSafe(() => state.wantedBoard.openSidebar, false) ||
      getSafe(() => state.wantedBoard.editWindowOpen, false) ||
      openGlobalAddFormName === 'wanted-board-listings'
    )
      return 430

    const settingsTab = getSafe(() => state.settings.currentTab.type, '')

    if (
      getSafe(() => state.companyProductInfo.isOpen, false) ||
      (getSafe(() => state.settings.isOpenSidebar, false) && !getSafe(() => state.chatWidget.isVerticalMoved, false)) ||
      getSafe(() => state.cart.sidebar.isOpen, false) ||
      getSafe(() => state.companyProductInfo.isOpen, false) ||
      getSafe(() => state.companiesAdmin.isOpenSidebar, false) ||
      (getSafe(() => state.settings.isOpenPopup, false) && (settingsTab === 'users' || settingsTab === 'documents')) ||
      adminTab === 'Users' ||
      adminTab === 'Companies' ||
      getSafe(() => state.manageGuests.isOpenPopup, false) ||
      openGlobalAddFormName === 'inventory-my-listings' ||
      openGlobalAddFormName === 'my-account-users' ||
      openGlobalAddFormName === 'manage-guests-guests' ||
      openGlobalAddFormName === 'my-account-locations'
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
