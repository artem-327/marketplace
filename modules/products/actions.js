import api from './api'
import { Datagrid } from '../datagrid'
import { getSafe } from '../../utils/functions'
import { createAction, createAsyncAction } from 'redux-promise-middleware-actions'


export const openPopup = createAction('PRODUCTS_OPEN_POPUP', (data=null) => {return {data}})
export const closeAddPopup = createAction('PRODUCTS_CLOSE_ADD_POPUP')
export const closePopup = createAction('PRODUCTS_CLOSE_POPUP')
export const openEditAltNamesCasPopup = createAction('PRODUCTS_OPEN_EDIT_2_POPUP', value => {
  const data = {
    casIndexName: value.casIndexName,
    casNumber: value.casNumber,
    id: value.id
  }
  return { data }
})
export const closeConfirmPopup = createAction('PRODUCTS_CLOSE_CONFIRM_POPUP')
export const getHazardClassesDataRequest = createAsyncAction('PRODUCTS_GET_HAZARD_CLASSES', () => api.getHazardClasses())
export const getPackagingGroupsDataRequest = createAsyncAction('PRODUCTS_GET_PACKAGING_GROUPS', () => api.getPackagingGroups())
export const deleteCasProduct = createAsyncAction('PRODUCTS_CAS_DELETE_PRODUCT', async (id) => {
  const response = await api.deleteCasProduct(id)
  Datagrid.removeRow(id)
  return response
})
export const postNewCasProductRequest = createAsyncAction('PRODUCTS_POST_NEW_CAS_PRODUCT', async (values) => {
  const response = await api.postNewCasProduct(values)
  Datagrid.loadData()
  closePopup()
  return response
})
export const updateCasProductRequest = createAsyncAction('PRODUCTS_UPDATE_CAS_PRODUCT', (id, values) => api.updateCasProduct(id, values))
export const closeEditPopup = createAction('PRODUCTS_CLOSE_EDIT_POPUP')
export const getAlternativeProductNames = createAsyncAction('PRODUCTS_GET_ALTERNATIVE_CAS_PRODUCT_NAMES', (value) => api.getAlternativeProductNames(value))
export const postNewProductName = createAsyncAction('PRODUCTS_POST_NEW_PRODUCT_NAME', async (productId, value) => {
  await api.postNewProductName(productId, value)
  const response = await api.getAlternativeProductNames(productId)
  return response
})
export const updateProductName = createAsyncAction('PRODUCTS_UPDATE_PRODUCT_NAME', async (productId, id, value) => {
  await api.updateProductName(id, value)
  const response = await api.getAlternativeProductNames(productId)
  return response
})
export const deleteProductName = createAsyncAction('PRODUCTS_DELETE_PRODUCT_NAME', async (productId, id) => {
  await api.deleteProductName(id)
  const response = await api.getAlternativeProductNames(productId)
  return response
})
export function openEditEchoProduct(id, editTab, force = false) {
  return async dispatch => {
    dispatch(editEchoProductChangeTab(editTab, force, { id }))
  }
}
export const editEchoProductChangeTab = createAction('PRODUCTS_EDIT_COMPANY_GENERIC_PRODUCT_CHANGE_TAB', (editTab, force = false, data = null) => {
  return { editTab, force, data }
})
export const openEditEchoAltNamesPopup = createAction('PRODUCTS_OPEN_EDIT_2_POPUP', value => {
  const data = {
    name: value.name,
    code: value.code,
    id: value.id
  }
  return { ...data }
})
export const deleteCompanyGenericProduct = createAsyncAction('PRODUCTS_DELETE_COMPANY_GENERIC_PRODUCT', async (echoProductId) => {
  const response = await api.deleteCompanyGenericProduct(echoProductId)
  Datagrid.removeRow(echoProductId)
  return response
})
export const searchCasProduct = createAsyncAction('PRODUCTS_SEARCH_CAS_PRODUCT', (pattern, index) => api.searchCasProduct(pattern))
export const putCompanyGenericProducts = createAsyncAction('PRODUCTS_PUT_COMPANY_GENERIC_PRODUCT', (id, values) => api.putCompanyGenericProducts(id, values))
export const postCompanyGenericProducts = createAsyncAction('PRODUCTS_POST_COMPANY_GENERIC_PRODUCT', (values) => api.postCompanyGenericProducts(values))
export const searchManufacturers = createAsyncAction('PRODUCTS_SEARCH_MANUFACTURERS', (text, limit = false) => api.searchManufacturers(text, limit))
export const loadFile = createAsyncAction('PRODUCTS_LOAD_FILE', (attachment) => api.loadFile(attachment))
export const addAttachment = createAsyncAction('PRODUCTS_ADD_ATTACHMENT', async (attachment, type, additionalParams = {}) => {
  const data = await api.addAttachment(attachment, type, additionalParams)
  return data
})
export const linkAttachment = createAsyncAction('PRODUCTS_LINK_ATTACHMENT', async (isLot, echoId, attachmentIds) => {
  if (Array.isArray(attachmentIds)) {
    const asyncForEach = async (array, callback) => {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array)
      }
    }

    await asyncForEach(attachmentIds, async (attachment, index) => {
      await api.linkAttachment(echoId, attachment.id)
    })
  } else {
    await api.linkAttachment(echoId, attachmentIds)
  }

  return true
})
export const removeAttachmentLink = createAsyncAction('PRODUCTS_REMOVE_ATTACHMENT_LINK', (isLot, echoId, aId) => api.removeAttachmentLink(echoId, aId))
export const removeAttachment = createAsyncAction('PRODUCTS_REMOVE_ATTACHMENT', (aId) => api.removeAttachment(aId))
export const getCompanyGenericProduct = createAsyncAction('PRODUCTS_GET_COMPANY_GENERIC_PRODUCT', async (id) => {
  const response = await api.getCompanyGenericProduct(id)
  Datagrid.updateRow(id, () => response.data)
  return response
})
export function loadEditEchoProduct(id, editTab) {
  return async dispatch => {
    // get newest data
    const response = await dispatch(getCompanyGenericProduct(id))
    dispatch(searchProductGroups(getSafe(() => response.value.data.productGroup.name, '')))
    dispatch(searchCompany(getSafe(() => response.value.data.company.name, '')))
    if (Array.isArray(response.value.data.marketSegments)) {
      response.value.data.marketSegments.forEach(segment =>
        dispatch(searchMarketSegments(getSafe(() => segment.name, '')))
      )
    }
    let formData = {
      ...response.value.data
    }

    // mark attachments as linked
    if (formData.attachments) {
      formData.attachments = formData.attachments.map(att => {
        return {
          ...att,
          linked: true
        }
      })
    }
    await dispatch(editEchoProductChangeTab(editTab, false, formData))
  }
}
export const getUnNumbersByString = createAsyncAction('PRODUCTS_GET_UN_NUMBERS_BY_STRING', (value) => api.getUnNumbersByString(value))
export const searchTags = createAsyncAction('PRODUCTS_SEARCH_TAGS', (tag) => api.searchTags({
    orFilters: [
      {
        operator: 'LIKE',
        path: 'Tag.name',
        values: [tag.toString()]
      }
    ],
    pageNumber: 0,
    pageSize: 50
  })
)
export const getDocumentTypes = createAsyncAction('PRODUCTS_GET_DOCUMENT_TYPES', () => api.getDocumentTypes())
export const searchMarketSegments = createAsyncAction('PRODUCTS_SEARCH_MARKET_SEGMENTS', (segment) => api.searchMarketSegments({
    orFilters: [
      {
        operator: 'LIKE',
        path: 'MarketSegment.name',
        values: [segment.toString()]
      }
    ],
    pageNumber: 0,
    pageSize: 50
  })
)
export const getAlternativeCompanyGenericProductsNames = 
  createAsyncAction('PRODUCTS_GET_ALTERNATIVE_COMPANY_GENERIC_PRODUCT_NAMES', (value) => api.getAlternativeCompanyGenericProductsNames(value))
