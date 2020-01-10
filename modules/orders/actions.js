import * as AT from './action-types'
import Api from './api'

export const loadData = (endpointType, filter = null) => ({
  type: AT.ORDERS_FETCH_SUCCESS,
  payload: { endpointType, filter }
})
export const loadDetail = (endpointType, selectedIndex) => ({
  type: AT.ORDERS_DETAIL_FETCH,
  payload: { endpointType, selectedIndex }
})
export const confirmOrder = orderId => ({
  type: AT.ORDER_CONFIRM_FETCH,
  payload: Api.confirm(orderId)
})
export const confirmReturned = (orderId, fundingSourceId) => ({
  type: AT.ORDER_CONFIRM_RETURNED_FETCH,
  payload: Api.confirmReturned(orderId, fundingSourceId)
})
export const rejectOrder = orderId => ({
  type: AT.ORDER_REJECT_FETCH,
  payload: Api.reject(orderId)
})
export const shipOrder = (orderId, trackingId = '') => ({
  type: AT.ORDER_SHIP_FETCH,
  payload: Api.ship(orderId, trackingId)
})
export const returnShipOrder = (orderId, trackingId = '') => ({
  type: AT.ORDER_RETURN_SHIP_FETCH,
  payload: Api.returnShip(orderId, trackingId)
})
export const downloadPdf = (endpointType, orderId) => ({
  type: AT.ORDER_DOWNLOAD_PDF,
  payload: Api.downloadPdf(endpointType, orderId)
})
export const searchCompany = companyText => ({
  type: AT.ORDERS_SEARCH_COMPANY,
  payload: Api.searchCompany(companyText)
})
export const openAssignLots = () => ({
  type: AT.ORDER_OPEN_ASSIGN_LOTS,
  payload: {}
})
export const closeAssignLots = () => ({
  type: AT.ORDER_CLOSE_ASSIGN_LOTS,
  payload: {}
})
export const assignLots = (orderId, tabLots) => ({
  type: AT.ORDER_ASSIGN_LOTS,
  async payload() {
    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
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
export const loadLotsToAssign = productOfferId => ({
  type: AT.ORDER_GET_LOTS,
  payload: Api.getLots(productOfferId)
})
export const linkAttachment = (lotId, attachment) => ({
  type: AT.ORDER_LINK_ATTACHMENT,
  async payload() {
    await Api.linkAttachment(lotId, attachment.id)
    return {
      lotId: lotId,
      file: attachment
    }
  }
})
export const removeAttachmentLink = (isLot, lotId, aId) => ({
  type: AT.ORDER_REMOVE_ATTACHMENT_LINK,
  payload: Api.removeAttachmentLink(lotId, aId)
})
export const removeAttachment = aId => ({
  type: AT.ORDER_REMOVE_ATTACHMENT,
  async payload() {
    await Api.removeAttachment(aId)
    return {
      fileId: aId
    }
  }
})
export const cancelPayment = orderId => ({
  type: AT.ORDER_CANCEL_PAYMENT,
  async payload() {
    await Api.cancelPayment(orderId)
    return {
      orderId: orderId
    }
  }
})
export const openReinitiateTransfer = () => ({
  type: AT.ORDER_OPEN_REINITIATE_TRANSFER,
  payload: {}
})
export const closeReinitiateTransfer = () => ({
  type: AT.ORDER_CLOSE_REINITIATE_TRANSFER,
  payload: {}
})
export const loadBankAccounts = () => ({
  type: AT.ORDER_LOAD_BANK_ACCOUNTS,
  payload: Api.loadBankAccounts()
})
export const payOrder = (orderId, bankAccount) => ({
  type: AT.ORDER_PAY_ORDER,
  payload: Api.payOrder(orderId, bankAccount)
})
export const cancelOrder = orderId => ({
  type: AT.ORDER_CANCEL_ORDER,
  payload: Api.cancelOrder(orderId)
})
export const getRelatedOrders = orderId => ({
  type: AT.RELATED_ORDERS,
  payload: Api.getRelatedOrders(orderId)
})
export const approveOrder = orderId => ({
  type: AT.ORDER_APPROVE_ORDER,
  payload: Api.approveOrder(orderId)
})
export const discardOrder = orderId => ({
  type: AT.ORDER_DISCARD_ORDER,
  payload: Api.discardOrder(orderId)
})
export const openPopupName = name => ({
  type: AT.ORDER_OPEN_POPUP_NAME,
  payload: name
})
export const closePopup = () => ({
  type: AT.ORDER_CLOSE_POPUP,
  payload: {}
})
export const receivedOrder = orderId => ({
  type: AT.ORDER_RECEIVED_ORDER,
  payload: Api.receivedOrder(orderId)
})
export const acceptDelivery = orderId => ({
  type: AT.ORDER_ACCEPT_DELIVERY_ORDER,
  payload: Api.accept(orderId)
})

export const returnShipmentRates = (orderId, pickupDate) => ({
  type: AT.RETURN_SHIPMENT_RATES,
  payload: Api.returnShipmentRates(orderId, pickupDate)
})

export const returnShipmentOrder = (orderId, query) => ({
  type: AT.RETURN_SHIPMENT_ORDER,
  payload: Api.returnShipmentOrder(orderId, query)
})

export const rejectPurchaseOrder = (orderId, request, files) => ({
  type: AT.REJECT_PURCHASE_ORDER,
  payload: Api.rejectPurchaseOrder(orderId, request, files)
})
export const creditCounterAccept = orderId => ({
  type: AT.ACCEPT_CREDIT,
  payload: Api.creditCounterAccept(orderId)
})
export const creditCounter = (orderId, request, files) => ({
  type: AT.CREDIT_COUNTER,
  payload: Api.creditCounter(orderId, request, files)
})
export const creditCounterReject = orderId => ({
  type: AT.CREDIT_COUNTER_REJECT,
  payload: Api.creditCounterReject(orderId)
})

export const creditRequest = (orderId, request, files) => ({
  type: AT.CREDIT_REQUEST_UPDATE,
  payload: Api.creditRequest(orderId, request, files)
})
export const getShippingQuotes = (orderId, pickupDate) => ({
  type: AT.ORDER_SHIPPING_QUOTES_FETCH,
  payload: Api.getShippingQuotes(orderId, pickupDate)
})
export const getManualShippingQuote = (orderId, query) => ({
  type: AT.ORDER_MANUAL_SHIPPING_QUOTE,
  payload: Api.getManualShippingQuote(orderId, query)
})
export const purchaseShipmentOrder = (orderId, query) => ({
  type: AT.ORDER_PURCHASE_SHIPMENT_ORDER,
  payload: Api.purchaseShipmentOrder(orderId, query)
})

export const downloadCreditRequestAttachments = (endpointType, orderId, creditRequestAttachmentId) => ({
  type: AT.DOWNLOAD_CREDIT_REQUEST_ATTACHMENTS,
  payload: Api.downloadCreditRequestAttachments(endpointType, orderId, creditRequestAttachmentId)
})

export const creditAccept = orderId => ({
  type: AT.CREDIT_ACCEPT,
  payload: Api.creditAccept(orderId)
})
