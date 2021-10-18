import * as AT from './action-types'

export const initialState = {
  activeStep: 0,
  finalStep: 8,
  loading: false,
  numberBeneficialOwners: 0,
  entityTypes: {
    data: [],
    loading: false
  },
  naicsCodes: {
    data: [],
    loading: false
  },
  businessRoles: {
    data: [],
    loading: false
  },
  entityDocuments: {
    data: [],
    loading: false
  },
  politicallyExposedPersons: {
    data: [],
    loading: false
  },
  tinTypes: {
    data: [],
    loading: false
  },
  enumsBusinessMarkets: {
    data: [],
    loading: false
  },
  enumsBusinessTypes: {
    data: [],
    loading: false
  },
  businessDetails: {
    data: [],
    loading: false
  },
  emailPopup: {
    beneficialOwnersNotified: false,
    notifiedOwners: [],
    isOpen: false,
    isUpdating: false
  },
  beneficialOwner: {
    data: null,
    isUpdating: false
  },
  magicToken: {
    data: null,
    loading: false
  },
  isLoadingSubmitButton: false,
  applicationSubmitted: false,
  coiDocumentUploaded: false
}

export default function reducer(state = initialState, action) {
  let { type, payload } = action

  switch (type) {
    case AT.NEXT_STEP: {
      return {
        ...state,
        activeStep: payload
      }
    }

    case AT.PREV_STEP: {
      return {
        ...state,
        activeStep: payload
      }
    }

    case AT.CLEARE_ACTIVE_STEP: {
      return {
        ...state,
        activeStep: 0
      }
    }

    case AT.COUNT_BENEFICIAL_OWNERS: {
      return {
        ...state,
        numberBeneficialOwners: payload
      }
    }

    case AT.REGISTER_VELLOCI_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.REGISTER_VELLOCI_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.REGISTER_VELLOCI_FULFILLED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.UPLOAD_DOCUMENTS_PENDING: {
      return {
        ...state,
        loading: true
      }
    }

    case AT.UPLOAD_DOCUMENTS_REJECTED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.UPLOAD_DOCUMENTS_FULFILLED: {
      return {
        ...state,
        loading: false
      }
    }

    case AT.GET_ENTITY_TYPES_PENDING: {
      return {
        ...state,
        entityTypes: { loading: true }
      }
    }

    case AT.GET_ENTITY_TYPES_REJECTED: {
      return {
        ...state,
        entityTypes: { loading: false }
      }
    }

    case AT.GET_ENTITY_TYPES_FULFILLED: {
      return {
        ...state,
        entityTypes: {
          data:
            payload && payload.length
              ? payload.map(el => {
                  let text = ''
                  if (el === 'llc' || el === 'llp' || el === 'lp') text = el.toUpperCase()
                  else text = el.charAt(0).toUpperCase() + el.replace(/_/g, ' ').slice(1)
                  return {
                    key: el,
                    value: el,
                    text
                  }
                })
              : [],
          loading: false
        }
      }
    }

    case AT.GET_NAICS_CODES_PENDING: {
      return {
        ...state,
        naicsCodes: { loading: true }
      }
    }

    case AT.GET_NAICS_CODES_REJECTED: {
      return {
        ...state,
        naicsCodes: { loading: false }
      }
    }

    case AT.GET_NAICS_CODES_FULFILLED: {
      let naicsOptions = []
      let firstChemical = []
      if (payload) {
        payload.forEach(obj => {
          if (obj.naicsId === 325 || obj.naicsId === 4246) {
            firstChemical.push({
              key: obj.naicsId,
              text: obj.name,
              value: obj.naicsId
            })
          } else {
            naicsOptions.push({
              key: obj.naicsId,
              text: obj.name,
              value: obj.naicsId
            })
          }
        })
      }
      if (naicsOptions.length && firstChemical.length) {
        naicsOptions.unshift(...firstChemical)
      }

      return {
        ...state,
        naicsCodes: { data: naicsOptions, loading: false }
      }
    }

    case AT.GET_VELLOCI_BUSINESS_ROLES_PENDING: {
      return {
        ...state,
        businessRoles: { loading: true }
      }
    }

    case AT.GET_VELLOCI_BUSINESS_ROLES_REJECTED: {
      return {
        ...state,
        businessRoles: { loading: false }
      }
    }

    case AT.GET_VELLOCI_BUSINESS_ROLES_FULFILLED: {
      return {
        ...state,
        businessRoles: { data: payload, loading: false }
      }
    }

    case AT.GET_VELLOCI_ENTITY_DOCUMENTS_PENDING: {
      return {
        ...state,
        entityDocuments: { loading: true }
      }
    }

    case AT.GET_VELLOCI_ENTITY_DOCUMENTS_REJECTED: {
      return {
        ...state,
        entityDocuments: { loading: false }
      }
    }

    case AT.GET_VELLOCI_ENTITY_DOCUMENTS_FULFILLED: {
      return {
        ...state,
        entityDocuments: { data: payload, loading: false }
      }
    }

    case AT.GET_VELLOCI_POLITICALLY_EXPOSED_PERSONS_PENDING: {
      return {
        ...state,
        politicallyExposedPersons: { loading: true }
      }
    }

    case AT.GET_VELLOCI_POLITICALLY_EXPOSED_PERSONS_REJECTED: {
      return {
        ...state,
        politicallyExposedPersons: { loading: false }
      }
    }

    case AT.GET_VELLOCI_POLITICALLY_EXPOSED_PERSONS_FULFILLED: {
      return {
        ...state,
        politicallyExposedPersons: { data: payload, loading: false }
      }
    }

    case AT.GET_VELLOCI_TIN_TYPES_PENDING: {
      return {
        ...state,
        tinTypes: { loading: true }
      }
    }

    case AT.GET_VELLOCI_TIN_TYPES_REJECTED: {
      return {
        ...state,
        tinTypes: { loading: false }
      }
    }

    case AT.GET_VELLOCI_TIN_TYPES_FULFILLED: {
      return {
        ...state,
        tinTypes: { data: payload, loading: false }
      }
    }

    case AT.GET_VELLOCI_BUSINESS_DETAILS_PENDING: {
      return {
        ...state,
        businessDetails: { loading: true }
      }
    }

    case AT.GET_VELLOCI_BUSINESS_DETAILS_REJECTED: {
      return {
        ...state,
        businessDetails: { loading: false }
      }
    }

    case AT.GET_VELLOCI_BUSINESS_DETAILS_FULFILLED: {
      return {
        ...state,
        businessDetails: { data: payload, loading: false }
      }
    }

    case AT.GET_VELLOCI_BUSINESS_MARKETS_PENDING: {
      return {
        ...state,
        enumsBusinessMarkets: { loading: true }
      }
    }

    case AT.GET_VELLOCI_BUSINESS_MARKETS_REJECTED: {
      return {
        ...state,
        enumsBusinessMarkets: { loading: false }
      }
    }

    case AT.GET_VELLOCI_BUSINESS_MARKETS_FULFILLED: {
      return {
        ...state,
        enumsBusinessMarkets: { data: payload, loading: false }
      }
    }

    case AT.GET_VELLOCI_BUSINESS_TYPES_PENDING: {
      return {
        ...state,
        enumsBusinessTypes: { loading: true }
      }
    }

    case AT.GET_VELLOCI_BUSINESS_TYPES_REJECTED: {
      return {
        ...state,
        enumsBusinessTypes: { loading: false }
      }
    }

    case AT.GET_VELLOCI_BUSINESS_TYPES_FULFILLED: {
      return {
        ...state,
        enumsBusinessTypes: { data: payload, loading: false }
      }
    }

    case AT.LOAD_SUBMIT_BUTTON: {
      return {
        ...state,
        isLoadingSubmitButton: payload
      }
    }

    case AT.VELLOCI_REG_OPEN_EMAIL_POPUP: {
      return { ...state, emailPopup: { ...state.emailPopup, isOpen: true } }
    }

    case AT.VELLOCI_REG_CLOSE_EMAIL_POPUP: {
      return { ...state, emailPopup: { ...state.emailPopup, isOpen: false } }
    }

    case AT.VELLOCI_INVITE_BENEFICIAL_OWNERS_PENDING: {
      return { ...state, emailPopup: { ...state.emailPopup, isUpdating: true, beneficialOwnersNotified: false } }
    }

    case AT.VELLOCI_INVITE_BENEFICIAL_OWNERS_REJECTED:
    case AT.VELLOCI_INVITE_BENEFICIAL_OWNERS_FULFILLED: {
      return { ...state, emailPopup: { ...state.emailPopup, isUpdating: false, beneficialOwnersNotified: true } }
    }

    case AT.VELLOCI_SET_NOTIFIED_OWNERS: {
      return {
        ...state,
        emailPopup: {
          ...state.emailPopup,
          isUpdating: false,
          beneficialOwnersNotified: true,
          notifiedOwners: payload
        }
      }
    }

    case AT.VELLOCI_REGISTER_BENEFICIAL_OWNERS_PENDING: {
      return { ...state, beneficialOwner: { ...state.beneficialOwner, isUpdating: true } }
    }
    case AT.VELLOCI_REGISTER_BENEFICIAL_OWNERS_REJECTED: {
      return { ...state, beneficialOwner: { ...state.beneficialOwner, isUpdating: false } }
    }
    case AT.VELLOCI_REGISTER_BENEFICIAL_OWNERS_FULFILLED: {
      return { ...state, beneficialOwner: { ...state.beneficialOwner, isUpdating: false, data: payload } }
    }

    case AT.VELLOCI_CHECK_MAGIC_TOKEN_PENDING: {
      return { ...state, magicToken: { ...state.magicToken, loading: true } }
    }
    case AT.VELLOCI_CHECK_MAGIC_TOKEN_REJECTED: {
      return { ...state, magicToken: { ...state.magicToken, loading: false } }
    }
    case AT.VELLOCI_CHECK_MAGIC_TOKEN_FULFILLED: {
      return { ...state, magicToken: { ...state.magicToken, loading: false, data: payload } }
    }
    case AT.VELLOCI_APPLICATION_SUBMITTED: {
      return { ...state, applicationSubmitted: true }
    }
    case AT.VELLOCI_COI_DOCUMENT_UPLOADED: {
      return { ...state, coiDocumentUploaded: true }
    }

    default:
      return state
  }
}
