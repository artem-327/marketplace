import { createAction } from 'redux-promise-middleware-actions'

export const openPopup = createAction('OPEN_COMPANY_INFO_POPUP', (companyProduct, activeIndex = 0) => ( { companyProduct, activeIndex } ))
export const closePopup = createAction('CLOSE_COMPANY_INFO_POPUP')
export const tabChanged = createAction('COMPANY_INFO_TAB_CHANGED', activeTab => activeTab)

