import { createSelector } from 'reselect'
import { Header } from 'semantic-ui-react'
import { ArrayToFirstItem } from '../../components/formatted-messages'
import { Popup, Label } from 'semantic-ui-react'
//Services
import { getSafe } from '../../utils/functions'

const getAuth = state => state?.auth
const getIsOpenImportPopup = state => state?.settings?.isOpenImportPopup
const getCurrentEdit2Form = state => state?.productsAdmin?.currentEdit2Form
const getCurrentEditForm = state => state?.productsAdmin?.currentEditForm
const getCurrentAddForm = state => state?.productsAdmin?.currentAddForm
const getTableHandlersFilters = state => state?.productsAdmin?.tableHandlersFilters
const getSearchedCompanies = state => state?.productsAdmin?.searchedCompanies?.map(d => ({
    key: d.id,
    value: d.id,
    text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
  }))
const getSearchedCompaniesByName = state => state?.productsAdmin?.searchedCompanies?.map(d => ({
    key: d.id,
    value: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, ''),
    text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
  }))
const getSearchedCompaniesLoading = state => state?.productsAdmin?.searchedCompaniesLoading
const getCompanyProductUnmappedOnly = state => state?.productsAdmin?.companyProductUnmappedOnly
const getFilterValue = state => state?.productsAdmin?.filterValue
const getEditedId = state => state?.productsAdmin?.editedId
const getLoading = state => state?.productsAdmin?.loading
const getRowId = state => getSafe(() => state?.productsAdmin?.popupValues?.id)
const getPopupValues = state => getSafe(() => state?.productsAdmin?.popupValues, null)
const getSearchedTagsLoading = state => state?.productsAdmin?.searchedTagsLoading
const getSearchedTags = state => getSafe(() => state?.productsAdmin?.searchedTags?.length, false)
  ? state?.productsAdmin?.searchedTags.map(d => ({
      key: d.id,
      text: d.name,
      value: d.id
      }))
  : []
const getAltEchoNamesRows = state => getSafe(() => state?.productsAdmin?.altEchoNamesRows, [])
const getCatEditedId = state => (!!state?.productsAdmin?.currentAddForm || !!state?.productsAdmin?.currentEditForm) && state?.productsAdmin?.popupValues
  ? state?.productsAdmin?.popupValues?.id
  : -1
const getEditEchoProductEditTab = state => state?.productsAdmin?.editEchoProductEditTab
const getEditEchoProductInitTrig = state => state?.productsAdmin?.editEchoProductInitTrig
const getPackagingGroups = state => getSafe(() => state?.productsAdmin?.packagingGroups?.length, false)
  ? state?.productsAdmin?.packagingGroups?.map((pGroup, id) => {
      return {
        key: id,
        text: pGroup.groupCode,
        value: pGroup.id,
        content: <Header content={pGroup.groupCode} subheader={pGroup.description} style={{ fontSize: '1em' }} />
      }
    })
  : []
const getHazardClasses = state => getSafe(() => state?.productsAdmin?.hazardClasses?.length, false)
  ? state?.productsAdmin?.hazardClasses?.map((d, id) => {
      return {
        key: id,
        text: d.classCode,
        value: d.id,
        content: <Header content={d.classCode} subheader={d.description} style={{ fontSize: '1em' }} />
      }
    })
  : []
const getSearchedManufacturersLoading = state => state?.productsAdmin?.searchedManufacturersLoading
const getSearchedManufacturers = state => state?.productsAdmin?.searchedManufacturers
const getSearchedCasProducts = state => state?.productsAdmin?.searchedCasProducts
const getUnNumbersFiltered = state => getSafe(() => state?.productsAdmin?.unNumbersFiltered?.length, false)
  ? state?.productsAdmin?.unNumbersFiltered?.map((d, id) => {
      return {
        key: d.id,
        text: d.unNumberCode,
        value: d.id,
        content: <Header content={d.unNumberCode} subheader={d.description} style={{ fontSize: '1em' }} />
      }
    })
  : []
const getUnNumbersFetching = state => state?.productsAdmin?.unNumbersFetching
const getDocumentTypes = state => state?.productsAdmin?.documentTypes
const getSearchedProductGroups = state => getSafe(() => state?.productsAdmin?.searchedProductGroups?.length, false)
  ? state?.productsAdmin?.searchedProductGroups?.map(d => ({
      key: d.id,
      text: d.name,
      value: d.id
    }))
  : []
const getSearchedProductGroupsLoading = state => state?.productsAdmin?.searchedProductGroupsLoading
const getUpdating = state => state?.productsAdmin?.updating
const getAltCasNamesRows = state => getSafe(() => state?.productsAdmin?.altCasNamesRows?.data, [])
const getCasHazardClasses = state => state?.productsAdmin?.hazardClasses
const getGroupRows = ownProps => ownProps?.datagrid?.rows?.map((row, _i) => ({
  ...row,
  rawData: row,
  tags: (
      <ArrayToFirstItem
          key={_i}
          values={row.tags ? row.tags.map(d => (d.name ? d.name : d)) : ''}
          rowItems={3}
          ids={row.tags ? row.tags.map(d => (d.id ? d.id : d)) : ''}
          tags={true}
          onTagClick={ownProps?.handleFilterChange}
      />
  )
}))
const getProductRows = datagrid => datagrid?.rows?.map(c => ({
  ...c,
  company: getSafe(() => c.company, [])
}))
const getCasRows = datagrid => datagrid?.rows?.map(d => {
  return {
    ...d,
    hazardClassesLabeled: transformHazardClasses(d.hazardClasses)
  }
})
const transformHazardClasses = classes => {
  if (!classes || !classes.length) return
  return (
    <Label.Group color='blue'>
      {classes.map((b, i) => (
        <Popup
          key={i}
          content={b.description}
          trigger={
            <Label size='tiny'>
              {b.classCode}
            </Label>
          }
        />
      ))}
    </Label.Group>
  )
}

