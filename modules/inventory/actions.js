import * as AT from './action-types'
import * as api from './api'
import moment from 'moment'
import { getSafe } from '~/utils/functions'

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
      Datagrid.loadData()
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


export function addProductOffer(values, poId = false, simple = false) {
  let params = {}

  if (!simple) {

    if (values.lots.length === 0) {
      values.lots = [{
        lotNumber: '1',
        pkgAvailable: parseInt(values.pkgAvailable)
      }]
    }

    const attachments = values.attachments && values.attachments.length ? values.attachments.map(att => {
      return att.id
    }) : []

    const additional = values.additional && values.additional.length ? values.additional.map(add => {
      return add.id
    }) : []

    params = {
      assayMin: getSafe(() => parseFloat(values.assayMin)),
      assayMax: getSafe(() => parseFloat(values.assayMax)),
      attachments: attachments.concat(additional),
      costRecords: values.trackSubCosts && values.costs ? values.costs.map(cost => {
        return {
          attachment: getSafe(() => cost.attachments[0].id),
          description: cost.description,
          lotNumber: cost.lot === 0 ? 0 : values.lots[cost.lot - 1].lotNumber,
          value: parseInt(cost.cost)
        }
      }) : null,
      companyProduct: parseInt(values.product),
      externalNotes: getSafe(() => values.externalNotes),
      inStock: values.inStock,
      internalNotes: getSafe(() => values.internalNotes),
      lots: values.lots ? values.lots.map(lot => {
        return {
          attachments: lot.attachments && lot.attachments.length ? lot.attachments.map(att => {
            return att.id
          }) : null,
          expirationDate: lot.expirationDate && getSafe(() => moment(lot.expirationDate).utc(lot.expirationDate).format()),
          lotNumber: lot.lotNumber,
          manufacturedDate: lot.manufacturedDate && getSafe(() => moment(lot.manufacturedDate).utc(lot.manufacturedDate).format()),
          pkgAvailable: getSafe(() => parseInt(lot.pkgAvailable))
        }
      }) : null,
      // ! ! otestovat manufacturer: getSafe(() => values.manufacturer),
      minPkg: parseInt(values.minimum),
      origin: getSafe(() => values.origin),
      pricingTiers: getSafe(() => values.pricingTiers.map((tier, index) => {
        return {
          pricePerUOM: parseFloat(tier.price),
          quantityFrom: parseInt(!index ? values.minimum : tier.quantityFrom)
        }
      }), []),
      processingTimeDays: parseInt(values.processingTimeDays),
      condition: getSafe(() => parseInt(values.productCondition)),
      form: getSafe(() => parseInt(values.productForm)),
      grades: values.productGrades,
      splitPkg: parseInt(values.splits),
      // ! ! otestovat tradeName: getSafe(() => values.tradeName),
      validityDate: values.expirationDate ? moment(values.expirationDate).utc(values.expirationDate).format() : null,
      warehouse: parseInt(values.warehouse)
    }

  } else {
    params = values // ! ! az bude BE vracet pricingTiers, tak predelat zkombinovat tento radek s vytvarenim objektu vyse (prejmenovane / chybejici atributy)
  }

  if (poId) {
    return {
      type: AT.INVENTORY_EDIT_PRODUCT_OFFER,
      payload: api.updateProductOffer(poId, params)
    }
  } else {
    return {
      type: AT.INVENTORY_ADD_PRODUCT_OFFER,
      payload: api.addProductOffer(params)
    }
  }
}

export function downloadAttachment(id) {
  return {
    type: AT.INVENTORY_DOWNLOAD_ATTACHMENT,
    payload: api.downloadAttachment(id)
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
      data: [{
        text: product.casProduct.casIndexName,
        value: product,
        key: product.casProduct.id
      }]
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

export const getProductOffer = (productOfferId) => (
  { type: AT.INVENTORY_GET_PRODUCT_OFFER, payload: api.getProductOffer(productOfferId) }
)

export function deleteProductOffer(productOfferId) {
  return async dispatch => {
    dispatch({
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
        data: response.data ? response.data.map(p => ({
          text: p.name,
          value: p.id,
          key: p.id
        })) : []
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
        data: response.data ? response.data.map(p => ({
          text: p.name,
          value: p.id,
          key: p.id
        })) : []
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
  let files = []
    (function loop(j) {
      if (j < fileIds.length) new Promise((resolve, reject) => {
        files[j] = fileIds[j].id.id
        linkAttachment(isLot, productOfferId, files[j]).then(() => {
          resolve()
        }).catch(e => {
          // TODO: solve errors
          reject()
        })
      }).then(loop.bind(null, j + 1))
    })(0)
}

export const getAutocompleteData = ({ searchUrl }) => ({ type: AT.GET_AUTOCOMPLETE_DATA, payload: api.getAutocompleteData(searchUrl) })

export const getAllProductOffers = () => ({ type: AT.GET_ALL_PRODUCT_OFFERS, payload: api.getAllProductOffers() })

export const simpleEditTrigger = (popupValues = {}, force = null) => ({ type: AT.SIMPLE_EDIT_TRIGGER, payload: { popupValues, force } })

export const sidebarDetailTrigger = (poId = null, force = null) => {
  return {
    type: AT.SIDEBAR_DETAIL_TRIGGER,
    async payload() {
      let sidebarValues = {}
      if (poId)
        sidebarValues = await api.getProductOffer(poId)

      return {
        sidebarValues,
        force
      }
    }
  }
}