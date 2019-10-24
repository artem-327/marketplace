import { createAction } from 'redux-promise-middleware-actions'

export const openPopup = createAction('OPEN_POPUP', (companyProduct, activeIndex = 0) => ( { companyProduct, activeIndex } ))
export const closePopup = createAction('CLOSE_POPUP')
export const tabChanged = createAction('TAB_CHANGED', activeTab => activeTab)