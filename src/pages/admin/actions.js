import * as AT from './action-types'





export function handleActiveTab(tab) {
    console.log('!!!!!!! - ADMIN_HANDLE_ACTIVE_TAB - actions - tab - ', tab);
    return {
        type: AT.ADMIN_HANDLE_ACTIVE_TAB,
        payload: {tab}
    }
}