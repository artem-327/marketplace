import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import { injectIntl } from 'react-intl'
import { getSafe } from '../../../../utils/functions'
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
import { withDatagrid } from '../../../datagrid'
import { palletDimensions } from '../../../settings/contants'
import ProductPopup from './ProductPopup'

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
const mapStateToProps = ({ globalData ,settings, simpleAdd, auth }) => {
  let settingsMap = new Map()
  if (getSafe(() => auth.identity.settings.length, false)) {
    for (let setting of auth.identity.settings) {
      settingsMap.set(setting.key, setting.value)
    }
  }

  return {
    attachments: getSafe(() => settings.popupValues.attachments, []),
    popupValues: simpleAdd.popupValues,
    companyGenericProduct: settings.companyGenericProduct,
    companyGenericProductFetching: settings.companyGenericProductFetching,    
    packagingType: globalData.measureTypesDropdown,
    packagingTypesAll: globalData.packagingTypes,
    productsUnitsType: globalData.unitsDropdown,
    packageWeightUnits: globalData.weightUnits,
    unitsAll: globalData.units,
    freightClasses: globalData.freightClassesDropdown,
    hazardClasses: globalData.hazardClassesDropdown,
    packagingGroups: globalData.packagingGroupsDropdown,
    searchedUnNumbers: settings.searchedUnNumbers,
    loading: settings.productDataLoading,
    documentTypes: globalData.documentTypesDropdown,
    nmfcNumbersFetching: settings.nmfcNumbersFetching,
    nmfcNumbersFiltered: settings.nmfcNumbersFiltered.map(d => {
      return {
        key: d.id,
        text: d.code,
        value: d.id,
        content: (
          <>
            <strong>{d.code}</strong>
            <div>{d.description}</div>
          </>
        )
      }
    }),
    palletWeightInitFromSettings: getSafe(() => settingsMap.get(palletDimensions.weight), ''),
    palletLengthInitFromSettings: getSafe(() => settingsMap.get(palletDimensions.length), ''),
    palletWidthInitFromSettings: getSafe(() => settingsMap.get(palletDimensions.width), ''),
    palletHeightInitFromSettings: getSafe(() => settingsMap.get(palletDimensions.height), ''),
    palletWeightUnitInitFromSettings: 7 // 7 = pounds, lb
  }
}

export default withDatagrid(injectIntl(connect(mapStateToProps, mapDispatchToProps)(withToastManager(ProductPopup))))
