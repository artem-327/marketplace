import React from 'react'
import { connect } from 'react-redux'
import filter from 'lodash/filter'
import escapeRegExp from 'lodash/escapeRegExp'
import debounce from 'lodash/debounce'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import { withToastManager } from 'react-toast-notifications'
import { FormattedMessage, injectIntl } from 'react-intl'

import { Modal, Header, FormGroup, FormField, Search, Label, Icon, Accordion } from 'semantic-ui-react'
import { DateInput } from '~/components/custom-formik'
import { FieldArray } from 'formik'

import { generateToastMarkup, getSafe } from '~/utils/functions'

import {
  closePopup,
  getProductsCatalogRequest,
  handleSubmitProductEditPopup,
  handleSubmitProductAddPopup,
  newCasProductsIndex,
  removeCasProductsIndex,
  prepareSearchedCasProducts,
  searchCasProduct,
  searchUnNumber,
  getDocumentTypes,
  loadFile,
  addAttachment,
  removeAttachment,
  removeAttachmentLink,
  searchEchoProducts
} from '../../actions'
import { Form, Input, Button, Dropdown, TextArea, Checkbox } from 'formik-semantic-ui-fixed-validation'
import * as Yup from 'yup'
import './styles.scss'
import Router from 'next/router'
import styled from 'styled-components'


import { UnitOfPackaging } from '~/components/formatted-messages'

import { errorMessages } from '~/constants/yupValidation'

const AccordionHeader = styled(Header)`
  font-size: 18px;  
  font-weight: bolder;
  & > i {
    font-weight: bolder;
  } 
`

