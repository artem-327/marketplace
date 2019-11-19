import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Filter from './Filter'
import {
  toggleFilterGroup,
  addFilterTag,
  toggleFilter,
  fetchSavedFilters,
  deleteSaveFilter,
  saveSaveFilter
} from '../../modules/filter'
import {
  fetchProductAge,
  fetchProductConditions,
  fetchProductForms,
  fetchPackagingTypes,
  fetchProductGrade
} from '../../modules/products'
import { fetchWarehouseDistances } from '../../modules/location'
import { resetForm } from '../../utils/functions'
import { actions } from 'react-redux-form'
import { getBroadcastedFilters } from '~/modules/marketplace/actions'

function mapStateToProps(store) {
  return {
    isOpen: store.oldFilter.isOpen,
    warehouseDistances: store.location.warehouseDistances,
    filterGroupStatus: store.oldFilter.filterGroup,
    filterData: store.forms.oldFilter,
    packagingTypes: store.products.packagingTypes,
    productConditions: store.products.productConditions,
    productForms: store.products.productForms,
    productAge: store.products.productAge,
    productGradeTypes: store.products.productGrade,
    location: store.products.location,
    productAgeModel: store.forms.oldFilter.productAge,
    productAgeCustomModel: store.forms.oldFilter.productAgeCustom,
    saveFilters: store.oldFilter.saveFilters,
    savedFiltersFetching: store.oldFilter.savedFiltersFetching
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleFilterGroup,
      addFilterTag,
      toggleFilter,
      fetchProductAge,
      resetForm,
      fetchProductConditions,
      fetchProductGrade,
      fetchProductForms,
      fetchPackagingTypes,
      fetchWarehouseDistances,
      fetchSavedFilters,
      fillFilter: values => actions.merge('forms.filter', values),
      deleteSaveFilter,
      saveSaveFilter,
      dispatch
    },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
