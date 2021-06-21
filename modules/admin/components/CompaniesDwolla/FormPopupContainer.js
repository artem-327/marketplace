
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import FormPopup from './FormPopup'
import {
  closeRegisterDwollaAccount,
  getPrimaryBranchProvinces,
  getMailingBranchProvinces,
  postDwollaAccount
} from '../../actions'
import { getCountries } from '../../../global-data/actions'
import { addZip, getZipCodes } from '../../../zip-dropdown/actions'

const mapDispatchToProps = {
    closeRegisterDwollaAccount,
    getCountries,
    getPrimaryBranchProvinces,
    getMailingBranchProvinces,
    postDwollaAccount,
    addZip,
    getZipCodes
}

const mapStateToProps = ({ admin, zip, auth, globalData }) => {
    return {
        ...admin,
        zip,
        auth,
        countries: globalData.countries,
        countriesDropdown: globalData.countriesDropdown
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(FormPopup))
