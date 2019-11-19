import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import AllInventory from './AllInventory'
import {deleteProductOffersList, fetchAllProductOffers} from '../../../modules/productOffers'
import {addPopup, removePopup} from '../../../modules/popup'
import {resetFilterTags} from '../../../modules/filter'
import {resetForm} from '../../../utils/functions'
import {getMerchant} from '../../../modules/merchants'
import {getOffice} from '../../../modules/companies'
import {sidebarChanged} from '../../../modules/cart'
import {getProductOffer} from '~/modules/purchase-order/actions'

const mapStateToProps = store => {
  return {
    productOffers: store.productOffers.allProductOffers,
    shippingQuotes:
      store.dataTables.allInventoryTable &&
      store.dataTables.allInventoryTable.rowsOpns.some(po => {
        return po.rows.some(row => {
          return row.selected
        })
      }),
    isFetching: store.productOffers.isFetching,
    identity: store.auth.identity,
    merchantDetail: store.merchants.merchantDetail,
    officeDetail: store.companies.office,
    productOffersIsFetching: store.productOffers.productOffersIsFetching,
    productOffersTable: store.dataTables.allInventoryTable,
    sidebar: store.cart.sidebar
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAllProductOffers,
      getOffice,
      getMerchant,
      addPopup,
      removePopup,
      resetFilterTags,
      resetForm,
      deleteProductOffersList,
      getProductOffer,
      sidebarChanged
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(AllInventory)
