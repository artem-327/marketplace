import { connect } from 'react-redux'
// Components
import BidsReceived from './BidsReceived'
// Services
import { withDatagrid } from '../../../../modules/datagrid'
// Actions
import { applyFilter } from '../../../../modules/filter/actions'
import * as Actions from '../../actions'
import { sidebarChanged } from '../../../../modules/purchase-order/actions'
import { getProductOffer } from '../../../../modules/purchase-order/actions'

const makeMapStateToProps = () => {
  const mapStateToProps = (store, { datagrid }) => {
    return {
      ...store.marketplace,
      rows: datagrid?.rows
    }
  }
  return mapStateToProps
}

export default withDatagrid(
  connect(makeMapStateToProps, {
    ...Actions,
    sidebarChanged,
    getProductOffer,
    applyFilter
  })(BidsReceived)
)
