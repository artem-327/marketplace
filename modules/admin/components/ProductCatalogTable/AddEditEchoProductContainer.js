//AddEditEchoProductContainer
import AddEditEchoProduct from './AddEditEchoProduct'

import React from 'react'
import { connect } from 'react-redux'
//import moment from 'moment'

//import { Grid, Form, Modal, Segment, Header, FormGroup, FormField, Search, Label, Icon, Accordion, Divider } from 'semantic-ui-react'
//import { Formik, FieldArray } from 'formik'
//import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import {
  getProductsCatalogRequest, closePopup,
  searchCasProduct, prepareSearchedCasProducts, getDocumentTypes, newElementsIndex, removeElementsIndex, putEchoProduct,
  postEchoProduct, searchManufacturers, searchUnNumber, loadFile, addAttachment, linkAttachment, removeAttachmentLink,
  removeAttachment
} from '~/modules/admin/actions'

//import { uniqueArrayByKey } from '~/utils/functions'

//import { Button, Input, Dropdown, TextArea, Checkbox } from 'formik-semantic-ui-fixed-validation'
//import { DateInput } from '~/components/custom-formik'
//import { PhoneNumber } from '~/modules/phoneNumber'
//import * as Yup from 'yup'

import { FormattedMessage, injectIntl } from 'react-intl'
//import styled from 'styled-components'

import { withToastManager } from 'react-toast-notifications'

//import { errorMessages } from '~/constants/yupValidation'

//import { getSafe, generateToastMarkup } from '~/utils/functions'
//import { Datagrid } from '~/modules/datagrid'
//import debounce from "lodash/debounce"
//import escapeRegExp from "lodash/escapeRegExp"
//import filter from "lodash/filter"


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
  console.log('!!!!!!!!!! AddEditEchoProduct mapStateToProps admin', admin)
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

    isLoading: false,
    config: admin.config[admin.currentTab.name],
    listDocumentTypes: admin.documentTypes,

    hazardClasses: admin.productsHazardClasses
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withToastManager(AddEditEchoProduct)))