Yup.addMethod(Yup.object, 'uniqueProperty', function (propertyName, message) {
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

const formValidation = Yup.object().shape({
  productName: Yup.string().trim()
    .min(3, errorMessages.minLength(3))
    .required(errorMessages.requiredMessage),
  productCode: Yup.string().trim()
    .min(1, errorMessages.minLength(1))
    .required(errorMessages.requiredMessage),
  packagingSize: Yup.number(errorMessages.invalidNumber)
    .required(errorMessages.requiredMessage),
  packagingUnit: Yup.number(errorMessages.invalidNumber)
    .required(errorMessages.requiredMessage),
  packagingType: Yup.number(errorMessages.invalidNumber)
    .required(errorMessages.requiredMessage),
  nmfcNumber: Yup.number()
    .typeError(errorMessages.mustBeNumber)
    //.required(errorMessages.requiredMessage)
    .test('len', errorMessages.exactLength(5), val => val ? getSafe(() => val.toString().length, 0) === 5 : true),
  // casProducts: Yup.array().of(Yup.object().uniqueProperty('casProduct', errorMessages.unique('CAS Product')).shape({
  //   casProduct: Yup.number().nullable().typeError(errorMessages.invalidString),
  //   minimumConcentration: Yup.number().nullable().min(0).max(100),
  //   maximumConcentration: Yup.number().nullable().min(0).max(100)
  // })),
  hazardClass: Yup.array().of(Yup.number(errorMessages.requiredMessage)).nullable()//.required(errorMessages.requiredMessage),
  //packagingGroup: Yup.number()d
})

class ProductPopup extends React.Component {
  state = {
    advanced: false
  }
  componentDidMount() {
    this.props.getProductsCatalogRequest()

    if (this.props.documentTypes.length === 0)
      this.props.getDocumentTypes()

    if (this.props.popupValues && this.props.popupValues.casProducts.length) {
      this.props.prepareSearchedCasProducts(this.props.popupValues.casProducts)
    }
  }

  componentWillMount() {
    this.resetComponent()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.popupValues && nextProps.popupValues.packagingUnit) {
      this.filterPackagingTypes(nextProps.popupValues.packagingUnit, nextProps.unitsAll, nextProps.packagingTypesAll)
    }
    else this.setState({ packagingTypesReduced: nextProps.packagingType })
  }

  filterPackagingTypes(id, unitsAll, packagingTypesAll) {
    if (!unitsAll) return
    const unit = unitsAll.find(unit => unit.id === id)
    if (!unit) return
    const measureType = unit.measureType
    if (!measureType) return

    const packagingTypesReduced = packagingTypesAll.filter(p => p.measureType && p.measureType.id === measureType.id)

    this.setState({
      packagingTypesReduced: packagingTypesReduced.map((type, id) => {
        return {
          key: id,
          text: <UnitOfPackaging value={type.name} />,
          value: type.id
        }
      })
    })
  }

  handleUnitChange(id, unitsAll, packagingTypesAll) {
    this.filterPackagingTypes(id, unitsAll, packagingTypesAll)
  }

  handlerSubmit = async (values, actions) => {
    const { popupValues, reloadFilter, handleSubmitProductEditPopup, handleSubmitProductAddPopup, toastManager } = this.props

    let payload = {
      ...values,
      packagingSizeFormatted: null,
      packagingTypeName: null,
      nmfcNumber: values.nmfcNumber !== '' ? parseInt(values.nmfcNumber) : null,
      hazardClasses: values.hazardClass,
      casProducts: values.casProducts ? values.casProducts.reduce(function (filtered, option) {
        if (option.casProduct) {
          filtered.push({
            casProduct: option.casProduct,
            minimumConcentration: parseInt(option.minimumConcentration),
            maximumConcentration: parseInt(option.maximumConcentration)
          })
        }
        return filtered
      }, []) : [],
      unNumber: this.state.unNumber ? this.state.unNumber.id :
        getSafe(() => popupValues.unNumber.id, null),
    }

    try {
      if (popupValues) {
        await handleSubmitProductEditPopup(payload, popupValues.id, reloadFilter)
      } else {
        await handleSubmitProductAddPopup(payload, reloadFilter)
      }
      let status = popupValues ? 'productUpdated' : 'productCreated'

      toastManager.add(generateToastMarkup(
        <FormattedMessage id={`notifications.${status}.header`} />,
        <FormattedMessage id={`notifications.${status}.content`} values={{ name: values.productName }} />,
      ), { appearance: 'success' })
    } catch (e) { console.error(e) }
    finally {
      actions.setSubmitting(false)
    }



  }

  handleCasProduct = () => {
    return this.props.productsCatalogRows.map(e => ({
      casProduct: e.casProduct
    }))
  }

  resetComponent = () => {
    const { popupValues } = this.props
    this.setState({
      isLoading: false,
      isUnLoading: false,
      results: [],
      value: (popupValues && popupValues.casProduct) || '',
      unNumber: null,
      selectedList: []
    })
  }

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result, selectedList: [result].concat(this.state.selectedList) })
  }

  handleSearchChange = debounce(searchQuery => {
    this.setState({ isLoading: true, value: searchQuery })

    this.props.searchEchoProducts(searchQuery)

    // setTimeout(() => {
    //   const re = new RegExp(escapeRegExp(this.state.value), 'i')
    //   const isMatch = result => re.test(result.casProduct)

    //   this.setState({
    //     isLoading: false,
    //     results: filter(this.handleCasProduct(), isMatch)
    //   })
    // }, 250)
  }, 500)

  handleSearchUnNumber = debounce((e, { value }) => {
    this.setState({ isUnLoading: true, unNumber: value })

    this.props.searchUnNumber(value)

    setTimeout(() => {
      const re = new RegExp(escapeRegExp(this.state.unNumber), 'i')
      const isMatch = result => re.test(result.unNumberCode)

      this.setState({
        isUnLoading: false,
        unNumbers: filter(this.handleUnNumber(), isMatch)
      })
    }, 300)
  }, 500)

  handleUnNumber = () => {
    return this.props.searchedUnNumbers.map(unNumber => ({
      unNumberCode: unNumber.unNumberCode
    }))
  }

  handleUnNumberSelect = (e, { result }) => {
    this.setState({ unNumber: result })
  }

  getInitialFormValues = () => {
    const { popupValues } = this.props
    let initialValues = {
      // attachments: [],
      // casProducts: [{ casProduct: undefined, minimumConcentration: 100, maximumConcentration: 100 }],
      // description: '',
      freightClass: null,
      // hazardClass: [],
      // hazardous: false,
      nmfcNumber: undefined,
      productName: '',
      productCode: '',
      packagingGroup: null,
      stackable: false,
      packagingUnit: '',
      packagingSize: getSafe(() => popupValues.packagingSize, 'N/A') === 'N/A' ? undefined : popupValues.packagingSize,
      packagingType: getSafe(() => popupValues.packagingType, 'N/A') === 'N/A' ? undefined : popupValues.packagingType,
      unit: getSafe(() => popupValues.unit, 'N/A') === 'N/A' ? undefined : popupValues.unit
    }

    return initialValues
  }

  render() {
    const {
      closePopup,
      packagingType,
      productsUnitsType,
      popupValues,
      freightClasses,
      hazardClasses,
      packagingGroups,
      intl: { formatMessage },
      echoProducts,
      echoProductsFetching
    } = this.props

    const { isLoading, isUnLoading, results, value, packagingTypesReduced } = this.state
    const title = <FormattedMessage id={`global.${popupValues ? 'edit' : 'add'}`} defaultMessage={`${popupValues ? 'Edit' : 'Add'}`} />
    const casProduct = popupValues && popupValues.casProduct ? popupValues.casProduct : null
    const unNumber = popupValues && popupValues.unNumber ? popupValues.unNumber : null
    const searchedCasProducts = this.props.searchedCasProducts && this.props.searchedCasProducts.length ? this.props.searchedCasProducts : (casProduct ? [casProduct] : [])
    const searchedUnNumbers = this.props.searchedUnNumbers && this.props.searchedUnNumbers.length ? this.props.searchedUnNumbers : (unNumber ? [unNumber] : [])

    return (
      <Modal size='small' open centered={false}>
        <Modal.Header>{title} <FormattedMessage id='global.product' defaultMessage='Product' /></Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={this.handlerSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
                <>
                  <Dropdown
                    label={<FormattedMessage id='settings.associatedEchoProducts' defaultMessage='What is the Associated External Product that you would like to map to?' />}
                    options={echoProducts.map((echo) => ({
                      key: echo.id,
                      text: echo.name,
                      value: echo.id
                    }))}
                    inputProps={{
                      fluid: true, search: true,
                      clearable: true, selection: true,
                      loading: echoProductsFetching,
                      onSearchChange: (_, { searchQuery }) => this.handleSearchChange(searchQuery)
                    }}
                    name='echoProduct'
                  />
                  <FormGroup widths='equal' data-test='settings_product_popup_nameCodeInci_inp'>
                    <Input type='text' label={formatMessage({ id: 'global.productName', defaultMessage: 'Product Name' })} name='productName' />
                    <Input type='text' label={formatMessage({ id: 'global.productNumber', defaultMessage: 'Product Number' })} name='productCode' />
                    {/* <Input type='text' label={formatMessage({ id: 'global.inciName', defaultMessage: 'INCI Name' })} name='inciName' /> */}
                  </FormGroup>

                  <FormGroup data-test='settings_product_popup_packagingSize_inp'>
                    <Input
                      fieldProps={{
                        width: 4
                      }}
                      type='text' label={formatMessage({ id: 'global.packagingSize', defaultMessage: 'Packaging Size' })} name='packagingSize' />
                    <Dropdown
                      fieldProps={{
                        width: 6
                      }}
                      label={formatMessage({ id: 'global.unit', defaultMessage: 'Unit' })}
                      name='packagingUnit'
                      options={productsUnitsType}
                      inputProps={{
                        'data-test': 'settings_product_popup_packagingUnit_drpdn',
                        onChange: (e, d) => {
                          setFieldValue('packagingType', '')
                          this.handleUnitChange(d.value, this.props.unitsAll, this.props.packagingTypesAll)
                        }
                      }}
                    />
                    <Dropdown
                      fieldProps={{
                        width: 6
                      }}
                      label={formatMessage({ id: 'global.packagingType', defaultMessage: 'Packaging Type' })}
                      name='packagingType'
                      options={packagingTypesReduced}
                      inputProps={{ 'data-test': 'settings_product_popup_packagingType_drpdn' }}
                    />
                  </FormGroup>

                  <Accordion>
                    <Accordion.Title active={this.state.advanced} onClick={() => this.setState((s) => ({ ...s, advanced: !s.advanced }))}>
                      <AccordionHeader as='h4'>
                        <Icon color={this.state.advanced ? 'blue' : 'black'} name={this.state.advanced ? 'chevron down' : 'chevron right'} />
                        <FormattedMessage id='global.advanced' defaultMessage='Advanced'>
                          {text => text}
                        </FormattedMessage>
                      </AccordionHeader>
                    </Accordion.Title>

                    <Accordion.Content active={this.state.advanced}>
                      <FormGroup widths='equal'>
                        <Input
                          label={formatMessage({ id: 'global.nmfcCode', defaultMessage: 'NMFC Code' })}
                          type='number'
                          name='nmfcNumber'
                        />
                        <Dropdown
                          label={formatMessage({ id: 'global.freightClass', defaultMessage: 'Freight Class' })}
                          name='freightClass'
                          options={freightClasses}
                          inputProps={{ 'data-test': 'settings_product_popup_freightClass_drpdn' }}
                        />
                      </FormGroup>

                      <FormGroup widths='equal'>
                        <Input
                          label={<FormattedMessage id='global.' defaultMessage='Manufacturer Product Name' />}
                          name='mfrProductName'
                        />

                        <Input
                          label={<FormattedMessage id='global.' defaultMessage='Manufacturer Product Code' />}
                          name='mfrProductCode'
                        />
                      </FormGroup>

                      <Checkbox
                        label={formatMessage({ id: 'global.stackable', defaultMessage: 'Stackable' })}
                        name='stackable'
                        inputProps={{ 'data-test': 'settings_product_popup_stackable_chckb' }}
                      />


                    </Accordion.Content>
                  </Accordion>



                  {/* <FormGroup style={{ alignItems: 'flex-end', marginBottom: '0' }}> */}
                  {/* <FormField width={8}>
                  <label><FormattedMessage id='settings.associatedEchoProducts' defaultMessage='What is the Associated External Product that you would like to map to?' /></label>
                </FormField> */}
                  {/* <FormField width={3}>
                    <label><FormattedMessage id='settings.minConcetration' defaultMessage='Min Concentration' /></label>
                  </FormField>
                  <FormField width={3}>
                    <label><FormattedMessage id='settings.maxConcetration' defaultMessage='Max Concentration' /></label>
                  </FormField>
                </FormGroup> */}


                  {/* <FieldArray name='casProducts'
                  render={arrayHelpers => (
                    <>
                      {values.casProducts && values.casProducts.length ? values.casProducts.map((casProduct, index) => (
                        <FormGroup key={index}>
                          <FormField width={8}>
                            <Dropdown name={`casProducts[${index}].casProduct`}
                              // options={searchedCasProducts.length > index ? searchedCasProducts[index].map(item => {
                              //   return {
                              //     key: item.id,
                              //     id: item.id,
                              //     text: item.casNumber + ' ' + item.chemicalName,
                              //     value: item.id,
                              //     content: <Header content={item.casNumber} subheader={item.chemicalName} style={{ fontSize: '1em' }} />
                              //   }
                              // }) : []}
                              options={echoProducts.map((echo) => ({
                                key: echo.id,
                                text: echo.name,
                                value: echo.id
                              }))}
                              inputProps={{
                                'data-test': `settings_product_popup_cas_${index}_drpdn`,
                                size: 'large',
                                minCharacters: 3,
                                icon: 'search',
                                search: options => options,
                                selection: true,
                                clearable: true,
                                loading: echoProductsFetching,
                                //onResultSelect: this.handleResultSelect,
                                onSearchChange: this.handleSearchChange,
                                dataindex: index
                              }}
                              defaultValue={casProduct && casProduct.casNumber ? casProduct.casNumber : ''}
                            />
                          </FormField>
                          <FormField width={3} data-test='settings_product_popup_minimumConcentration_inp'>
                            <Input type='text' name={`casProducts[${index}].minimumConcentration`} />
                          </FormField>
                          <FormField width={3} data-test='settings_product_popup_maximumConcentration_inp'>
                            <Input type='text' name={`casProducts[${index}].maximumConcentration`} />
                          </FormField>
                          <FormField width={2}>
                            {index ? (
                              <Button basic icon onClick={() => {
                                arrayHelpers.remove(index)
                                this.props.removeCasProductsIndex(index)
                              }}
                                data-test={`settings_product_popup_remove_${index}_btn`}>
                                <Icon name='minus' />
                              </Button>
                            ) : ''}
                            {values.casProducts.length === (index + 1) ? (
                              <Button basic icon color='green' onClick={() => {
                                arrayHelpers.push({ casProduct: '', minimumConcentration: 0, maximumConcentration: 0 })
                                this.props.newCasProductsIndex()
                              }}
                                data-test='settings_product_popup_add_btn'>
                                <Icon name='plus' />
                              </Button>
                            ) : ''}
                          </FormField>
                        </FormGroup>
                      )) : ''}
                    </>
                  )} /> */}
                  {/* <FormGroup>
                  <FormField width={16}>
                    <label><FormattedMessage id='global.description' defaultMessage='Description' /></label>
                    <TextArea rows='3'
                      name='description'
                    />
                  </FormField>
                </FormGroup> */}

                  {/* <FormGroup widths='equal'>
                  <FormField>
                      </FormField>
                  <FormField>
                    <Checkbox label={formatMessage({ id: 'global.hazardous', defaultMessage: 'Hazardous' })} name='hazardous' inputProps={{ 'data-test': 'settings_product_popup_hazardous_chckb' }} />
                  </FormField>
                  <FormField>
                    <Checkbox label={formatMessage({ id: 'global.nonHap', defaultMessage: 'Non HAP' })} name='nonHap' inputProps={{ 'data-test': 'settings_product_popup_nonHap_chckb' }} />
                  </FormField>
                  <FormField>
                    <Checkbox label={formatMessage({ id: 'global.vocExempt', defaultMessage: 'VOC Exempt' })} name='vocExempt' inputProps={{ 'data-test': 'settings_product_popup_vocExempt_chckb' }} />
                  </FormField>
                  <FormField>
                    <Checkbox label={formatMessage({ id: 'global.prop65Exempt', defaultMessage: 'Prop 65 Exempt' })} name='prop65Exempt' inputProps={{ 'data-test': 'settings_product_popup_prop65Exempt_chckb' }} />
                  </FormField>
                  <FormField>
                    <Checkbox label={formatMessage({ id: 'global.saferChoice', defaultMessage: 'Safer Choice' })} name='saferChoice' inputProps={{ 'data-test': 'settings_product_popup_saferChoice_chckb' }} />
                  </FormField>
                </FormGroup> */}
                  {/* <FormGroup widths='equal'> */}
                  {/* <FormField>
                    <label><FormattedMessage id='global.unNumber' defaultMessage='UN Number' /></label>
                    <Search loading={isUnLoading}
                      onResultSelect={this.handleUnNumberSelect}
                      onSearchChange={this.handleSearchUnNumber}
                      results={searchedUnNumbers.map(item => {
                        return {
                          id: item.id,
                          title: item.unNumberCode,
                          description: item.description
                        }
                      })}
                      defaultValue={unNumber && unNumber.unNumberCode ? unNumber.unNumberCode : ''}
                      data-test='settings_product_popup_unNumberCode_inp'
                    />
                  </FormField> */}

                  {/* <FormGroup widths='equal'>
                  <FormField>
                    <Dropdown
                      label={formatMessage({ id: 'global.docType', defaultMessage: 'Document Type' })}
                      name={`attachmentType`}
                      options={this.props.documentTypes}
                      style={{ paddingBottom: '2em' }}
                      inputProps={{ 'data-test': 'settings_product_popup_attachmentType_drpdn' }}
                    />
                    <DateInput
                      label={formatMessage({ id: 'global.expirationDate', defaultMessage: 'Expiration Date' })}
                      name='expirationDate'
                      inputProps={{ 'data-test': 'settings_product_popup_expirationDate_dtin' }}
                    />
                  </FormField>
                  <FormField>
                    <label><FormattedMessage id='global.doc' defaultMessage='Document' /></label>
                    <UploadLot {...this.props}
                      attachments={values.attachments}
                      edit={this.props.popupValues ? this.props.popupValues.id : ''}
                      name='attachments'
                      type={values.attachmentType ? '' + values.attachmentType : 'Unspecified'}
                      expiration={values.expirationDate ? values.expirationDate + 'T00:00:00Z' : ''}
                      unspecifiedTypes={['Unspecified']}
                      fileMaxSize={20}
                      onChange={(files) => setFieldValue(
                        `attachments[${values.attachments && values.attachments.length ? values.attachments.length : 0}]`,
                        {
                          id: files.id,
                          name: files.name
                        }
                      )}
                      data-test='settings_product_import_attachments'
                      emptyContent={(
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
                  </FormField>
                </FormGroup> */}
                  <div style={{ textAlign: 'right' }}>
                    <Button.Reset onClick={closePopup} data-test='settings_product_popup_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{(text) => text}</FormattedMessage>
                    </Button.Reset>
                    <Button.Submit data-test='settings_product_popup_submit_btn'>
                      <FormattedMessage id='global.save' defaultMessage='Save'>{(text) => text}</FormattedMessage>
                    </Button.Submit>
                  </div>
                </>
              )
            }
            }
          </Form>
        </Modal.Content>
      </Modal >
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  getProductsCatalogRequest,
  handleSubmitProductEditPopup,
  handleSubmitProductAddPopup,
  newCasProductsIndex,
  removeCasProductsIndex,
  prepareSearchedCasProducts,
  searchCasProduct,
  searchUnNumber,
  getDocumentTypes,
  loadFile,
  addAttachment,
  removeAttachment,
  removeAttachmentLink,
  searchEchoProducts
}
const mapStateToProps = ({ settings }) => {
  return {
    popupValues: settings.popupValues,
    echoProducts: settings.echoProducts,
    echoProductsFetching: settings.echoProductsFetching,
    productsCatalogRows: settings.productsCatalogRows,
    packagingType: settings.productsPackagingType,
    packagingTypesAll: settings.packagingTypes,
    productsUnitsType: settings.productsUnitsType,
    unitsAll: settings.units,
    freightClasses: settings.productsFreightClasses,
    hazardClasses: settings.productsHazardClasses,
    packagingGroups: settings.productsPackagingGroups,
    searchedCasProducts: settings.searchedCasProducts,
    searchedUnNumbers: settings.searchedUnNumbers,
    reloadFilter: {
      props: {
        currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
          settings.tabsNames.find(tab => tab.type === Router.router.query.type) : settings.tabsNames[0],
        productCatalogUnmappedValue: settings.productCatalogUnmappedValue,
        productsFilter: settings.productsFilter
      },
      value: settings.filterValue
    },
    documentTypes: settings.documentTypes
  }
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(ProductPopup)))






