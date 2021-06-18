import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
import Api from './api'

export const loadData = createAction('ORDERS_FETCH_SUCCESS', (endpointType, filter = null) => ({ endpointType, filter }))
export const confirmOrder = createAsyncAction('ORDER_CONFIRM_FETCH', orderId => Api.confirm(orderId))
export const confirmReturned = createAsyncAction('ORDER_CONFIRM_RETURNED_FETCH', orderId => Api.confirmReturned(orderId))
export const rejectOrder = createAsyncAction('ORDER_REJECT_FETCH', orderId => Api.reject(orderId))
export const shipOrder = createAsyncAction('ORDER_SHIP_FETCH', (orderId, trackingId = '') => Api.ship(orderId, trackingId))
export const returnShipOrder = createAsyncAction('ORDER_RETURN_SHIP_FETCH', (orderId, trackingId = '') => Api.returnShip(orderId, trackingId))
export const downloadPdf = createAsyncAction('ORDER_DOWNLOAD_PDF', (endpointType, orderId) => Api.downloadPdf(endpointType, orderId))
export const searchCompany = createAsyncAction('ORDERS_SEARCH_COMPANY', companyText => Api.searchCompany(companyText))
export const openAssignLots = createAction('ORDER_OPEN_ASSIGN_LOTS')
export const closeAssignLots = createAction('ORDER_CLOSE_ASSIGN_LOTS')
export const assignLots = createAsyncAction('ORDER_ASSIGN_LOTS', async (orderId, tabLots) => {
  const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array)
    }
  }
  let orderItems = []
  await asyncForEach(tabLots, async (tab, index) => {
    let orderItemId = tab.orderItemId
    let assignedLots = tab.lots.reduce(function (filtered, lot) {
      if (lot.selected && lot.allocated) {
        filtered.push({ lotNumber: lot.lotNumber, pkgAmount: lot.allocated })
      }
      return filtered
    }, [])

    const response = await Api.assignLots(orderId, orderItemId, assignedLots)
    await orderItems.push(response.data.orderItems.find(oi => oi.id === orderItemId))
  })

  return orderItems
})
export const loadLotsToAssign = createAsyncAction('ORDER_GET_LOTS', productOfferId => Api.getLots(productOfferId))
export const linkAttachment = createAsyncAction('ORDER_LINK_ATTACHMENT', async (lotId, attachment) => {
  await Api.linkAttachment(lotId, attachment.id || attachment.lastModified)
  return {
    lotId: lotId,
    file: attachment
  }
})
export const removeAttachmentLink = createAsyncAction('ORDER_REMOVE_ATTACHMENT_LINK', (isLot, lotId, aId) => Api.removeAttachmentLink(lotId, aId))
export const removeAttachment = createAsyncAction('ORDER_REMOVE_ATTACHMENT', async (aId) => {
  await Api.removeAttachment(aId)
  return {
    fileId: aId
  }
})
export const cancelPayment = createAsyncAction('ORDER_CANCEL_PAYMENT', async (orderId) => {
  await Api.cancelPayment(orderId)
  return {
    orderId: orderId
  }
})
export const openReinitiateTransfer = createAction('ORDER_OPEN_REINITIATE_TRANSFER')
export const closeReinitiateTransfer = createAction('ORDER_CLOSE_REINITIATE_TRANSFER')
export const loadDwollaBankAccounts = createAsyncAction('ORDER_LOAD_DWOLLA_BANK_ACCOUNTS', () => Api.loadDwollaBankAccounts())
export const loadVellociBankAccounts = createAsyncAction('ORDER_LOAD_VELLOCI_BANK_ACCOUNTS', () => Api.loadVellociBankAccounts())
export const payOrder = createAsyncAction('ORDER_PAY_ORDER', (orderId, bankAccount) => Api.payOrder(orderId, bankAccount))
export const cancelOrder = createAsyncAction('ORDER_CANCEL_ORDER', orderId => Api.cancelOrder(orderId))
export const clearRelatedOrders = createAction('CLEAR_RELATED_ORDERS')
export const getRelatedOrders = createAsyncAction('RELATED_ORDERS', orderId => Api.getRelatedOrders(orderId))
export const approveOrder = createAsyncAction('ORDER_APPROVE_ORDER', orderId => Api.approveOrder(orderId))
export const discardOrder = createAsyncAction('ORDER_DISCARD_ORDER', orderId => Api.discardOrder(orderId))
export const openPopupName = createAction('ORDER_OPEN_POPUP_NAME', name => name)
export const closePopup = createAction('ORDER_CLOSE_POPUP')
export const receivedOrder = createAsyncAction('ORDER_RECEIVED_ORDER', orderId => Api.receivedOrder(orderId))
export const acceptDelivery = createAsyncAction('ORDER_ACCEPT_DELIVERY_ORDER', orderId => Api.accept(orderId))
export const getReturnShipmentRates = createAsyncAction('RETURN_SHIPMENT_RATES', (orderId, pickupDate) => Api.getReturnShipmentRates(orderId, pickupDate))
export const returnShipmentOrder = createAsyncAction('RETURN_SHIPMENT_ORDER', (orderId, query) => Api.returnShipmentOrder(orderId, query))
export const rejectPurchaseOrder = createAsyncAction('REJECT_PURCHASE_ORDER', (orderId, request, files) => Api.rejectPurchaseOrder(orderId, request, files))
export const creditCounterAccept = createAsyncAction('ACCEPT_CREDIT', orderId => Api.creditCounterAccept(orderId))
export const creditCounter = createAsyncAction('CREDIT_COUNTER', (orderId, request, files) => Api.creditCounter(orderId, request, files))
export const creditCounterReject = createAsyncAction('CREDIT_COUNTER_REJECT', orderId => Api.creditCounterReject(orderId))
export const creditRequest = createAsyncAction('CREDIT_REQUEST_UPDATE', (orderId, request, files) => Api.creditRequest(orderId, request, files))
export const getShippingQuotes = createAsyncAction('ORDER_SHIPPING_QUOTES_FETCH', (orderId, pickupDate) => Api.getShippingQuotes(orderId, pickupDate))
export const getManualShippingQuote = createAsyncAction('ORDER_MANUAL_SHIPPING_QUOTE', (orderId, query) => Api.getManualShippingQuote(orderId, query))
export const purchaseShipmentOrder = createAsyncAction('ORDER_PURCHASE_SHIPMENT_ORDER', (orderId, query) => Api.purchaseShipmentOrder(orderId, query))
export const downloadCreditRequestAttachments = createAsyncAction('DOWNLOAD_CREDIT_REQUEST_ATTACHMENTS', 
  (endpointType, orderId, creditRequestAttachmentId) => Api.downloadCreditRequestAttachments(endpointType, orderId, creditRequestAttachmentId))
