import React from 'react'
import { connect } from 'react-redux'
import filter from 'lodash/filter'
import escapeRegExp from 'lodash/escapeRegExp'
import debounce from 'lodash/debounce'

import { Modal, FormGroup, FormField, Search, Label } from 'semantic-ui-react'

import {
  closePopup,
  handleSubmitProductEditPopup,
  handleSubmitProductAddPopup,
  searchCasProduct,
  searchUnNumber
} from '../../actions'
import { Form, Input, Button, Dropdown, TextArea, Checkbox } from 'formik-semantic-ui'
import * as Yup from 'yup'
import './styles.scss'

const formValidation = Yup.object().shape({
  productName: Yup.string()
    .min(3, 'Too short')
    .required('Required'),
  productNumber: Yup.string()
    .min(1, 'Too short')
    .required('Required'),
  packagingSize: Yup.string()
    .min(1, 'Too short')
    .required('Required'),
  nmfcNumber: Yup.number().typeError('must be number').test("digit5", "There has to be 5 digit numbers.", val => {
    return !val || val.toString().length === 5
  }),
  hazardClass: Yup.number(),
  packagingGroup: Yup.number()
})

class ProductPopup extends React.Component {
  componentWillMount() {
    this.resetComponent()
  }

  handlerSubmit = (values, actions) => {
    const { popupValues, reloadFilter } = this.props
    if (popupValues) {
      this.props.handleSubmitProductEditPopup({
        ...values,
        casProduct: this.state.value ? this.state.value : popupValues.casProduct,
        unNumber: this.state.unNumber ? this.state.unNumber.id : popupValues.unNumber.id,
      }, popupValues.id, reloadFilter)
    } else {
      this.props.handleSubmitProductAddPopup({
        ...values,
        casProduct: this.state.value,
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
      unNumber: ''
    })
  }

  handleResultSelect = (e, { result }) =>
    this.setState({value: result})

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    this.props.searchCasProduct(value)

    setTimeout(() => {
      const re = new RegExp(escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.casProduct)

      this.setState({
        isLoading: false,
        results: filter(this.handleCasProduct(), isMatch)
      })
    }, 300)
  }

  handleSearchUnNumber = (e, { value }) => {
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
  }

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
    const {
      casProduct = '',
      description = '',
      freightClass = '',
      hazardClass = '',
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
    return {
      casProduct,
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
            <FormGroup widths="equal">
              <FormField>
                <label>CAS Number / Product Search</label>
                <Search
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={debounce(this.handleSearchChange, 500, {
                    leading: true
                  })}
                  results={searchedCasProducts.map(item => {
                    return {
                      id: item.id,
                      title: item.casNumber,
                      description: item.casIndexName,
                      unNumber: item.unNumber ? item.unNumber.id : 0
                    }
                  })}
                  defaultValue={casProduct && casProduct.casNumber ? casProduct.casNumber : null}
                />
              </FormField>
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Product Name" name="productName" />
              <Input type="text" label="Product Number" name="productNumber" />
            </FormGroup>
            <FormGroup widths="equal">
              <Input type="text" label="Packaging Size" name="packagingSize" />
              <Dropdown
                label="Units"
                name="unitID"
                options={productsUnitsType}
              />
              <Dropdown
                label="Packaging Type"
                name="packageID"
                options={packagingType}
              />
            </FormGroup>
            <FormGroup widths='equal'>
              <FormField>
                <label>UN Number</label>
                <Search loading={isUnLoading}
                        onResultSelect={this.handleUnNumberSelect}
                        onSearchChange={debounce(this.handleSearchUnNumber, 500, {
                          leading: true
                        })}
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
            </FormGroup>
            <FormGroup widths='equal'>
              <Dropdown label='Freight Class'
                        name='freightClass'
                        options={freightClasses}
              />
              <Dropdown label='Hazard Class'
                        name='hazardClass'
                        options={hazardClasses}
              />
              <Dropdown label='Packaging Group'
                        name='packagingGroup'
                        options={packagingGroups}
              />
            </FormGroup>
            <FormGroup widths='equal'>
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
              <FormField>
                <label>Description</label>
                <TextArea rows='3'
                          name='description'
                />
              </FormField>
            </FormGroup>
            <div style={{ textAlign: 'right' }}>
              <Button.Reset onClick={closePopup}>Cancel</Button.Reset>
              <Button.Submit>Save</Button.Submit>
            </div>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

const mapDispatchToProps = {
  closePopup,
  handleSubmitProductEditPopup,
  handleSubmitProductAddPopup,
  searchCasProduct,
  searchUnNumber
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
        currentTab: state.settings.currentTab,
        productCatalogUnmappedValue: state.settings.productCatalogUnmappedValue,
        productsFilter: state.settings.productsFilter},
      value: state.settings.filterValue},
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductPopup)
