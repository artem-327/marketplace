import AddEditEchoProduct from './AddEditEchoProduct'
import React from 'react'
import { connect } from 'react-redux'
import { withDatagrid } from '~/modules/datagrid'

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
  getDocumentTypes,
  searchMarketSegments,
  searchCompany
} from '~/modules/products/actions'

import { Header } from 'semantic-ui-react'
import { getSafe } from '~/utils/functions'

import { injectIntl } from 'react-intl'

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
  searchMarketSegments,
  searchCompany
}

const mapStateToProps = ({ productsAdmin }, props) => {
  const currentTab = productsAdmin.currentTab.name === props.tabName
  return {
    visible: currentTab && (!!productsAdmin.currentAddForm || !!productsAdmin.currentEditForm),
    addForm: currentTab && !!productsAdmin.currentAddForm,
    editForm: currentTab && !!productsAdmin.currentEditForm,
    popupValues: productsAdmin.popupValues,
    editTab: productsAdmin.editEchoProductEditTab,
    editInitTrig: productsAdmin.editEchoProductInitTrig,
    packagingGroups: getSafe(() => productsAdmin.packagingGroups.length, false)
      ? productsAdmin.packagingGroups.map((pGroup, id) => {
          return {
            key: id,
            text: pGroup.groupCode,
            value: pGroup.id,
            content: <Header content={pGroup.groupCode} subheader={pGroup.description} style={{ fontSize: '1em' }} />
          }
        })
      : [],
    hazardClasses: getSafe(() => productsAdmin.hazardClasses.length, false)
      ? productsAdmin.hazardClasses.map((d, id) => {
          return {
            key: id,
            text: d.classCode,
            value: d.id,
            content: <Header content={d.classCode} subheader={d.description} style={{ fontSize: '1em' }} />
          }
        })
      : [],
    searchedManufacturersLoading: productsAdmin.searchedManufacturersLoading,
    searchedManufacturers: productsAdmin.searchedManufacturers,
    searchedCasProducts: productsAdmin.searchedCasProducts,
    isLoading: productsAdmin.loading,
    unNumbersFiltered: getSafe(() => productsAdmin.unNumbersFiltered.length, false)
      ? productsAdmin.unNumbersFiltered.map((d, id) => {
          return {
            key: d.id,
            text: d.unNumberCode,
            value: d.id,
            content: <Header content={d.unNumberCode} subheader={d.description} style={{ fontSize: '1em' }} />
          }
        })
      : [],
    unNumbersFetching: productsAdmin.unNumbersFetching,

    listDocumentTypes: productsAdmin.documentTypes,
    searchedProductGroups: getSafe(() => productsAdmin.searchedProductGroups.length, false)
      ? productsAdmin.searchedProductGroups.map(d => ({
          key: d.id,
          text: d.name,
          value: d.id
        }))
      : [],
    searchedProductGroupsLoading: productsAdmin.searchedProductGroupsLoading,
    searchedMarketSegments: getSafe(() => productsAdmin.searchedMarketSegments.length, false)
      ? productsAdmin.searchedMarketSegments.map(d => ({
          key: d.id,
          text: d.name,
          value: d.id
        }))
      : [],
    searchedMarketSegmentsLoading: productsAdmin.searchedMarketSegmentsLoading,
    searchedCompany: getSafe(() => productsAdmin.searchedCompanies.length, false)
      ? productsAdmin.searchedCompanies.map(d => ({
          key: d.id,
          text: d.name,
          value: d.id
        }))
      : [],
    searchedCompanyLoading: productsAdmin.searchedCompaniesLoading
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddEditEchoProduct)))
