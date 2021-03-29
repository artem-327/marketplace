import * as AT from './action-types'
import * as api from './api'
import moment from 'moment'
import { getSafe } from '~/utils/functions'
//Actions
import { openBroadcast } from '../broadcast/actions'
// import { createAsyncAction } from 'redux-promise-middleware-actions'

// import { toggleFilter, filterSaving, filterApplying } from '~/modules/filter/actions'
import { Datagrid } from '~/modules/datagrid'

export function initProductOfferEdit(id) {
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

export function addAttachment(attachment, type, additionalParams = {}) {
  return {
    type: AT.INVENTORY_ADD_ATTACHMENT,
    async payload() {
      const data = await api.addAttachment(attachment, type, additionalParams)
      Datagrid && Datagrid.loadData()
      return data
    }
  }
}

export function addVerificationDocuments(attachment, type) {
  return {
    type: AT.INVENTORY_ADD_VERIFICATION_DOCUMENTS,
    async payload() {
      return await api.addVerificationDocuments(attachment, type)
    }
  }
}

export const updateAttachment = (id, payload) => {
  return async dispatch => {
    await dispatch({ type: AT.INVENTORY_UPDATE_ATTACHMENT, payload: api.updateAttachment(id, payload) })
    Datagrid.loadData()
  }
}

export function addProductOffer(values, poId = false, simple = false, isGrouped = false, attachmentFiles = []) {
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
      shared: getSafe(() => values.shared, '')
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
  return async dispatch => {
    if (poId) {
      if (attachmentFiles && attachmentFiles.length) {
        attachmentFiles.forEach(attachment => {
          dispatch({
            type: AT.ATTACHMENT_LINKS_TO_PRODUCT_OFFER,
            payload: api.attachmentLinksToProductOffer(attachment.id, poId)
          })
        })
      }
      if (isGrouped) {
        const response = await api.updateGroupedProductOffer(poId, {
          pkgAvailable: paramsCleaned.pkgAvailable,
          lotNumber: paramsCleaned.lotNumber
        })
        await dispatch({
          type: AT.INVENTORY_EDIT_GROUPED_PRODUCT_OFFER,
          payload: response
        })
        return response
      } else {
        const response = await api.updateProductOffer(poId, paramsCleaned)
        await dispatch({
          type: AT.INVENTORY_EDIT_PRODUCT_OFFER,
          payload: response
        })
        return response
      }
    } else {
      const newProd = await dispatch({
        type: AT.INVENTORY_ADD_PRODUCT_OFFER,
        payload: api.addProductOffer(paramsCleaned)
      })

      if (attachmentFiles && attachmentFiles.length) {
        attachmentFiles.forEach(attachment => {
          dispatch({
            type: AT.ATTACHMENT_LINKS_TO_PRODUCT_OFFER,
            payload: api.attachmentLinksToProductOffer(attachment.id, newProd.value.data.id)
          })
        })
      }
      return newProd.value
    }
  }
}

export function downloadAttachment(id) {
  return {
    type: AT.INVENTORY_DOWNLOAD_ATTACHMENT,
    payload: api.downloadAttachment(id)
  }
}

export function downloadAttachmentPdf(id) {
  return {
    type: AT.INVENTORY_DOWNLOAD_ATTACHMENT_PDF,
    payload: api.downloadAttachmentPdf(id)
  }
}

export function errorTooLarge(fileName, fileMaxSize) {
  return {
    type: AT.ERROR_TOO_LARGE_FILE,
    payload: {
      fileName: blob.name,
      maxSize: fileMaxSize
    }
  }
}

export function errorUploadFail(fileName) {
  return {
    type: AT.ERROR_UPLOAD_FILE_FAILED,
    payload: {
      fileName: fileName
    }
  }
}

export function fillProduct(product) {
  return {
    type: AT.INVENTORY_FILL_PRODUCT,
    payload: {
      data: [
        {
          text: product.casProduct.casIndexName,
          value: product,
          key: product.casProduct.id
        }
      ]
    }
  }
}

export function findProducts(search) {
  return {
    type: AT.INVENTORY_FIND_PRODUCTS,
    payload: api.findProducts(search)
  }
}

export function getDocumentTypes() {
  return {
    type: AT.INVENTORY_GET_DOCUMENT_TYPES,
    payload: api.getDocumentTypes()
  }
}

export function getProductConditions() {
  return {
    type: AT.INVENTORY_GET_PRODUCT_CONDITIONS,
    payload: api.getProductConditions()
  }
}

export function getProductForms() {
  return {
    type: AT.INVENTORY_GET_PRODUCT_FORMS,
    payload: api.getProductForms()
  }
}

export function getProductGrades() {
  return {
    type: AT.INVENTORY_GET_PRODUCT_GRADES,
    payload: api.getProductGrades()
  }
}

export const getProductOffer = productOfferId => ({
  type: AT.INVENTORY_GET_PRODUCT_OFFER,
  payload: api.getProductOffer(productOfferId)
})

export function deleteProductOffer(productOfferId) {
  return async dispatch => {
    await dispatch({
      type: AT.INVENTORY_DELETE_PRODUCT_OFFER,
      async payload() {
        await api.deleteProductOffer(productOfferId)
        return productOfferId
      }
    })
    // dispatch(getMyProductOffers())
  }
}

export function getWarehouses() {
  return {
    type: AT.INVENTORY_GET_WAREHOUSES,
    payload: api.getWarehouses()
  }
}

export function linkAttachment(isLot, itemId, aId) {
  return {
    type: AT.INVENTORY_LINK_ATTACHMENT,
    payload: api.linkAttachment(isLot, itemId, aId)
  }
}

export function loadFile(attachment) {
  return {
    type: AT.INVENTORY_LOAD_FILE,
    payload: api.loadFile(attachment)
  }
}

export function patchBroadcast(broadcasted, productOfferId, oldStatus) {
  return {
    type: AT.INVENTORY_PATCH_BROADCAST,
    async payload() {
      const response = await api.patchBroadcast(broadcasted, productOfferId)

      return {
        broadcasted: response.status === 200 ? response.data : oldStatus,
        productOfferId
      }
    }
  }
}

export function removeAttachmentLink(isLot, itemId, aId) {
  return {
    type: AT.INVENTORY_REMOVE_ATTACHMENT_LINK,
    payload: api.removeAttachmentLink(isLot, itemId, aId)
  }
}

export function removeAttachment(aId) {
  return async dispatch => {
    await dispatch({ type: AT.INVENTORY_REMOVE_ATTACHMENT, payload: api.removeAttachment(aId) })
    Datagrid.removeRow(aId)
  }
}

export function resetForm(initValues) {
  return {
    type: AT.INVENTORY_RESET_FORM,
    payload: {
      data: {
        ...initValues
      }
    }
  }
}

export function searchManufacturers(text, limit = false) {
  return {
    type: AT.INVENTORY_SEARCH_MANUFACTURERS,
    async payload() {
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
    }
  }
}

export function searchOrigins(text, limit = false) {
  return {
    type: AT.INVENTORY_SEARCH_ORIGINS,
    async payload() {
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
    }
  }
}

// export function searchProducts(text) {
//   return {
//     type: AT.INVENTORY_SEARCH_PRODUCTS,
//     async payload() {
//       const response = await api.searchProducts(text)

//       return {
//         data: response.data ? response.data.map(p => ({
//           text: p.casProduct ? p.casProduct.casIndexName : p.productName + ' (Unmapped)',
//           value: p,
//           key: p.casProduct ? p.casProduct.id : '',
//           id: p ? p.id : '',
//           name: p.productName + (p.productCode ? ' (' + p.productCode + ')' : ''),
//           casName: p.casProduct ? p.casProduct.casIndexName + ' (' + p.casProduct.casNumber + ')' : ''
//         })) : []
//       }
//     }
//   }
// }

export function uploadDocuments(isLot, productOfferId, fileIds) {
  let files = [](function loop(j) {
    if (j < fileIds.length)
      new Promise((resolve, reject) => {
        files[j] = fileIds[j].id.id
        linkAttachment(isLot, productOfferId, files[j])
          .then(() => {
            resolve()
          })
          .catch(e => {
            // TODO: solve errors
            reject()
          })
      }).then(loop.bind(null, j + 1))
  })(0)
}

export const getAutocompleteData = ({ searchUrl }) => ({
  type: AT.GET_AUTOCOMPLETE_DATA,
  payload: api.getAutocompleteData(searchUrl)
})

export const simpleEditTrigger = (popupValues = {}, force = false) => ({
  type: AT.SIMPLE_EDIT_TRIGGER,
  payload: { popupValues, force }
})

export const modalDetailTrigger = (row = null, force = false, activeTab = 0) => {
  return {
    type: AT.MODAL_DETAIL_TRIGGER,
    payload: { force: force, activeTab: activeTab, row: row }
  }
}

export function closeModalDetail() {
  return {
    type: AT.INVENTORY_CLOSE_MODAL
  }
}

export function groupOffers(request) {
  return {
    type: AT.INVENTORY_GROUP_OFFERS,
    payload: api.groupOffers(request)
  }
}

export function detachOffers(productOfferIds) {
  return {
    type: AT.INVENTORY_DETACH_OFFERS,
    payload: api.detachOffers(productOfferIds)
  }
}
export function applyDatagridFilter(filter, reload = true) {
  return {
    type: AT.INVENTORY_APPLY_FILTER,
    payload: { filter, reload }
  }
}

export function removeAttachmentLinkProductOffer(attachmentId, productOfferId) {
  return {
    type: AT.INVENTORY_REMOVE_ATTACHMENT_LINK_PRODUCT_OFFER,
    async payload() {
      return await api.removeAttachmentLinkProductOffer(attachmentId, productOfferId)
    }
  }
}

export function setPricingEditOpenId(id) {
  return {
    type: AT.INVENTORY_SET_PRICING_EDIT_OPEN_ID,
    payload: id
  }
}

export function closePricingEditPopup() {
  return {
    type: AT.INVENTORY_SET_PRICING_EDIT_OPEN_ID,
    payload: null
  }
}

export function setExportModalOpenState(open) {
  return {
    type: AT.INVENTORY_SET_EXPORT_MODAL_OPEN_STATE,
    payload: open
  }
}

export function handleVariableSave(variable, value) {
  return {
    type: AT.INVENTORY_HANDLE_VARIABLE_CHANGE,
    payload: { variable, value }
  }
}

export function toggleColumnSettingModal(isOpen) {
  return {
    type: AT.TOGGLE_COLUMN_SETTING_MODAL,
    payload: isOpen
  }
}
export function handleProductCatalogUnmappedValue(value) {
  return async dispatch => {
    dispatch({
      type: AT.HANDLE_PRODUCT_CATALOG_UNMAPPED_VALUE,
      payload: value
    })
  }
}

export function openPopup(rows = null) {
  return {
    type: AT.INVENTORY_OPEN_POPUP,
    payload: rows
  }
}

export function closePopup(rows = null) {
  return {
    type: AT.INVENTORY_CLOSE_POPUP,
    payload: rows
  }
}

export function saveTdsAsTemplate(templateName, tdsFields) {
  return {
    type: AT.TDS_SAVE_AS_TEMPLATE,
    async payload() {
      return await api.saveTdsAsTemplate(templateName, tdsFields)
    }
  }
}

export function getTdsTemplates() {
  return {
    type: AT.TDS_GET_TEMPLATES,
    async payload() {
      return await api.getTdsTemplates()
    }
  }
}

export function deleteTdsTemplate(templateId) {
  return {
    type: AT.TDS_DELETE_TEMPLATE,
    async payload() {
      const response = await api.deleteTdsTemplate(templateId)
      return templateId
    }
  }
}

export function changeBroadcast(broadcastOption) {
  return {
    type: AT.CHANGE_BROADCAST,
    payload: broadcastOption
  }
}

export function getMarkUp(poId) {
  return {
    type: AT.INVENTORY_GET_MARKUP,
    payload: api.getMarkUp(poId)
  }
}

export function updateMarkUp(poId, values) {
  return {
    type: AT.INVENTORY_UPDATE_MARKUP,
    payload: api.updateMarkUp(poId, values)
  }
}

export function setActiveTab(tab) {
  return {
    type: AT.SET_ACTIVE_TAB,
    payload: tab
  }
}

export function triggerPriceBookModal(isOpen, rowIdPriceBook) {
  return async dispatch => {
    await dispatch({
      type: AT.TRIGGER_PRICE_BOOK_MODAL,
      payload: { isOpen, rowIdPriceBook }
    })
    if (rowIdPriceBook && isOpen) {
      await dispatch(openBroadcast({ id: rowIdPriceBook }))
    }
  }
}
