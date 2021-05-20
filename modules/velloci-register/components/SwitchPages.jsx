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

export const switchPages = props => {
  let error = getSafe(() => props.formikProps.errors.companyFormationDocument.attachments, false)

  switch (props.activeStep) {
    case 0: {
      return <TermsAndConditions formikProps={props.formikProps} />
    }
    case 1: {
      return <BusinessInfo formikProps={props.formikProps} entityTypes={props.entityTypes} naicsCodes={props.naicsCodes} />
    }
    case 2: {
      return <ControlPerson formikProps={props.formikProps} />
    }
    case 3: {
      return <FormationDocument formikProps={props.formikProps} error={error} entityDocuments={props.entityDocuments} />
      // return <ControlPerson formikProps={props.formikProps} entityTypes={props.entityTypes} naicsCodes={props.naicsCodes} />
    }
    case 4: {
      return <OwnerInformation formikProps={props.formikProps} countBeneficialOwners={props.countBeneficialOwners} />
    }
    case 5: {
      return (
        <PersonalInformation
          formikProps={props.formikProps}
          businessRoles={props.businessRoles}
          numberBeneficialOwners={props.numberBeneficialOwners}
        />
      )
    }
    case 6: {
      return <TermsAndConditions formikProps={props.formikProps} />
    }
    default:
      return <></>
  }
}
