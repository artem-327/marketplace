import { connect } from 'react-redux'
import AddEditCarrier from './AddEditCarrier'
import { withDatagrid } from '../../../datagrid'
import * as Actions from '../../actions'
import { injectIntl } from 'react-intl'
import { makeGetPopupValues, makeGetUpdating } from '../../selectors'

const makeMapStateToProps = () => {
  const getPopupValues = makeGetPopupValues()
  const getUpdating = makeGetUpdating()

  const mapStateToProps = state => {
    return {
      popupValues: getPopupValues(state),
      updating: getUpdating(state)
    }
  }
  return mapStateToProps
}

export default withDatagrid(injectIntl(connect(makeMapStateToProps, Actions)(AddEditCarrier)))