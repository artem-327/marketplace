import { connect } from 'react-redux'
import Admin from './Admin'
import { withAuth } from '../../../hocs'
import { closePopup } from '../actions'
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
