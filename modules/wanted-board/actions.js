import * as AT from './action-types'
import api from './api'
import { Datagrid } from '~/modules/datagrid'




export const sidebarDetailTrigger = (row = null, activeTab = '') => {
  console.log('!!!!!!!!!! sidebarDetailTrigger activeTab', activeTab)
  return {
    type: AT.WB_SIDEBAR_DETAIL_TRIGGER,
    payload: { activeTab: activeTab, row: row }
  }
}

export const deleteWantedBoardItem = (id) => {
  console.log('!!!!!!!!!! deleteWantedBoardItem id', id)
  return {
    type: AT.WB_DELETE_WANTED_BOARD_ITEM,
    payload: id
  }
}

export const SubmitOfferWantedBoard = (id) => {
  console.log('!!!!!!!!!! SubmitOfferWantedBoard id', id)
  return {
    type: AT.WB_SUBMIT_OFFER_WANTED_BOARD,
    payload: id
  }
}