export const creditAccept = createAsyncAction('CREDIT_ACCEPT', orderId => Api.creditAccept(orderId))
export const getPurchaseOrder = createAsyncAction('ORDER_GET_PURCHASE_ORDER', orderId => Api.getPurchaseOrder(orderId))
export const getSaleOrder = createAsyncAction('ORDER_GET_SALE_ORDER', orderId => Api.getSaleOrder(orderId))
export const applyDatagridFilter = createAction('ORDER_APPLY_FILTER', filter => filter)
export const getGroupedProductOffers = createAsyncAction('GET_GROUPED_PRODUCT_OFFERS', async (orderId, orderItemsId) => {
  let res = []
    if (orderItemsId && orderItemsId.length > 1) {
      const asyncForEach = async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
          await callback(array[index], index, array)
        }
      }
      await asyncForEach(orderItemsId, async (id, index) => {
        const result = await Api.getGroupedProductOffers(orderId, id)
        await res.push(result.data)
      })
    } else if (orderId && orderItemsId && orderItemsId.length === 1) {
      const result = await Api.getGroupedProductOffers(orderId, orderItemsId[0])
      await res.push(result.data)
    }
    return res
})
export const patchAssignProductOffers = createAsyncAction('PATCH_ASSIGN_PRODUCT_OFFERS', (orderId, orderItemId, request) => Api.patchAssignProductOffers(orderId, orderItemId, request))
export const deleteAssignProductOffers = createAsyncAction('DELETE_ASSIGN_PRODUCT_OFFERS', (orderId, orderItemId) => Api.deleteAssignProductOffers(orderId, orderItemId))
export const clearGroupedProductOffer = createAction('CLEAR_GROUPED_PRODUCT_OFFERS')
export const linkAttachmentToOrderItem = createAsyncAction('LINK_ATTACHMENT_TO_ORDER_ITEM', (query) => Api.linkAttachmentToOrderItem(query))
export const removeLinkAttachmentToOrderItem = createAsyncAction('REMOVE_LINK_ATTACHMENT_TO_ORDER_ITEM', (query) => Api.removeLinkAttachmentToOrderItem(query))
export const unlinkAttachmentToOrder = createAsyncAction('UNLINK_ATTACHMENT_TO_ORDER', (query) => Api.unlinkAttachmentToOrder(query))
export const linkAttachmentToOrder = createAsyncAction('LINK_ATTACHMENT_TO_ORDER', (query) => Api.linkAttachmentToOrder(query))
export const clearOrderDetail = createAction('CLEARE_ORDER_DETAIL')
export const editTrackingCode = createAsyncAction('EDIT_TRACKING_CODE', (orderId, trackingCode) => Api.editTrackingCode(orderId, trackingCode))
export const editReturnTrackingCode = createAsyncAction('EDIT_RETURN_TRACKING_CODE', (orderId, trackingCode) => Api.editReturnTrackingCode(orderId, trackingCode))
export const saveFilters = createAction('ORDERS_SAVE_FILTERS', filters => filters)
export const orderResolutionReopen = createAsyncAction('ORDERS_RESOLUTION_REOPEN', (orderId, ordersType) => Api.orderResolutionReopen(orderId, ordersType))
export const orderResolutionAccept = createAsyncAction('ORDERS_RESOLUTION_ACCEPT', (orderId, ordersType) => Api.orderResolutionAccept(orderId, ordersType))
export const downloadDisputeAttachment = createAsyncAction('DOWNLOAD_DISPUTE_ATTACHMENT', (orderId, attachmentId) => Api.downloadDisputeAttachment(orderId, attachmentId))
