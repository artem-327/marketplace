import React, { Component } from 'react'
import Router from 'next/router'
import { Form, Input, Checkbox, Radio, Dropdown, Button, TextArea } from 'formik-semantic-ui'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Modal, Icon, Segment, Dimmer, Loader, Container, Menu, Header, Divider, Grid, GridRow, GridColumn, Table, TableCell, TableHeaderCell, FormGroup, FormField, Accordion, Message, Label, Tab, Popup } from 'semantic-ui-react'
import styled from 'styled-components'
import * as val from 'yup'
import { DateInput } from '~/components/custom-formik'
import UploadLot from './upload/UploadLot'
import { FieldArray } from 'formik'
import { debounce } from 'lodash'
import confirm from '~/src/components/Confirmable/confirm'
import { AttachmentManager } from '~/modules/attachments'
import { generateToastMarkup } from '~/utils/functions'
import { errorMessages } from '~/constants/yupValidation'

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

const BottomUnpaddedRow = styled(GridRow)`
  padding-bottom: 0px !important;
`

const initValues = {
  additionalType: 'Unspecified',
  costs: [],
  doesExpire: false,
  inStock: true,
  lots: [],
  minimumRequirement: true,
  minimum: 1,
  multipleLots: false,
  pkgAmount: 1,
  priceTiers: 1,
  pricingTiers: [
    { price: 0.001, quantityFrom: 1 }
  ],
  product: '',
  processingTimeDays: 1,
  splits: 1,
  touchedLot: false,
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
    test: function(value) {
      const divisedBy = parseInt(this.resolve(ref))
      if (!divisedBy || isNaN(divisedBy))
        return false

      return !(value % divisedBy)
    }
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
  })),
  inStock: val.bool().required(errorMessages.requiredMessage),
  product: val.string().required(errorMessages.requiredMessage),
  processingTimeDays: val.number().required(errorMessages.requiredMessage),
  doesExpire: val.bool(),
  pkgAmount: val.number().typeError(errorMessages.mustBeNumber).nullable().moreThan(0, errorMessages.greaterThan(0)).required(errorMessages.requiredMessage),
  validityDate: val.string().matches(/[0-9]{4}\-[0-9]{2}\-[0-9]{2}/, { message: errorMessages.invalidDate }),
  lots: val.array().of(val.object().uniqueProperty('lotNumber', errorMessages.lotUnique).shape({
    lotNumber: val.string().nullable().required(errorMessages.requiredMessage),
    pkgAmount: val.number().nullable().moreThan(0, errorMessages.greaterThan(0)).required(errorMessages.requiredMessage),
    manufacturedDate: val.string().nullable().matches(/^([0-9]{4}\-[0-9]{2}\-[0-9]{2})?$/, { message: errorMessages.invalidDate }),
    expirationDate: val.string().nullable().matches(/^([0-9]{4}\-[0-9]{2}\-[0-9]{2})?$/, { message: errorMessages.invalidDate })
  })).nullable(),
  manufacturer: val.number().nullable().moreThan(0, 'Manufacturer value is invalid'),
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
    .required(errorMessages.requiredMessage)
})

class AddInventoryForm extends Component {

