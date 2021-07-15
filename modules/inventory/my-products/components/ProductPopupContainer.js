import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import { injectIntl } from 'react-intl'
// Components
import ProductPopup from './ProductPopup'
// Actions
import {
  handleSubmitProductEditPopup,
  handleSubmitProductAddPopup,
  searchUnNumber,
  searchCompanyGenericProduct,
  getNmfcNumbersByString,
  addNmfcNumber,
  removeAttachmentLinkCompanyProduct,
  loadFile,
  removeAttachment
} from '../../../settings/actions'
import {
  getDocumentTypes,
  getPackagingTypes,
  getUnits,
  getHazardClasses,
  getPackagingGroups
} from '../../../global-data/actions'
import { closePopup } from '../../actions'
import { addAttachment } from '../../../inventory/actions'
// Services
import { getSafe } from '../../../../utils/functions'
import { withDatagrid } from '../../../datagrid'
// Constants
import { palletDimensions } from '../../../settings/contants'
// Selectors
import {
  makeGetAttachments,
  makeGetPopupValues,
  makeGetCompanyGenericProduct,
  makeGetCompanyGenericProductFetching,
  makeGetSearchedUnNumbers,
  makeGetProductDataLoading,
  makeGetNmfcNumbersFetching,
  makeGetNmfcNumbersFiltered,
  makeGetSettingsMap
} from '../../selectors'

import {
  makeGetDocumentTypesDropdown,
  makeGetMeasureTypesDropdown,
  makeGetPackagingTypes,
  makeGetUnitsDropdown,
  makeGetWeightUnits,
  makeGetUnits,
  makeGetFreightClassesDropdown,
  makeGetHazardClassesDropdown,
  makeGetPackagingGroupsDropdown
} from '../../../global-data/selectors'

const mapDispatchToProps = {
  closePopup,
  handleSubmitProductEditPopup,
  handleSubmitProductAddPopup,
  searchUnNumber,
  getDocumentTypes,
  searchCompanyGenericProduct,
  getNmfcNumbersByString,
  addNmfcNumber,
  removeAttachmentLinkCompanyProduct,
  loadFile,
  addAttachment,  
  removeAttachment,
  getPackagingTypes,
  getUnits,
  getHazardClasses,
  getPackagingGroups
}

const makeMapStateToProps = () => {
  const getAttachments = makeGetAttachments()
  const getPopupValues = makeGetPopupValues()
  const getCompanyGenericProduct = makeGetCompanyGenericProduct()
  const getCompanyGenericProductFetching = makeGetCompanyGenericProductFetching()
  const getPackagingType = makeGetMeasureTypesDropdown()
  const getPackagingTypesAll = makeGetPackagingTypes()
  const getProductsUnitsType = makeGetUnitsDropdown()
  const getPackageWeightUnits = makeGetWeightUnits()
  const getUnitsAll = makeGetUnits()
  const getFreightClasses = makeGetFreightClassesDropdown()
  const getHazardClasses = makeGetHazardClassesDropdown()
  const getPackagingGroups = makeGetPackagingGroupsDropdown()
  const getSearchedUnNumbers = makeGetSearchedUnNumbers()
  const getProductDataLoading = makeGetProductDataLoading()
  const getDocumentTypesDropdown = makeGetDocumentTypesDropdown()
  const getNmfcNumbersFetching = makeGetNmfcNumbersFetching()
  const getNmfcNumbersFiltered = makeGetNmfcNumbersFiltered()
  const getSettingsMap = makeGetSettingsMap()

  const mapStateToProps = state => {
    const settingsMap = getSettingsMap(state)

    return {
      attachments: getAttachments(state),
      popupValues: getPopupValues(state),
      companyGenericProduct: getCompanyGenericProduct(state),
      companyGenericProductFetching: getCompanyGenericProductFetching(state),    
      packagingType: getPackagingType(state),
      packagingTypesAll: getPackagingTypesAll(state),
      productsUnitsType: getProductsUnitsType(state),
      packageWeightUnits: getPackageWeightUnits(state),
      unitsAll: getUnitsAll(state),
      freightClasses: getFreightClasses(state),
      hazardClasses: getHazardClasses(state),
      packagingGroups: getPackagingGroups(state),
      searchedUnNumbers: getSearchedUnNumbers(state),
      loading: getProductDataLoading(state),
      documentTypes: getDocumentTypesDropdown(state),
      nmfcNumbersFetching: getNmfcNumbersFetching(state),
      nmfcNumbersFiltered: getNmfcNumbersFiltered(state),
      palletWeightInitFromSettings: getSafe(() => settingsMap.get(palletDimensions.weight), ''),
      palletLengthInitFromSettings: getSafe(() => settingsMap.get(palletDimensions.length), ''),
      palletWidthInitFromSettings: getSafe(() => settingsMap.get(palletDimensions.width), ''),
      palletHeightInitFromSettings: getSafe(() => settingsMap.get(palletDimensions.height), ''),
      palletWeightUnitInitFromSettings: 7 // 7 = pounds, lb
    }
  }
  return mapStateToProps
}

export default withDatagrid(injectIntl(connect(makeMapStateToProps, mapDispatchToProps)(withToastManager(ProductPopup))))
