import * as AT from './action-types'

export function openEditPopup(config, editedData) {
    return {
        type: AT.ADMIN_OPEN_EDIT_POPUP,
        payload: editedData
    }
}

export function closeEditPopup() {
    return {
        type: AT.ADMIN_CLOSE_EDIT_POPUP,
        payload: null
    }
}

export function deleteItem(config, id) {
    if (typeof config.api.delete !== 'undefined') {
        return {
            type: config.api.delete.typeRequest,
            payload: id
        }
    }
    else { return { type: null, payload: null } }
}

export function openAddPopup(currentTab) {
    return {
        type: AT.ADMIN_OPEN_ADD_POPUP,
        payload: currentTab
    }
}
export function closeAddPopup() {
    return {
        type: AT.ADMIN_CLOSE_ADD_POPUP,
        payload: null
    }
}

export function closeConfirmPopup() {
    return {
        type: AT.ADMIN_CLOSE_CONFIRM_POPUP,
        payload: null
    };
}

export function getDataRequest(api) {
    return {
        type: api.get.typeRequest,
        payload: null
    }
}

export function postNewRequest(config, values) {
    return {
        type: config.api.post.typeRequest,
        payload: values
    }
}

export function putEditedDataRequest(config, id, values) {
    return {
        type: config.api.put.typeRequest,
        payload: { values, id }
    }
}

export function handleActiveTab(tab) {
    return {
        type: AT.ADMIN_HANDLE_ACTIVE_TAB,
        payload: {tab}
    }
}

export function handleFiltersValue(value) {
    return {
        type: AT.ADMIN_HANDLE_FILTERS_VALUE,
        payload: value
    }
}
