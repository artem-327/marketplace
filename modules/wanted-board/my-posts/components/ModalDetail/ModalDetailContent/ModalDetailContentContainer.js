import ModalDetailContent from './ModalDetailContent'
import { connect } from 'react-redux'
// Actions
import { getHazardClasses, getCountries, getUnits, getPackagingTypes, getProductConditions, getProductForms, getProductGrades } from '../../../../../global-data/actions'
import { searchManufacturers } from '../../../../actions'
import { makeGetHazardClasses } from '../../../../selector'
import { makeGetHazardClassesLoading } from '../../../../../global-data/selectors'

const makeMapStateToProps = () => {
  const getHazardClasses = makeGetHazardClasses()
  const getHazardClassesLoading = makeGetHazardClassesLoading()

  const mapStateToProps = (state) => {
    return {
      countries: state.globalData.countries,
      units: state.globalData.unitsDropdown,
      packagingTypes: state.globalData.packagingTypesDropdown,
      productConditions: state.globalData.productConditionsDropdown,
      productForms: state.globalData.productFormsDropdown,
      productGrades: state.globalData.productGradesDropdown,
      countriesLoading: state.globalData.countriesLoading,
      productConditionsLoading: state.globalData.productConditionsLoading,
      productFormsLoading: state.globalData.productFormsLoading,
      productGradesLoading: state.globalData.productGradesLoading,
      hazardClasses: getHazardClasses(state),
      hazardClassesLoading: getHazardClassesLoading(state),
      deliveryCountry: state.wantedBoard?.popupValues?.rawData?.deliveryCountry,
      primaryBranch: state.auth?.identity?.company?.primaryBranch?.deliveryAddress?.address,
      searchedManufacturers: state.wantedBoard?.searchedManufacturers,
      searchedManufacturersLoading: state.wantedBoard?.searchedManufacturersLoading
    }
  }
  return mapStateToProps
}

export default connect(makeMapStateToProps, { getHazardClasses, getCountries, getUnits, getPackagingTypes, getProductConditions, getProductForms, getProductGrades, searchManufacturers })(ModalDetailContent)