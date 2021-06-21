import { connect } from 'react-redux'
import { closeAddPopup, postNewRequest } from '../../actions'
import {
  getProductForms,
  getProductConditions,
  getProductGrades,
  getPackagingTypes
} from '../../../global-data/actions'
import AddNewPopup1Parameter from './AddNewPopup1Parameter'
import { makeGetConfig } from '../../selectors'

const mapDispatchToProps = {
    closeAddPopup,
    postNewRequest,
    getProductForms,
    getProductConditions,
    getProductGrades,
    getPackagingTypes
}

const makeMapStateToProps = () => {
    const getConfig = makeGetConfig()

    const mapStateToProps = (state, { currentTab }) => {
        let cfg = getConfig(state)
        return {
            config: cfg[currentTab]
        }
    }
    return mapStateToProps
}

export default connect(makeMapStateToProps, mapDispatchToProps)(AddNewPopup1Parameter)