  state = {
    initialState: {

    },
    activeIndex: 0,
    activeTab: 0,
    searchedProducts: [],
    documents: [],
    openedDocuments: null
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

  getProcessingTimes = (max) => {
    let processingTimes = []

    for (let i = 1; i <= max; i++) {
      processingTimes.push({
        value: i,
        key: i,
        text: i + ' Day' + (i > 1 ? 's' : '')
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

  downloadAttachment = async (documentName, documentId) => {
    let downloadedFile = await this.props.downloadAttachment(documentId)
    const mimeType = this.getMimeType(documentName)

    const element = document.createElement('a')
    const file = new Blob([downloadedFile.value.data], { type: mimeType })
    let fileURL = URL.createObjectURL(file)

    element.href = fileURL
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

  onSplitsChange = debounce((value, values, setFieldValue) => {
    value = parseInt(value)
    const minimum = parseInt(values.minimum)

    this.handleQuantities(setFieldValue, values, value)

    if (isNaN(value) || isNaN(minimum))
      return false

    if (minimum !== value && ((minimum % value) !== 0)) {
      setFieldValue('minimum', value)
    }
  }, 500)

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

  renderEditDocuments = (values, setFieldValue) => {
    const { edit, removeAttachment, removeAttachmentLink } = this.props
    const { additional, attachments, lots } = values
    let { openedDocuments } = this.state
    if (typeof attachments === 'undefined' || !edit)
      return false

    let documents = attachments.concat(additional, lots.reduce(function (filtered, lot) {
      if (lot.attachments.length) {
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

    if (this.state.openedDocuments === null) {
      if (documents.length > 0) {
        this.setState({ openedDocuments: true })
      } else {
        this.setState({ openedDocuments: false })
      }
    }

    return (
      <>
        {this.state.openedDocuments ? (
          <Modal open={!!this.state.openedDocuments} onClose={() => this.setState({ openedDocuments: false })}>
            <Modal.Header><FormattedMessage id='addInventory.productOfferDocuments' defaultMessage='Product Offer has these documents' /></Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Table>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell><FormattedMessage id='addInventory.document' defaultMessage='Document' /></Table.HeaderCell>
                      <Table.HeaderCell><FormattedMessage id='addInventory.type' defaultMessage='Type' /></Table.HeaderCell>
                      <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {documents.map(document => (
                      <Table.Row key={document.id}>
                        <Table.Cell>{document.name}</Table.Cell>
                        <Table.Cell>{document.documentType.name}</Table.Cell>
                        <Table.Cell width={2} textAlign='right'>
                          <Icon name='download' size='large' style={{ cursor: 'pointer' }} onClick={() => this.downloadAttachment(document.name, document.id)} data-test='add_inventory_documents_download_btn' />
                          <Icon name='remove circle' size='large' style={{ cursor: 'pointer' }} onClick={() => this.removeAttachment(
                            document.lotId ? true : false, // isLot
                            document.name, // documentName
                            document.id, // documentId
                            document.lotId ? document.lotId : this.props.id, // connectedId
                            values,
                            setFieldValue
                          )}
                          data-test='add_inventory_documents_remove_btn'/>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={3} floated='right'>
                      <Button color='blue' floated='right' onClick={() => this.setState({ openedDocuments: false })} data-test='add_inventory_documents_ok_btn'><FormattedMessage id='global.ok' defaultMessage='Ok' /></Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        ) : null}
      </>
    )
  }

  renderPricingTiers = (count, setFieldValue) => {
    let tiers = []

    for (let i = 0; i < count; i++) {

      tiers.push(
        <GridRow>
          <TopMargedColumn computer={2}>
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
        </GridRow>
      )
    }

    return (
      <>
        <BottomUnpaddedRow>
          <GridColumn computer={2}><FormattedMessage id='addInventory.level' defaultMessage='Level' /></GridColumn>
          <GridColumn computer={1} />
          <GridColumn computer={6}><FormattedMessage id='global.quantity' defaultMessage='Quantity' /></GridColumn>
          <GridColumn computer={6}><FormattedMessage id='addInventory.fobPrice' defaultMessage='FOB Price' /></GridColumn>
        </BottomUnpaddedRow>
        {tiers}
      </>
    )
  }

  renderProductDetails = (values, validateForm) => {
    const {
      activeIndex
    } = this.state

    const { toastManager } = this.props

    return (
      <Grid className='product-details' centered>
        <CustomPaddedColumn>
          <Segment fluid
            attached={values.product ? false : 'top'}
            style={{ padding: '1.5em' }}>
            <Accordion>
              <Accordion.Title active={activeIndex === 0} index={0} onClick={this.accClick} data-test='add_inventory_documents_details_btn' >
                <Header as='h4'>

                  <FormattedMessage id='addInventory.productDetails' defaultMessage='PRODUCT DETAILS'>
                    {(message) => <>  <Icon name={activeIndex === 0 ? 'chevron down' : 'chevron right'} /> {message} </>}
                  </FormattedMessage>
                </Header>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <Grid columns={2} className='data-grid'>
                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.productName' defaultMessage='Product Name' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? values.product.productName : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.productNumber' defaultMessage='Product Number' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? values.product.productCode : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.measurement' defaultMessage='Measurement' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? values.product.packagingSize : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.um' defaultMessage='U/M' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.packagingUnit ? values.product.packagingUnit.name : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.up' defaultMessage='U/P' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.packagingType ? values.product.packagingType.name : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.casIndexName' defaultMessage='CAS Index Name' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.casProduct ? values.product.casProduct.casIndexName : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.casNumber' defaultMessage='CAS Number' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.casProduct ? values.product.casProduct.casNumber : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.masterProduct' defaultMessage='Master Product' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? !!values.product.masterProduct : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.chemicalName' defaultMessage='Chemical Name' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.casProduct ? values.product.casProduct.chemicalName : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.hazaardous' defaultMessage='Hazaardous' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.hazaardous ? !!values.product.hazaardous : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.unCode' defaultMessage='UN Code' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.unNumber ? values.product.unNumber.unNumberCode : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.packGrp' defaultMessage='Packaging Group' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product && values.product.packagingGroup ? values.product.packagingGroup.groupCode : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.hazaardousClass' defaultMessage='Hazaardous Class' /></GridColumn>
                  <GridColumn computer={8} mobile={16}><Label.Group color='blue'>{values.product && values.product.hazardClasses ? values.product.hazardClasses.map(hClass => { return (<Popup content={hClass.description} trigger={<Label>{hClass.classCode}</Label>} />) }) : ''}</Label.Group></GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.stackable' defaultMessage='Stackable' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? values.product.stackable : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.freightClass' defaultMessage='Freight Class' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? values.product.freightClass : ''}</GridColumn>

                  <GridColumn computer={8} mobile={16}><FormattedMessage id='addInventory.nmfcNumber' defaultMessage='NMFC Number' /></GridColumn>
                  <GridColumn computer={8} mobile={16}>{values.product ? values.product.nmfcNumber : ''}</GridColumn>
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
                    <FormattedMessage id='addInventory.cancel' defaultMessage='Cancel' /></Button>
                </ResponsiveColumn>
                <GridColumn computer={10} mobile={16}>
                  <Button.Submit fluid
                    size='big'
                    floated='right'
                    data-test='new_inventory_submit_btn'
                    onClick={(e, data = { data, validateForm }) => {
                      validateForm()
                        .then(r => {
                          // stop when errors found
                          if (Object.keys(r).length) {
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
                    style={{ paddingLeft: '1em', paddingRight: '1em' }}
                  >
                    <FormattedMessage id={this.props.edit ? 'addInventory.editButton' : 'addInventory.addButton'}
                      defaultMessage={this.props.edit ? 'Save Product Offer' : 'Add Product Offer'} />
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
      setFieldValue(`costs[${i}].costUom`, +(parseFloat(values.costs[i].cost) * (parseInt(values.costs[i].lot) > 0 ? parseFloat(values.lots[parseInt(values.costs[i].lot) - 1].pkgAmount) : (parseInt(values.costs[i].lot) < 0 ? 0 : values.lots.reduce((all, lot) => all + parseFloat(lot.pkgAmount), 0))).toFixed(3)))
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
    await this.props.resetForm()
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

  searchProducts = async (text) => {

    let searchedProducts = await this.props.getAutocompleteData({ searchUrl: `/prodex/api/products/own/search?pattern=${text}&onlyMapped=false` })
    let dropdownOptions = searchedProducts.value.map(p => {
      return {
        text: `${p.productCode ? p.productCode : ''} ${p.productName ? p.productName : ''}`,
        value: p,
        key: p.id,
        id: p.id,
        content: (
          <Header style={{ fontSize: '1em' }}>
            <Header.Content>
              {`${p.productCode ? p.productCode : ''} ${p.productName ? p.productName : ''}`}
              {this.renderCasProducts(p)}
            </Header.Content>
          </Header>
        )
      }
    })
    this.setState({ 'searchedProducts': dropdownOptions })
  }

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
      searchManufacturers,
      searchedManufacturers,
      searchedManufacturersLoading,
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

    const {
      //initialState,
      activeIndex
    } = this.state

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
            <Menu.Item>
              <AttachmentManager />
            </Menu.Item>
          </Menu>
        </div>

        <Form
          enableReinitialize
          validateOnChange={false}
          initialValues={{ ...initValues, ...initialState }}
          validationSchema={validationScheme}
          onSubmit={(values, actions) => {
            const reducer = (accumulator, currentValue) => accumulator + currentValue
            const formQty = parseInt(values.pkgAmount)
            const lotsQty = values.lots.length > 0 ? values.lots.map(l => parseInt(l.pkgAmount)).reduce(reducer) : formQty



            if (lotsQty !== formQty) {
              confirm(
                formatMessage({ id: 'confirm.quantityHeader', defaultMessage: 'Quantity Modified' }),
                formatMessage({
                  id: 'confirm.quantityMisconfiguration',
                  defaultMessage: 'You originally entered {formQty} as the quantity, but you have entered total quantity of {lotsQty} in Lots. Would you like to proceed? The total quantity will be adjusted according the Lot records.'
                },
                  {
                    formQty,
                    lotsQty
                  }
                )
              ).then(
                () => {
                  // confirm
                  actions.setSubmitting(false)
                  addProductOffer(values, this.props.edit)
                    .then((productOffer) => {
                      //Router.push('/inventory/my') xxx
                    })
                    .finally(() => {
                      // actions.resetForm()
                      actions.setSubmitting(false)
                    })
                },
                () => {
                  // cancel
                  actions.setSubmitting(false)
                }
              )
            } else {
              addProductOffer(values, this.props.edit)
                .then((productOffer) => {
                  //Router.push('/inventory/my') xxx
                  actions.resetForm()
                })
                .finally(() => {
                  actions.setSubmitting(false)
                })
            }
          }}
          className='flex stretched'
          style={{ padding: '20px' }}
        >
          {({ values, errors, setFieldValue, validateForm, validate, submitForm }) => {
            return (
              <>

                {this.renderEditDocuments(values, setFieldValue)}
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
                      <Button icon='add' labelPosition='right' onClick={this.resetForm} data-test='new_inventory_add_one_btn'>
                        <FormattedMessage id='addInventory.addAnotherOne' defaultMessage='Add another one' />
                      </Button>
                    )}
                    <Button primary icon='checkmark' labelPosition='right' onClick={this.goToList} data-test='new_inventory_go_btn'>
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
                              if (Object.keys(r).length) {
                                submitForm() // show errors
                                return false
                              }

                              // if validation is correct - switch tabs
                              this.switchTab(0, values, setFieldValue)
                            })
                            .catch(e => {
                              console.log('CATCH', e)
                            })
                        }}>
                          <FormattedMessage id='addInventory.productOffer' defaultMessage='PRODUCT OFFER' />
                        </Menu.Item>
                      ),
                      pane: (
                        <Tab.Pane style={{ padding: '0 32px' }}>
                          <Grid divided style={{ marginTop: '2rem' }}>
                            <Grid.Column width={5}>
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
                              <FormGroup>
                                <FormField width={10}>
                                  <Dropdown
                                    label={formatMessage({ id: 'addInventory.productSearch', defaultMessage: 'Product Search' })}
                                    name='product'
                                    options={this.state.searchedProducts}
                                    inputProps={{
                                      'data-test': 'new_inventory_product_search_drpdn',
                                      style: { width: '300px' },
                                      size: 'large',
                                      minCharacters: 3,
                                      icon: 'search',
                                      search: options => options,
                                      selection: true,
                                      clearable: true,
                                      loading: searchedProductsLoading,
                                      onSearchChange: (e, { searchQuery }) => searchQuery.length > 2 && this.searchProducts(searchQuery)
                                    }}
                                  />
                                </FormField>
                              </FormGroup>

                              <Header as='h3'><FormattedMessage id='addInventory.isInStock' defaultMessage='Is this product in stock?' /></Header>
                              <FormGroup inline>
                                <Radio fieldProps={{ width: 5 }} label={formatMessage({ id: 'global.no', defaultMessage: 'No' })} value={false} name='inStock' />
                                <Radio fieldProps={{ width: 5 }} label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })} value={true} name='inStock' />
                              </FormGroup>
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
                              <FormGroup>
                                <FormField width={10}>
                                  <Dropdown label='Processing Time' name='processingTimeDays' options={this.getProcessingTimes(14)}
                                            inputProps={{ 'data-test': 'new_inventory_processing_time_drpdn' }}
                                  />
                                </FormField>
                              </FormGroup>

                              <Header as='h3'>
                                <FormattedMessage id='addInventory.expiration' defaultMessage='Does this product expire?'>
                                  {(text) => (
                                    <>
                                      {text}
                                      <Popup
                                        content={<FormattedMessage id='addInventory.expirationDescription' defaultValue='If the product you are listing has an expiration then you are required to disclose that date. If you sell a product that is not represented correctly the buyer has the right to request a return of the order and the cost of shipping to/from will be the sellers responsibility.' />}
                                        trigger={<Icon name='info circle' color='blue' />}
                                        wide />
                                    </>
                                  )}
                                </FormattedMessage>
                              </Header>
                              <FormGroup inline>
                                <Radio fieldProps={{ width: 5 }} label={formatMessage({ id: 'global.no', defaultMessage: 'No' })} value={false} name='doesExpire' />
                                <Radio fieldProps={{ width: 5 }} label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })} value={true} name='doesExpire' />
                              </FormGroup>
                              <FormGroup>
                                <FormField width={10} data-test='add_inventory_product_expirationDate_inp' >
                                  <DateInput
                                    inputProps={{ disabled: !values.doesExpire }}
                                    label={formatMessage({ id: 'addInventory.expirationDate', defaultMessage: 'Expiration Date' })}
                                    name='validityDate' />
                                </FormField>
                              </FormGroup>

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
                              <FormGroup>
                                <FormField width={10}>
                                  <Dropdown
                                    label={formatMessage({ id: 'global.warehouse', defaultMessage: 'Warehouse' })}
                                    name='warehouse'
                                    options={warehousesList} inputProps={{
                                      selection: true,
                                      value: 0
                                    }}
                                    inputProps={{ 'data-test': 'new_inventory_warehouse_drpdn' }}/>
                                </FormField>
                              </FormGroup>

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
                              <FormGroup>
                                <FormField width={10} data-test='add_inventory_product_totalPackages_inp' >
                                  <Input
                                    label={formatMessage({ id: 'addInventory.totalPackages', defaultMessage: 'Total Packages' })}
                                    inputProps={{ type: 'number', min: 1 }}
                                    name='pkgAmount' />
                                </FormField>
                              </FormGroup>

                            </Grid.Column>
                            <GridColumn width={6}>
                              <Grid centered>
                                <GridColumn width={12}>
                                  <Grid>

                                    <GridRow>
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
                                    </GridRow>
                                    <GridRow>
                                      <GridColumn computer={8} tablet={16}>
                                        <Radio
                                          label={formatMessage({ id: 'global.no', defaultMessage: 'No' })}
                                          value={false}
                                          name='minimumRequirement'
                                          inputProps={{
                                            onClick: () => {
                                              setFieldValue('minimum', 1)
                                              setFieldValue('pricingTiers[0].quantityFrom', 1)
                                            }
                                          }} />
                                      </GridColumn>
                                      <GridColumn computer={8} tablet={16}>
                                        <Radio
                                          label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })}
                                          value={true}
                                          name='minimumRequirement' />
                                      </GridColumn>
                                    </GridRow>

                                    <GridRow>
                                      <GridColumn computer={8} tablet={16} data-test='add_inventory_product_minimumOQ_inp' >
                                        <Input
                                          label={formatMessage({ id: 'addInventory.minimumOQ', defaultMessage: 'Minimum OQ' })}
                                          name='minimum'
                                          inputProps={{
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
                                            onChange: (e, {value}) => this.onSplitsChange(value, values, setFieldValue)
                                          }} />
                                      </GridColumn>
                                    </GridRow>
                                    <GridRow>
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
                                    </GridRow>

                                    <GridRow>
                                      <GridColumn computer={16} tablet={16}>
                                        <Dropdown
                                          label={formatMessage({ id: 'addInventory.priceTiers', defaultMessage: 'Price Tiers' })}
                                          name='priceTiers'
                                          options={this.getPriceTiers(10)}
                                          inputProps={{
                                            'data-test': 'new_inventory_price_tiers_drpdn',
                                            fluid: true,
                                            onChange: (e, { value }) => setFieldValue(
                                              'pricingTiers',
                                              [
                                                ...values.pricingTiers.slice(0, value),
                                                ...[...new Array((value - values.priceTiers) > 0 ? value - values.priceTiers : 0)].map(t => ({ price: 0.001, quantityFrom: 1 }))
                                              ]
                                            )
                                          }}
                                        />
                                      </GridColumn>
                                    </GridRow>


                                    <GridRow>
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
                                    </GridRow>
                                    {/* <Grid> */}
                                    {this.renderPricingTiers(values.priceTiers, setFieldValue)}
                                    {/* </Grid> */}
                                    <GridRow>
                                      <GridColumn>
                                        <Divider />
                                      </GridColumn>
                                    </GridRow>

                                    <GridRow>
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
                                    </GridRow>

                                    <UploadLot {...this.props}
                                      attachments={values.attachments}
                                      name='attachments'
                                      type={2}
                                      fileMaxSize={20}
                                      onChange={(files) => setFieldValue(
                                        `attachments[${values.attachments && values.attachments.length ? values.attachments.length : 0}]`,
                                        {
                                          id: files.id,
                                          name: files.name
                                        }
                                      )}
                                      emptyContent={(
                                        <label>
                                          <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop ' + this.props.type + ' file here'} values={{ docType: this.props.type }} />
                                          <br />
                                          <FormattedMessage id='addInventory.dragDropOr' defaultMessage={'or select from computer'} />
                                        </label>
                                      )}
                                      uploadedContent={(
                                        <label>
                                          <FormattedMessage id='addInventory.dragDrop' defaultMessage={'Drag and drop ' + this.props.type + ' file here'} values={{ docType: this.props.type }} />
                                          <br />
                                          <FormattedMessage id='addInventory.dragDropOr' defaultMessage={'or select from computer'} />
                                        </label>
                                      )}
                                    />
                                    {/* </Segment> */}
                                  </Grid>
                                </GridColumn>
                              </Grid>
                            </GridColumn>

                            <GridColumn width={5}>
                              {this.renderProductDetails(values, validateForm)}
                            </GridColumn>
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
                              if (Object.keys(r).length) {
                                submitForm() // show errors
                                return false
                              }

                              // if validation is correct - switch tabs
                              this.switchTab(1, values, setFieldValue)
                            })
                            .catch(e => {
                              console.log('CATCH', e)
                            })
                        }}>
                          <FormattedMessage id='addInventory.optionalProductInfo' defaultMessage='OPTIONAL PRODUCT INFO' />
                        </Menu.Item>
                      ),
                      pane: (
                        <Tab.Pane style={{ padding: '0 32px' }}>
                          <Grid style={{ marginTop: '2rem' }}>
                            <GridColumn width={11}>
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
                                        onSearchChange: debounce((e, { searchQuery }) => searchOrigins(searchQuery), 500)
                                      }}
                                    />
                                  </FormField>
                                  <FormField width={16}>
                                    <Dropdown
                                      label={formatMessage({ id: 'addInventory.manufacturer', defaultMessage: 'Manufacturer' })}
                                      name='manufacturer'
                                      options={searchedManufacturers}
                                      inputProps={{
                                        'data-test': 'new_inventory_manufacturer_drpdn',
                                        size: 'large',
                                        minCharacters: 0,
                                        icon: 'search',
                                        search: true,
                                        selection: true,
                                        clearable: true,
                                        loading: searchedManufacturersLoading,
                                        onChange: (e, { value }) => { value ? console.log(value) : searchManufacturers('') },
                                        onSearchChange: debounce((e, { searchQuery }) => searchManufacturers(searchQuery), 500)
                                      }}
                                    />
                                  </FormField>
                                  <FormField width={16} data-test='add_inventory_product_tradeName_inp' >
                                    <Input
                                      label={formatMessage({ id: 'addInventory.tradeName', defaultMessage: 'Trade Name' })}
                                      name='tradeName'
                                      inputProps={{ type: 'text' }} />
                                  </FormField>
                                </GridColumn>
                                <GridColumn width={5}>
                                  <FormField width={16}>
                                    <Dropdown
                                      label={formatMessage({ id: 'addInventory.form', defaultMessage: 'Form' })}
                                      name='productForm'
                                      options={listForms}
                                      inputProps={{ 'data-test': 'new_inventory_form_drpdn' }}/>
                                  </FormField>
                                  <FormGroup>
                                    <FormField width={8}>
                                      <Dropdown
                                        label={formatMessage({ id: 'addInventory.condition', defaultMessage: 'Condition' })}
                                        name='productCondition'
                                        options={listConditions}
                                        inputProps={{ 'data-test': 'new_inventory_condition_drpdn' }}/>
                                    </FormField>
                                    <FormField width={8}>
                                      <Dropdown
                                        label={formatMessage({ id: 'addInventory.grade', defaultMessage: 'Grade' })}
                                        name='productGrade'
                                        options={listGrades}
                                        inputProps={{ 'data-test': 'new_inventory_grade_drpdn' }}/>
                                    </FormField>
                                  </FormGroup>
                                  <FormGroup>
                                    <FormField width={8} data-test='add_inventory_product_assayMin_inp' >
                                      <Input
                                        name='assayMin'
                                        label={formatMessage({ id: 'addInventory.assayMin', defaultMessage: 'Assay Min %' })}
                                        inputProps={{ type: 'number', step: '0.001', value: null }}
                                      />
                                    </FormField>
                                    <FormField width={8} data-test='add_inventory_product_assayMax_inp' >
                                      <Input
                                        name='assayMax'
                                        label={formatMessage({ id: 'addInventory.assayMax', defaultMessage: 'Assay Max %' })}
                                        inputProps={{ type: 'number', step: '0.001', value: null }} />
                                    </FormField>
                                  </FormGroup>
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
                                            <TableCell data-test={`add_inventory_product_lotNumber_${index}_inp`} ><Input name={`lots[${index}].lotNumber`} inputProps={{ onClick: () => setFieldValue('touchedLot', true) }} /></TableCell>
                                            <TableCell data-test={`add_inventory_product_pkgAmount_${index}_inp`} ><Input name={`lots[${index}].pkgAmount`} inputProps={{
                                              onClick: () => setFieldValue('touchedLot', true),
                                              onChange: (e, data) => this.modifyCosts(setFieldValue, {
                                                costs: values.costs,
                                                lots: values.lots.map((bLot, bIndex) => {
                                                  return {
                                                    pkgAmount: bIndex === index ? data.value : bLot.pkgAmount
                                                  }
                                                })
                                              })
                                            }} /></TableCell>
                                            <TableCell>0</TableCell>
                                            <TableCell>0</TableCell>
                                            <TableCell><DateInput name={`lots[${index}].manufacturedDate`} /></TableCell>
                                            <TableCell><DateInput name={`lots[${index}].expirationDate`} /></TableCell>
                                            <TableCell>
                                              <UploadLot {...this.props}
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
                                                    name: files.name
                                                  }
                                                )}
                                                emptyContent={(<FormattedMessage id='addInventory.clickUpload' defaultMessage='Click to upload' tagName='A' />)}
                                              />
                                            </TableCell>
                                            <TableCell><Icon name='trash alternate outline' size='large' onClick={() => this.removeLot(arrayHelpers, setFieldValue, { costs: values.costs, lots: values.lots }, index)}
                                                             data-test='add_inventory_removeLot_btn' /></TableCell>
                                          </Table.Row>
                                        )) : null
                                        }
                                      </Table.Body>
                                    </Table>
                                  </>
                                )}
                              />

                              <Header as='h3'><FormattedMessage id='addInventory.productCost' defaultMessage='PRODUCT COST' /></Header>
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
                                          name='trackSubCosts' />
                                      </FormField>
                                      <FormField width={5}>
                                        <Radio
                                          label={formatMessage({ id: 'global.no', defaultMessage: 'No' })}
                                          value={false}
                                          name='trackSubCosts' />
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

                                                          setFieldValue(`costs[${index}].costUom`, (count / parseFloat(values.costs[index].cost)).toFixed(3))
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

                                                    setFieldValue(`costs[${index}].costUom`, (count / parseFloat(value)).toFixed(3))
                                                  }
                                                }} /></FormField></TableCell>
                                                <TableCell width={3}><FormField width={16} data-test={`add_inventory_costUom_${index}_inp`}>
                                                  <Input name={`costs[${index}].costUom`} inputProps={{ type: 'text', step: '0.01', value: null, min: 0, disabled: true }} /></FormField></TableCell>
                                                <TableCell width={3}>
                                                  <UploadLot {...this.props}
                                                    attachments={values.costs[index].attachments}
                                                    name={`costs[${index}].attachments`}
                                                    type={3}
                                                    lot={false}
                                                    filesLimit={1}
                                                    fileMaxSize={20}
                                                    disabled={!values.trackSubCosts}
                                                    onChange={(files) => setFieldValue(
                                                      `costs[${index}].attachments[${values.costs[index].attachments && values.costs[index].attachments.length ? values.costs[index].attachments.length : 0}]`,
                                                      {
                                                        id: files.id,
                                                        name: files.name
                                                      }
                                                    )}
                                                    emptyContent={(
                                                      <FormattedMessage
                                                        id='addInventory.clickUpload'
                                                        defaultMessage={'Click to upload'}
                                                      />
                                                    )}
                                                  />
                                                </TableCell>
                                                <TableCell width={1}><Icon name='trash alternate outline' size='large' disabled={!values.trackSubCosts} onClick={() => arrayHelpers.remove(index)} /></TableCell>
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

                              <Header as='h3'><FormattedMessage id='addInventory.additionalDocs' defaultMessage='ADDITIONAL DOCUMENTS' /></Header>
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
                                        name: files.name
                                      }
                                    )}
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
                                    <Dropdown name={`additionalType`} options={listDocumentTypes} inputProps={{ 'data-test': 'new_inventory_doc_type_drpdn' }}/>
                                  </FormField>
                                </GridColumn>
                              </Grid>

                            </GridColumn>

                            <GridColumn width={5}>
                              {this.renderProductDetails(values, validateForm)}
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
