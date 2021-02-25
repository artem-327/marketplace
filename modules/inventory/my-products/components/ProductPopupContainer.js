import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import { injectIntl } from 'react-intl'
import { getSafe } from '~/utils/functions'
import {
  getProductsCatalogRequest,
  handleSubmitProductEditPopup,
  handleSubmitProductAddPopup,
  searchUnNumber,
  getDocumentTypes,
  searchCompanyGenericProduct,
  getNmfcNumbersByString,
  addNmfcNumber,
  removeAttachmentLinkCompanyProduct,
  loadFile,
  removeAttachment
} from '~/modules/settings/actions'
import { closePopup } from '../../actions'
import { addAttachment } from '~/modules/inventory/actions'
import { withDatagrid } from '~/modules/datagrid'
import { palletDimensions } from '~/modules/settings/contants'
import ProductPopup from './ProductPopup'

const mapDispatchToProps = {
  closePopup,
  getProductsCatalogRequest,
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
  removeAttachment
}
const mapStateToProps = ({ settings, simpleAdd, auth }) => {
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
    packagingType: settings.productsPackagingType,
    packagingTypesAll: settings.packagingTypes,
    productsUnitsType: settings.productsUnitsType,
    packageWeightUnits: settings.packageWeightUnits,
    unitsAll: settings.units,
    freightClasses: settings.productsFreightClasses,
    hazardClasses: settings.productsHazardClasses,
    packagingGroups: settings.productsPackagingGroups,
    searchedUnNumbers: settings.searchedUnNumbers,
    loading: settings.productDataLoading,
    documentTypes: settings.documentTypes,
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
