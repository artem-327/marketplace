import { connect } from 'react-redux'
// Components
import Admin from './Admin'
// Services
import { withAuth } from '../../../hocs'
// Actions
import { closePopup } from '../actions'
// Selectors
import { makeGetCurrentEditForm, makeGetCurrentAddForm, makeGetCurrentAddDwolla, makeGetAuth } from '../selectors'

const makeMapStateToProps = () => {
    const getCurrentEditForm = makeGetCurrentEditForm()
    const getCurrentAddForm = makeGetCurrentAddForm()
    const getCurrentAddDwolla = makeGetCurrentAddDwolla()
    const getAuth = makeGetAuth()

    const mapStateToProps = state => ({
        currentEditForm: getCurrentEditForm(state),
        currentAddForm: getCurrentAddForm(state),
        currentAddDwolla: getCurrentAddDwolla(state),
        auth: getAuth(state)
    })
    return mapStateToProps
}
  
export default withAuth(connect(makeMapStateToProps, { closePopup })(Admin))
