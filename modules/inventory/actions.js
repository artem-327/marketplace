import * as AT from './action-types'
import * as api from './api'

import { createAsyncAction } from 'redux-promise-middleware-actions'

import { toggleFilter, filterSaving, filterApplying } from '~/modules/filter/actions'

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

export function addAttachment(attachment, type) {
  return {
    type: AT.INVENTORY_ADD_ATTACHMENT,
    payload: api.addAttachment(attachment, type)
  }
}

export function addProductOffer(values, poId = false) {

  if (values.lots.length === 0) {
    values.lots = [{
      lotNumber: '1',
      pkgAmount: parseInt(values.pkgAmount)
    }]
  }

  let params = {
    assayMin: values.assayMin ? parseFloat(values.assayMin) : null,
    assayMax: values.assayMax ? parseFloat(values.assayMax) : null,
    attachments: values.attachments && values.attachments.length ? values.attachments.map(att => {
      return att.id
    }).concat(values.additional && values.additional.length ? values.additional.map(add => {
      return add.id
    }) : []) : null,
    cost: values.cost ? parseInt(values.cost) : null,
    costRecords: values.trackSubCosts && values.costs ? values.costs.map(cost => {
      return {
        attachment: null,
        description: cost.description,
        lot: cost.lot === 0 ? 0 : values.lots[cost.lot - 1].lotNumber,
        value: parseInt(cost.cost)
      }
    }) : null,
    externalNotes: values.externalNotes ? values.externalNotes : null,
    inStock: !!values.inStock,
    internalNotes: values.internalNotes ? values.internalNotes : null,
    lots: values.lots ? values.lots.map(lot => {
      return {
        ...lot,
        expirationDate: lot.expirationDate ? lot.expirationDate + "T00:00:00Z" : null,
        manufacturedDate: lot.manufacturedDate ? lot.manufacturedDate + "T00:00:00Z" : null,
        attachments: lot.attachments && lot.attachments.length ? lot.attachments.map(att => {
          return att.id
        }) : null
      }
    }) : null,
    manufacturer: values.manufacturer ? values.manufacturer : null,
    minimum: parseInt(values.minimum),
    origin: values.origin ? values.origin : null,
    pkgAmount: parseInt(values.pkgAmount),
    price: values.pricing && values.pricing.price ? parseInt(values.pricing.price) : parseInt(values.pricingTiers[0].price),
    pricingTiers: values.pricingTiers.map((tier, index) => {
      return {
        price: parseFloat(tier.price),
        quantityFrom: parseInt(!index ? values.minimum : tier.quantityFrom)
      }
    }),
    processingTimeDays: parseInt(values.processingTimeDays),
    product: parseInt(values.product.id),
    productCode: values.productCode ? values.productCode : null,
    productCondition: values.productCondition ? parseInt(values.productCondition) : null,
    productForm: values.productForm ? parseInt(values.productForm) : null,
    productGrades: values.productGrade ? [{ id: values.productGrade }] : null,
    splits: parseInt(values.splits),
    tradeName: values.tradeName ? values.tradeName : null,
    validityDate: values.validityDate ? values.validityDate + "T00:00:00Z" : null,
    warehouse: parseInt(values.warehouse)
  }

  if (!params.lots) {
    params.lots = [{
      lotNumber: "1",
      pkgAmount: params.pkgAmount
    }]
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

export function getProductOffer(productOfferId) {
  return {
    type: AT.INVENTORY_GET_PRODUCT_OFFER,
    async payload() {
      const { data } = await api.getProductOffer(productOfferId)

      return {
        data: {
          ...data,
          searchedProducts: [{
            text: (data.product.productCode ? data.product.productCode + ' ' : '') + data.product.productName,
            value: data.product,
            key: data.product.id
          }],
          searchedProductsLoading: false
        }
      }
    }
  }
}

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
  return {
    type: AT.INVENTORY_REMOVE_ATTACHMENT,
    payload: api.removeAttachment(aId)
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