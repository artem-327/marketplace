import React from 'react'
import { connect } from 'react-redux'
import filter from 'lodash/filter'
import escapeRegExp from 'lodash/escapeRegExp'
import debounce from 'lodash/debounce'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import {withToastManager} from 'react-toast-notifications'
import { FormattedMessage } from 'react-intl'

import { Modal, Header, FormGroup, FormField, Search, Label, Icon } from 'semantic-ui-react'
import { DateInput } from '~/components/custom-formik'
import { FieldArray } from "formik"

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
  removeAttachmentLink
} from '../../actions'
import { Form, Input, Button, Dropdown, TextArea, Checkbox } from 'formik-semantic-ui'
import * as Yup from 'yup'
import './styles.scss'
import Router from "next/router"

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
    .min(3, 'Too short')
    .required('Required'),
  productNumber: Yup.string().trim()
    .min(1, 'Too short')
    .required('Required'),
  packagingSize: Yup.number()
    .typeError('must be number')
    .required(),
  unitID: Yup.number()
    .typeError('Required')
    .required(),
  packageID: Yup.number()
    .typeError('Required')
    .required(),
  nmfcNumber: Yup.number().typeError('must be number').test("digit5", "There has to be 5 digit numbers.", val => {
    return !val || val.toString().length === 5    // ! ! nejak divne to funguje
  }),
  casProducts: Yup.array().of(Yup.object().uniqueProperty('casProduct', 'CAS Product ahs to be unique').shape({
    casProduct: Yup.number().nullable(),
    minimumConcentration: Yup.number().nullable().min(0).max(100),
    maximumConcentration: Yup.number().nullable().min(0).max(100)
  }))

  //hazardClass: Yup.number(),
  //packagingGroup: Yup.number()
})

class ProductPopup extends React.Component {
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

  handlerSubmit = (values, actions) => {
    const { popupValues, reloadFilter } = this.props
    if (popupValues) {
      this.props.handleSubmitProductEditPopup({
        ...values,
        casProducts: values.casProducts ? values.casProducts.map(cp => {
          return {
            casProduct: cp.casProduct,
            minimumConcentration: parseInt(cp.minimumConcentration),
            maximumConcentration: parseInt(cp.maximumConcentration)
          }
        }) : popupValues.casProducts,
        unNumber: this.state.unNumber ? this.state.unNumber.id :
            popupValues.unNumber ? popupValues.unNumber.id : null,
      }, popupValues.id, reloadFilter)
    } else {
      this.props.handleSubmitProductAddPopup({
        ...values,
        casProducts: values.casProducts ? values.casProducts.map(cp => {
          return {
            casProduct: cp.casProduct,
            minimumConcentration: parseInt(cp.minimumConcentration),
            maximumConcentration: parseInt(cp.maximumConcentration)
          }
        }) : [],
        unNumber: this.state.unNumber ? this.state.unNumber.id : null
      }, reloadFilter)
    }
    actions.setSubmitting(false)
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
    this.setState({value: result, selectedList: [result].concat(this.state.selectedList)})
  }

