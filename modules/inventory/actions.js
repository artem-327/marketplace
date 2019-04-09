import * as AT from './action-types'
import * as api from './api'

export function addAttachment(attachment, type) {
  return {
    type: AT.INVENTORY_ADD_ATTACHMENT,
    payload: api.addAttachment(attachment, type)
  }
}

export function addProductOffer(values) {
  return {
    type: AT.INVENTORY_ADD_PRODUCT_OFFER,
    payload: api.addProductOffer(values)
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

export function getProductOffer(productOfferId) {
  return {
    type: AT.INVENTORY_GET_PRODUCT_OFFER,
    payload: api.getProductOffer(productOfferId)
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

export function searchProducts(text) {
  return {
    type: AT.INVENTORY_SEARCH_PRODUCTS,
    async payload() {
      const response = await api.searchProducts(text)
      
      return {
        data: response.data ? response.data.map(p => ({
          text: p.casIndexName,
          value: p.id,
          key: p.id
        })) : []
      }
    }
  }
}

export function setFileIds(fileId) {
  return {
    type: AT.INVENTORY_SET_FILE_ID,
    payload: {
      fileId: fileId
    }
  }
}