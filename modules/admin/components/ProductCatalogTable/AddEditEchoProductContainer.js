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
  editEchoProductChangeTab
} from '~/modules/admin/actions'

import { Header } from 'semantic-ui-react'

import { injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'

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
  editEchoProductChangeTab
}

const mapStateToProps = ({ admin }, props) => {
  const currentTab = admin.currentTab.name === props.tabName

  return {
    visible: currentTab && (!!admin.currentAddForm || !!admin.currentEditForm),
    addForm: currentTab && !!admin.currentAddForm,
    editForm: currentTab && !!admin.currentEditForm,
    popupValues: admin.popupValues,
    editTab: admin.editEchoProductEditTab,
    packagingGroups: admin.packagingGroups.map((pGroup, id) => {
      return {
        key: id,
        text: pGroup.groupCode,
        //description: pGroup.description,
        value: pGroup.id,
        content: <Header content={pGroup.groupCode} subheader={pGroup.description} style={{ fontSize: '1em' }} />
      }
    }),
    searchedManufacturersLoading: admin.searchedManufacturersLoading,
    searchedManufacturers: admin.searchedManufacturers,
    searchedCasProducts: admin.searchedCasProducts,
    isLoading: admin.loading,

    config: admin.config[admin.currentTab.name],
    listDocumentTypes: admin.documentTypes
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(AddEditEchoProduct)))
