import React from 'react'
import { connect } from 'react-redux'
import filter from 'lodash/filter'
import escapeRegExp from 'lodash/escapeRegExp'
import debounce from 'lodash/debounce'
import UploadLot from '~/modules/inventory/components/upload/UploadLot'
import { withToastManager } from 'react-toast-notifications'
import { FormattedMessage, injectIntl } from 'react-intl'

import { Modal, Header, FormGroup, FormField, Search, Label, Icon, Accordion, Popup, Grid, Divider } from 'semantic-ui-react'
// import { DateInput } from '~/components/custom-formik'
// import { FieldArray } from 'formik'

import { CompanyProductMixtures } from '~/components/shared-components/'
import { generateToastMarkup, getSafe, uniqueArrayByKey, getDesiredCasProductsProps } from '~/utils/functions'
import { DisabledButtonWrapped } from '~/utils/components'


import {
  closePopup,
  getProductsCatalogRequest,
  handleSubmitProductEditPopup,
  handleSubmitProductAddPopup,
  searchUnNumber,
  getDocumentTypes,
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


const initialValues = {
  intProductName: '',
  intProductCode: '',
  packagingSize: '',
  packagingUnit: '',
  packagingType: '',
  nmfcNumber: '',

}

const formValidation = Yup.object().shape({
  intProductName: Yup.string().trim()
    .min(3, errorMessages.minLength(3))
    .required(errorMessages.requiredMessage),
  intProductCode: Yup.string().trim()
    .min(1, errorMessages.minLength(1))
    .required(errorMessages.requiredMessage),
  packagingSize: Yup.number(errorMessages.invalidNumber)
    .typeError(errorMessages.mustBeNumber)
    .required(errorMessages.requiredMessage),
  packagingUnit: Yup.number(errorMessages.invalidNumber)
    .required(errorMessages.requiredMessage),
  packagingType: Yup.number(errorMessages.invalidNumber)
    .required(errorMessages.requiredMessage),
  nmfcNumber: Yup.number()
    .typeError(errorMessages.mustBeNumber)
    .test('len', errorMessages.exactLength(5), val => val ? getSafe(() => val.toString().length, 0) === 5 : true)
    .nullable(),
})

class ProductPopup extends React.Component {
  state = {
    advanced: false
  }
  componentDidMount() {
    this.props.getProductsCatalogRequest()

    if (this.props.documentTypes.length === 0)
      this.props.getDocumentTypes()
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
    delete values.casProducts

    try {
      if (popupValues) {
        await handleSubmitProductEditPopup(values, popupValues.id, reloadFilter)
      } else {
        await handleSubmitProductAddPopup(values, reloadFilter)
      }
      let status = popupValues ? 'productUpdated' : 'productCreated'

      toastManager.add(generateToastMarkup(
        <FormattedMessage id={`notifications.${status}.header`} />,
        <FormattedMessage id={`notifications.${status}.content`} values={{ name: values.intProductName }} />,
      ), { appearance: 'success' })
    } catch (e) { console.error(e) }
    finally {
      actions.setSubmitting(false)
    }
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

  }, 250)

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
  }, 250)

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
    return {
      ...initialValues,
      ...popupValues,
      casProducts: getDesiredCasProductsProps(getSafe(() => popupValues.echoProduct.elements, [])),
      echoProduct: getSafe(() => popupValues.echoProduct.id),
    }
  }


  render() {
    const {
      closePopup,
      productsUnitsType,
      popupValues,
      freightClasses,
      intl: { formatMessage },
      echoProducts,
      echoProductsFetching
    } = this.props

    const { packagingTypesReduced } = this.state
    let editable = popupValues ? (popupValues.productOfferCount === 0 || !popupValues.productOfferCount) : true

    let allEchoProducts = uniqueArrayByKey(echoProducts.concat(getSafe(() => popupValues.echoProduct) ? popupValues.echoProduct : []), 'id')

    return (
      <Modal closeIcon onClose={() => closePopup()} size='small' open centered={false}>
        <Modal.Header>
          {popupValues
            ? <FormattedMessage id='settings.editProduct' defaultMessage='Edit Product' />
            : <FormattedMessage id='settings.addProduct' defaultMessage='Add Product' />
          }
        </Modal.Header>
        <Modal.Content>
          <Form
            initialValues={this.getInitialFormValues()}
            validationSchema={formValidation}
            onReset={closePopup}
            onSubmit={this.handlerSubmit}
          >
            {({ setFieldValue, values }) => {
              let casProducts = getSafe(() => values.casProducts, [])
              return (
                <>
                  <Dropdown
                    label={<FormattedMessage id='settings.associatedEchoProducts' defaultMessage='What is the Associated External Product that you would like to map to?' />}
                    options={allEchoProducts.map((echo) => ({
                      key: echo.id,
                      text: echo.name,
                      value: echo.id
                    }))}

                    inputProps={{
                      fluid: true, 
                      search: (val) => val,
                      clearable: true, selection: true,
                      loading: echoProductsFetching,
                      onChange: (_, { value }) =>
                        setFieldValue('casProducts',
                          getDesiredCasProductsProps(
                            getSafe(() => allEchoProducts.find((el) => el.id === value).elements, [])
                          )
                        ),
                      onSearchChange: (_, { searchQuery }) => this.handleSearchChange(searchQuery)
                    }}
                    name='echoProduct'
                  />
                  {casProducts.length > 0 &&
                    <>
                      <Divider />
                      <Grid>
                        <CompanyProductMixtures
                          casProducts={casProducts}
                        />
                      </Grid>
                      <Divider />
                    </>
                  }
                  <FormGroup widths='equal' data-test='settings_product_popup_nameCodeInci_inp'>
                    <Input type='text' label={formatMessage({ id: 'global.productName', defaultMessage: 'Product Name' })} name='intProductName' />
                    <Input type='text' label={formatMessage({ id: 'global.productCode', defaultMessage: 'Product Code' })} name='intProductCode' />
                  </FormGroup>

                  <FormGroup data-test='settings_product_popup_packagingSize_inp'>
                    <Input
                      fieldProps={{
                        width: 4
                      }}
                      type='text' label={formatMessage({ id: 'global.packagingSize', defaultMessage: 'Packaging Size' })} name='packagingSize' />
                    <Dropdown
                      fieldProps={{ width: 6 }}
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

                  <div style={{ textAlign: 'right' }}>
                    <Button.Reset onClick={closePopup} data-test='settings_product_popup_reset_btn'>
                      <FormattedMessage id='global.cancel' defaultMessage='Cancel'>{(text) => text}</FormattedMessage>
                    </Button.Reset>
                    <Popup
                      disabled={editable}
                      trigger={
                        <DisabledButtonWrapped>
                          <Button.Submit disabled={!editable} data-test='settings_product_popup_submit_btn'>
                            <FormattedMessage id='global.save' defaultMessage='Save'>{(text) => text}</FormattedMessage>
                          </Button.Submit>
                        </DisabledButtonWrapped>}

                      content={<FormattedMessage id='settings.product.offerExists' defaultMessage='Product cannot be edited, as it already has ProductOffers linked to it.'>{text => text}</FormattedMessage>}
                    />
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
  searchUnNumber,
  getDocumentTypes,
  searchEchoProducts
}
const mapStateToProps = ({ settings }) => {
  return {
    popupValues: settings.popupValues,
    echoProducts: settings.echoProducts,
    echoProductsFetching: settings.echoProductsFetching,
    packagingType: settings.productsPackagingType,
    packagingTypesAll: settings.packagingTypes,
    productsUnitsType: settings.productsUnitsType,
    unitsAll: settings.units,
    freightClasses: settings.productsFreightClasses,
    hazardClasses: settings.productsHazardClasses,
    packagingGroups: settings.productsPackagingGroups,
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