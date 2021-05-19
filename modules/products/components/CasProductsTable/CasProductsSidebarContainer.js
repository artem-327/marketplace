import { connect } from 'react-redux'
import CasProductsSidebar from './CasProductsSidebar'
import { withDatagrid } from '../../../datagrid'
import { closeAddPopup, postNewCasProductRequest, updateCasProductRequest } from '../../actions'
import { makeGetPopupValues, makeGetUpdating } from '../../selectors'

const makeMapStateToProps = () => {
  const getPopupValues = makeGetPopupValues()
  const getUpdating = makeGetUpdating()

  const mapStateToProps = (state) => {
    return {
      popupValues: getPopupValues(state),
      updating: getUpdating(state)
    }
  }
  return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, {
    closeAddPopup,
    postNewCasProductRequest,
    updateCasProductRequest
})(CasProductsSidebar))
