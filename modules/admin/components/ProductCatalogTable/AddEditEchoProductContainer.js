import AddEditEchoProduct from './AddEditEchoProduct'
import React from 'react'
import { connect } from 'react-redux'

import {
  closePopup,
  searchCasProduct,
  putEchoProduct,
  postEchoProduct,
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
  searchTags,
  getDocumentTypes
} from '~/modules/admin/actions'

import { Header } from 'semantic-ui-react'

import { injectIntl } from 'react-intl'

const mapDispatchToProps = {
  loadFile,
  addAttachment,
  linkAttachment,
  removeAttachment,
  removeAttachmentLink,
  closePopup,
  searchCasProduct,
  putEchoProduct,
  postEchoProduct,
  searchManufacturers,
  editEchoProductChangeTab,
  loadEditEchoProduct,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  getUnNumbersByString,
  searchTags,
  getDocumentTypes
}

const mapStateToProps = ({ admin }, props) => {
  const currentTab = admin.currentTab.name === props.tabName
  return {
    visible: currentTab && (!!admin.currentAddForm || !!admin.currentEditForm),
    addForm: currentTab && !!admin.currentAddForm,
    editForm: currentTab && !!admin.currentEditForm,
    popupValues: admin.popupValues,
    editTab: admin.editEchoProductEditTab,
    editInitTrig: admin.editEchoProductInitTrig,
    packagingGroups: admin.packagingGroups.map((pGroup, id) => {
      return {
        key: id,
        text: pGroup.groupCode,
        value: pGroup.id,
        content: <Header content={pGroup.groupCode} subheader={pGroup.description} style={{ fontSize: '1em' }} />
      }
    }),
    hazardClasses: admin.hazardClasses.map((d, id) => {
      return {
        key: id,
        text: d.classCode,
        value: d.id,
        content: <Header content={d.classCode} subheader={d.description} style={{ fontSize: '1em' }} />
      }
    }),
    searchedManufacturersLoading: admin.searchedManufacturersLoading,
    searchedManufacturers: admin.searchedManufacturers,
    searchedCasProducts: admin.searchedCasProducts,
    isLoading: admin.loading,
    unNumbersFiltered: admin.unNumbersFiltered.map((d, id) => {
      return {
        key: d.id,
        text: d.unNumberCode,
        value: d.id,
        content: <Header content={d.unNumberCode} subheader={d.description} style={{ fontSize: '1em' }} />
      }
    }),
    unNumbersFetching: admin.unNumbersFetching,

    config: admin.config[admin.currentTab.name],
    listDocumentTypes: admin.documentTypes,
    searchedTags: admin.searchedTags.map(d => {
      return {
        key: d.id,
        text: d.name,
        value: d.id
      }
    }),
    searchedTagsLoading: admin.searchedTagsLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddEditEchoProduct))
