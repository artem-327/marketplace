import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Registration from './Registration'
import {registration} from '../../modules/identity'

function mapStateToProps(store) {
  return {
    formStatus: {
      isValid: store.identity.registrationForm.isValid,
      isFetching: store.identity.registrationForm.isFetching,
      hasError: store.identity.registrationForm.hasError
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({registration}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
