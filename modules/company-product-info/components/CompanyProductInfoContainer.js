import {connect} from 'react-redux'
import CompanyProductInfo from './CompanyProductInfo'
import {tabChanged, closePopup} from '../actions'

const mapStateToProps = store => ({
  ...store.companyProductInfo
})

export default connect(mapStateToProps, {tabChanged, closePopup})(CompanyProductInfo)
