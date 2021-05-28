import { connect } from 'react-redux'
import { withDatagrid } from '../../../../modules/datagrid'
import BidsSent from './BidsSent'
import * as Actions from '../../actions'
import { FormattedUnit, FormattedAssay } from '../../../../components/formatted-messages'
import { currency } from '../../../../constants/index'
import { getSafe } from '../../../../utils/functions'
import { getLocaleDateFormat } from '../../../../components/date-format'

function mapStateToProps(store, { datagrid }) {
  return {
    ...store.marketplace,
    rows: datagrid.rows,
    isMerchant: getSafe(() => store.auth.identity.isMerchant, false),
    isCompanyAdmin: getSafe(() => store.auth.identity.isCompanyAdmin, false),
    tutorialCompleted: getSafe(() => store.auth.identity.tutorialCompleted, false)
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(BidsSent))
