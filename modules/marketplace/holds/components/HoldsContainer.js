import { connect } from 'react-redux'
// Components
import Holds from './Holds'
// Actions
import * as Actions from '../../actions'
// Services
import { withDatagrid } from '../../../datagrid'
import { getDatagridRows } from './Holds.services'
// Selelctors
import { makeGetIsMerchant, makeGetIsCompanyAdmin } from '../../../auth/selectors'
import { makeGetIsAdmin, makeGetIsProductOfferManager } from '../../selectors'

const makeMapStateToProps = () => {
  const getIsMerchant = makeGetIsMerchant()
  const getIsCompanyAdmin = makeGetIsCompanyAdmin()
  const getIsAdmin = makeGetIsAdmin()
  const getIsProductOfferManager = makeGetIsProductOfferManager()

  const mapStateToProps = (store, { datagrid }) => {
    return {
      ...store.marketplace,
      isMerchant: getIsMerchant(store),
      isAdmin: getIsAdmin(store),
      isProductOfferManager: getIsProductOfferManager(store),
      isCompanyAdmin: getIsCompanyAdmin(store),
      rows: getDatagridRows(datagrid)
    }
  }
  return mapStateToProps
}

export default withDatagrid(
  connect(makeMapStateToProps, {
    ...Actions
  })(Holds)
)
