import * as AT from '../action-types'

// Action types
/************************************************************** */
interface IPrevStepAction {
  type: typeof AT.PREV_STEP
  payload: number
}

interface INextStepAction {
  type: typeof AT.NEXT_STEP
  payload: number
}

interface ICountBeneficialOwnersAction {
  type: typeof AT.COUNT_BENEFICIAL_OWNERS
  payload: number
}

interface ICleareActiveStepAction {
  type: typeof AT.CLEARE_ACTIVE_STEP
}

interface IPostUploadDocumentsAction {
  type:
    | typeof AT.UPLOAD_DOCUMENTS
    | typeof AT.UPLOAD_DOCUMENTS_PENDING
    | typeof AT.UPLOAD_DOCUMENTS_REJECTED
    | typeof AT.UPLOAD_DOCUMENTS_FULFILLED
  payload: void
}

interface IGetEntityTypesAction {
  type:
    | typeof AT.GET_ENTITY_TYPES
    | typeof AT.GET_ENTITY_TYPES_PENDING
    | typeof AT.GET_ENTITY_TYPES_REJECTED
    | typeof AT.GET_ENTITY_TYPES_FULFILLED
  payload: Promise<any>
}

interface IGetNaicsCodesAction {
  type:
    | typeof AT.GET_NAICS_CODES
    | typeof AT.GET_NAICS_CODES_PENDING
    | typeof AT.GET_NAICS_CODES_REJECTED
    | typeof AT.GET_NAICS_CODES_FULFILLED
  payload: Promise<any>
}

interface IGetBusinessRolesAction {
  type:
    | typeof AT.GET_VELLOCI_BUSINESS_ROLES
    | typeof AT.GET_VELLOCI_BUSINESS_ROLES_PENDING
    | typeof AT.GET_VELLOCI_BUSINESS_ROLES_REJECTED
    | typeof AT.GET_VELLOCI_BUSINESS_ROLES_FULFILLED
  payload: Promise<any>
}

interface IGetEntityDocumentsAction {
  type:
    | typeof AT.GET_VELLOCI_ENTITY_DOCUMENTS
    | typeof AT.GET_VELLOCI_ENTITY_DOCUMENTS_PENDING
    | typeof AT.GET_VELLOCI_ENTITY_DOCUMENTS_REJECTED
    | typeof AT.GET_VELLOCI_ENTITY_DOCUMENTS_FULFILLED
  payload: Promise<any>
}

interface IGetPoliticallyExposedPersonsAction {
  type:
    | typeof AT.GET_VELLOCI_POLITICALLY_EXPOSED_PERSONS
    | typeof AT.GET_VELLOCI_POLITICALLY_EXPOSED_PERSONS_PENDING
    | typeof AT.GET_VELLOCI_POLITICALLY_EXPOSED_PERSONS_REJECTED
    | typeof AT.GET_VELLOCI_POLITICALLY_EXPOSED_PERSONS_FULFILLED
  payload: Promise<any>
}

interface IGetTinTypesAction {
  type:
    | typeof AT.GET_VELLOCI_TIN_TYPES
    | typeof AT.GET_VELLOCI_TIN_TYPES_PENDING
    | typeof AT.GET_VELLOCI_TIN_TYPES_REJECTED
    | typeof AT.GET_VELLOCI_TIN_TYPES_FULFILLED
  payload: Promise<any>
}

interface IGetBusinessDetailsAction {
  type:
    | typeof AT.GET_VELLOCI_BUSINESS_DETAILS
    | typeof AT.GET_VELLOCI_BUSINESS_DETAILS_PENDING
    | typeof AT.GET_VELLOCI_BUSINESS_DETAILS_REJECTED
    | typeof AT.GET_VELLOCI_BUSINESS_DETAILS_FULFILLED
  payload: Promise<any>
}

interface ILoadSubmitButtonAction {
  type: typeof AT.LOAD_SUBMIT_BUTTON
  payload: boolean
}

interface IOpenEmailPopupAction {
  type: typeof AT.VELLOCI_REG_OPEN_EMAIL_POPUP
  payload: null
}

interface ICloseEmailPopupAction {
  type: typeof AT.VELLOCI_REG_CLOSE_EMAIL_POPUP
  payload: null
}

interface IInviteBeneficialOwnersAction {
  type:
    | typeof AT.VELLOCI_INVITE_BENEFICIAL_OWNERS
    | typeof AT.VELLOCI_INVITE_BENEFICIAL_OWNERS_PENDING
    | typeof AT.VELLOCI_INVITE_BENEFICIAL_OWNERS_REJECTED
    | typeof AT.VELLOCI_INVITE_BENEFICIAL_OWNERS_FULFILLED
  payload: Promise<any>
}

interface IRegisterBeneficialOwnerAction {
  type:
    | typeof AT.VELLOCI_REGISTER_BENEFICIAL_OWNERS
    | typeof AT.VELLOCI_REGISTER_BENEFICIAL_OWNERS_PENDING
    | typeof AT.VELLOCI_REGISTER_BENEFICIAL_OWNERS_REJECTED
    | typeof AT.VELLOCI_REGISTER_BENEFICIAL_OWNERS_FULFILLED
  payload: Promise<any>
}

interface ICheckMagicTokenAction {
  type:
    | typeof AT.VELLOCI_CHECK_MAGIC_TOKEN
    | typeof AT.VELLOCI_CHECK_MAGIC_TOKEN_PENDING
    | typeof AT.VELLOCI_CHECK_MAGIC_TOKEN_REJECTED
    | typeof AT.VELLOCI_CHECK_MAGIC_TOKEN_FULFILLED
  payload: Promise<any>
}

export type VellociActionTypes =
  | IPrevStepAction
  | INextStepAction
  | ICountBeneficialOwnersAction
  | ICleareActiveStepAction
  | IPostUploadDocumentsAction
  | IGetEntityTypesAction
  | IGetNaicsCodesAction
  | IGetBusinessRolesAction
  | IGetEntityDocumentsAction
  | IGetPoliticallyExposedPersonsAction
  | IGetTinTypesAction
  | IGetBusinessDetailsAction
  | ILoadSubmitButtonAction
  | IOpenEmailPopupAction
  | ICloseEmailPopupAction
  | IInviteBeneficialOwnersAction
  | IRegisterBeneficialOwnerAction
  | ICheckMagicTokenAction
/************************************************************** */

// Reducer types
/************************** */
export interface IData {
  data?: any[]
  loading: boolean
}

export interface IEntityTypes {
  data: any[] // TODO specify types
  loading: boolean
}
export interface IInitialStateTypes {
  activeStep: number
  loading: boolean
  numberBeneficialOwners: number
  entityTypes: IData
  naicsCodes: IData
  businessRoles: IData
  entityDocuments: IData
  politicallyExposedPersons: IData
  tinTypes: IData
  businessDetails: IData
  emailPopup: {
    isOpen: boolean
    isUpdating: boolean
  }
  beneficialOwner: {
    data: any
    isUpdating: boolean
  }
  magicToken: {
    data?: any // TODO specify types+
    loading: boolean
  }
  isLoadingSubmitButton: boolean
}

export interface IOption {
  key: number
  text: string
  value: number
}

export interface IPayloadObject {
  code: number
  subcategory: string
}

/************************** */
