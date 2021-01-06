//Components
import CompanyVerification from './steps/CompanyVerification'
import ControlPerson from './steps/ControlPerson'
import BusinessInfo from './steps/BusinessInfo'
import FormationDocument from './steps/FormationDocument'
import OwnerInformation from './steps/OwnerInformation'
import PersonalInformation from './steps/PersonalInformation'
import TermsAndConditions from './steps/TermsAndConditions'
//Helpers
import { getSafe } from '../../../utils/functions'

export const getContent = (
  formikProps: any, //TODO specify types
  entityTypes: any, //TODO specify types
  naicsCodes: any, //TODO specify types
  entityDocuments: any, //TODO specify types
  countBeneficialOwners: any, //TODO specify types
  businessRoles: any, //TODO specify types
  numberBeneficialOwners: any, //TODO specify types
  activeStep: any //TODO specify types
): JSX.Element => {
  let error = getSafe(() => formikProps.errors.companyFormationDocument.attachments, false)

  switch (activeStep) {
    case 0: {
      return <CompanyVerification formikProps={formikProps} />
    }
    case 1: {
      return <ControlPerson formikProps={formikProps} entityTypes={entityTypes} naicsCodes={naicsCodes} />
    }
    case 2: {
      return <BusinessInfo formikProps={formikProps} />
    }
    case 3: {
      return <FormationDocument formikProps={formikProps} error={error} entityDocuments={entityDocuments} />
    }
    case 4: {
      return <OwnerInformation formikProps={formikProps} countBeneficialOwners={countBeneficialOwners} />
    }
    case 5: {
      return (
        <PersonalInformation
          formikProps={formikProps}
          businessRoles={businessRoles}
          numberBeneficialOwners={numberBeneficialOwners}
        />
      )
    }
    case 6: {
      return <TermsAndConditions formikProps={formikProps} />
    }
    default:
      return <></>
  }
}
