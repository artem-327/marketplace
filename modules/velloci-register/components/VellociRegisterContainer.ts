import { connect } from 'react-redux'
import VellociRegister from './VellociRegister'
//Actions
import * as Actions from '../actions'
import { getBusinessClassifications } from '~/modules/settings/actions'
import { getBusinessTypes } from '~/modules/company-form/actions'
//components
import { getSafe } from '~/utils/functions'
import { getIdentity } from '~/modules/auth/actions'
import { initialValues } from '../constants'

const mapStateToProps = (store: any) => ({
  ...store.vellociRegister,
  initialValues: {
    ...initialValues,
    businessInfo: {
      phoneNumber: getSafe(() => store.auth.identity.company.phone, ''),
      email: getSafe(() => store.auth.identity.email, ''),
      url: getSafe(() => store.auth.identity.company.website, ''),
      address: {
        streetAddress: getSafe(
          () => store.auth.identity.company.primaryBranch.deliveryAddress.address.streetAddress,
          ''
        ),
        city: getSafe(() => store.auth.identity.company.primaryBranch.deliveryAddress.address.city, ''),
        country: JSON.stringify({
          countryId: getSafe(() => store.auth.identity.company.primaryBranch.deliveryAddress.address.country.id, ''),
          hasProvinces: getSafe(
            () => store.auth.identity.company.primaryBranch.deliveryAddress.address.country.hasProvinces,
            ''
          )
        }),
        zip: getSafe(() => store.auth.identity.company.primaryBranch.deliveryAddress.address.zip.zip, ''),
        province: getSafe(() => store.auth.identity.company.primaryBranch.deliveryAddress.address.province.id, '')
      },
      dba: getSafe(() => store.auth.identity.company.dba, '')
    },
    controlPerson: {
      isControlPerson: false,
      legalBusinessName: getSafe(() => store.auth.identity.company.cfDisplayName, ''),
      entityType: getSafe(() => store.auth.identity.company.businessType.dwollaName, []),
      industryType: '',
      isEin: true,
      isSsn: false,
      ein: getSafe(() => store.auth.identity.company.tin, ''),
      ssn: '',
      isEstablishedUs: true,
      tinNumber: '',
      naicsCode: ''
    }
  }
})

const mapDispatchToProps = {
  getBusinessClassifications,
  getBusinessTypes,
  getIdentity,
  ...Actions
}

export default connect(mapStateToProps, mapDispatchToProps)(VellociRegister)
