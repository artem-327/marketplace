import * as AT from './action-types'

export function openEditPopup(rows) {
    return {
        type: AT.ADMIN_OPEN_EDIT_POPUP,
        payload: rows
    }
}

export function closeEditPopup() {
    return {
        type: AT.ADMIN_CLOSE_EDIT_POPUP
    }
}

export function openAddPopup(rows) {
    return {
        type: AT.ADMIN_OPEN_ADD_POPUP,
        payload: rows
    }
}
export function closeAddPopup(payload) {
    return {
        type: AT.ADMIN_CLOSE_ADD_POPUP,
        payload
    }
}


export function getDataRequest(api) {
    return {
        type: api.typeRequest
    }
}


export function handleActiveTab(tab) {
    console.log('!!!!!!! - ADMIN_HANDLE_ACTIVE_TAB - actions - tab - ', tab);
    return {
        type: AT.ADMIN_HANDLE_ACTIVE_TAB,
        payload: {tab}
    }
}

export function handleFiltersValue(value) {
    console.log('!!!!!!! - ADMIN_HANDLE_FILTERS_VALUE - actions - value - ', value);
    return {
        type: AT.ADMIN_HANDLE_FILTERS_VALUE,
        payload: value
    }
}
