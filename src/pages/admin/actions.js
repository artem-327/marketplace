import * as AT from './action-types'

export function openEditPopup(currentTab, row) {
    console.log('XXXXXX openEditPopup - currentTab - ', currentTab);
    console.log('XXXXXX openEditPopup - row - ', row);
    return {
        type: AT.ADMIN_OPEN_EDIT_POPUP,
        payload: {currentTab, row}
    }
}

export function closeEditPopup() {
    return {
        type: AT.ADMIN_CLOSE_EDIT_POPUP
    }
}

export function deleteItem(currentTab, id) {
    console.log('XXXXXX deleteItem - currentTab - ', currentTab);
    console.log('XXXXXX deleteItem - row - ', id);
    return {
        type: AT.ADMIN_DELETE_ITEM,
        payload: {currentTab, id}
    }
}

export function openAddPopup(currentTab) {
    console.log('XXXXXX openAddPopup - currentTab - ', currentTab);
    return {
        type: AT.ADMIN_OPEN_ADD_POPUP,
        payload: currentTab
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

export function postNewRequest(config, values) {
    console.log('XXXXXXXXXXXXXXXXXXX postNewRequest - config - ', config);
    console.log('XXXXXXXXXXXXXXXXXXX postNewRequest - values - ', values);
    return {
        type: config.api.post.typeRequest,
        payload: values
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
