import { connect } from 'react-redux'
import ModalDetail from './ModalDetail'
import { withDatagrid } from '../../../../datagrid'
import { closeAddEditPopup, postNewWantedBoard, updateWantedBoard } from '../../../actions'
import { makeGetPopupValues, makeGetUpdating, makeGetPrimaryBranch } from '../../../selector'

const makeMapStateToProps = () => {
  const getPopupValues = makeGetPopupValues()
  const getUpdating = makeGetUpdating()
  const getPrimaryBranch = makeGetPrimaryBranch()


  const mapStateToProps = (state) => {
    return {
      popupValues: getPopupValues(state),
      updating: getUpdating(state),
      primaryBranch: getPrimaryBranch(state)
    }
  }
  return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, {
  closeAddEditPopup, postNewWantedBoard, updateWantedBoard
})(ModalDetail))
