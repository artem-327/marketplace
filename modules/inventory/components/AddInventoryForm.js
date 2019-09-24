import React, { Component } from 'react'
import Router from 'next/router'
import { Form, Input, Checkbox, Radio, Dropdown, Button, TextArea } from 'formik-semantic-ui-fixed-validation'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Modal, Input as SemanticInput, Icon, Segment, Dimmer, Loader, Container, Menu, Header, Divider, Grid, GridRow, GridColumn, Table, TableCell, TableHeaderCell, FormGroup, FormField, Accordion, Message, Label, Tab, Popup, List, Dropdown as DropdownMenu } from 'semantic-ui-react'
import styled from 'styled-components'
import * as val from 'yup'
import { DateInput } from '~/components/custom-formik'
import UploadLot from './upload/UploadLot'
import { FieldArray } from 'formik'
import { debounce } from 'lodash'
import confirm from '~/src/components/Confirmable/confirm'
import { AttachmentManager } from '~/modules/attachments'
import { getSafe, generateToastMarkup } from '~/utils/functions'
import { errorMessages, dateValidation } from '~/constants/yupValidation'


const TopDivider = styled(Divider)`
  padding-bottom: 20px;
`

const CustomPaddedColumn = styled(GridColumn)`
  width: 75% !important;
  padding-top: 0px !important;
  
  @media only screen and (max-width: 1680px) {
    width: 100% !important;
  }
`

const CustomPaddedContent = styled(Accordion.Content)`
  padding-top: 15px !important;
`

const ResponsiveColumn = styled(GridColumn)`
  @media only screen and (max-device-width: 991px) {
    padding-bottom: 14px;
}
`

const TopMargedColumn = styled(GridColumn)`
  margin-top: 6px !important;
`

const TableCellBig = styled(TableCell)`
  @media (min-width: 768px) {
    width: 15%;
    max-width: 15%;
  }
`

const FileUploadDiv = styled.div`
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  > * {
    cursor: pointer;
  }
`

const TableCellSmall = styled(TableCell)`
  @media (min-width: 768px) {
    width: 10%;
    max-width: 10%;
  }
`

const TableCellMini = styled(TableCell)`
  @media (min-width: 768px) {
    width: 5%;
    max-width: 5%;
  }
`

const GridHeader = styled(Header)`
  padding-top: 10px !important;
  font-size: 1.142857em !important;
  font-weight: 500;
`

const InnerRow = styled(GridRow)`
  padding-top: 0 !important;
  padding-bottom: 1em !important;
  
  &.header {
    padding-top: calc(1rem -  0.14285714em) !important;
    
    h3.ui.header:first-child {
      margin-top: 0;
    }
    
    &:first-child h3.ui.header:first-child {
      margin-top: -0.14285714em;
    }
  }
  
  &.divider {
    padding-bottom: 0 !important;
  }
`

const initValues = {
  additionalType: 'Unspecified',
  additional: [],
  assayMin: '',
  assayMax: '',
  costs: [],
  doesExpire: false,
  inStock: true,
  lots: [{
    lotNumber: 'Lot #1',
    pkgAmount: 1,
    manufacturedDate: '',
    expirationDate: ''
  }],
  minimumRequirement: true,
  minimum: 1,
  multipleLots: false,
  origin: null,
  quantity: 1,
  priceTiers: 1,
  product: '',
  productCondition: null,
  productForm: null,
  productGrades: [],
  processingTimeDays: 1,
  processingTimeDW: 1,
  processingTimeNum: 1,
  splits: 1,
  touchedLot: false,
  tradeName: '',
  trackSubCosts: true,
  validityDate: '',
  warehouse: null
}

val.addMethod(val.object, 'uniqueProperty', function (propertyName, message) {
  return this.test('unique', message, function (value) {
    if (!value || !value[propertyName]) {
      return true
    }

    const { path } = this
    const options = [...this.parent]
    const currentIndex = options.indexOf(value)

    const subOptions = options.slice(0, currentIndex)

    if (subOptions.some((option) => option[propertyName] === value[propertyName])) {
      throw this.createError({
        path: `${path}.${propertyName}`,
        message,
      })
    }

    return true
  })
})

val.addMethod(val.number, 'divisibleBy', function (ref, message) {
  return this.test({
    name: 'divisibleBy',
    exclusive: false,
    message: message || '${path} must be divisible by ${reference}',
    params: {
      reference: ref.path
    },
    test: function (value) {
      const divisedBy = parseInt(this.resolve(ref))
      if (!divisedBy || isNaN(divisedBy))
        return false

      return !(value % divisedBy)
    }
  })
})

val.addMethod(val.string, 'minDateComparedTo', function (propertyName, message) {
  return this.test('minDateComparedTo', message, function (value) {
    const comparedDate = this.parent[propertyName]
    if (!value || !comparedDate) {
      return true
    }

    const valueInt = parseInt(value.split('-').join(''))
    const comparedInt = parseInt(comparedDate.split('-').join(''))
    if (valueInt < comparedInt) {
      return false
    }

    return true
  })
})

const validationScheme = val.object().shape({
  costs: val.array().of(val.object().shape({
    description: val.string(),
    lot: val.number().moreThan(-1, errorMessages.lotHasToBeSelected).required(errorMessages.requiredMessage),
    cost: val.number().nullable()
      .moreThan(0, errorMessages.greaterThan(0))
      .required(errorMessages.requiredMessage)
      .test('maxdec', errorMessages.maxDecimals(3), val => {
        return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
      })
      .typeError(errorMessages.requiredMessage)
  })),
  inStock: val.bool().required(errorMessages.requiredMessage),
  product: val.string().required(errorMessages.requiredMessage),
  processingTimeDays: val.number().required(errorMessages.requiredMessage),
  doesExpire: val.bool(),
  quantity: val.number().typeError(errorMessages.mustBeNumber).nullable().moreThan(0, errorMessages.greaterThan(0)).required(errorMessages.requiredMessage).integer(errorMessages.integer),
  validityDate: val.string().matches(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/, { message: errorMessages.invalidDate }),
  lots: val.array().of(val.object().uniqueProperty('lotNumber', errorMessages.lotUnique).shape({
    lotNumber: val.string().nullable().required(errorMessages.requiredMessage),
    pkgAmount: val
      .number()
      .nullable()
      .moreThan(0, errorMessages.greaterThan(0))
      .required(errorMessages.requiredMessage)
      .integer(errorMessages.integer)
      .typeError(errorMessages.mustBeNumber),
    manufacturedDate: dateValidation(false),
    expirationDate: dateValidation(false).concat(val.string().minDateComparedTo('manufacturedDate', '> than MFG Date'))
  })).nullable(),
  minimumRequirement: val.bool(),
  minimum: val.number().nullable().divisibleBy(val.ref('splits'), 'Value is not divisible by Splits').moreThan(0, errorMessages.greaterThan(0)),
  splits: val.number().nullable().moreThan(0, errorMessages.greaterThan(0)),
  origin: val.number().nullable().moreThan(0, errorMessages.invalidString),
  priceTiers: val.number(),
  pricingTiers: val.array().of(val.object().uniqueProperty('quantityFrom', 'Quantity has to be unique').shape({
    quantityFrom: val.number().typeError(errorMessages.mustBeNumber).nullable()
      .moreThan(0, errorMessages.greaterThan(0)).required(errorMessages.requiredMessage),
    price: val.number().typeError(errorMessages.mustBeNumber).nullable()
      .moreThan(0, errorMessages.greaterThan(0)).required(errorMessages.requiredMessage).test('maxdec', errorMessages.maxDecimals(3), val => {
        return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
      }),
    manuallyModified: val.number().min(0).max(1)
  })),
  touchedLot: val.bool(),
  warehouse: val.number(errorMessages.requiredMessage)
    .nullable(errorMessages.required)
    .moreThan(0, errorMessages.requiredMessage)
    .required(errorMessages.requiredMessage),
  assayMin: val.number().nullable().min(0, errorMessages.minimum(0)).max(100, errorMessages.maximum(100))
    .test('match', errorMessages.minUpToMax,
      function (assayMin) {
        return (typeof this.parent.assayMax === 'undefined') || (assayMin <= this.parent.assayMax)
      }),
  assayMax: val.number().nullable().min(0, errorMessages.minimum(0)).max(100, errorMessages.maximum(100))
    .test('match', errorMessages.maxAtLeastMin,
      function (assayMax) {
        return (typeof this.parent.assayMin === 'undefined') || (assayMax >= this.parent.assayMin)
      }),
})

// validation array
let tabs = []
// 1st tab
tabs.push(['inStock', 'product', 'processingTimeDays', 'doesExpire', 'pkgAmount', 'validityDate', 'minimumRequirement', 'minimum', 'splits', 'priceTiers', 'pricingTiers', 'warehouse'])
// 2nd tab
tabs.push(['costs', 'lots', 'origin', 'touchedLot'])
// 3rd tab
tabs.push([])

class AddInventoryForm extends Component {

