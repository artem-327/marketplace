import { connect } from 'react-redux'

import { withDatagrid } from '~/modules/datagrid'
import { applyFilter } from '~/modules/filter/actions'
import Listings from './Listings'
import * as Actions from '../../actions'
import { getProductOffer, sidebarChanged } from '~/modules/purchase-order/actions'
import { openPopup as openInfoPopup, closePopup } from '~/modules/company-product-info/actions'
import { getSafe } from '~/utils/functions'
//Selectors
import { makeGetDatagridRows } from '../../selectors'
import {
  makeGetZipHomeBranch,
  makeGetCountryIdHomeBranch,
  makeGetIsMerchant,
  makeGetIsCompanyAdmin,
  makeGetTutorialCompleted,
  makeGetBuyEligible
} from '../../../auth/selectors'
import { makeGetSidebar } from '../../../purchase-order/selectors'
import { makeGetIsOpen } from '../../../company-product-info/selectors'
import { makeGetAppliedFilter } from '../../../filter/selectors'

const makeMapStateToProps = () => {
  const getRows = makeGetDatagridRows()
  const getAppliedFilter = makeGetAppliedFilter()
  const getZipHomeBranch = makeGetZipHomeBranch()
  const getCountryIdHomeBranch = makeGetCountryIdHomeBranch()
  const getSidebar = makeGetSidebar()
  const getIsOpen = makeGetIsOpen()
  const getIsMerchant = makeGetIsMerchant()
  const getIsCompanyAdmin = makeGetIsCompanyAdmin()
  const getTutorialCompleted = makeGetTutorialCompleted()
  const getBuyEligible = makeGetBuyEligible()

  const mapStateToProps = (store, props) => {
    return {
      ...store.marketplace,
      advancedFilters: getAppliedFilter(store),
      // rows: store.marketplace.broadcastedProductOffers.map(po => {
      appliedFilter: getAppliedFilter(store),
      defaultZip: getZipHomeBranch(store),
      defaultCountry: getCountryIdHomeBranch(store),
      rows: getRows(props),
      sidebar: getSidebar(store),
      isProductInfoOpen: getIsOpen(store),
      isMerchant: getIsMerchant(store),
      isCompanyAdmin: getIsCompanyAdmin(store),
      tutorialCompleted: getTutorialCompleted(store),
      buyEligible: getBuyEligible(store)
    }
  }
  return mapStateToProps
}

export default withDatagrid(
  connect(makeMapStateToProps, {
    ...Actions,
    sidebarChanged,
    openInfoPopup,
    closePopup,
    getProductOffer,
    applyFilter
  })(Listings)
)
