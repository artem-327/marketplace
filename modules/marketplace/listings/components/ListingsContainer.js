import { connect } from 'react-redux'
// Components
import Listings from './Listings'
// Actions
import { applyFilter } from '../../../filter/actions'
import * as Actions from '../../actions'
import { getProductOffer, sidebarChanged } from '../../../purchase-order/actions'
import { openPopup as openInfoPopup, closePopup } from '../../../company-product-info/actions'
// Services
import { getDatagridRows } from './Listings.services'
import { withDatagrid } from '../../../datagrid'
//Selectors
import {
  makeGetSearchedCompaniesDropdown,
  makeGetSelectedSellerOption,
  makeGetCurrentUserDeaAuthorized,
  makeGetCurrentUserDhsAuthorized
} from '../../selectors'
import {
  makeGetZipHomeBranch,
  makeGetCountryIdHomeBranch,
  makeGetIsMerchant,
  makeGetIsCompanyAdmin,
  makeGetTutorialCompleted,
  makeGetBuyEligible,
  makeGetSellEligible,
  makeGetVellociAccountStatus,
  makeGetReviewRequested
} from '../../../auth/selectors'
import { makeGetSidebar } from '../../../purchase-order/selectors'
import { makeGetIsOpen } from '../../../company-product-info/selectors'
import { makeGetAppliedFilter } from '../../../filter/selectors'

const makeMapStateToProps = () => {
  const getAppliedFilter = makeGetAppliedFilter()
  const getZipHomeBranch = makeGetZipHomeBranch()
  const getCountryIdHomeBranch = makeGetCountryIdHomeBranch()
  const getSidebar = makeGetSidebar()
  const getIsOpen = makeGetIsOpen()
  const getIsMerchant = makeGetIsMerchant()
  const getIsCompanyAdmin = makeGetIsCompanyAdmin()
  const getTutorialCompleted = makeGetTutorialCompleted()
  const getBuyEligible = makeGetBuyEligible()
  const getSellEligible = makeGetSellEligible()
  const getSearchedCompaniesDropdown = makeGetSearchedCompaniesDropdown()
  const getSelectedSellerOption = makeGetSelectedSellerOption()
  const getCurrentUserDeaAuthorized = makeGetCurrentUserDeaAuthorized()
  const getCurrentUserDhsAuthorized = makeGetCurrentUserDhsAuthorized()
  const getVellociAccountStatus = makeGetVellociAccountStatus()
  const getReviewRequested = makeGetReviewRequested()

  const mapStateToProps = (store, {datagrid}) => {
    return {
      ...store.marketplace,
      advancedFilters: getAppliedFilter(store),
      appliedFilter: getAppliedFilter(store),
      defaultZip: getZipHomeBranch(store),
      defaultCountry: getCountryIdHomeBranch(store),
      rows: getDatagridRows(datagrid?.rows),
      sidebar: getSidebar(store),
      isProductInfoOpen: getIsOpen(store),
      isMerchant: getIsMerchant(store),
      isCompanyAdmin: getIsCompanyAdmin(store),
      tutorialCompleted: getTutorialCompleted(store),
      buyEligible: getBuyEligible(store),
      sellEligible: getSellEligible(store),
      searchedCompaniesDropdown: getSearchedCompaniesDropdown(store),
      selectedSellerOption: getSelectedSellerOption(store),
      regulatoryDeaListAuthorized: getCurrentUserDeaAuthorized(store),
      regulatoryDhsCoiAuthorized: getCurrentUserDhsAuthorized(store),
      vellociAccountStatus: getVellociAccountStatus(store),
      reviewRequested: getReviewRequested(store)
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