  handleSearchChange = debounce((e, {searchQuery, dataindex}) => {
    this.setState({ isLoading: true, value: searchQuery })

    this.props.searchCasProduct(searchQuery, dataindex)

    setTimeout(() => {
      const re = new RegExp(escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.casProduct)

      this.setState({
        isLoading: false,
        results: filter(this.handleCasProduct(), isMatch)
      })
    }, 250)
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
    this.setState({unNumber: result})
  }

  getInitialFormValues = () => {
    const { popupValues } = this.props
    let {
      casProducts = [{casProduct: null, minimumConcentration: 100, maximumConcentration: 100}],
      description = '',
      freightClass = '',
      hazardClass = [],
      hazardous = false,
      nmfcNumber = '',
      productName = '',
      productNumber = '',
      packagingSize = '',
      packagingGroup = '',
      packageID = '',
      stackable = false,
      unitID = ''
    } = popupValues || {}
    if (casProducts.length === 0) {
      casProducts = [{casProduct: '', minimumConcentration: 100, maximumConcentration: 100}]
    }
    return {
      casProducts,
      description,
      freightClass,
      hazardClass,
      hazardous,
      nmfcNumber,
      productName,
      productNumber,
      packagingSize,
      packagingGroup,
      packageID,
      stackable,
      unitID
    }
  }

  render() {
    const {
      closePopup,
      packagingType,
      productsUnitsType,
      popupValues,
      freightClasses,
      hazardClasses,
      packagingGroups
    } = this.props
    const { isLoading, isUnLoading, results, value } = this.state
    const title = popupValues ? 'Edit' : 'Add'
    const casProduct = popupValues && popupValues.casProduct ? popupValues.casProduct : null
    const unNumber = popupValues && popupValues.unNumber ? popupValues.unNumber : null
    const searchedCasProducts = this.props.searchedCasProducts && this.props.searchedCasProducts.length ? this.props.searchedCasProducts : (casProduct ? [casProduct] : [])
    const searchedUnNumbers = this.props.searchedUnNumbers && this.props.searchedUnNumbers.length ? this.props.searchedUnNumbers : (unNumber ? [unNumber] : [])

    return (
      <Modal open centered={false}>
        <Modal.Header>{title} Product</Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={this.handlerSubmit}
          >
            {({ values, setFieldValue }) => (
              <>
                <FormGroup widths="equal">
                  <Input type="text" label="Product Name" name="productName" />
                  <Input type="text" label="Product Number" name="productNumber" />
                </FormGroup>

                <FormGroup style={{alignItems: 'flex-end', marginBottom: '0'}}>
                  <FormField width={6}>
                    <Header as='h2' style={{marginBottom: '0.28571429rem', fontSize: '1.3571429em'}}>What are the associated CAS Index Numbers?</Header>
                  </FormField>
                  <FormField width={3}>
                    <label>Min Concentration</label>
                  </FormField>
                  <FormField width={3}>
                    <label>Max Concentration</label>
                  </FormField>
                </FormGroup>
                <FieldArray name="casProducts"
                            render={arrayHelpers => (
                              <>
                                {values.casProducts && values.casProducts.length ? values.casProducts.map((casProduct, index) => (
                                  <FormGroup key={index}>
                                    <FormField width={6}>
                                      <Dropdown name={`casProducts[${index}].casProduct`}
                                                options={searchedCasProducts.length > index ? searchedCasProducts[index].map(item => {
                                                  return {
                                                    key: item.id,
                                                    id: item.id,
                                                    text: item.casNumber + ' ' + item.chemicalName,
                                                    unNumber: item.unNumber ? item.unNumber.id : 0,
                                                    value: item.id,
                                                    content: <Header content={item.casNumber} subheader={item.chemicalName} style={{fontSize: '1em'}} />
                                                  }
                                                }) : []}
                                                inputProps={{
                                                  size: 'large',
                                                  minCharacters: 3,
                                                  icon: "search",
                                                  search: options => options,
                                                  selection: true,
                                                  clearable: true,
                                                  loading: isLoading,
                                                  //onResultSelect: this.handleResultSelect,
                                                  onSearchChange: this.handleSearchChange,
                                                  dataindex: index
                                                }}
                                                defaultValue={casProduct && casProduct.casNumber ? casProduct.casNumber : null}
                                      />
                                    </FormField>
                                    <FormField width={3}>
                                      <Input type="text" name={`casProducts[${index}].minimumConcentration`} />
                                    </FormField>
                                    <FormField width={3}>
                                      <Input type="text" name={`casProducts[${index}].maximumConcentration`} />
                                    </FormField>
                                    <FormField width={4}>
                                      {index ? (
                                        <Button basic icon onClick={() => {
                                          arrayHelpers.remove(index)
                                          this.props.removeCasProductsIndex(index)
                                        }}>
                                          <Icon name='minus' />
                                        </Button>
                                      ) : ''}
                                      {values.casProducts.length === (index + 1) ? (
                                        <Button basic icon color='green' onClick={() => {
                                          arrayHelpers.push({ casProduct: '', min: 0, max: 0 })
                                          this.props.newCasProductsIndex()
                                        }}>
                                          <Icon name='plus' />
                                        </Button>
                                      ) : ''}
                                    </FormField>
                                  </FormGroup>
                                )) : ''}
                              </>
                            )} />
                <FormGroup>
                  <FormField width={16}>
                    <label>Description</label>
                    <TextArea rows='3'
                              name='description'
                    />
                  </FormField>
                </FormGroup>
                <FormGroup widths="equal">
                  <Input type="text" label="Packaging Size" name="packagingSize" />
                  <Dropdown
                    label="Unit"
                    name="unitID"
                    options={productsUnitsType}
                  />
                  <Dropdown
                    label="Packaging Type"
                    name="packageID"
                    options={packagingType}
                  />
                </FormGroup>
                <FormGroup>
                  <FormField>
                    <Checkbox toggle
                              label='Stackable'
                              name='stackable'
                    />
                  </FormField>
                  <FormField>
                    <Checkbox toggle
                              label='Hazardous'
                              name='hazardous'
                    />
                  </FormField>
                </FormGroup>
                <FormGroup widths='equal'>
                  <FormField>
                    <label>UN Number</label>
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
                            defaultValue={unNumber && unNumber.unNumberCode ? unNumber.unNumberCode : null}
                    />
                  </FormField>
                  <FormField>
                    <Input type="number"
                           label="NMFC Code"
                           name="nmfcNumber"
                    />
                  </FormField>
                  <Dropdown label='Freight Class'
                            name='freightClass'
                            options={freightClasses}
                  />
                </FormGroup>
                <FormGroup widths='equal'>
                  <Dropdown label='Hazard Class'
                            name='hazardClass'
                            inputProps={{ multiple: true }}
                            options={hazardClasses}
                            inputProps={{
                              multiple: true,
                              selection: true,
                              search: true,
                              clearable: true
                            }}
                  />
                  <Dropdown label='Packaging Group'
                            name='packagingGroup'
                            options={packagingGroups}
                  />
                </FormGroup>
                <FormGroup widths='equal'>
                  <FormField>
                    <Dropdown label="Document Type"
                              name={`attachmentType`}
                              options={this.props.documentTypes}
                              style={{paddingBottom: '2em'}}
                    />
                    <DateInput label='Expiration Date'
                               name='expirationDate'
                    />
                  </FormField>
                  <FormField>
                    <label>Document</label>
                    <UploadLot {...this.props}
                               attachments={values.attachments}
                               name='attachments'
                               type={values.attachmentType ? values.attachmentType : 'Unspecified'}
                               expiration={values.expirationDate}
                               unspecifiedTypes={['Unspecified']}
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
                                   <FormattedMessage
                                     id='addInventory.dragDropAdditional'
                                     defaultMessage={'Drop additional documents here'}
                                   />
                                   <br />
                                   <FormattedMessage
                                     id='addInventory.dragDropOr'
                                     defaultMessage={'or select from computer'}
                                   />
                                 </label>
                               )}
                               uploadedContent={(
                                 <label>
                                   <FormattedMessage
                                     id='addInventory.dragDropAdditional'
                                     defaultMessage={'Drop additional documents here'}
                                   />
                                   <br />
                                   <FormattedMessage
                                     id='addInventory.dragDropOr'
                                     defaultMessage={'or select from computer'}
                                   />
                                 </label>
                               )}
                    />
                  </FormField>
                </FormGroup>
                <div style={{ textAlign: 'right' }}>
                  <Button.Reset onClick={closePopup}>Cancel</Button.Reset>
                  <Button.Submit>Save</Button.Submit>
                </div>
              </>
            )}
          </Form>
        </Modal.Content>
      </Modal>
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
  removeAttachmentLink
}
const mapStateToProps = state => {
  return {
    popupValues: state.settings.popupValues,
    productsCatalogRows: state.settings.productsCatalogRows,
    packagingType: state.settings.productsPackagingType,
    productsUnitsType: state.settings.productsUnitsType,
    freightClasses: state.settings.productsFreightClasses,
    hazardClasses: state.settings.productsHazardClasses,
    packagingGroups: state.settings.productsPackagingGroups,
    searchedCasProducts: state.settings.searchedCasProducts,
    searchedUnNumbers: state.settings.searchedUnNumbers,
    reloadFilter: {props: {
        currentTab: Router && Router.router && Router.router.query && Router.router.query.type ?
            state.settings.tabsNames.find(tab => tab.type === Router.router.query.type) : state.settings.tabsNames[0],
        productCatalogUnmappedValue: state.settings.productCatalogUnmappedValue,
        productsFilter: state.settings.productsFilter},
      value: state.settings.filterValue},
    documentTypes: state.settings.documentTypes
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(ProductPopup))
