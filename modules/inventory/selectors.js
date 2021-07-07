import { createSelector } from 'reselect'
import { getSafe, getLocationString } from '../../utils/functions'
import { FormattedNumber } from 'react-intl'
import moment from 'moment'
import Router from 'next/dist/client/router'
import { Image } from 'semantic-ui-react'
//Constants
import { currency } from '../../constants/index'
//Services
import { getPriceColumns } from './shared-listings/components/SharedListings.services'
import { FormattedUnit } from '../../components/formatted-messages'
//Styles
import { DivSeller, SpanSellerName, CapitalizedText } from './shared-listings/components/SharedListings.styles'
//Constants
import { GLOBAL_RULES } from './my-listings/components/ModalDetail/ModalDetail.constants'

const getDatagridRows = props => props?.datagrid?.rows
const getApplicationName = store => getSafe(() => store.auth.identity.appInfo.applicationName, null)
const getBroadcastTemplates = state => getSafe(() => state.broadcast.templates, null)
const getAdvancedFilters = store => getSafe(() => store.filter.inventory.appliedFilter, null)
const getEditedId = store => store.simpleAdd.isModalDetailOpen && store.simpleAdd.editedId ? store.simpleAdd.editedId : -1
const getSellEligible = store => getSafe(() => store.auth.identity.company.sellEligible, false)
const getDetailValues = store => getSafe(() => store.simpleAdd.detailValues, null)
const getIsOpenImportPopup = store => getSafe(() => store.settings.isOpenImportPopup, false)
const getIsProductInfoOpen = store => getSafe(() => store.companyProductInfo.isOpen, false)
const getTutorialCompleted = store => getSafe(() => store.auth.identity.tutorialCompleted, false)
const getActiveInventoryFilter = store => getSafe(() => store.filter.inventory.appliedFilter.filters.length > 0, false)
const getAutocompleteData = store => getSafe(() => store.simpleAdd.autocompleteData, [])
const getAutocompleteDataLoading = store => getSafe(() => store.simpleAdd.autocompleteDataLoading, false)
const getProductFormsDropdown = store => getSafe(() => store.globalData.productFormsDropdown, [])
const getProductGradesDropdown = store => getSafe(() => store.globalData.productGradesDropdown, [])
const getLoading = store => getSafe(() => store.simpleAdd.loading, false) || getSafe(() => store.settings.loading, false)
const getModalActiveTab = store => getSafe(() => store.simpleAdd.modalActiveTab, 0)
const getIsModalDetailOpen = store => getSafe(() => store.simpleAdd.isModalDetailOpen, false)
const getSearchedManufacturers = store => getSafe(() => store.simpleAdd.searchedManufacturers, [])
const getSearchedManufacturersLoading = store => getSafe(() => store.simpleAdd.searchedManufacturersLoading, false)
const getSearchedOrigins = store => getSafe(() => store.simpleAdd.searchedOrigins, [])
const getSearchedOriginsLoading = store => getSafe(() => store.simpleAdd.searchedOriginsLoading, false)
const getSearchedProducts = store => getSafe(() => store.simpleAdd.searchedProducts, [])
const getSearchedProductsLoading = store => getSafe(() => store.simpleAdd.searchedProductsLoading, false)
const getWarehousesList = store => getSafe(() => store.simpleAdd.warehousesList, [])
const getEditProductOfferInitTrig = store => getSafe(() => store.simpleAdd.editProductOfferInitTrig, false)
const getIsLoadingBroadcast = store => getSafe(() => store.broadcast.loading, false)
const getTdsTemplatesLoading = store => getSafe(() => store.simpleAdd.tdsTemplatesLoading, false)
const getTdsTemplates = store => getSafe(() => store.simpleAdd.tdsTemplates, [])
const getBroadcastOption = store => getSafe(() => store.simpleAdd.broadcastOption, GLOBAL_RULES)
const getDocumentTypesDropdown = store => getSafe(() => store.globalData.documentTypesDropdown, [])
const getIsOpenPopup = store => getSafe(() => store.simpleAdd.isOpenPopup, false)
const getCsvFileId = store => getSafe(() => store.settings.fileCSVId, null)
const getCSV = store => getSafe(() => store.settings.CSV, null)
const getIsSaveMapCSV = store => getSafe(() => store.settings.isSaveMapCSV, false)
const getMappedDataHeaderCSV = store => getSafe(() => store.settings.dataHeaderCSV, null)
const getMappedHeaders = store => getSafe(() => store.settings.mappedHeaders, null)
const getMissingRequired = store => getSafe(() => store.settings.missingRequired, [])
const getSelectedSavedMap = store => getSafe(() => store.settings.selectedSavedMap, null)
const getCsvImportError = store => getSafe(() => store.settings.csvImportError, null)
const getReloadFilter = store => ({
  props: {
    currentTab:
      Router && Router.router
      ? store?.settings?.tabsNames?.find(tab => tab.type === Router.router.query.type)
      : store?.settings?.tabsNames[0],
    productsFilter: store?.settings?.productsFilter
  },
  value: store?.settings?.filterValue
})
const getCsvWithoutHeader = store => getSafe(() => store.settings.csvWithoutHeader, false)
const getAttachments = store => getSafe(() => store.settings.popupValues.attachments, [])
const getPopupValues = store => getSafe(() => store.simpleAdd.popupValues, null)
const getCompanyGenericProduct = store => getSafe(() => store.settings.companyGenericProduct, [])
const getCompanyGenericProductFetching = store => getSafe(() => store.settings.companyGenericProductFetching, false)
const getPackagingType = store => getSafe(() => store.globalData.measureTypesDropdown, [])
const getPackagingTypesAll = store => getSafe(() => store.globalData.packagingTypes, [])
const getProductsUnitsType = store => getSafe(() => store.globalData.unitsDropdown, [])
const getPackageWeightUnits = store => getSafe(() => store.globalData.weightUnits, [])
const getUnitsAll = store => getSafe(() => store.globalData.units, [])
const getFreightClasses = store => getSafe(() => store.globalData.freightClassesDropdown, [])
const getHazardClasses = store => getSafe(() => store.globalData.hazardClassesDropdown, [])
const getPackagingGroups = store => getSafe(() => store.globalData.packagingGroupsDropdown, [])
const getSearchedUnNumbers = store => getSafe(() => store.settings.searchedUnNumbers, [])
const getProductDataLoading = store => getSafe(() => store.settings.productDataLoading, false)
const getNmfcNumbersFetching = store => getSafe(() => store.settings.nmfcNumbersFetching, false)
const getNmfcNumbersFiltered = store => store?.settings?.nmfcNumbersFiltered?.map(d => {
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
})
const getSettingsMap = store => {
  let settingsMap = new Map()
  if (getSafe(() => store.auth.identity.settings.length, false)) {
    for (let setting of store.auth.identity.settings) {
      settingsMap.set(setting.key, setting.value)
    }
  }
  return settingsMap
}
const getMapName = store => getSafe(() => store.settings.mapName, null)
const getMaps = store => getSafe(() => store.settings.maps, null)

