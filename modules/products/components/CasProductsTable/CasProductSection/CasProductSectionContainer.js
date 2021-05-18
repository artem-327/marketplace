import { connect } from 'react-redux'
import CasProductSection from './CasProductSection'

function mapStateToProps(store) {
    return {
      hazardClasses: store.productsAdmin.hazardClasses
    }
}

export default connect(mapStateToProps, {  })(CasProductSection)