{/* 

<FormField data-test='settings_product_popup_nmfcNumber_inp'>
                    <Checkbox label={formatMessage({ id: 'global.stackable', defaultMessage: 'Stackable' })} name='stackable' inputProps={{ 'data-test': 'settings_product_popup_stackable_chckb' }} />

                    <Input
                      label={formatMessage({ id: 'global.nmfcCode', defaultMessage: 'NMFC Code' })}
                      type='number'
                      name='nmfcNumber'
                    />
                  </FormField>
                  <Dropdown
                    label={formatMessage({ id: 'global.freightClass', defaultMessage: 'Freight Class' })}
                    name='freightClass'
                    options={freightClasses}
                    inputProps={{ 'data-test': 'settings_product_popup_freightClass_drpdn' }}
                  />
                  <Dropdown
                    label={formatMessage({ id: 'global.packagingGroup', defaultMessage: 'Packaging Group' })}
                    name='packagingGroup'
                    options={packagingGroups}
                    inputProps={{ 'data-test': 'settings_product_popup_packagingGroup_drpdn' }}
                  />
                </FormGroup>
                <FormGroup widths='equal'>
                  <Dropdown
                    label={formatMessage({ id: 'global.hazardClass', defaultMessage: 'Hazard Class' })}
                    name='hazardClass'
                    options={hazardClasses}
                    inputProps={{
                      'data-test': 'settings_product_popup_hazardClass_drpdn',
                      multiple: true,
                      selection: true,
                      search: true,
                      clearable: true
                    }}
                  />
                </FormGroup> */}
