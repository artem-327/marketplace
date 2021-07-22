import moment from 'moment'
import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'
// Api
import * as api from './api'
// Actions
import {
  getDocumentTypes,
  getProductConditions,
  getProductForms,
  getProductGrades
} from '../global-data/actions.js'
// Services
import { Datagrid } from '../datagrid'
import { getSafe } from '../../utils/functions'

export const initProductOfferEdit = (id) => {
  return async dispatch => {
    dispatch(getDocumentTypes())
    dispatch(getProductConditions())
    dispatch(getProductForms())
    dispatch(getProductGrades())
    dispatch(getWarehouses())
    await dispatch(searchManufacturers('', 200))
    await dispatch(searchOrigins('', 200))

    if (id) {
      dispatch(getProductOffer(id))
    }
  }
}
export const addAttachment = createAsyncAction('INVENTORY_ADD_ATTACHMENT', async (attachment, type, additionalParams = {}) => {
  const data = await api.addAttachment(attachment, type, additionalParams)
  Datagrid && Datagrid.loadData()
  return data
})
export const updateAttachment = createAsyncAction('INVENTORY_UPDATE_ATTACHMENT', async (id, payload) => {
  const data = await api.updateAttachment(id, payload)
  Datagrid.loadData()
  return data
})
export const addProductOffer = createAsyncAction('INVENTORY_ADD_PRODUCT_OFFER', async (values, poId = false, simple = false, isGrouped = false, attachmentFiles = []) => {
  let params = {}

  if (!simple) {
    const attachments =
      values.attachments && values.attachments.length
        ? values.attachments.map(att => {
            return att.id
          })
        : []

    const additional =
      values.additional && values.additional.length
        ? values.additional.map(add => {
            return add.id
          })
        : []

    params = {
      anonymous: getSafe(() => values.anonymous, null),
      assayMin: getSafe(() => parseFloat(values.assayMin)),
      assayMax: getSafe(() => parseFloat(values.assayMax)),
      attachments: attachments.concat(additional),
      certOfAnalysis: getSafe(() => values.certOfAnalysis, null),
      costRecords:
        values.trackSubCosts && values.costs
          ? values.costs.map(cost => {
              return {
                attachment: getSafe(() => cost.attachments[0].id),
                description: cost.description,
                lotNumber: cost.lot === 0 ? 0 : values.lots[cost.lot - 1].lotNumber,
                value: parseInt(cost.cost)
              }
            })
          : null,
      companyProduct: parseInt(values.product),
      conditionNotes: getSafe(() => values.conditionNotes, null),
      conforming: getSafe(() => values.conforming, null),
      costPerUOM: getSafe(() => values.costPerUOM, null),
      externalNotes: getSafe(() => values.externalNotes),
      inStock: values.inStock,
      internalNotes: getSafe(() => values.internalNotes),
      leadTime: getSafe(() => values.leadTime),
      lotExpirationDate: getSafe(() => values.lotExpirationDate, null),
      lotManufacturedDate: getSafe(() => values.lotManufacturedDate, null),
      lotNumber: getSafe(() => values.lotNumber, null),
      minPkg: parseInt(values.minimum),
      origin: getSafe(() => values.origin),
      pkgAvailable: getSafe(() => values.pkgAvailable, 10),
      pricingTiers: getSafe(
        () =>
          values.pricingTiers.map((tier, index) => {
            return {
              pricePerUOM: parseFloat(tier.price),
              quantityFrom: parseInt(tier.quantityFrom)
            }
          }),
        []
      ),
      processingTimeDays: parseInt(values.processingTimeDays),
      condition: getSafe(() => parseInt(values.productCondition)),
      form: getSafe(() => parseInt(values.productForm)),
      grades: values.productGrades,
      splitPkg: parseInt(values.splits),
      validityDate: values.expirationDate ? moment(values.expirationDate).utc(values.expirationDate).format() : null,
      warehouse: parseInt(values.warehouse),
      tdsFields: getSafe(() => values.tdsFields, ''),
      shared: getSafe(() => values.shared, ''),
      acceptBids: values?.acceptBids
    }
  } else {
    params = values // ! ! az bude BE vracet pricingTiers, tak predelat zkombinovat tento radek s vytvarenim objektu vyse (prejmenovane / chybejici atributy)
  }

  if (!poId) {
    const broadcastOption = values?.broadcastOption.includes('BROADCAST_TEMPLATE')
      ? 'BROADCAST_TEMPLATE'
      : values?.broadcastOption
      ? values?.broadcastOption
      : ''
    const broadcastedTemplateId = !isNaN(parseInt(values.broadcastOption.split('|')[1]))
      ? parseInt(values.broadcastOption.split('|')[1])
      : ''

    params = { ...params, broadcastOption, broadcastedTemplateId }
  }

  let paramsCleaned = {}
  const paramKeys = Object.keys(params)
  for (let i = 0; i < paramKeys.length; i++) {
    if (
      (Array.isArray(params[paramKeys[i]]) && params[paramKeys[i]].length > 0) ||
      (!Array.isArray(params[paramKeys[i]]) && !!params[paramKeys[i]]) ||
      params[paramKeys[i]] === false
    ) {
      paramsCleaned[paramKeys[i]] = params[paramKeys[i]]
    }
  }

  if (poId) {
    if (attachmentFiles && attachmentFiles.length) {
      attachmentFiles.forEach(attachment => {
        api.attachmentLinksToProductOffer(attachment.id, poId)
      })
    }
    if (isGrouped) {
      const response = await api.updateGroupedProductOffer(poId, {
        pkgAvailable: paramsCleaned.pkgAvailable,
        lotNumber: paramsCleaned.lotNumber
      })
      return response
    } else {
      const response = await api.updateProductOffer(poId, paramsCleaned)
      return response
    }
  } else {
    const newProd = await api.addProductOffer(paramsCleaned)

    if (attachmentFiles && attachmentFiles.length) {
      attachmentFiles.forEach(attachment => {
        api.attachmentLinksToProductOffer(attachment.id, newProd.id)
      })
    }
    return newProd
  }
})
export const downloadAttachment = createAsyncAction('INVENTORY_DOWNLOAD_ATTACHMENT', id => api.downloadAttachment(id))
export const downloadAttachmentPdf = createAsyncAction('INVENTORY_DOWNLOAD_ATTACHMENT_PDF', id => api.downloadAttachmentPdf(id))
export const findProducts = createAsyncAction('INVENTORY_FIND_PRODUCTS', search => api.findProducts(search))
export const getProductOffer = createAsyncAction('INVENTORY_GET_PRODUCT_OFFER', productOfferId => api.getProductOffer(productOfferId))
export const getSharedProductOffer = createAsyncAction('INVENTORY_GET_SHARED_PRODUCT_OFFER', productOfferId => api.getSharedProductOffer(productOfferId))
export const deleteProductOffer = createAsyncAction('INVENTORY_DELETE_PRODUCT_OFFER', async productOfferId => {
  await api.deleteProductOffer(productOfferId)
  return productOfferId
})
export const getWarehouses = createAsyncAction('INVENTORY_GET_WAREHOUSES', () => api.getWarehouses())
export const loadFile = createAsyncAction('INVENTORY_LOAD_FILE', (attachment) => api.loadFile(attachment))
export const patchBroadcast = createAsyncAction('INVENTORY_PATCH_BROADCAST', async (broadcasted, productOfferId, oldStatus) => {
  const response = await api.patchBroadcast(broadcasted, productOfferId)
  return {
    broadcasted: response.status === 200 ? response.data : oldStatus,
    productOfferId
  }
})
export const removeAttachmentLink = createAsyncAction('INVENTORY_REMOVE_ATTACHMENT_LINK', (isLot, itemId, aId) => api.removeAttachmentLink(isLot, itemId, aId))
export const removeAttachment = createAsyncAction('INVENTORY_REMOVE_ATTACHMENT', async (aId) => {
  const data = await api.removeAttachment(aId)
  Datagrid.removeRow(aId)
  return data
})
export const searchManufacturers = createAsyncAction('INVENTORY_SEARCH_MANUFACTURERS', async (text, limit = false) => {
  const response = await api.searchManufacturers(text, limit)
  return {
    data: response.data
      ? response.data.map(p => ({
          text: p.name,
          value: p.id,
          key: p.id
        }))
      : []
  }
})
export const searchOrigins = createAsyncAction('INVENTORY_SEARCH_ORIGINS', async (text, limit = false) => {
  const response = await api.searchOrigins(text, limit)
  return {
    data: response.data
      ? response.data.map(p => ({
          text: p.name,
          value: p.id,
          key: p.id
        }))
      : []
  }
})
export const getAutocompleteData = createAsyncAction('GET_AUTOCOMPLETE_DATA', ({ searchUrl }) => api.getAutocompleteData(searchUrl))
export const groupOffers = createAsyncAction('INVENTORY_GROUP_OFFERS', (request) => api.groupOffers(request))
export const removeAttachmentLinkProductOffer = createAsyncAction('INVENTORY_REMOVE_ATTACHMENT_LINK_PRODUCT_OFFER', (attachmentId, productOfferId) => api.removeAttachmentLinkProductOffer(attachmentId, productOfferId))
export const saveTdsAsTemplate = createAsyncAction('TDS_SAVE_AS_TEMPLATE', (templateName, tdsFields) => api.saveTdsAsTemplate(templateName, tdsFields))
export const getTdsTemplates = createAsyncAction('TDS_GET_TEMPLATES', () => api.getTdsTemplates())
export const deleteTdsTemplate = createAsyncAction('TDS_DELETE_TEMPLATE', async (templateId) => {
  await api.deleteTdsTemplate(templateId)
  return templateId
})
export const getMarkUp = createAsyncAction('INVENTORY_GET_MARKUP', poId => api.getMarkUp(poId))
export const updateMarkUp = createAsyncAction('INVENTORY_UPDATE_MARKUP', (poId, values) => api.updateMarkUp(poId, values))
export const modalDetailTrigger = createAction('MODAL_DETAIL_TRIGGER', (row = null, force = false, activeTab = 0) => ({ force: force, activeTab: activeTab, row: row }))
export const closeModalDetail = createAction('INVENTORY_CLOSE_MODAL')
export const applyDatagridFilter = createAction('INVENTORY_APPLY_FILTER', (filter, reload = true) => ({ filter, reload }))
export const setPricingEditOpenId = createAction('INVENTORY_SET_PRICING_EDIT_OPEN_ID', id => id)
export const closePricingEditPopup = createAction('INVENTORY_SET_PRICING_EDIT_OPEN_ID', () => null)
export const handleVariableSave = createAction('INVENTORY_HANDLE_VARIABLE_CHANGE', (variable, value) => ({ variable, value }))
export const toggleColumnSettingModal = createAction('TOGGLE_COLUMN_SETTING_MODAL', isOpen => isOpen)
export const handleProductCatalogUnmappedValue = createAction('HANDLE_PRODUCT_CATALOG_UNMAPPED_VALUE', value => value)
export const openPopup = createAction('INVENTORY_OPEN_POPUP', (rows = null) => rows)
export const closePopup = createAction('INVENTORY_CLOSE_POPUP', (rows = null) => rows)
export const resetForm = createAction('INVENTORY_RESET_FORM', initValues => ({data: {...initValues}}))
export const changeBroadcast = createAction('CHANGE_BROADCAST', broadcastOption => broadcastOption)
export const setActiveTab = createAction('SET_ACTIVE_TAB', tab => tab)
export const triggerPriceBookModal = createAction('TRIGGER_PRICE_BOOK_MODAL', (isOpen, rowPriceBook) => ({ isOpen, rowPriceBook }))
