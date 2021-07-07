import { connect } from 'react-redux'
// Components
import MyListings from './MyListings'
// Actions
import * as Actions from '../../actions'
import { getTemplates } from '../../../broadcast/actions'
import { openImportPopup } from '../../../settings/actions'
import { openBroadcast, broadcastChange } from '../../../broadcast/actions'
import { applyFilter } from '../../../filter/actions'
import { openPopup, closePopup } from '../../../company-product-info/actions'
import { setCompanyElligible } from '../../../auth/actions'
// Services
import { withDatagrid } from '../../../datagrid'
import { getSafe } from '../../../../utils/functions'
import { getMappedRows } from './MyListings.services'
// Selectors
import {
  makeGetApplicationName,
  makeGetBroadcastTemplates,
  makeGetAdvancedFilters,
  makeGetEditedId,
  makeGetSellEligible,
  makeGetDetailValues,
  makeGetIsOpenImportPopup,
  makeGetIsProductInfoOpen,
  makeGetTutorialCompleted,
  makeGetActiveInventoryFilter
} from '../../selectors'

const makeMapStateToProps = () => {
  const mapStateToProps = (store, { datagrid }) => {
    const getApplicationName = makeGetApplicationName()
    const getBroadcastTemplates = makeGetBroadcastTemplates()
    const getAdvancedFilters = makeGetAdvancedFilters()
    const getEditedId = makeGetEditedId()
    const getSellEligible = makeGetSellEligible()
    const getDetailValues = makeGetDetailValues()
    const getIsOpenImportPopup = makeGetIsOpenImportPopup()
    const getIsProductInfoOpen = makeGetIsProductInfoOpen()
    const getTutorialCompleted = makeGetTutorialCompleted()
    const getActiveInventoryFilter = makeGetActiveInventoryFilter()

    return {
      ...store.simpleAdd,
      applicationName: getApplicationName(store),
      broadcastTemplates: getBroadcastTemplates(store),
      advancedFilters: getAdvancedFilters(store),
      editedId: getEditedId(store),
      sellEligible: getSellEligible(store),
      detailValues: getDetailValues(store),
      rows: getMappedRows(datagrid),
      unmappedRows: datagrid.rows,
      isOpenImportPopup: getIsOpenImportPopup(store),
      isProductInfoOpen: getIsProductInfoOpen(store),
      tutorialCompleted: getTutorialCompleted(store),
      activeInventoryFilter: getActiveInventoryFilter(store)
    }
  }
  return mapStateToProps
}

export default withDatagrid(
  connect(makeMapStateToProps, {
    ...Actions,
    getTemplates,
    openPopup,
    closePopup,
    openImportPopup,
    openBroadcast,
    broadcastChange,
    applyFilter,
    setCompanyElligible
  })(MyListings)
)