export const makeGetBroadcastTemplates = () => createSelector([getBroadcastTemplates], broadcastTemplates => broadcastTemplates)
export const makeGetDatagridRows = () => {
  return createSelector([getDatagridRows], rows => {
    return rows.map(po => {
      const qtyPart = getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation)
      let price
      let address = po?.warehouse?.deliveryAddress?.address?.city

      if (po?.warehouse?.deliveryAddress?.address?.province?.abbreviation) {
        address = `${address}, ${po?.warehouse?.deliveryAddress?.address?.province?.abbreviation}`
      } else {
        address = `${address}, ${po?.warehouse?.deliveryAddress?.address?.country?.code}`
      }
      try {
        if (po.pricingTiers.length > 1)
          price = (
            <>
              <FormattedNumber
                minimumFractionDigits={3}
                maximumFractionDigits={3}
                style='currency'
                currency={currency}
                value={po.pricingTiers[po.pricingTiers.length - 1].pricePerUOM}
              />
              - <FormattedNumber style='currency' currency={currency} value={po.pricingTiers[0].pricePerUOM} />{' '}
              {qtyPart && `/ ${qtyPart}`}{' '}
            </>
          )
        else
          price = (
            <>
              <FormattedNumber
                minimumFractionDigits={3}
                maximumFractionDigits={3}
                style='currency'
                currency={currency}
                value={getSafe(() => po.pricingTiers[0].pricePerUOM)}
              />
              {qtyPart && `/ ${qtyPart}`}{' '}
            </>
          )
      } catch (e) {
        console.error(e)
      }

      let tdsFields = null
      //Convert tdsFields string array of objects to array
      if (getSafe(() => po.tdsFields, '')) {
        let newJson = po.tdsFields.replace(/([a-zA-Z0-9]+?):/g, '"$1":')
        newJson = newJson.replace(/'/g, '"')
        tdsFields = JSON.parse(newJson)
      }

      return {
        ...po,

        rawData: {
          ...po,
          elementsTdsFields: { elements: getSafe(() => tdsFields, [{ property: '', specifications: '' }]) },
          address,
          priceColumns: getPriceColumns(po)
        },
        groupProductName: getSafe(() => po.companyProduct.intProductName, 'Unmapped'),
        seller: (
          <DivSeller key={po.id}>
            <Image verticalAlign='middle' size='mini' spaced={true} src={po?.createdBy?.company?.avatarUrl} />
            <SpanSellerName>{po?.owner?.cfDisplayName}</SpanSellerName>
          </DivSeller>
        ),
        expired: po.lotExpirationDate ? moment().isAfter(po.lotExpirationDate) : false,
        productName: getSafe(() => po.companyProduct.intProductName, 'N/A'),
        //seller: getSafe(() => po.owner.cfDisplayName, 'N/A'),
        packagingType: getSafe(() => po.companyProduct.packagingType.name, ''),
        packagingSize: getSafe(() => po.companyProduct.packagingSize, ''),
        packagingUnit: getSafe(() => po.companyProduct.packagingUnit.nameAbbreviation, ''),
        qtyPart: qtyPart,
        available: po.pkgAvailable ? <FormattedNumber minimumFractionDigits={0} value={po.pkgAvailable} /> : 'N/A',
        location: getLocationString(po),
        cost: po.costPerUOM ? (
          <FormattedNumber
            minimumFractionDigits={3}
            maximumFractionDigits={3}
            style='currency'
            currency={currency}
            value={po.costPerUOM}
          />
        ) : (
          'N/A'
        ),
        price,
        packaging: (
          <>
            {`${po.companyProduct.packagingSize} ${po.companyProduct.packagingUnit.nameAbbreviation} `}
            <CapitalizedText>{po.companyProduct.packagingType.name}</CapitalizedText>{' '}
          </>
        ),
        quantityShared:
          qtyPart && po?.quantity ? <FormattedUnit unit={qtyPart} separator=' ' value={po?.quantity} /> : 'N/A'
      }
    })
  })
}
export const makeGetApplicationName = () => createSelector([getApplicationName], applicationName => applicationName)
export const makeGetAdvancedFilters = () => createSelector([getAdvancedFilters], advancedFilters => advancedFilters)
export const makeGetEditedId = () => createSelector([getEditedId], editedId => editedId)
export const makeGetSellEligible = () => createSelector([getSellEligible], sellEligible => sellEligible)
export const makeGetDetailValues = () => createSelector([getDetailValues], detailValues => detailValues)
export const makeGetIsOpenImportPopup = () => createSelector([getIsOpenImportPopup], isOpenImportPopup => isOpenImportPopup)
export const makeGetIsProductInfoOpen = () => createSelector([getIsProductInfoOpen], isProductInfoOpen => isProductInfoOpen)
export const makeGetTutorialCompleted = () => createSelector([getTutorialCompleted], tutorialCompleted => tutorialCompleted)
export const makeGetActiveInventoryFilter = () => createSelector([getActiveInventoryFilter], activeInventoryFilter => activeInventoryFilter)
export const makeGetAutocompleteData = () => createSelector([getAutocompleteData], autocompleteData => autocompleteData)
export const makeGetAutocompleteDataLoading = () => createSelector([getAutocompleteDataLoading], autocompleteDataLoading => autocompleteDataLoading)
export const makeGetProductFormsDropdown = () => createSelector([getProductFormsDropdown], productFormsDropdown => productFormsDropdown)
export const makeGetProductGradesDropdown = () => createSelector([getProductGradesDropdown], productGradesDropdown => productGradesDropdown)
export const makeGetLoading = () => createSelector([getLoading], loading => loading)
export const makeGetModalActiveTab = () => createSelector([getModalActiveTab], modalActiveTab => modalActiveTab)
export const makeGetIsModalDetailOpen = () => createSelector([getIsModalDetailOpen], isModalDetailOpen => isModalDetailOpen)
export const makeGetSearchedManufacturers = () => createSelector([getSearchedManufacturers], searchedManufacturers => searchedManufacturers)
export const makeGetSearchedManufacturersLoading = () => createSelector([getSearchedManufacturersLoading], searchedManufacturersLoading => searchedManufacturersLoading)
export const makeGetSearchedOrigins = () => createSelector([getSearchedOrigins], searchedOrigins => searchedOrigins)
export const makeGetSearchedOriginsLoading = () => createSelector([getSearchedOriginsLoading], searchedOriginsLoading => searchedOriginsLoading)
export const makeGetSearchedProducts = () => createSelector([getSearchedProducts], searchedProducts => searchedProducts)
export const makeGetSearchedProductsLoading = () => createSelector([getSearchedProductsLoading], searchedProductsLoading => searchedProductsLoading)
export const makeGetWarehousesList = () => createSelector([getWarehousesList], warehousesList => warehousesList)
export const makeGetEditProductOfferInitTrig = () => createSelector([getEditProductOfferInitTrig], editProductOfferInitTrig => editProductOfferInitTrig)
export const makeGetIsLoadingBroadcast = () => createSelector([getIsLoadingBroadcast], isLoadingBroadcast => isLoadingBroadcast)
export const makeGetTdsTemplatesLoading = () => createSelector([getTdsTemplatesLoading], tdsTemplatesLoading => tdsTemplatesLoading)
export const makeGetTdsTemplates = () => createSelector([getTdsTemplates], tdsTemplates => tdsTemplates)
export const makeGetBroadcastOption = () => createSelector([getBroadcastOption], broadcastOption => broadcastOption)
export const makeGetDocumentTypesDropdown = () => createSelector([getDocumentTypesDropdown], documentTypesDropdown => documentTypesDropdown)
export const makeGetIsOpenPopup = () => createSelector([getIsOpenPopup], isOpenPopup => isOpenPopup)
export const makeGetCsvFileId = () => createSelector([getCsvFileId], csvFileId => csvFileId)
export const makeGetCSV = () => createSelector([getCSV], CSV => CSV)
export const makeGetIsSaveMapCSV = () => createSelector([getIsSaveMapCSV], isSaveMapCSV => isSaveMapCSV)
export const makeGetMappedDataHeaderCSV = () => createSelector([getMappedDataHeaderCSV], mappedDataHeaderCSV => mappedDataHeaderCSV)
export const makeGetMappedHeaders = () => createSelector([getMappedHeaders], mappedHeaders => mappedHeaders)
export const makeGetMissingRequired = () => createSelector([getMissingRequired], missingRequired => missingRequired)
export const makeGetSelectedSavedMap = () => createSelector([getSelectedSavedMap], selectedSavedMap => selectedSavedMap)
export const makeGetCsvImportError = () => createSelector([getCsvImportError], csvImportError => csvImportError)
export const makeGetReloadFilter = () => createSelector([getReloadFilter], reloadFilter => reloadFilter)
export const makeGetCsvWithoutHeader = () => createSelector([getCsvWithoutHeader], csvWithoutHeader => csvWithoutHeader)
export const makeGetAttachments = () => createSelector([getAttachments], attachments => attachments)
export const makeGetPopupValues = () => createSelector([getPopupValues], popupValues => popupValues)
export const makeGetCompanyGenericProduct = () => createSelector([getCompanyGenericProduct], companyGenericProduct => companyGenericProduct)
export const makeGetCompanyGenericProductFetching = () => createSelector([getCompanyGenericProductFetching], companyGenericProductFetching => companyGenericProductFetching)
export const makeGetPackagingType = () => createSelector([getPackagingType], packagingType => packagingType)
export const makeGetPackagingTypesAll = () => createSelector([getPackagingTypesAll], packagingTypesAll => packagingTypesAll)
export const makeGetProductsUnitsType = () => createSelector([getProductsUnitsType], productsUnitsType => productsUnitsType)
export const makeGetPackageWeightUnits = () => createSelector([getPackageWeightUnits], packageWeightUnits => packageWeightUnits)
export const makeGetUnitsAll = () => createSelector([getUnitsAll], unitsAll => unitsAll)
export const makeGetFreightClasses = () => createSelector([getFreightClasses], freightClasses => freightClasses)
export const makeGetHazardClasses = () => createSelector([getHazardClasses], hazardClasses => hazardClasses)
export const makeGetPackagingGroups = () => createSelector([getPackagingGroups], packagingGroups => packagingGroups)
export const makeGetSearchedUnNumbers = () => createSelector([getSearchedUnNumbers], searchedUnNumbers => searchedUnNumbers)
export const makeGetProductDataLoading = () => createSelector([getProductDataLoading], productDataLoading => productDataLoading)
export const makeGetNmfcNumbersFetching = () => createSelector([getNmfcNumbersFetching], nmfcNumbersFetching => nmfcNumbersFetching)
export const makeGetNmfcNumbersFiltered = () => createSelector([getNmfcNumbersFiltered], nmfcNumbersFiltered => nmfcNumbersFiltered)
export const makeGetSettingsMap = () => createSelector([getSettingsMap], settingsMap => settingsMap)
export const makeGetMapName = () => createSelector([getMapName], mapName => mapName)
export const makeGetMaps = () => createSelector([getMaps], maps => maps)