export const postNewCompanyGenericProductsAltName = createAsyncAction('PRODUCTS_POST_NEW_COMPANY_GENERIC_PRODUCT_ALTERNATIVE_NAME', async (productId, value) => {
  await api.postNewCompanyGenericProductsAltName(productId, value)
  const response = await api.getAlternativeCompanyGenericProductsNames(productId)
  return response
})
export const updateCompanyGenericProductsAltName = createAsyncAction('PRODUCTS_UPDATE_COMPANY_GENERIC_PRODUCT_ALTERNATIVE_NAME', async (productId, id, value) => {
  await api.updateCompanyGenericProductsAltName(id, value)
  const response = await api.getAlternativeCompanyGenericProductsNames(productId)
  return response
})
export const deleteCompanyGenericProductsAltName = createAsyncAction('PRODUCTS_DELETE_COMPANY_GENERIC_PRODUCT_ALTERNATIVE_NAME', async (productId, id) => {
  await api.deleteCompanyGenericProductsAltName(id)
  const response = await api.getAlternativeCompanyGenericProductsNames(productId)
  return response
})
export const postProductGroups = createAsyncAction('PRODUCTS_GROUPS_CREATE', async (request) => {
  const response = await api.postProductGroups(request)
  Datagrid.loadData()
  return response
})
export const putProductGroups = createAsyncAction('PRODUCTS_GROUPS_UPDATE', async (id, request, selectedTagsOptions) => {
  const response = await api.putProductGroups(id, request)
  Datagrid.updateRow(id, () => ({
    name: request.name,
    tags: selectedTagsOptions.map(tag => ({ name: tag.text, id: tag.key })),
    id: id
  }))
  return response
})
export const deleteProductGroups = createAsyncAction('PRODUCTS_GROUPS_DELETE', async (id) => {
  const response = await api.deleteProductGroups(id)
  Datagrid.loadData()
  return response
})
export const searchProductGroups = createAsyncAction('PRODUCTS_SEARCH_PRODUCT_GROUPS', (val) => api.searchProductGroups({
    orFilters: [{ operator: 'LIKE', path: 'ProductGroup.name', values: [`%${val}%`] }],
    pageNumber: 0,
    pageSize: 50
  })
)
export const searchCompany = createAsyncAction('PRODUCTS_SEARCH_COMPANY', (companyText, limit) => api.searchCompany(companyText, limit))
export const handleVariableSave = createAction('PRODUCTS_HANDLE_VARIABLE_CHANGE', (variable, value) => {
  return { variable, value }
})