  state = {
    initialState: {
    },
    activeIndex: 0,
    activeTab: 0,
    searchedProducts: [],
    documents: [],
    openedDocuments: null,
    columns: [
      { name: 'documentType', title: <FormattedMessage id='addInventory.documents.type' defaultMessage='Document Type'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'documentName', title: <FormattedMessage id='addInventory.documents.name' defaultMessage='Document Name'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'fileType', title: <FormattedMessage id='addInventory.documents.fileType' defaultMessage='File Type'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'expiration', title: <FormattedMessage id='addInventory.documents.expiration' defaultMessage='Expiration'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'info', title: <FormattedMessage id='addInventory.documents.info' defaultMessage='Info'>{(text) => text}</FormattedMessage>, width: 100 },
      { name: 'lotId', title: <FormattedMessage id='addInventory.documents.lotId' defaultMessage='Lot ID'>{(text) => text}</FormattedMessage>, width: 100 }
    ]
  }

  accClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  uploadedDocuments = (files) => {
    if (!this.state.documents) {
      this.setState({
        ...this.state,
        documents: files
      })
    } else {
      this.setState({
        ...this.state,
        documents: this.state.documents.concat(files)
      })
    }
  }

  getProcessingTimes = () => {
    let processingTimes = []

    for (let i = 1; i <= 10; i++) {
      processingTimes.push({
        value: i,
        key: i,
        text: i
      })
    }
    return processingTimes
  }

  getPriceTiers = (max) => {
    let priceTiers = []

    for (let i = 1; i <= max; i++) {
      priceTiers.push({
        value: i,
        key: i,
        text: i
      })
    }

    return priceTiers
  }

  switchTab = (newTab, values, setFieldValue) => {
    let lotAmount = values.lots.length === 0 ? parseInt(values.pkgAmount) : 0
    if (newTab === 1 && lotAmount > 0) {
      setFieldValue('lots[0].lotNumber', '1')
      setFieldValue('lots[0].pkgAmount', lotAmount)
      this.setState({
        activeTab: newTab
      })
    } else {
      this.setState({
        activeTab: newTab
      })
    }
  }

  getMimeType = (documentName) => {
    const documentExtension = documentName.substr(documentName.lastIndexOf('.') + 1)
    switch (documentExtension) {
      case 'doc':
        return 'application/msword'
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      case 'ppt':
        return 'application/vnd.ms-powerpoint'
      case 'pptx':
        return 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      case 'xls':
        return 'application/vnd.ms-excel'
      case 'xlsx':
        return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      case 'gif':
        return 'image/gif'
      case 'png':
        return 'image/png'
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg'
      case 'svg':
        return 'image/svg'
      case 'pdf':
        return 'application/pdf'
      case '7z':
        return 'application/x-7z-compressed'
      case 'zip':
        return 'application/zip'
      case 'tar':
        return 'application/x-tar'
      case 'rar':
        return 'application/x-rar-compressed'
      case 'xml':
        return 'application/xml'
      default:
        return 'text/plain'
    }
  }

  prepareLinkToAttachment = async (documentName, documentId) => {
    let downloadedFile = await this.props.downloadAttachment(documentId)
    const mimeType = this.getMimeType(documentName)

    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)

