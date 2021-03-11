import * as AT from './action-types'

export const initialState = {
  data: [],
  companyLogo: null,
  loading: false,
  associations: [],
  documentTypesLoading: false,
  documentTypesAll: [],
  documentTypesFederalOwnershipCertifications: [],
  documentTypesManagementCertifications: [],
  industryTypesLoading: false,
  industryTypes: [],
  companyLegalDocs: [],
  companyLegalDocsLoading: false,
  managementCertificationsDocs: [],
  managementCertificationsDocsLoading: false,
  federalOwnershipDocs: [],
  federalOwnershipDocsLoading: false,
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case AT.BUSINESS_TYPES_FETCH_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.BUSINESS_TYPES_FETCH_REJECTED: {
      return {
        ...state,
        data: state.data,
        loading: false
      }
    }

    case AT.BUSINESS_TYPES_FETCH_FULFILLED: {
      return {
        ...state,
        loading: false,
        data: payload
      }
    }

    case AT.GET_COMPANY_LOGO_FULFILLED: {
      return {
        ...state,
        companyLogo: payload.data.size ? payload.data : null
      }
    }

    case AT.GET_ASSOCIATIONS_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.GET_ASSOCIATIONS_REJECTED: {
      return {
        ...state,
        associations: state.associations,
        loading: false
      }
    }

    case AT.GET_ASSOCIATIONS_FULFILLED: {
      return {
        ...state,
        loading: false,
        associations: payload
      }
    }

    case AT.COMPANY_FORM_GET_DOCUMENT_TYPES_PENDING: {
      return {
        ...state,
        documentTypesLoading: true
      }
    }

    case AT.COMPANY_FORM_GET_DOCUMENT_TYPES_REJECTED: {
      return {
        ...state,
        documentTypesLoading: false
      }
    }

    case AT.COMPANY_FORM_GET_DOCUMENT_TYPES_FULFILLED: {
      return {
        ...state,
        documentTypesLoading: false,
        documentTypesAll: payload,
        documentTypesFederalOwnershipCertifications: payload.filter(el => el.group && el.group.id === 6),
        documentTypesManagementCertifications: payload.filter(el => el.group && el.group.id === 7)
      }
    }

    case AT.COMPANY_FORM_GET_INDUSTRY_TYPES_PENDING: {
      return {
        ...state,
        industryTypesLoading: true
      }
    }

    case AT.COMPANY_FORM_GET_INDUSTRY_TYPES_REJECTED: {
      return {
        ...state,
        industryTypesLoading: false
      }
    }

    case AT.COMPANY_FORM_GET_INDUSTRY_TYPES_FULFILLED: {
      return {
        ...state,
        industryTypes: payload,
        industryTypesLoading: false
      }
    }

    case AT.COMPANY_FORM_GET_COMPANY_LEGAL_DOCS_PENDING: {
      return {
        ...state,
        companyLegalDocsLoading: true
      }
    }

    case AT.COMPANY_FORM_GET_COMPANY_LEGAL_DOCS_REJECTED: {
      return {
        ...state,
        companyLegalDocsLoading: false
      }
    }

    case AT.COMPANY_FORM_GET_COMPANY_LEGAL_DOCS_FULFILLED: {
      return {
        ...state,
        companyLegalDocs: payload,
        companyLegalDocsLoading: false
      }
    }

    case AT.COMPANY_FORM_GET_MAN_CERT_DOCS_PENDING: {
      return {
        ...state,
        managementCertificationsDocsLoading: true
      }
    }

    case AT.COMPANY_FORM_GET_MAN_CERT_DOCS_REJECTED: {
      return {
        ...state,
        managementCertificationsDocsLoading: false
      }
    }

    case AT.COMPANY_FORM_GET_MAN_CERT_DOCS_FULFILLED: {
      return {
        ...state,
        managementCertificationsDocs: payload,
        managementCertificationsDocsLoading: false
      }
    }

    case AT.COMPANY_FORM_GET_FEDERAL_CERT_DOCS_PENDING: {
      return {
        ...state,
        federalOwnershipDocsLoading: true
      }
    }

    case AT.COMPANY_FORM_GET_FEDERAL_CERT_DOCS_REJECTED: {
      return {
        ...state,
        federalOwnershipDocsLoading: false
      }
    }

    case AT.COMPANY_FORM_GET_FEDERAL_CERT_DOCS_FULFILLED: {
      return {
        ...state,
        federalOwnershipDocs: payload,
        federalOwnershipDocsLoading: false
      }
    }

    default:
      return state
  }
}
