import AddEditEchoProduct from './AddEditEchoProduct'
import React from 'react'
import { connect } from 'react-redux'

import {
  getProductsCatalogRequest, closePopup,
  searchCasProduct, prepareSearchedCasProducts, getDocumentTypes, newElementsIndex, removeElementsIndex, putEchoProduct,
  postEchoProduct, searchManufacturers, searchUnNumber, loadFile, addAttachment, linkAttachment, removeAttachmentLink,
  removeAttachment
} from '~/modules/admin/actions'

import { FormattedMessage, injectIntl } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'

const mapDispatchToProps = {
  loadFile,
  addAttachment,
  linkAttachment,
  removeAttachment,
  removeAttachmentLink,
  closePopup,
  getDocumentTypes,
  getProductsCatalogRequest,
  prepareSearchedCasProducts,
  searchCasProduct,
  newElementsIndex,
  removeElementsIndex,
  putEchoProduct,
  postEchoProduct,
  searchManufacturers,
  searchUnNumber
}

const mapStateToProps = ({ admin }, props) => {
  //console.log('!!!!!!!!!! AddEditEchoProduct mapStateToProps admin', admin)
  const currentTab = admin.currentTab.name === props.tabName

  return {
    //...admin,
    visible: currentTab && (!!admin.currentAddForm || !!admin.currentEditForm),
    addForm: currentTab && !!admin.currentAddForm,
    editForm: currentTab && !!admin.currentEditForm,
    popupValues: admin.popupValues,
    editTab: admin.popupValues ? admin.popupValues.editTab : 0,
    packagingGroups: admin.packagingGroups.map((pGroup, id) => {
      return {
        key: id,
        text: pGroup.groupCode,
        description: pGroup.description,
        value: pGroup.id
      }
    }),
    searchedManufacturersLoading: admin.searchedManufacturersLoading,
    searchedManufacturers: admin.searchedManufacturers,
    searchedCasProducts: admin.searchedCasProducts,




    isLoading: false,
    config: admin.config[admin.currentTab.name],
    listDocumentTypes: admin.documentTypes,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(AddEditEchoProduct)))