export const makeGetAuth = () => {
  return createSelector([getAuth], auth => auth)
}
export const makeGetIsOpenImportPopup = () => {
  return createSelector([getIsOpenImportPopup], isOpenImportPopup => isOpenImportPopup)
}
export const makeGetCurrentEdit2Form = () => {
  return createSelector([getCurrentEdit2Form], currentEdit2Form => currentEdit2Form)
}
export const makeGetCurrentEditForm = () => {
  return createSelector([getCurrentEditForm], currentEditForm => currentEditForm)
}
export const makeGetCurrentAddForm = () => {
  return createSelector([getCurrentAddForm], currentAddForm => currentAddForm)
}
export const makeGetTableHandlersFilters = () => {
  return createSelector([getTableHandlersFilters], tableHandlersFilters => tableHandlersFilters)
}
export const makeGetSearchedCompanies = () => {
  return createSelector([getSearchedCompanies], searchedCompanies => searchedCompanies)
}
export const makeGetSearchedCompaniesByName = () => {
  return createSelector([getSearchedCompaniesByName], searchedCompaniesByName => searchedCompaniesByName)
}
export const makeGetSearchedCompaniesLoading = () => {
  return createSelector([getSearchedCompaniesLoading], searchedCompaniesLoading => searchedCompaniesLoading)
}
export const makeGetCompanyProductUnmappedOnly = () => {
  return createSelector([getCompanyProductUnmappedOnly], companyProductUnmappedOnly => companyProductUnmappedOnly)
}
export const makeGetFilterValue = () => {
  return createSelector([getFilterValue], filterValue => filterValue)
}
export const makeGetEditedId = () => {
  return createSelector([getEditedId], editedId => editedId)
}
export const makeGetLoading = () => {
  return createSelector([getLoading], loading => loading)
}
export const makeGetRowId = () => {
  return createSelector([getRowId], rowId => rowId)
}
export const makeGetPopupValues = () => {
  return createSelector([getPopupValues], popupValues => popupValues)
}
export const makeGetSearchedTagsLoading = () => {
  return createSelector([getSearchedTagsLoading], searchedTagsLoading => searchedTagsLoading)
}
export const makeGetSearchedTags = () => {
  return createSelector([getSearchedTags], searchedTags => searchedTags)
}
export const makeGetAltEchoNamesRows = () => {
  return createSelector([getAltEchoNamesRows], productAltNames => productAltNames)
}
export const makeGetCatEditedId = () => {
  return createSelector([getCatEditedId], editedId => editedId)
}
export const makeGetEditEchoProductEditTab = () => {
  return createSelector([getEditEchoProductEditTab], editTab => editTab)
}
export const makeGetEditEchoProductInitTrig = () => {
  return createSelector([getEditEchoProductInitTrig], editInitTrig => editInitTrig)
}
export const makeGetPackagingGroups = () => {
  return createSelector([getPackagingGroups], packagingGroups => packagingGroups)
}
export const makeGetHazardClasses = () => {
  return createSelector([getHazardClasses], hazardClasses => hazardClasses)
}
export const makeGetSearchedManufacturersLoading = () => {
  return createSelector([getSearchedManufacturersLoading], searchedManufacturersLoading => searchedManufacturersLoading)
}
export const makeGetSearchedManufacturers = () => {
  return createSelector([getSearchedManufacturers], searchedManufacturers => searchedManufacturers)
}
export const makeGetSearchedCasProducts = () => {
  return createSelector([getSearchedCasProducts], searchedCasProducts => searchedCasProducts)
}
export const makeGetUnNumbersFiltered = () => {
  return createSelector([getUnNumbersFiltered], unNumbersFiltered => unNumbersFiltered)
}
export const makeGetUnNumbersFetching = () => {
  return createSelector([getUnNumbersFetching], unNumbersFetching => unNumbersFetching)
}
export const makeGetDocumentTypes = () => {
  return createSelector([getDocumentTypes], documentTypes => documentTypes)
}
export const makeGetSearchedProductGroups = () => {
  return createSelector([getSearchedProductGroups], searchedProductGroups => searchedProductGroups)
}
export const makeGetSearchedProductGroupsLoading = () => {
  return createSelector([getSearchedProductGroupsLoading], searchedProductGroupsLoading => searchedProductGroupsLoading)
}
export const makeGetUpdating = () => {
  return createSelector([getUpdating], updating => updating)
}
export const makeGetAltCasNamesRows = () => {
  return createSelector([getAltCasNamesRows], altCasNamesRows => altCasNamesRows)
}
export const makeGetCasHazardClasses = () => {
  return createSelector([getCasHazardClasses], hazardClasses => hazardClasses)
}
export const makeGetGroupRows = () => {
  return createSelector([getGroupRows], rows => rows)
}
export const makeGetProductRows = () => {
  return createSelector([getProductRows], rows => rows)
}
export const makeGetCasRows = () => {
  return createSelector([getCasRows], rows => rows)
}
