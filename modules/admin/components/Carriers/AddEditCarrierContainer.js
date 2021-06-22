import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
// Components
import AddEditCarrier from './AddEditCarrier'
// Services
import { withDatagrid } from '../../../datagrid'
// Actions
import * as Actions from '../../actions'
// Selectors
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