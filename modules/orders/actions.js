import * as AT from './action-types'
import Api from './api'
import * as api from "../inventory/api";

export const loadData = (endpointType, filter = null) => ({type: AT.ORDERS_FETCH, payload: {endpointType, filter}})
export const loadDetail = (endpointType, selectedIndex) => ({type: AT.ORDERS_DETAIL_FETCH, payload: {endpointType, selectedIndex}})
export const confirmOrder = (orderId) => ({type: AT.ORDER_CONFIRM_FETCH, payload: {orderId}})
export const rejectOrder = (orderId) => ({type: AT.ORDER_REJECT_FETCH, payload: {orderId}})
export const downloadPdf = (endpointType, orderId) => ({type: AT.ORDER_DOWNLOAD_PDF, payload: Api.downloadPdf(endpointType, orderId)})
export const searchCompany = (companyText) => ({type: AT.ORDERS_SEARCH_COMPANY, payload: Api.searchCompany(companyText)})
export const openAssignLots = () => ({type: AT.ORDER_OPEN_ASSIGN_LOTS, payload: {}})
export const closeAssignLots = () => ({type: AT.ORDER_CLOSE_ASSIGN_LOTS, payload: {}})
export const assignLots = (orderId, tabLots) => ({
  type: AT.ORDER_ASSIGN_LOTS,
  async payload() {
    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }
    let orderItems = []
    await asyncForEach(tabLots, async (tab, index) => {
      let orderItemId = tab.orderItemId
      let assignedLots = tab.lots.reduce(function(filtered, lot) {
        if (lot.selected && lot.allocated) {
          filtered.push({ lotNumber: lot.lotNumber, pkgAmount: lot.allocated })
        }
        return filtered
      }, [])

      const response = await Api.assignLots(orderId, orderItemId, assignedLots)
      await orderItems.push(response.data.orderItems.find(oi => oi.id === orderItemId))
    })

    return orderItems
  }
})
export const loadLotsToAssign = (productOfferId) => ({type: AT.ORDER_GET_LOTS, payload: Api.getLots(productOfferId) })
export const linkAttachment = (lotId, attachment) => ({type: AT.ORDER_LINK_ATTACHMENT, async payload() {
  await Api.linkAttachment(lotId, attachment.id)
  return {
    lotId: lotId,
    file: attachment
  }
}})
export const removeAttachmentLink = (isLot, lotId, aId) => ({type: AT.ORDER_REMOVE_ATTACHMENT_LINK, payload: Api.removeAttachmentLink(lotId, aId)})
export const removeAttachment = (aId) => ({type: AT.ORDER_REMOVE_ATTACHMENT, async payload() {
  await Api.removeAttachment(aId)
  return {
    fileId: aId
  }
}})
export const cancelPayment = (orderId) => ({type: AT.ORDER_CANCEL_PAYMENT, payload: Api.cancelPayment(orderId)})
