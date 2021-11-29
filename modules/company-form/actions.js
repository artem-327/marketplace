import * as AT from './action-types'
import * as api from './api'

export const getBusinessTypes = () => ({ type: AT.BUSINESS_TYPES_FETCH, payload: api.getBusinessTypes() })

export const getCompanyLogo = companyId => ({ type: AT.GET_COMPANY_LOGO, payload: api.getCompanyLogo(companyId) })

export const getCompanyDocument = attachmentId => ({ type: AT.GET_COMPANY_DOC, payload: api.getCompanyDocument(attachmentId) })

export const postCompanyLogo = (companyId, companyLogo) => ({
  type: AT.POST_COMPANY_LOGO,
  payload: api.postCompanyLogo(companyId, companyLogo)
})

export const deleteCompanyLogo = companyId => ({
  type: AT.DELETE_COMPANY_LOGO,
  payload: api.deleteCompanyLogo(companyId)
})

export const getAssociations = dataGrid => ({
  type: AT.GET_ASSOCIATIONS,
  payload: api.getAssociations(dataGrid)
})

export const getIndustryTypes = () => ({
  type: AT.COMPANY_FORM_GET_INDUSTRY_TYPES,
  payload: api.getIndustryTypes()
})

export const getCompanyLegalDocs = () => ({
  type: AT.COMPANY_FORM_GET_COMPANY_LEGAL_DOCS,
  payload: api.getDocsDatagridFilter({
    orFilters: [],
    filters: [{ operator: 'EQUALS', path: 'Attachment.documentType.group.id', values: [5] }],
    pageSize: 50,
    pageNumber: 0,
    sortDirection: null
  })
})

export const getManagementCertificationsDocs = () => ({
  type: AT.COMPANY_FORM_GET_MAN_CERT_DOCS,
  payload: api.getDocsDatagridFilter({
    orFilters: [],
    filters: [{ operator: 'EQUALS', path: 'Attachment.documentType.group.id', values: [7] }],
    pageSize: 50,
    pageNumber: 0,
    sortDirection: null
  })
})

export const getFederalOwnershipDocs = () => ({
  type: AT.COMPANY_FORM_GET_FEDERAL_CERT_DOCS,
  payload: api.getDocsDatagridFilter({
    orFilters: [],
    filters: [{ operator: 'EQUALS', path: 'Attachment.documentType.group.id', values: [6] }],
    pageSize: 50,
    pageNumber: 0,
    sortDirection: null
  })
})