    element.href = fileURL
    return element
  }

  viewAttachment = async (documentName, documentId) => {
    const element = await this.prepareLinkToAttachment(documentName, documentId)

    element.target = '_blank'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  downloadAttachment = async (documentName, documentId) => {
    const element = await this.prepareLinkToAttachment(documentName, documentId)

    element.download = documentName
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  handleQuantities = (setFieldValue, values, splits, quantity = 0) => {
    // be sure that splits is integer and larger than 0
    splits = parseInt(splits)
    if (splits < 1 || isNaN(splits)) return false

    // correct quantity before anchor calculation
    if (quantity > 0) quantity -= splits

    const prices = values.pricingTiers

    for (let i = 0; i < prices.length; i++) {
      const qtyFrom = parseInt(prices[i].quantityFrom)

      // get level quantity (must be larger than previous level quantity)
      let anchor = Math.max(qtyFrom, ++quantity)
      if (!parseInt(values.pricingTiers[i].manuallyModified)) {
        // if not manually modified then change quantity value
        quantity = Math.ceil(anchor / splits) * splits
        setFieldValue(`pricingTiers[${i}].quantityFrom`, quantity)
      } else {
        // if manually modified or loaded from BE then do not change already set value - just remember largest anchor
        quantity = Math.max(qtyFrom, quantity)
      }
    }
  }

  onSplitsChange = debounce(async (value, values, setFieldValue, validateForm) => {
    value = parseInt(value)
    const minimum = parseInt(values.minimum)

    this.handleQuantities(setFieldValue, values, value)

    if (isNaN(value) || isNaN(minimum))
      return false

    if (values.minimumRequirement) {
      if (minimum !== value && ((minimum % value) !== 0)) {
        await setFieldValue('minimum', value)
      }
    } else {
      await setFieldValue('minimum', value)
    }
    validateForm()
  }, 250)

  attachDocuments = (newDocuments, values, setFieldValue) => {
    setFieldValue(`additional`, values.additional.concat(newDocuments))
  }

  removeAttachment = async (isLot, documentName, documentId, connectedId, values, setFieldValue) => {
    const { removeAttachment, removeAttachmentLink } = this.props
    await removeAttachmentLink(isLot, connectedId, documentId).then(() => removeAttachment(documentId))

    if (isLot) {
      const lotIndex = values.lots.findIndex(lot => lot.id === connectedId)
      let filteredAttachments = values.lots[lotIndex].attachments.reduce(function (filtered, attachment) {
        if (attachment.id !== documentId) {
          filtered.push(attachment)
        }
        return filtered
      }, [])
      setFieldValue(`lots[${lotIndex}].attachments`, filteredAttachments)
    } else {
      let filteredAttachments = values.attachments.reduce(function (filtered, attachment) {
        if (attachment.id !== documentId) {
          filtered.push(attachment)
        }
        return filtered
      }, [])
      setFieldValue(`attachments`, filteredAttachments)

      let filteredAdditional = values.additional.reduce(function (filtered, additional) {
        if (additional.id !== documentId) {
          filtered.push(additional)
        }
        return filtered
      }, [])
      setFieldValue(`additional`, filteredAdditional)
    }
  }

  getDocumentRows = (rows, lots) => {
    return rows.map(row => {
      const lastDot = row.name.lastIndexOf('.')
      return {
        //id: row.id,
        documentType: getSafe(() => row.documentType.name, null),
        documentName: row.name.substr(0, lastDot),
        fileType: row.name.substr(lastDot),
        expiration: getSafe(() => lots.find(lot => lot.id === row.lotId).expirationDate, (row.documentType.id === 1 ? 'N/A' : '')),
        info: '',
        lotId: row.lotId
      }
    })
  }

  renderEditDocuments = (values, setFieldValue, validateForm) => {
    const { edit, removeAttachment, removeAttachmentLink, intl: { formatMessage } } = this.props
    const { additional, attachments, lots } = values
    if (typeof attachments === 'undefined' || !edit)
      return false

    let documents = attachments.concat(additional, lots.reduce(function (filtered, lot) {

      if (lot.attachments && lot.attachments.length) {
        lot.attachments.map(attachment => {
          let lotAttachment = {
            ...attachment,
            lotId: lot.id
          }
          filtered.push(lotAttachment)
        })
      }
      return filtered
    }, []))

    return (
      <>
        <Grid>
          <GridColumn width={10}>
            <GridHeader as='h3'><FormattedMessage id='addInventory.productOfferDocuments' defaultMessage='Product Offer has these documents' /></GridHeader>
          </GridColumn>
          <GridColumn width={6} textAlign='right'>
            <AttachmentManager
              returnSelectedRows={(rows) => this.attachDocuments(rows, values, setFieldValue)}
              lockSelection={documents.map(doc => doc.id)}
            />
          </GridColumn>
        </Grid>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}></Table.HeaderCell>
              <Table.HeaderCell width={3}><FormattedMessage id='addInventory.documents.type' defaultMessage='Document Type' /></Table.HeaderCell>
              <Table.HeaderCell width={3}><FormattedMessage id='addInventory.documents.name' defaultMessage='Document Name' /></Table.HeaderCell>
              <Table.HeaderCell width={2}><FormattedMessage id='addInventory.documents.fileType' defaultMessage='File Type' /></Table.HeaderCell>
              <Table.HeaderCell width={2}><FormattedMessage id='addInventory.documents.expiration' defaultMessage='Expiration' /></Table.HeaderCell>
              <Table.HeaderCell width={5}></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {documents.map(document => {
              const lastDot = document.name.lastIndexOf('.')
              const canView = ['pdf', 'png', 'jpg', 'svg', 'gif'].includes(document.name.substr(lastDot + 1))
              return (
                <Table.Row key={document.id}>
                  <Table.Cell>
                    <DropdownMenu icon={<Icon name='ellipsis vertical' size='large' />}>
                      <DropdownMenu.Menu>
                        {canView ? (
                          <DropdownMenu.Item text={formatMessage({ id: 'addInventory.documents.view', defaultMessage: 'View' })} onClick={() => this.viewAttachment(document.name, document.id)} />
                        ) : null}
                        <DropdownMenu.Item text={formatMessage({ id: 'global.download', defaultMessage: 'Download' })} onClick={() => this.downloadAttachment(document.name, document.id)} />
                        <DropdownMenu.Item text={formatMessage({ id: 'global.delete', defaultMessage: 'Delete' })} onClick={() => confirm(
                          formatMessage({ id: 'confirm.deleteAttachment', defaultMessage: 'Delete Attachment' }),
                          formatMessage({ id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${document.name}?` }, { item: document.name })
                        ).then(() => {
                          this.removeAttachment(
                            document.lotId ? true : false, // isLot
                            document.name, // documentName
                            document.id, // documentId
                            document.lotId ? document.lotId : this.props.id, // connectedId
                            values,
                            setFieldValue
                          )
                        })} />
                      </DropdownMenu.Menu>
                    </DropdownMenu>
                  </Table.Cell>
                  <Table.Cell>{getSafe(() => document.documentType.name, null)}</Table.Cell>
                  <Table.Cell>{document.name.substr(0, lastDot)}</Table.Cell>
                  <Table.Cell>{document.name.substr(lastDot)}</Table.Cell>
                  <Table.Cell>{getSafe(() => values.lots.find(lot => lot.id === document.lotId).expirationDate, (document.documentType.id === 1 ? 'N/A' : ''))}</Table.Cell>
                  <Table.Cell width={5} textAlign='right'>
                    {document.linked ? null : (
                      <Popup content={<FormattedMessage id='addInventory.unlinked'
                        defaultMessage='The file will be attached to Product Offer after you click the Save button' />}
                        trigger={<Icon name='info circle'
                          size='large'
                          color='blue' />}
                      />
                    )}
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </>
    )
  }

  renderPricingTiers = (count, setFieldValue) => {
    let tiers = []

    for (let i = 0; i < count; i++) {

      tiers.push(
        <InnerRow key={i + 1}>
          <TopMargedColumn computer={2} textAlign='center'>
            <label name={`pricingTiers[${i}].level`}>{i + 1}</label>
          </TopMargedColumn>

          <TopMargedColumn computer={1}>
            <Icon name='greater than equal' />
          </TopMargedColumn>

          <GridColumn computer={6} data-test={`add_inventory_quantityFrom_${i}_inp`} >
            <Input name={`pricingTiers[${i}].quantityFrom`} inputProps={{ type: 'number', min: 1, value: null, onChange: () => setFieldValue(`pricingTiers[${i}].manuallyModified`, 1) }} />
          </GridColumn>

          <GridColumn computer={6} data-test={`add_inventory_price_${i}_inp`} >
            <Input name={`pricingTiers[${i}].price`} inputProps={{ type: 'number', step: '0.001', min: 0.001, value: null }} />
          </GridColumn>

          <GridColumn computer={1} data-test={`add_inventory_manuallyModified_${i}_inp`} >
            <Input name={`pricingTiers[%{i}].manuallyModified`} inputProps={{ type: 'hidden', value: 0 }} />
          </GridColumn>
        </InnerRow>
      )
    }

    return (
      <>
        <InnerRow key={0}>
          <GridColumn computer={2}><FormattedMessage id='addInventory.level' defaultMessage='Level' /></GridColumn>
          <GridColumn computer={1} />
          <GridColumn computer={6}><FormattedMessage id='global.quantity' defaultMessage='Quantity' /></GridColumn>
          <GridColumn computer={6}><FormattedMessage id='addInventory.fobPrice' defaultMessage='FOB Price' /></GridColumn>
        </InnerRow>
        {tiers}
      </>
    )
  }

  renderProductDetails = (values, validateForm, setFieldValue) => {
    const { activeIndex } = this.state

    const { autocompleteData, toastManager, intl: { formatMessage } } = this.props

    let defaultMessage = values.product ? 'N/A' : ''
    const blendMessage = formatMessage({ id: 'global.blend', defaultMessage: 'Blend' })
    let product = autocompleteData.find((el) => el.id === values.product)
    let casProducts = getSafe(() => product.echoProduct.elements, '')

    return (
      <Grid className='product-details' centered>
        <CustomPaddedColumn>
          <Segment
            attached={values.product ? false : 'top'}
            style={{ padding: '1.5em' }}>
            <Accordion>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.accClick} data-test='add_inventory_documents_details_btn'>
                <Header as='h4'>

                  <FormattedMessage id='addInventory.productDetails' defaultMessage='PRODUCT DETAILS'>
                    {(message) => <>  <Icon name={activeIndex === 0 ? 'chevron down' : 'chevron right'} /> {message} </>}
                  </FormattedMessage>
                </Header>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Grid columns={2} className='data-grid'>
                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.productName' defaultMessage='Product Name' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{getSafe(() => product.intProductName, defaultMessage)}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.productNumber' defaultMessage='Product Number' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{getSafe(() => product.intProductCode, defaultMessage)}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.measurement' defaultMessage='Measurement' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{getSafe(() => product.packagingSize, defaultMessage)}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.um' defaultMessage='U/M' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{getSafe(() => product.packagingUnit.name, defaultMessage)}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.up' defaultMessage='U/P' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{getSafe(() => product.packagingType.name, defaultMessage)}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.casIndexName' defaultMessage='CAS Index Name' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{casProducts && (casProducts.length > 1 ? (<Popup content={<List items={casProducts.map(cp => cp.casProduct.casIndexName)} />} trigger={<a>{blendMessage}</a>} />) : getSafe(() => casProducts[0].casProduct.casIndexName, defaultMessage))}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.casNumber' defaultMessage='CAS Number' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{casProducts && (casProducts.length > 1 ? (<Popup content={<List items={casProducts.map(cp => cp.casProduct.casNumber)} />} trigger={<a>{blendMessage}</a>} />) : getSafe(() => casProducts[0].casProduct.casNumber, defaultMessage))}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.masterProduct' defaultMessage='Master Product' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{getSafe(() => product.masterProduct.toString(), defaultMessage)}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.chemicalName' defaultMessage='Chemical Name' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{casProducts && (casProducts.length > 1 ? (<Popup content={<List items={casProducts.map(cp => cp.casProduct.chemicalName)} />} trigger={<a>{blendMessage}</a>} />) : getSafe(() => casProducts[0].casProduct.chemicalName, defaultMessage))}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.hazaardous' defaultMessage='Hazaardous' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && (getSafe(() => product.hazaardous.toString(), false) ? 'Yes' : 'No')}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.unCode' defaultMessage='UN Code' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{getSafe(() => product.echoProduct.unNumber.unNumberCode, defaultMessage)}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.packGrp' defaultMessage='Packaging Group' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{getSafe(() => product.echoProduct.packagingGroup.groupCode, defaultMessage)}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.hazaardousClass' defaultMessage='Hazaardous Class' /></GridColumn>
                  <GridColumn computer={8} mobile={16}><Label.Group color='blue'>{
                    getSafe(() => product.echoProduct.hazardClasses.length > 0, false)
                      ? product.echoProduct.hazardClasses.map(hClass => (<Popup content={hClass.description} trigger={<Label>{hClass.classCode}</Label>} />)) : defaultMessage}
                  </Label.Group>
                  </GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.stackable' defaultMessage='Stackable' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{getSafe(() => product.stackable) ? 'Yes' : 'No'}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.freightClass' defaultMessage='Freight Class' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{getSafe(() => product.freightClass, defaultMessage)}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.nmfcNumber' defaultMessage='NMFC Number' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{getSafe(() => product.nmfcNumber, defaultMessage)}</GridColumn>
                </Grid>
              </Accordion.Content>
            </Accordion>
          </Segment>
          {values.product ? '' : (
            <Message attached='bottom'>
              <Icon name='info circle outline' size='large' color='blue' />
              <FormattedMessage id='addInventory.fillToSearch' defaultMessage='Please search product to fill data above.' />
            </Message>
          )}

          <Segment className='segment-fixed'>
            <Grid verticalAlign='middle'>
              <GridRow>
                <ResponsiveColumn computer={6} mobile={16}>
                  <Button fluid size='big' floated='left' data-test='new_inventory_cancel_btn' onClick={() => this.goToList()}>
                    {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
                  </Button>

                </ResponsiveColumn>
                <GridColumn computer={10} mobile={16}>
                  <Button.Submit
                    fluid
                    size='big'
                    floated='right'
                    data-test='new_inventory_submit_btn'
                    onClick={(e, data = { data, validateForm }) => {
                      validateForm()
                        .then(r => {
                          // stop when errors found
                          if (Object.keys(r).length) {
                            if (Object.keys(r).some(r => tab1.includes(r))) {
                              this.switchTab(0, values, setFieldValue)
                            }
                            if (Object.keys(r).some(r => tab2.includes(r))) {
                              this.switchTab(1, values, setFieldValue)
                            }
                            toastManager.add(generateToastMarkup(
                              <FormattedMessage id='addInventory.invalidForm' defaultMessage='Form is invalid' />,
                              <FormattedMessage id='addInventory.fixErrorsBeforeSubmit' defaultMessage='There are errors on current tab. Please, fix them before submit.' />,
                            ), {
                              appearance: 'error'
                            })
                          }
                        }).catch(e => {
                          console.error('CATCH', e)
                        })
                    }}
                    style={{ paddingLeft: '1em', paddingRight: '1em' }}>

                    {formatMessage({
                      id: this.props.edit ? 'addInventory.editButton' : 'addInventory.addButton',
                      defaultMessage: this.props.edit ? 'Save Product Offer' : 'Add Product Offer'
                    })}
                  </Button.Submit>
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>
        </CustomPaddedColumn>
      </Grid>
    )
  }

  resetForm = () => {
    this.props.resetForm(initValues)
  }

  goToList = () => {
    this.resetForm()
    Router.push('/inventory/my')
  }

  modifyCosts = (setFieldValue, values) => {
    if (!values.costs.length)
      return true

    for (let i = 0; i < values.costs.length; i++) {
      setFieldValue(`costs[${i}].costUom`,
        +(
          parseFloat(values.costs[i].cost / values.packagingSize) /

          (parseInt(values.costs[i].lot) > 0 ?
            parseFloat(values.lots[parseInt(values.costs[i].lot) - 1].pkgAmount)
            :
            (parseInt(values.costs[i].lot) < 0 ?
              0
              :
              values.lots.reduce((all, lot) => all + parseFloat(lot.pkgAmount), 0)))
        ).toFixed(3))
    }
  }

  removeLot = (lotHelpers, setFieldValue, values, lotIndex) => {
    if (values.costs.length) {
      for (let i = 0; i < values.costs.length; i++) {
        // unset all cost rows if they are using only removed lot
        if (parseInt(values.costs[i].lot - 1) === lotIndex) {
          values.costs[i].lot = -1
          setFieldValue(`costs[${i}].lot`, -1)
        }
        // if used lot has higher index then it has to be moved down as one lot will be completely removed
        if (parseInt(values.costs[i].lot - 1) > lotIndex) {
          values.costs[i].lot = parseInt(values.costs[i].lot) - 1
          setFieldValue(`costs[${i}].lot`, parseInt(values.costs[i].lot))
        }
      }
    }

    // remove lot row
    lotHelpers.remove(lotIndex)
    values.lots = values.lots.filter((lot, index) => {
      return index !== lotIndex
    })

    // modify costs
    this.modifyCosts(setFieldValue, values)
  }

  componentWillMount = async () => {
    await this.props.resetForm(initValues)
  }

  componentDidMount = () => {
    const { initProductOfferEdit, edit } = this.props

    initProductOfferEdit(edit)
  }

  componentDidUpdate = (oldProps) => {
    // prepare state for searchedProducts when opened edit form
    if (!this.state.searchedProducts.length && !oldProps.searchedProducts.length && this.props.searchedProducts.length)
      this.setState({ 'searchedProducts': this.props.searchedProducts })
  }

  searchProducts = debounce((text) => {
    this.props.getAutocompleteData({ searchUrl: `/prodex/api/company-products/own/search?pattern=${text}&onlyMapped=false` })
  }, 250)

  renderCasProducts = (product) => {
    if (product.casProducts && product.casProducts.length) {
      const { casProducts } = product

      return (
        <>
          {casProducts.map(cp => {
            return (
              <Header.Subheader>{`${cp.casProduct.casNumber} ${cp.casProduct.chemicalName}`}</Header.Subheader>
            )
          })}
        </>
      )
    }
  }


  getCostUOM = (values, index, value) => {
    let count = parseInt(values.costs[index].lot)
      ? parseFloat(values.lots[parseInt(values.costs[index].lot) - 1].pkgAmount)
      : values.lots.reduce((all, lot) => all + parseFloat(lot.pkgAmount), 0)

    return (count / parseFloat(value)).toFixed(3)
  }


  render() {
    const {
      listDocumentTypes,
      listConditions,
      listForms,
      listGrades,
      searchOrigins,
      searchedOrigins,
      searchedOriginsLoading,
      searchedProductsLoading,
      warehousesList,
      addProductOffer,
      initialState,
      editProductOffer,
      uploadDocuments,
      loading,
      intl
    } = this.props

    let { formatMessage } = intl


    console.log({ initialState })
    return (
      <div id='page' className='flex stretched'>
        <Dimmer active={loading} inverted>
          <Loader inverted>
            <FormattedMessage id='global.loading' defaultMessage='Loading' />
          </Loader>
        </Dimmer>
        <div className='header-top' style={{ padding: '0 32px' }}>
          <Menu secondary>
            <Menu.Item header>
              <Header as='h1' size='medium'>
                <FormattedMessage id={this.props.edit ? 'addInventory.editInventory' : 'addInventory.addInventory'}
                  defaultMessage={this.props.edit ? 'EDIT INVENTORY' : 'ADD INVENTORY'} />
              </Header>
            </Menu.Item>
          </Menu>
        </div>

        <Form
          enableReinitialize={true}
          validateOnChange={false}
          initialValues={{ ...initValues, ...initialState }}
          validationSchema={validationScheme}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await addProductOffer(values, this.props.edit)
            } catch (e) { console.error(e) }
            finally { setSubmitting(false) }

          }}
          className='flex stretched'
          style={{ padding: '20px' }}
        >
          {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
            this.submitForm = submitForm

            return (
              <>
                <Modal open={this.props.poCreated} closeOnDimmerClick={false} size='tiny'>
                  <Modal.Header>
                    <FormattedMessage id={this.props.edit ? 'addInventory.editDone' : 'addInventory.addDone'}
                      defaultMessage={this.props.edit ? 'Product Offer was edited' : 'Product Offer was created'} />
                  </Modal.Header>
                  {this.props.edit ? '' : (
                    <Modal.Content>
                      <FormattedMessage id='addInventory.whatNow' defaultMessage='What now?' />
                    </Modal.Content>
                  )}
                  <Modal.Actions>
                    {this.props.edit ? '' : (
                      <Button onClick={this.resetForm} data-test='new_inventory_add_one_btn'>
                        <FormattedMessage id='addInventory.addAnotherOne' defaultMessage='Add another one'>{text => text}</FormattedMessage>
                      </Button>
                    )}
                    <Button primary onClick={this.goToList} data-test='new_inventory_go_btn'>
                      <FormattedMessage id='addInventory.goToMyInventory' defaultMessage='Go to My Inventory' />
                    </Button>
                  </Modal.Actions>
                </Modal>
                <div className='flex stretched'>
                  <Tab className='inventory tab-menu flex stretched' menu={{ secondary: true, pointing: true }} renderActiveOnly={false} activeIndex={this.state.activeTab} panes={[
                    {
                      menuItem: (
                        <Menu.Item key='productOffer' onClick={() => {
                          validateForm()
                            .then(r => {
                              // stop when errors found
                              if (Object.keys(r).length && Object.keys(r).some(r => tabs[this.state.activeTab].includes(r))) {
                                submitForm() // show errors
                                return false
                              }

                              // if validation is correct - switch tabs
                              this.switchTab(0, values, setFieldValue)
                            })
                            .catch(e => {
                              console.log('CATCH', e)
                            })
                        }}
                          data-test='new_inventory_productOffer'>
                          {formatMessage({ id: 'addInventory.productOffer', defaultMessage: 'PRODUCT OFFER' })}
                        </Menu.Item>
                      ),
                      pane: (
                        <Tab.Pane key='productOffer' style={{ padding: '0 32px' }}>
                          <Grid divided style={{ marginTop: '2rem', marginBottom: '2rem' }}>
                            <Grid.Row>
                              <Grid.Column computer={5} tablet={5} mobile={7}>
                                <Grid>
                                  <InnerRow className='header'>
                                    <GridColumn>
                                      <Header as='h3'>
                                        <FormattedMessage id='addInventory.whatToList' defaultMessage='What product do you want to list?'>
                                          {(text) =>
                                            <>
                                              {text}
                                              <Popup
                                                content={<>
                                                  <FormattedMessage
                                                    id='addInventory.enterProductInfo1'
                                                    defaultMessage='Enter any product name, product number, or trade name from your product catalog for the product offer that you would like to list. Once you do the data related to that product name/umber will populate in the right hand column.' />
                                                  <br /><br />
                                                  <FormattedMessage
                                                    id='addInventory.enterProductInfo2'
                                                    defaultMessage='If you do not see the product that you would like to list then check in Settings/Product Catalog that it is entered and mapped to a CAS Index Name/Number and then return to this page.' />
                                                  <br /><br />
                                                  <FormattedMessage
                                                    id='addInventory.enterProductInfo3'
                                                    defaultMessage='Entering a product name and number and mapping to a CAS Index Name and Number is required first before entering a product offer.' />
                                                </>
                                                }
                                                trigger={<Icon name='info circle' color='blue' />}
                                                wide />
                                            </>
                                          }

                                        </FormattedMessage>
                                      </Header>
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn width={10}>
                                      <Dropdown
                                        label={formatMessage({ id: 'addInventory.productSearch', defaultMessage: 'Product Search' })}
                                        name='product'
                                        options={this.props.autocompleteData.map((el) => ({
                                          key: el.id,
                                          text: `${getSafe(() => el.intProductCode, '')} ${getSafe(() => el.intProductName, '')}`,
                                          value: el.id
                                        }))}
                                        inputProps={{
                                          loading: this.props.autocompleteDataLoading,
                                          'data-test': 'new_inventory_product_search_drpdn',
                                          style: { width: '300px' },
                                          size: 'large',
                                          minCharacters: 3,
                                          icon: 'search',
                                          search: options => options,
                                          selection: true,
                                          clearable: true,
                                          onSearchChange: (e, { searchQuery }) => searchQuery.length > 2 && this.searchProducts(searchQuery)
                                        }}
                                      />
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow className='header'>
                                    <GridColumn>
                                      <Header as='h3'><FormattedMessage id='addInventory.isInStock' defaultMessage='Is this product in stock?' /></Header>
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn computer={5} tablet={8}>
                                      <Radio fieldProps={{ width: 5 }} label={formatMessage({ id: 'global.no', defaultMessage: 'No' })} value={false} name='inStock' data-test='add_inventory_instock_no_rad' />
                                    </GridColumn>
                                    <GridColumn computer={5} tablet={8}>
                                      <Radio fieldProps={{ width: 5 }} label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })} value={true} name='inStock' data-test='add_inventory_instock_yes_rad' />
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow className='header'>
                                    <GridColumn>
                                      <Header as='h3'>
                                        <FormattedMessage id='addInventory.pickupDays' defaultMessage='How many business days to pick up?'>{(text) => (
                                          <>
                                            {text}
                                            <Popup
                                              content={<FormattedMessage id='addInventory.pickupDays.description' defaultMessage='Processing Time is the number of business days from when an order is confirmed that it will take you to have your product offer ready for pick up at your designated warehouse. NOTE: Saturdays and Sundays do not count for Processing Time.' />}
                                              trigger={<Icon name='info circle' color='blue' />}
                                              wide />
                                          </>

                                        )}</FormattedMessage>

                                      </Header>
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn computer={5} tablet={8} mobile={16}>
                                      <Dropdown label='Processing Time' name='processingTimeDays' options={this.getProcessingTimes()}
                                        inputProps={{
                                          'data-test': 'new_inventory_processing_time_days_weeks_drpdn',
                                          onChange: (e, { value }) => {
                                            setFieldValue(`processingTimeDays`, value * values.processingTimeDW)
                                          }
                                        }}
                                      />
                                    </GridColumn>
                                    <GridColumn computer={5} tablet={8} mobile={16}>
                                      <Dropdown label='Days / Weeks' name='processingTimeDW' options={[{ value: 1, key: 1, text: 'Days' }, { value: 5, key: 5, text: 'Weeks' }]}
                                        inputProps={{
                                          'data-test': 'new_inventory_processing_time_value_drpdn',
                                          onChange: (e, { value }) => {
                                            setFieldValue(`processingTimeDays`, values.processingTimeNum * value)
                                          }
                                        }}
                                      />
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow className='header'>
                                    <GridColumn>
                                      <Header as='h3'>
                                        <FormattedMessage id='addInventory.expiration' defaultMessage='Does this offer expire?'>
                                          {(text) => (
                                            <>
                                              {text}
                                              <Popup
                                                content={<FormattedMessage id='addInventory.expirationDescription' defaultValue='If you would like to limit this pricing for a certain time period then enter the last date that you would like to make this offer available. After the date this product will not be available on the Marketplace until you adjust the date till into the future.' />}
                                                trigger={<Icon name='info circle' color='blue' />}
                                                wide />
                                            </>
                                          )}
                                        </FormattedMessage>
                                      </Header>
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn computer={5} tablet={8}>
                                      <Radio fieldProps={{ width: 5 }} label={formatMessage({ id: 'global.no', defaultMessage: 'No' })} value={false} name='doesExpire' data-test='add_inventory_expire_no_rad' />
                                    </GridColumn>
                                    <GridColumn computer={5} tablet={8}>
                                      <Radio fieldProps={{ width: 5 }} label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })} value={true} name='doesExpire' data-test='add_inventory_expire_yes_rad' />
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn computer={10} tablet={16}>
                                      <DateInput
                                        inputProps={{ disabled: !values.doesExpire, 'data-test': 'add_inventory_product_expirationDate_dtin' }}
                                        label={formatMessage({ id: 'addInventory.expirationDate', defaultMessage: 'Expiration Date' })}
                                        name='expirationDate' />
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow className='header'>
                                    <GridColumn>
                                      <Header as='h3'>
                                        <FormattedMessage id='addInventory.shipFrom.header' defaultMessage='Where will this product ship from?'>{(text) => (
                                          <>
                                            {text}
                                            <Popup
                                              content={<FormattedMessage id='addInventory.shipFrom.description' defaultMessage='Warehouse is the physical location where your product offer will be picked up after an order is accepted. If you do not see the warehouse you need to list then go to Settings/Warehouses and add the information there. If you do not have permissions to add a new Warehouse then contact your company Admin.' />}
                                              trigger={<Icon name='info circle' color='blue' />}
                                              wide />
                                          </>
                                        )}</FormattedMessage>
                                      </Header>
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn computer={10} tablet={16}>
                                      <Dropdown
                                        label={formatMessage({ id: 'global.warehouse', defaultMessage: 'Warehouse' })}
                                        name='warehouse'
                                        options={warehousesList}
                                        inputProps={{
                                          selection: true,
                                          value: 0,
                                          'data-test': 'new_inventory_warehouse_drpdn'
                                        }} />
                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow className='header'>
                                    <GridColumn>
                                      <Header as='h3'>
                                        <FormattedMessage id='addInventory.availablePackages' defaultMessage='How many packages are available?'>
                                          {(text) => (
                                            <>
                                              {text}
                                              <Popup content={<FormattedMessage id='addInventory.availablePackages.description' defaultMessage='Total packages represents the number of drums, totes, super sacks etc that you will be listing for this product offer. Your packaging type and measurement for this product offer will populate on the right panel as soon as you select a product name/number.' />}
                                                trigger={<Icon name='info circle' color='blue' />} />
                                            </>
                                          )}
                                        </FormattedMessage>
                                      </Header>

                                    </GridColumn>
                                  </InnerRow>
                                  <InnerRow>
                                    <GridColumn computer={10} tablet={16} data-test='add_inventory_product_totalPackages_inp'>
                                      <div style={{ marginBottom: '4px' }}><label><FormattedMessage id='addInventory.totalPackages' defaultMessage='Total Packages'>
                                        {text => (
                                          <>
                                            {text} {values.lots.length > 1 && (
                                              <Popup trigger={<Icon name='info circle' color='blue' />}
                                                content={
                                                  <FormattedMessage id='addInventory.multipleLots' defaultMessage='This value can not be edited as you have specified multiple lots.' />
                                                } />
                                            )}
                                          </>
                                        )}
                                      </FormattedMessage></label></div>
                                      <SemanticInput
                                        type='number'
                                        min='1'
                                        step='1'
                                        disabled={values.lots.length > 1}
                                        onChange={(_, { value }) => setFieldValue('lots[0].pkgAmount', value)}
                                        value={
                                          values.lots.length > 1
                                            ? values.lots.reduce((prev, curr) => parseInt(prev, 10) + parseInt(curr.pkgAmount), 0)
                                            : parseInt(values.lots[0].pkgAmount, 10)
                                        }
                                        name='quantity' />
                                    </GridColumn>
                                  </InnerRow>
                                </Grid>
                              </Grid.Column>
                              <GridColumn computer={6} tablet={6} mobile={8}>
                                <Grid centered>
                                  <GridColumn width={12}>
                                    <Grid>
                                      <InnerRow className='header'>
                                        <GridColumn>
                                          <Header as='h3'>
                                            <FormattedMessage id='addInventory.minimumOrderRequirement' defaultMessage='Is there any order minimum requirement?'>
                                              {(text) => (
                                                <>
                                                  {text}
                                                  <Popup content={<>
                                                    <FormattedMessage id='addInventory.minimumOrderRequirement.description1' defaultMessage='Minimum OQ is the minimum amount of packages you want to sell for any single order. If you want to sell no less than 10 drums for an order then enter 10. If you have no minimum order requirement then enter 1.' />
                                                    <br /> <br />
                                                    <FormattedMessage id='addInventory.minimumOrderRequirement.description2' defaultMessage='Splits is the multiples you are willing to accept for any single order. If you only want to sell multiples of 4 drums then enter 4. If you have no split requirements then enter 1.' /> </>}

                                                    trigger={<Icon name='info circle' color='blue' />}
                                                    wide />
                                                </>
                                              )}
                                            </FormattedMessage>
                                          </Header>
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow>
                                        <GridColumn computer={8} tablet={16}>
                                          <Radio
                                            label={formatMessage({ id: 'global.no', defaultMessage: 'No' })}
                                            value={false}
                                            name='minimumRequirement'
                                            inputProps={{
                                              onClick: () => {
                                                setFieldValue('minimum', values.splits)
                                                //setFieldValue('pricingTiers[0].quantityFrom', 1)
                                              }
                                            }}
                                            data-test='add_inventory_minimumRequirement_no_rad' />
                                        </GridColumn>
                                        <GridColumn computer={8} tablet={16}>
                                          <Radio
                                            label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })}
                                            value={true}
                                            name='minimumRequirement'
                                            data-test='add_inventory_minimumRequirement_yes_rad' />
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow>
                                        <GridColumn computer={8} tablet={16} data-test='add_inventory_product_minimumOQ_inp' >
                                          <Input
                                            label={formatMessage({ id: 'addInventory.minimumOQ', defaultMessage: 'Minimum OQ' })}
                                            name='minimum'
                                            inputProps={{
                                              disabled: !values.minimumRequirement,
                                              type: 'number',
                                              min: 1,
                                              onChange: (e, { value }) => {
                                                value = parseInt(value)
                                                if (value > 1 && !isNaN(value)) {
                                                  setFieldValue('minimumRequirement', true)
                                                  setFieldValue('pricingTiers[0].quantityFrom', value)
                                                  //this.handleQuantities(setFieldValue, values, values.splits, (data.value ? data.value : 0))
                                                }
                                              }
                                            }} />
                                        </GridColumn>

                                        <GridColumn computer={8} tablet={16} data-test='add_inventory_product_splits_inp' >
                                          <Input
                                            label={formatMessage({ id: 'addInventory.splits', defaultMessage: 'Splits' })}
                                            name='splits'
                                            inputProps={{
                                              type: 'number',
                                              min: 1,
                                              onChange: (e, { value }) => this.onSplitsChange(value, values, setFieldValue, validateForm)
                                            }} />
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow className='header'>
                                        <GridColumn>
                                          <Header as='h3'>
                                            <FormattedMessage id='addInventory.pricesCount' defaultMessage='How many price tiers would you like to offer?'>
                                              {(text) => (
                                                <>
                                                  {text}
                                                  <Popup content={<>
                                                    <FormattedMessage id='addInventory.pricesCount.description1' defaultMessage='Price Tiers allow you to set different prices related to total quantities ordered for a single product offer.' />
                                                    <br /> <br />
                                                    <FormattedMessage id='addInventory.pricesCount.description2' defaultMessage='Price Tiers allow you to set different prices related to total quantities ordered for a single product offer.' />
                                                    <br /> <br />
                                                    <FormattedMessage id='addInventory.pricesCount.description3' defaultMessage='Price Tiers allow you to set different prices related to total quantities ordered for a single product offer.' />
                                                  </>
                                                  }
                                                    trigger={<Icon name='info circle' color='blue' />}
                                                    wide />
                                                </>
                                              )}
                                            </FormattedMessage>
                                          </Header>
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow>
                                        <GridColumn computer={16} tablet={16}>
                                          <Dropdown
                                            label={formatMessage({ id: 'addInventory.priceTiers', defaultMessage: 'Price Tiers' })}
                                            name='priceTiers'
                                            options={this.getPriceTiers(10)}
                                            inputProps={{
                                              'data-test': 'new_inventory_price_tiers_drpdn',
                                              fluid: true,
                                              onChange: (e, { value }) => {
                                                let pricingTiers = values.pricingTiers.slice()
                                                let difference = value - pricingTiers.length
                                                if (difference < 0) pricingTiers.splice(pricingTiers.length - value)
                                                else for (let i = 0; i < difference; i++) pricingTiers.push({ price: 0.001, quantityFrom: 1 })
                                                setFieldValue('pricingTiers', pricingTiers)
                                              }
                                            }}
                                          />
                                        </GridColumn>
                                      </InnerRow>


                                      <InnerRow className='header'>
                                        <GridColumn>
                                          <Header as='h3'>
                                            <FormattedMessage id='addInventory.fobPrice.header' defaultMessage='What is the FOB price for each tier?'>
                                              {(text) => (
                                                <>
                                                  {text}
                                                  <Popup
                                                    content={
                                                      <FormattedMessage
                                                        id='addInventory.fobPrice.description'
                                                        defaultMessage='FOB stands for free on board and freight on board and designates that the buyer is responsible for shipping costs. It also represents that ownership and liability is passed from seller to the buyer when the good are loaded at the originating location.' />
                                                    }
                                                    trigger={<Icon name='info circle' color='blue' />}
                                                    wide />
                                                </>
                                              )}
                                            </FormattedMessage>
                                          </Header>
                                        </GridColumn>
                                      </InnerRow>
                                      {/* <Grid> */}
                                      {this.renderPricingTiers(values.priceTiers, setFieldValue)}
                                      {/* </Grid> */}
                                      <InnerRow className='divider'>
                                        <GridColumn>
                                          <Divider />
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow className='header'>
                                        <GridColumn>
                                          <Header as='h3'>
                                            <FormattedMessage id='addInventory.uploadSpecSheet.header' defaultMessage='Upload Spec Sheet'>
                                              {(text) => (
                                                <>
                                                  {text}
                                                  <Popup
                                                    content={
                                                      <>
                                                        <FormattedMessage id='addInventory.uploadSpecSheet.description1' defaultMessage='The Spec Sheet, also known as a Technical Data Sheet (TDS), is required for a product offer to broadcast to the marketplace.' />
                                                        <br /> <br />
                                                        <FormattedMessage id='addInventory.uploadSpecSheet.description2' defaultMessage='You can drag and drop a file from your computer or click on the box to search for the file as well.' />
                                                        <br /><br />
                                                        <FormattedMessage id='addInventory.uploadSpecSheet.description3' defaultMessage={`IMPORTANT! Your company name and contact information cannot be listed on this document and non compliance is against Echo's Terms and Conditions.`} />
                                                      </>
                                                    }
                                                    trigger={<Icon name='info circle' color='blue' />}
                                                    wide />
                                                </>
                                              )}
                                            </FormattedMessage>
                                          </Header>
                                        </GridColumn>
                                      </InnerRow>

                                      <InnerRow>
                                        <GridColumn>
                                          <UploadLot {...this.props}
                                            attachments={values.attachments}
                                            name='attachments'
                                            type={2}
                                            fileMaxSize={20}
                                            onChange={(files) => setFieldValue(
                                              `attachments[${values.attachments && values.attachments.length ? values.attachments.length : 0}]`,
                                              {
                                                id: files.id,
                                                name: files.name,
                                                documentType: files.documentType
                                              }
                                            )}
                                            data-test='new_inventory_attachments_drop'
                                            emptyContent={(
                                              <>
                                                {formatMessage({ id: 'addInventory.dragDrop' })}
                                                <br />
                                                <FormattedMessage id='addInventory.dragDropOr'
                                                  defaultMessage={'or {link} to select from computer'}
                                                  values={{
                                                    link: (
                                                      <a>
                                                        <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                                      </a>
                                                    )
                                                  }} />
                                              </>
                                            )}
                                            uploadedContent={(
                                              <label>
                                                <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop to add file here'} />
                                                <br />
                                                <FormattedMessage id='addInventory.dragDropOr'
                                                  defaultMessage={'or {link} to select from computer'}
                                                  values={{
                                                    link: (
                                                      <a>
                                                        <FormattedMessage id='global.clickHere' defaultMessage={'click here'} />
                                                      </a>
                                                    )
                                                  }} />
                                              </label>
                                            )}
                                          />
                                        </GridColumn>
                                      </InnerRow>
                                      {/* </Segment> */}
                                    </Grid>
                                  </GridColumn>
                                </Grid>
                              </GridColumn>

                              <GridColumn computer={5} tablet={5} mobile={16}>
                                {this.renderProductDetails(values, validateForm, setFieldValue)}
                              </GridColumn>
                            </Grid.Row>
                          </Grid>
                        </Tab.Pane>
                      )
                    },
                    {
                      menuItem: (
                        <Menu.Item key='productOptional' onClick={() => {
                          validateForm()
                            .then(r => {
                              // stop when errors found
                              if (Object.keys(r).length && Object.keys(r).some(r => tabs[this.state.activeTab].includes(r))) {
                                submitForm() // show errors
                                return false
                              }

                              // if validation is correct - switch tabs
                              this.switchTab(1, values, setFieldValue)
                            })
                            .catch(e => {
                              console.log('CATCH', e)
                            })
                        }}
                          data-test='new_inventory_productOptional'>
                          {formatMessage({ id: 'addInventory.optionalProductInfo', defaultMessage: 'OPTIONAL PRODUCT INFO' })}
                        </Menu.Item>
                      ),
                      pane: (
                        <Tab.Pane key='productOptional' style={{ padding: '0 32px' }}>
                          <Grid style={{ marginTop: '2rem' }}>
                            <GridColumn computer={11} tablet={11} mobile={16}>
                              <Grid columns={3} centered>
                                <GridColumn width={5} floated='left'>
                                  <FormField width={16}>
                                    <Dropdown
                                      label={formatMessage({ id: 'addInventory.origin', defaultMessage: 'Origin' })}
                                      name='origin'
                                      options={searchedOrigins}
                                      inputProps={{
                                        'data-test': 'new_inventory_origin_drpdn',
                                        size: 'large',
                                        minCharacters: 0,
                                        icon: 'search',
                                        search: true,
                                        selection: true,
                                        clearable: true,
                                        loading: searchedOriginsLoading,
                                        onChange: (e, { value }) => { value ? console.log(value) : searchOrigins('') },
                                        onSearchChange: debounce((e, { searchQuery }) => searchOrigins(searchQuery), 250)
                                      }}
                                    />
                                  </FormField>
                                  <FormField width={16} data-test='add_inventory_product_tradeName_inp' >
                                    <Input
                                      label={formatMessage({ id: 'addInventory.tradeName', defaultMessage: 'Trade Name' })}
                                      name='tradeName'
                                      inputProps={{ type: 'text' }} />
                                  </FormField>

                                  <FormGroup>
                                    <FormField width={8} data-test='add_inventory_product_assayMin_inp' >
                                      <Input
                                        name='assayMin'
                                        label={formatMessage({ id: 'addInventory.assayMin', defaultMessage: 'Assay Min %' })}
                                        inputProps={{ type: 'number', min: 0, step: '0.001', value: null }}
                                      />
                                    </FormField>
                                    <FormField width={8} data-test='add_inventory_product_assayMax_inp' >
                                      <Input
                                        name='assayMax'
                                        label={formatMessage({ id: 'addInventory.assayMax', defaultMessage: 'Assay Max %' })}
                                        inputProps={{ type: 'number', min: 0, step: '0.001', value: null }}
                                      />
                                    </FormField>
                                  </FormGroup>
                                </GridColumn>
                                <GridColumn width={5}>
                                  <FormField width={16}>
                                    <Dropdown
                                      label={formatMessage({ id: 'addInventory.form', defaultMessage: 'Form' })}
                                      name='productForm'
                                      options={listForms}
                                      inputProps={{ 'data-test': 'new_inventory_form_drpdn' }} />
                                  </FormField>

                                  <FormField width={16}>
                                    <Dropdown
                                      label={formatMessage({ id: 'addInventory.condition', defaultMessage: 'Condition' })}
                                      name='productCondition'
                                      options={listConditions}
                                      inputProps={{ 'data-test': 'new_inventory_condition_drpdn' }} />
                                  </FormField>
                                  
                                  <FormField width={16}>
                                    <Dropdown
                                      label={formatMessage({ id: 'addInventory.grade', defaultMessage: 'Grade' })}
                                      name='productGrades'
                                      options={listGrades}
                                      inputProps={{ 'data-test': 'new_inventory_grade_drpdn', selection: true, multiple: true }} />
                                  </FormField>
                                </GridColumn>
                                <GridColumn width={5} floated='right'>
                                  <FormField width={16}>
                                    <TextArea
                                      name='externalNotes'
                                      label={formatMessage({ id: 'addInventory.externalNotes', defaultMessage: 'External Notes' })}
                                    />
                                  </FormField>
                                  <FormField width={16}>
                                    <TextArea
                                      name='internalNotes'
                                      label={formatMessage({ id: 'addInventory.internalNotes', defaultMessage: 'Internal Notes' })}
                                    />
                                  </FormField>
                                </GridColumn>
                              </Grid>

                              <Divider />


                              <FieldArray
                                name='lots'
                                render={arrayHelpers => (
                                  <>
                                    <Message attached='top' className='header-table-fields'>
                                      <Button type='button' icon='plus' color='blue' size='small' floated='right' style={{ marginTop: '-0.5em' }} onClick={() => arrayHelpers.push({ lotNumber: null, pkgAmount: null, manufacturedDate: '', expirationDate: '' })}
                                        data-test='new_inventory_add_lot_btn'
                                      />
                                      <FormattedMessage id='addInventory.lotDetails.header' defaultMessage='Lot Details'>
                                        {(text) => (
                                          <>
                                            {text}
                                            <Popup
                                              content={
                                                <FormattedMessage id='addInventory.lotDetails.description' defaultMessage={`This is where you can track lot(s) that make up your product offer. For example if your product offer consists of three separate lots then hit the plus button to the right twice to add two more lots. Then enter the Lot # for each, the amount of packages that are associated to that lot within this product offer, the MFG date, the expiration date, and the associated Certificate of Analysis. This does not have to be completed when listing a product offer but it is required to designate lot info and CofA's within 48 hours of an order being shipped.`} />
                                              }
                                              trigger={<Icon name='info circle' color='blue' />}
                                              wide />
                                          </>
                                        )}
                                      </FormattedMessage>
                                    </Message>
                                    <Table attached='bottom' className='table-fields'>
                                      <Table.Header>
                                        <Table.Row>

                                          <Popup
                                            content={<FormattedMessage id='addInventory.whatIsTheLotNumber.description' defaultMessage='What is the lot number?' />}
                                            trigger={
                                              <TableHeaderCell><FormattedMessage id='addInventory.whatIsTheLotNumber.header' defaultMessage='#Lot' /></TableHeaderCell>
                                            } />

                                          <Popup
                                            content={<FormattedMessage id='addInventory.packagesInLot.description' defaultMessage='How many packages in this lot?' />}
                                            trigger={
                                              <TableHeaderCell><FormattedMessage id='addInventory.packagesInLot.header' defaultMessage='Total' /></TableHeaderCell>
                                            } />

                                          <TableHeaderCell><FormattedMessage id='addInventory.available' defaultMessage='Available' /></TableHeaderCell>
                                          <TableHeaderCell><FormattedMessage id='addInventory.allocated' defaultMessage='Allocated' /></TableHeaderCell>
                                          <Popup
                                            content={<FormattedMessage id='addInventory.mfg.description' defaultMessage='What is the MFG?' />}
                                            trigger={
                                              <TableHeaderCell><FormattedMessage id='addInventory.mfg.header' defaultMessage='MFG Date' /></TableHeaderCell>
                                            } />
                                          <Popup
                                            content={<FormattedMessage id='addInventory.expiration.description' defaultMessage='What is the expiration?' />}
                                            trigger={
                                              <TableHeaderCell><FormattedMessage id='addInventory.expiration.header' defaultMessage='Expiration Date' /></TableHeaderCell>
                                            } />

                                          <TableHeaderCell><FormattedMessage id='addInventory.cofA' defaultMessage='C of A' /></TableHeaderCell>
                                          <TableHeaderCell>&nbsp;</TableHeaderCell>
                                        </Table.Row>
                                      </Table.Header>
                                      <Table.Body>
                                        {values.lots && values.lots.length ? values.lots.map((lot, index) => (
                                          <Table.Row key={index}>
                                            <TableCellBig data-test={`add_inventory_product_lotNumber_${index}_inp`} ><Input name={`lots[${index}].lotNumber`} inputProps={{ onClick: () => setFieldValue('touchedLot', true) }} /></TableCellBig>
                                            <TableCellSmall data-test={`add_inventory_product_pkgAmount_${index}_inp`} ><Input name={`lots[${index}].pkgAmount`} inputProps={{
                                              type: 'number',
                                              min: '1',
                                              step: '1',
                                              onClick: () => setFieldValue('touchedLot', true),
                                              onChange: (e, { value }) => {
                                                let total = 0

                                                values.lots.forEach((lot, i) => {
                                                  if (i !== index) total += parseInt(value, 10)
                                                  else total += parseInt(lot.pkgAmount, 10)
                                                })

                                                // setFieldValue('quantity', total)
                                              },
                                            }} /></TableCellSmall>
                                            <TableCellSmall>0</TableCellSmall>
                                            <TableCellSmall>0</TableCellSmall>
                                            <TableCellBig><DateInput name={`lots[${index}].manufacturedDate`} inputProps={{ 'data-test': 'add_inventory_product_manufacturedDate_dtin' }} /></TableCellBig>
                                            <TableCellBig><DateInput name={`lots[${index}].expirationDate`} inputProps={{ 'data-test': 'add_inventory_product_expirationDate_dtin' }} /></TableCellBig>
                                            <TableCellBig>
                                              <AttachmentManager
                                                tableProps={{
                                                  defaultSelection: getSafe(() => values.lots[index].attachments.map((attachment) => attachment.index), [])
                                                }}
                                                trigger={
                                                  <FileUploadDiv>
                                                    {getSafe(() => `(${values.lots[index].attachments.length}) `)}
                                                    {getSafe(() => values.lots[index].attachments.map((attachment) => <label>{attachment.name}</label>),
                                                      <FormattedMessage id='addInventory.clickUpload' defaultMessage='Click to upload' />)}
                                                  </FileUploadDiv>
                                                }
                                                returnSelectedRows={(rows) => setFieldValue(`lots[${index}].attachments`, rows)} />
                                              {/* <UploadLot {...this.props}
                                                attachments={values.lots[index].attachments}
                                                name={`lots[${index}].attachments`}
                                                type={1}
                                                lot={true}
                                                filesLimit={1}
                                                fileMaxSize={20}
                                                onChange={(files) => setFieldValue(
                                                  `lots[${index}].attachments[${values.lots[index].attachments && values.lots[index].attachments.length ? values.lots[index].attachments.length : 0}]`,
                                                  {
                                                    id: files.id,
                                                    name: files.name,
                                                    documentType: files.documentType
                                                  }
                                                )}
                                                data-test={`add_inventory_lots_${index}_attachments`}
                                                emptyContent={(<FormattedMessage id='addInventory.clickUpload' defaultMessage='Click to upload' tagName='A' />)}
                                              /> */}
                                            </TableCellBig>
                                            <TableCellMini textAlign='center'>
                                              <Icon name='trash alternate outline' size='large' style={{ 'margin': 0 }}
                                                disabled={values.lots.length <= 1}
                                                onClick={() => values.lots.length > 1 &&
                                                  this.removeLot(arrayHelpers, setFieldValue, { costs: values.costs, lots: values.lots, packagingSize: values.product.packagingSize }, index)}
                                                data-test='add_inventory_removeLot_btn' /></TableCellMini>
                                          </Table.Row>
                                        )) : null
                                        }
                                      </Table.Body>
                                    </Table>
                                  </>
                                )}
                              />

                              <Header as='h3'><FormattedMessage id='addInventory.productCost' defaultMessage='Product Cost' /></Header>
                              <Grid>
                                <GridColumn width={4}>
                                  <FormField width={12} data-test='add_inventory_costUOM_inp' >
                                    <Input
                                      name='cost'
                                      label={formatMessage({ id: 'addInventory.costUOM', defaultMessage: 'Cost/UOM' })}
                                      inputProps={{ type: 'number', step: '0.01', value: null, min: 0 }} />
                                  </FormField>
                                  <FormField>
                                    <label><FormattedMessage id='addInventory.trackSubCosts' defaultMessage='Track Sub-Costs' /></label>
                                    <FormGroup>
                                      <FormField width={5}>
                                        <Radio
                                          label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })}
                                          value={true}
                                          name='trackSubCosts'
                                          data-test='add_inventory_trackSubCosts_yes_rad' />
                                      </FormField>
                                      <FormField width={5}>
                                        <Radio
                                          label={formatMessage({ id: 'global.no', defaultMessage: 'No' })}
                                          value={false}
                                          name='trackSubCosts'
                                          data-test='add_inventory_trackSubCosts_no_rad' />
                                      </FormField>
                                    </FormGroup>
                                  </FormField>
                                </GridColumn>
                                <GridColumn width={12}>
                                  <FieldArray name='costs'
                                    render={arrayHelpers => (
                                      <>
                                        <Message attached='top' className='header-table-fields'>
                                          <Button type='button' icon='plus' color='blue' size='small' disabled={!values.trackSubCosts} floated='right' style={{ marginTop: '-0.5em' }} onClick={() => arrayHelpers.push({ description: '', lot: 0, cost: null, costUom: null })}
                                            data-test='new_inventory_add_sub_cost_btn'
                                          />
                                          <FormattedMessage id='addInventory.subCostBreakdown' defaultMessage='Sub-Cost Breakdown' />
                                        </Message>
                                        <Table attached='bottom' className='table-fields'>
                                          <Table.Header>
                                            <Table.Row>
                                              <TableHeaderCell width={4}><FormattedMessage id='addInventory.description' defaultMessage='Description' /></TableHeaderCell>
                                              <TableHeaderCell width={2}><FormattedMessage id='addInventory.lot' defaultMessage='Lot' /></TableHeaderCell>
                                              <TableHeaderCell width={3}><FormattedMessage id='addInventory.cost' defaultMessage='Cost' /></TableHeaderCell>
                                              <TableHeaderCell width={3}><FormattedMessage id='addInventory.costUOM' defaultMessage='Cost/UOM' /></TableHeaderCell>
                                              <TableHeaderCell width={3}><FormattedMessage id='addInventory.attachment' defaultMessage='Attachment' /></TableHeaderCell>
                                              <TableHeaderCell width={1}>&nbsp;</TableHeaderCell>
                                            </Table.Row>
                                          </Table.Header>
                                          <Table.Body>
                                            {values.costs && values.costs.length ? values.costs.map((costRow, index) => (
                                              <Table.Row key={index}>
                                                <TableCell width={4}><FormField width={16} data-test={`add_inventory_trackSubCosts_${index}_inp`} >
                                                  <Input inputProps={{ disabled: !values.trackSubCosts }} name={`costs[${index}].description`} /></FormField></TableCell>
                                                <TableCell width={2}>
                                                  <FormField width={16}>
                                                    <Dropdown
                                                      name={`costs[${index}].lot`}
                                                      options={[{
                                                        key: 0,
                                                        text: 'All',
                                                        value: 0
                                                      }].concat(values.lots && values.lots.length ? values.lots.map((lot, index) => {
                                                        return {
                                                          key: index + 1,
                                                          text: lot.lotNumber,
                                                          value: index + 1
                                                        }
                                                      }) : [])
                                                      }
                                                      inputProps={{
                                                        'data-test': `new_inventory_cost_${index}_drpdn`,
                                                        onChange: (e, { value }) => {
                                                          let count = parseInt(value)
                                                            ? parseFloat(values.lots[value - 1].pkgAmount)
                                                            : values.lots.reduce((all, lot) => all + parseFloat(lot.pkgAmount), 0)

                                                          setFieldValue(`costs[${index}].costUom`, (parseFloat(values.costs[index].cost) / (count * values.product.packagingSize)).toFixed(3))
                                                        },
                                                        //setFieldValue(`costs[${index}].costUom`, this.getCostUOM(values, index, values.costs[index].cost)),
                                                        disabled: !values.trackSubCosts
                                                      }}
                                                    />
                                                  </FormField>
                                                </TableCell>
                                                <TableCell width={3}><FormField width={16} data-test={`add_inventory_cost_${index}_inp`} >
                                                  <Input name={`costs[${index}].cost`} inputProps={{
                                                    type: 'number', step: '1', value: null, min: 0, disabled: !values.trackSubCosts, onChange: (e, { value }) => {
                                                      let count = parseInt(values.costs[index].lot)
                                                        ? parseFloat(values.lots[parseInt(values.costs[index].lot) - 1].pkgAmount)
                                                        : values.lots.reduce((all, lot) => all + parseFloat(lot.pkgAmount), 0)

                                                      setFieldValue(`costs[${index}].costUom`, (parseFloat(value) / (count * values.product.packagingSize)).toFixed(3))
                                                    }
                                                  }} /></FormField></TableCell>
                                                <TableCell width={3}><FormField width={16} data-test={`add_inventory_costUom_${index}_inp`}>
                                                  <Input name={`costs[${index}].costUom`} inputProps={{ type: 'text', step: '0.01', value: null, min: 0, disabled: true }} /></FormField></TableCell>
                                                <TableCell width={3}>
                                                  <AttachmentManager
                                                    tableProps={{
                                                      singleSelection: true,
                                                      defaultSelection: getSafe(() => values.costs[index].attachments.map((attachment) => attachment.index), [])
                                                    }}
                                                    trigger={
                                                      <FileUploadDiv>
                                                        {getSafe(() => values.costs[index].attachments.map((attachment) => <label>{attachment.name}</label>),
                                                          <FormattedMessage id='addInventory.clickUpload' defaultMessage='Click to upload' />)}
                                                      </FileUploadDiv>
                                                    }
                                                    returnSelectedRows={(rows) =>
                                                      setFieldValue(`costs[${index}].attachments`, rows)}
                                                  />

                                                </TableCell>
                                                <TableCell width={1}><Icon name='trash alternate outline' size='large' disabled={!values.trackSubCosts} onClick={() => arrayHelpers.remove(index)}
                                                  data-test={`add_inventory_delete_${index}`} /></TableCell>
                                              </Table.Row>
                                            )) : null
                                            }
                                          </Table.Body>
                                        </Table>
                                      </>
                                    )}
                                  />
                                </GridColumn>
                              </Grid>

                            </GridColumn>

                            <GridColumn computer={5} tablet={5} mobile={16}>
                              {this.renderProductDetails(values, validateForm)}
                            </GridColumn>
                          </Grid>
                        </Tab.Pane>
                      )
                    },
                    {
                      menuItem: (
                        <Menu.Item key='productDocuments'
                          onClick={() => {
                            validateForm()
                              .then(r => {
                                // stop when errors found
                                if (Object.keys(r).length && Object.keys(r).some(r => tabs[this.state.activeTab].includes(r))) {
                                  submitForm() // show errors
                                  return false
                                }

                                // if validation is correct - switch tabs
                                this.switchTab(2, values, setFieldValue)
                              })
                              .catch(e => {
                                console.log('CATCH', e)
                              })
                          }}
                          data-test='new_inventory_productDocuments'>
                          {formatMessage({ id: 'addInventory.productDocuments', defaultMessage: 'DOCUMENTS' })}
                        </Menu.Item>
                      ),
                      pane: (
                        <Tab.Pane key='productDocuments' style={{ padding: '0 32px' }}>
                          <Grid style={{ marginTop: '2rem' }}>
                            <GridColumn computer={11} tablet={11} mobile={16}>
                              {this.renderEditDocuments(values, setFieldValue, validateForm)}
                              <Header as='h3'><FormattedMessage id='addInventory.additionalDocs' defaultMessage='Additional Documents' /></Header>
                              <Grid>
                                <GridColumn width={10}>
                                  <UploadLot {...this.props}
                                    attachments={values.additional}
                                    name='additional'
                                    type={values.additionalType}
                                    unspecifiedTypes={['Unspecified']}
                                    fileMaxSize={20}
                                    onChange={(files) => setFieldValue(
                                      `additional[${values.additional && values.additional.length ? values.additional.length : 0}]`,
                                      {
                                        id: files.id,
                                        name: files.name,
                                        documentType: files.documentType
                                      }
                                    )}
                                    data-test='add_inventory_additional_attachments'
                                    emptyContent={(
                                      <label>
                                        <FormattedMessage id='addInventory.dragDropAdditional' defaultMessage={'Drop additional documents here'} />
                                        <br />
                                        <FormattedMessage id='addInventory.dragDropOr' defaultMessage='or select from computer' />
                                      </label>
                                    )}
                                    uploadedContent={(
                                      <label>
                                        <FormattedMessage id='addInventory.dragDropAdditional' defaultMessage={'Drop additional documents here'} />
                                        <br />
                                        <FormattedMessage id='addInventory.dragDropOr' defaultMessage={'or select from computer'} />
                                      </label>
                                    )}
                                  />
                                </GridColumn>
                                <GridColumn width={5}>
                                  <FormField width={16}>
                                    <label>
                                      <FormattedMessage id='addInventory.documentType' defaultMessage={'Document Type'} />
                                    </label>
                                    <Dropdown name={`additionalType`} options={listDocumentTypes} inputProps={{ 'data-test': 'new_inventory_doc_type_drpdn' }} />
                                  </FormField>
                                </GridColumn>
                              </Grid>
                            </GridColumn>
                            <GridColumn computer={5} tablet={5} mobile={16}>
                              {this.renderProductDetails(values, validateForm, setFieldValue)}
                            </GridColumn>
                          </Grid>
                        </Tab.Pane>
                      )
                    }
                  ]} />
                </div>
              </>)
          }}

        </Form>
      </div>
    )
  }
}

export default injectIntl(AddInventoryForm)
