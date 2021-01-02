import * as AT from './action-types'

// Action types
/************************************************************** */
interface IPrevStepAction {
    type: typeof AT.PREV_STEP;
    payload: number;
  }

interface INextStepAction {
    type: typeof AT.NEXT_STEP;
    payload: number;
  }

interface ICountBeneficialOwnersAction {
    type: typeof AT.COUNT_BENEFICIAL_OWNERS;
    payload: number;
}

interface ICleareActiveStepAction {
    type: typeof AT.CLEARE_ACTIVE_STEP;
}

interface IPostUploadDocumentsAction {
    type: typeof AT.UPLOAD_DOCUMENTS | typeof AT.UPLOAD_DOCUMENTS_PENDING | typeof AT.UPLOAD_DOCUMENTS_REJECTED | typeof AT.UPLOAD_DOCUMENTS_FULFILLED;
    payload: void;
}

interface IGetEntityTypesAction {
    type: typeof AT.GET_ENTITY_TYPES;
    payload: Promise<any>;
}

interface IGetNaicsCodesAction {
    type: typeof AT.GET_NAICS_CODES;
    payload: Promise<any>;
}

interface IGetBusinessRolesAction {
    type: typeof AT.GET_VELLOCI_BUSINESS_ROLES;
    payload: Promise<any>;
}

interface IGetEntityDocumentsAction {
    type: typeof AT.GET_VELLOCI_ENTITY_DOCUMENTS;
    payload: Promise<any>;
}

interface IGetPoliticallyExposedPersonsAction {
    type: typeof AT.GET_VELLOCI_POLITICALLY_EXPOSED_PERSONS;
    payload: Promise<any>;
}

interface IGetTinTypesAction {
    type: typeof AT.GET_VELLOCI_TIN_TYPES;
    payload: Promise<any>;
}

interface IGetBusinessDetailsAction {
    type: typeof AT.GET_VELLOCI_BUSINESS_DETAILS;
    payload: Promise<any>;
}

interface ILoadSubmitButtonAction {
    type: typeof AT.LOAD_SUBMIT_BUTTON;
    payload: boolean;
}

interface IOpenEmailPopupAction {
    type: typeof AT.VELLOCI_REG_OPEN_EMAIL_POPUP;
    payload: null;
}

interface ICloseEmailPopupAction {
    type: typeof AT.VELLOCI_REG_CLOSE_EMAIL_POPUP;
    payload: null;
}

interface IInviteBeneficialOwnersAction {
    type: typeof AT.VELLOCI_INVITE_BENEFICIAL_OWNERS;
    payload: Promise<any>;
}

interface IRegisterBeneficialOwnerAction {
    type: typeof AT.VELLOCI_REGISTER_BENEFICIAL_OWNERS;
    payload: Promise<any>;
}

interface ICheckMagicTokenAction {
    type: typeof AT.VELLOCI_CHECK_MAGIC_TOKEN;
    payload: Promise<any>;
}


export type VellociActionTypes =    IPrevStepAction | 
                                    INextStepAction | 
                                    ICountBeneficialOwnersAction | 
                                    ICleareActiveStepAction |
                                    IPostUploadDocumentsAction | 
                                    IGetEntityTypesAction |
                                    IGetNaicsCodesAction |
                                    IGetBusinessRolesAction |
                                    IGetEntityDocumentsAction |
                                    IGetPoliticallyExposedPersonsAction |
                                    IGetTinTypesAction |
                                    IGetBusinessDetailsAction |
                                    ILoadSubmitButtonAction |
                                    IOpenEmailPopupAction | 
                                    ICloseEmailPopupAction |
                                    IInviteBeneficialOwnersAction |
                                    IRegisterBeneficialOwnerAction |
                                    ICheckMagicTokenAction 
/************************************************************** */




// State types
/************************** */
  
  interface IData {
    data: [];
    loading: boolean;
  }

  interface IEntityTypes {
    entityTypes: IData
  }
/************************** */

