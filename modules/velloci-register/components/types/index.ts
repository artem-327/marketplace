import { IEntityTypes } from '../../types'
import { FormikProps } from 'formik'

export interface IVelloci {
    prevStep: () => void;
    nextStep: () => void;
    activeStep: number;
    countBeneficialOwners: () => void;
    numberBeneficialOwners: number;
    isLoadingSubmitButton: boolean;
    initialValues: object; //TODO specify types
    openEmailPopup: () => void;
    emailPopup: {isOpen: boolean}; //TODO specify types
    entityTypes: IEntityTypes;
    getEntityTypes: () => void;
    naicsCodes: any;  //TODO specify types
    getNaicsCodes: any; //TODO specify types
    businessRoles: any; //TODO specify types
    getBusinessRoles: any; //TODO specify types
    entityDocuments: any; //TODO specify types
    getEntityDocuments: any; //TODO specify types
    politicallyExposedPersons: any; //TODO specify types
    getPoliticallyExposedPersons: any; //TODO specify types
    cleareActiveStep: any; //TODO specify types
    postRegisterVelloci: any; //TODO specify types
    getIdentity: any; //TODO specify types
    loadSubmitButton: any; //TODO specify types
  }
  
  export interface IFormValues {
  //TODO specify all atributes and types
  }

  export interface IDivRectangleForm {
    activeStep: number;
  };
  
  export interface IRectangle {
    prevStep: (activeStep: number) => void;
    children?:
    | React.ReactChild
    | React.ReactChild[]; //TODO specify types
    formikProps: {values: any}; //TODO specify types
    title: string; //TODO specify types
    subtitle: string; //TODO specify types
    activeStep: number; //TODO specify types
    submitForm: any; //TODO specify types
    countBeneficialOwners: (numberBeneficialOwners: number) => void; //TODO specify types
    numberBeneficialOwners: number; //TODO specify types
    isLoadingSubmitButton: boolean; //TODO specify types
    openEmailPopup: () => void; //TODO specify types
    nextStep: any; //TODO specify types
    registerBeneficialOwner?: boolean; //TODO specify types
  }
 