//Components
import CertificateOfInsurance from './steps/CertificateOfInsurance'
import ControlPerson from './steps/ControlPerson'
import BusinessInfo from './steps/BusinessInfo'
import MarketingMaterial from './steps/MarketingMaterial'
import OwnerInformation from './steps/OwnerInformation'
import OwnershipCertifications from './steps/OwnershipCertifications'
import PersonalInformation from './steps/PersonalInformation'
import RiskTolerance from './steps/RiskTolerance'
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
      return <BusinessInfo
        formikProps={props.formikProps}
        businessTypes={props.businessTypes}
        naicsCodes={props.naicsCodes}
        enumsBusinessMarkets={props.enumsBusinessMarkets}
        enumsBusinessTypes={props.enumsBusinessTypes}
      />
    }
    case 2: {
      return <ControlPerson formikProps={props.formikProps} />
    }
    case 3: {
      return <OwnerInformation
        countBeneficialOwners={props.countBeneficialOwners}
        formikProps={props.formikProps}
        numberBeneficialOwners={props.numberBeneficialOwners}
      />
    }
    case 4: {
      return (
        <PersonalInformation
          countBeneficialOwners={props.countBeneficialOwners}
          formikProps={props.formikProps}
          businessRoles={props.businessRoles}
          numberBeneficialOwners={props.numberBeneficialOwners}
        />
      )
    }
    case 5: {
      return <MarketingMaterial formikProps={props.formikProps} />
    }
    case 6: {
      return <CertificateOfInsurance
        activeStep={props.activeStep}
        updateCoiDocumentUploaded={props.coiDocumentUploaded}
        formikProps={props.formikProps}
        nextStep={props.nextStep}
      />
    }
    case 7: {
      return <RiskTolerance formikProps={props.formikProps} />
    }
    case 8: {
      return <OwnershipCertifications formikProps={props.formikProps} />
    }
    default:
      return <></>
  }
}
