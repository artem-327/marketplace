import { connect } from 'react-redux'
import { getLocationString } from '~/services'
import { withDatagrid } from '~/modules/datagrid'
import { applyFilter } from '~/modules/filter/actions'
import BidsReceived from './BidsReceived'
import * as Actions from '../../actions'
import { sidebarChanged } from '~/modules/purchase-order/actions'
import { getProductOffer } from '~/modules/purchase-order/actions'
import { FormattedUnit, FormattedAssay } from '~/components/formatted-messages'
import { currency } from '~/constants/index'
import { getSafe } from '~/utils/functions'
import { getLocaleDateFormat } from '~/components/date-format'

function mapStateToProps(store, { datagrid }) {
  return {
    ...store.marketplace,
    rows: datagrid.rows,
    isMerchant: getSafe(() => store.auth.identity.isMerchant, false),
    isCompanyAdmin: getSafe(() => store.auth.identity.isCompanyAdmin, false),
    tutorialCompleted: getSafe(() => store.auth.identity.tutorialCompleted, false)
  }
}

export default withDatagrid(
  connect(mapStateToProps, {
    ...Actions,
    sidebarChanged,
    getProductOffer,
    applyFilter
  })(BidsReceived)
)
