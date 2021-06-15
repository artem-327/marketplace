import AddEditEchoProduct from './AddEditEchoProduct'
import { connect } from 'react-redux'
import { withDatagrid } from '../../../datagrid'
//Actions
import {
  closePopup,
  searchCasProduct,
  putCompanyGenericProducts,
  postCompanyGenericProducts,
  searchManufacturers,
  loadFile,
  addAttachment,
  linkAttachment,
  removeAttachmentLink,
  removeAttachment,
  editEchoProductChangeTab,
  loadEditEchoProduct,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  getUnNumbersByString,
  searchProductGroups,
  searchCompany
} from '../../../products/actions'
import { getDocumentTypes } from '../../../global-data/actions'
import {
  makeGetCurrentAddForm,
  makeGetCurrentEditForm,
  makeGetPopupValues,
  makeGetEditEchoProductEditTab,
  makeGetEditEchoProductInitTrig,
  makeGetPackagingGroups,
  makeGetHazardClasses,
  makeGetSearchedManufacturersLoading,
  makeGetSearchedManufacturers,
  makeGetSearchedCasProducts,
  makeGetLoading,
  makeGetUnNumbersFiltered,
  makeGetUnNumbersFetching,
  makeGetDocumentTypes,
  makeGetSearchedProductGroups,
  makeGetSearchedProductGroupsLoading,
  makeGetSearchedCompanies,
  makeGetSearchedCompaniesLoading
} from '../../selectors'

const mapDispatchToProps = {
  loadFile,
  addAttachment,
  linkAttachment,
  removeAttachment,
  removeAttachmentLink,
  closePopup,
  searchCasProduct,
  putCompanyGenericProducts,
  postCompanyGenericProducts,
  searchManufacturers,
  editEchoProductChangeTab,
  loadEditEchoProduct,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  getUnNumbersByString,
  searchProductGroups,
  getDocumentTypes,
  searchCompany
}

const makeMapStateToProps = () => {
  const getCurrentAddForm = makeGetCurrentAddForm()
  const getCurrentEditForm = makeGetCurrentEditForm()
  const getPopupValues = makeGetPopupValues()
  const getEditEchoProductEditTab = makeGetEditEchoProductEditTab()
  const getEditEchoProductInitTrig = makeGetEditEchoProductInitTrig()
  const getPackagingGroups = makeGetPackagingGroups()
  const getHazardClasses = makeGetHazardClasses()
  const getSearchedManufacturersLoading = makeGetSearchedManufacturersLoading()
  const getSearchedManufacturers = makeGetSearchedManufacturers()
  const getSearchedCasProducts = makeGetSearchedCasProducts()
  const getLoading = makeGetLoading()
  const getUnNumbersFiltered = makeGetUnNumbersFiltered()
  const getUnNumbersFetching = makeGetUnNumbersFetching()
  const getDocumentTypes = makeGetDocumentTypes()
  const getSearchedProductGroups = makeGetSearchedProductGroups()
  const getSearchedProductGroupsLoading = makeGetSearchedProductGroupsLoading()
  const getSearchedCompanies = makeGetSearchedCompanies()
  const getSearchedCompaniesLoading = makeGetSearchedCompaniesLoading()

  const mapStateToProps = (state, props) => {
    return {
      addForm: getCurrentAddForm(state),
      editForm: getCurrentEditForm(state),
      popupValues: getPopupValues(state),
      editTab: getEditEchoProductEditTab(state),
      editInitTrig: getEditEchoProductInitTrig(state),
      packagingGroups: getPackagingGroups(state),
      hazardClasses: getHazardClasses(state),
      searchedManufacturersLoading: getSearchedManufacturersLoading(state),
      searchedManufacturers: getSearchedManufacturers(state),
      searchedCasProducts: getSearchedCasProducts(state),
      isLoading: getLoading(state),
      unNumbersFiltered: getUnNumbersFiltered(state),
      unNumbersFetching: getUnNumbersFetching(state),
      listDocumentTypes: getDocumentTypes(state),
      searchedProductGroups: getSearchedProductGroups(state),
      searchedProductGroupsLoading: getSearchedProductGroupsLoading(state),
      searchedCompany: getSearchedCompanies(state),
      searchedCompanyLoading: getSearchedCompaniesLoading(state)
    }
  }
  return mapStateToProps
}

export default withDatagrid(connect(makeMapStateToProps, mapDispatchToProps)(AddEditEchoProduct))
