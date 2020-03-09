import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Button, Input, TextArea, Dropdown, Checkbox as FormikCheckbox, Radio } from 'formik-semantic-ui-fixed-validation'
import { Form } from 'semantic-ui-react'
import { Formik } from 'formik'
import { DateInput } from '~/components/custom-formik'
import { getSafe, generateToastMarkup, uniqueArrayByKey, removeEmpty } from '~/utils/functions'
import { debounce } from 'lodash'
import styled from 'styled-components'
import confirm from '~/src/components/Confirmable/confirm'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import { withToastManager } from 'react-toast-notifications'
import ProdexGrid from '~/components/table'
import * as val from 'yup'
import { errorMessages } from '~/constants/yupValidation'
import moment from 'moment'
import { withDatagrid } from '~/modules/datagrid'
import _ from 'lodash'
import { inputWrapper, quantityWrapper } from '../../components'

import {
  Segment,
  Dimmer,
  Loader,
  Tab,
  Menu,
  Grid,
  GridRow,
  GridColumn,
  Header,
  Icon,
  Popup,
  FormField,
  Button as ButtonSemantic
} from 'semantic-ui-react'

import {
  //sidebarDetailTrigger,
  getAutocompleteData,
  getPackagingTypes,
  getWarehouses,
  getCountries,
  getUnits,
  //addProductOffer,
  getProductGrades,
  //searchOrigins,
  getProductForms,
  getProductConditions,
  searchManufacturers,
  searchCasNumber,
  //addAttachment,
  //loadFile,
  //removeAttachmentLink,
  //removeAttachment,
  //downloadAttachment,
  closeDetailSidebar,
  //getProductOffer,
  addPurchaseRequest,
  editPurchaseRequest
} from '../../actions'



import {
  FlexSidebar,
  //FlexTabs,
  FlexContent,
  //TopMargedColumn,
  //GraySegment,
  HighSegment,
  //DivIcon,
  //CloceIcon,
  //InputWrapper,
  //QuantityWrapper,
  BottomButtons,
  //SmallGrid,
  //InputLabeledWrapper,
  //CustomLabel,
  LabeledRow
} from '../../constants/layout'

import { listFrequency } from '../../constants/constants'
import { comparationHelper } from '../../constants/validation'

const CustomHr = styled.hr`
  border: solid 0.5px #dee2e6;
  margin: 0.285714286em 0 0 0;
`

const initValues = {
  pkgAmount: '',
  deliveryCountry: null,
  deliveryProvince: null,
  neededAt: '',
  expiresAt: '',
  manufacturers: [],
  conditionConforming: null,
  origins: [],
  grades: [],
  forms: [],
  packagingTypes: [],
  maximumPricePerUOM: null,
  notes: null,
  element: {
    echoProduct: '',
    casProduct: '',
    assayMin: '',
    assayMax: '',
  },
  neededNow: null,
  doesExpire: null,
  measurement: 7
}

const validationSchema = () =>
  val.lazy(values => {

    //val.object().shape({
    return val.object().shape({
      /*
      ...(values.neededNow === false && {
        neededAt: val.string()
          .required(errorMessages.requiredMessage)
      }),
      */
      ...(values.doesExpire && {
        expiresAt: val.string()
          .required(errorMessages.requiredMessage)
      }),
      element: val.object().shape({
        echoProduct: val.string()
          .trim()
          .test('required', errorMessages.requiredMessage, function(value) {
            const { casProduct } = this.parent
            if (casProduct === null || casProduct === '') {
              return value !== null && value !== ''
            }
            return true
          }),
        casProduct: val.string()
          .trim()
          .test('required', errorMessages.requiredMessage, function(value) {
            const { echoProduct } = this.parent
            if (echoProduct === null || echoProduct === '') {
              return value !== null && value !== ''
            }
            return true
          }),
        assayMin: val.string()
          .test('v', errorMessages.minUpToMax, function(v) {
            const { assayMax: v2 } = this.parent
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            if (v2 === null || v2 === '' || isNaN(v2)) return true // No max limit value - can not be tested
            return Number(v) <= v2
          })
          .test('v', errorMessages.minimum(0), function(v) {
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            return Number(v) >= 0
          })
          .test('v', errorMessages.maximum(100), function(v) {
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            return Number(v) <= 100
          })
          .test('v', errorMessages.mustBeNumber, function(v) {
            return v === null || v === '' || !isNaN(v)
          }),
        assayMax: val.string()
          .test('v', errorMessages.maxAtLeastMin, function(v) {
            const { assayMin: v2 } = this.parent
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            if (v2 === null || v2 === '' || isNaN(v2)) return true // No min limit value - can not be tested
            return Number(v) >= v2
          })
          .test('v', errorMessages.minimum(0), function(v) {
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            return Number(v) >= 0
          })
          .test('v', errorMessages.maximum(100), function(v) {
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            return Number(v) <= 100
          })
          .test('v', errorMessages.mustBeNumber, function(v) {
            return v === null || v === '' || !isNaN(v)
          })
      }),
      pkgAmount: val
        .number()
        .typeError(errorMessages.requiredMessage)
        .required(errorMessages.requiredMessage),
    })
  })

const listConforming = [
  {
    key: 1,
    text: <FormattedMessage id='global.conforming' defaultMessage='Conforming' />,
    value: true
  },
  {
    key: 0,
    text: <FormattedMessage id='global.nonConforming' defaultMessage='Non Conforming' />,
    value: false
  }
]

class DetailSidebar extends Component {
  state = {
    initValues: initValues,
    sidebarValues: null,

  }

  componentDidMount = async () => {
    this.fetchIfNoData('listPackagingTypes', this.props.getPackagingTypes)
    //this.fetchIfNoData('listConditions', this.props.getProductConditions)
    this.fetchIfNoData('listForms', this.props.getProductForms)
    this.fetchIfNoData('listGrades', this.props.getProductGrades)
    this.fetchIfNoData('listWarehouses', this.props.getWarehouses)
    this.fetchIfNoData('listCountries', this.props.getCountries)
    this.fetchIfNoData('listUnits', this.props.getUnits)
    this.props.searchManufacturers('', 200)
  }

  fetchIfNoData = (name, fn) => {
    if (this.props[name].length === 0) fn()
  }

  searchProducts = debounce(text => {
    this.props.getAutocompleteData({
      searchUrl: `/prodex/api/company-products/own/search?pattern=${text}&onlyMapped=false`
    })
  }, 250)

  searchManufacturers = debounce(text => {
    this.props.searchManufacturers(text, 5)
  }, 250)

  searchCasNumber = debounce(text => {
    this.props.searchCasNumber(text, 5)
  }, 250)

  submitForm = async (values, setSubmitting, setTouched) => {
    const { addPurchaseRequest, editPurchaseRequest, datagrid } = this.props
    const { sidebarValues } = this.state

    let neededAt = null, expiresAt = null

    if (values.neededNow) {
      neededAt = moment()
        .add(1, 'minutes')
        .format()
    } else {
      if (values.neededAt.length) {
        neededAt = moment(getStringISODate(values.neededAt)).format()
      }
    }

    if (values.doesExpire) {
      expiresAt = moment(getStringISODate(values.expiresAt)).format()
    }

    let body = {
      ...values,
      element: {
        ...values.element
      },
      neededAt,
      expiresAt
    }
    removeEmpty(body)
    try {
      if (sidebarValues) {
        const response = await editPurchaseRequest(sidebarValues.id, body)
        console.log('!!!!!!!!!! editPurchaseRequest response', response)
        //datagrid.loadData()
      } else {
        const response = await addPurchaseRequest(body)
        console.log('!!!!!!!!!! addPurchaseRequest response', response)
        //datagrid.loadData()
      }
      this.props.closeDetailSidebar()
    } catch (e) {}
    setSubmitting(false)
  }

  render() {
    let {
      // addProductOffer,
      listPackagingTypes,
      listConditions,
      listForms,
      listGrades,
      listWarehouses,
      listCountries,
      listUnits,
      listUnitsLoading,
      loading,
      // openBroadcast,
      // sidebarDetailOpen,
      sidebarValues,
      searchedManufacturers,
      searchedManufacturersLoading,
      searchedCasNumbers,
      searchedCasNumbersLoading,
      searchedOrigins,
      searchedOriginsLoading,
      // searchedProducts,
      // searchedProductsLoading,
      searchOrigins,
      warehousesList,
      listDocumentTypes,
      intl: { formatMessage },
      toastManager,
      removeAttachment,
      currencySymbol
    } = this.props

    return (
      <Formik
        enableReinitialize
        initialValues={this.state.initValues}
        validationSchema={validationSchema()}
        onSubmit={async (values, { setSubmitting, setTouched }) => {
          //setSubmitting(true)
          this.submitForm(values, setSubmitting, setTouched)
        }}>
        {formikProps => {
          let {
            values,
            touched,
            setTouched,
            setFieldTouched,
            setFieldValue,
            validateForm,
            submitForm,
            setSubmitting,
            resetForm
          } = formikProps
          this.values = values
          this.resetForm = resetForm
          this.formikProps = formikProps

          console.log('!!!!!!!!!! render values', values)

          return (
            <Form>
              <FlexSidebar
                visible={true}
                width='very wide'
                style={{ width: '430px' }}
                direction='right'
                animation='overlay'>
                <Dimmer inverted active={loading}>
                  <Loader />
                </Dimmer>
                <HighSegment basic>
                  <FormattedMessage id='wantedBoard.specificProducts' defaultMessage='SPECIFIC PRODUCT(S)' />
                </HighSegment>
                <FlexContent>
                  <Grid>
                    <GridRow>
                      <GridColumn width={16}>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.productName'
                              defaultMessage='Product Name'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='element.echoProduct'
                          options={this.props.autocompleteData.map(el => ({
                            key: el.id,
                            text: `${getSafe(() => el.intProductCode, '')} ${getSafe(
                              () => el.intProductName,
                              ''
                            )}`,
                            value: el.id
                          }))}
                          inputProps={{
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.enterProductName'
                                defaultMessage='Enter any Product Name'
                              />
                            ),
                            loading: this.props.autocompleteDataLoading,
                            'data-test': 'wanted_board_product_search_drpdn',
                            size: 'large',
                            minCharacters: 1,
                            icon: 'search',
                            search: options => options,
                            selection: true,
                            clearable: true,
                            onSearchChange: (e, { searchQuery }) =>
                              searchQuery.length > 0 && this.searchProducts(searchQuery)
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.casNumber'
                              defaultMessage='CAS Number'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='element.casProduct'
                          options={searchedCasNumbers}
                          inputProps={{
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.enterCasNumber'
                                defaultMessage='Enter CAS Number'
                              />
                            ),
                            loading: searchedCasNumbersLoading,
                            'data-test': 'wanted_board_product_search_drpdn',
                            size: 'large',
                            minCharacters: 1,
                            icon: 'search',
                            search: options => options,
                            selection: true,
                            clearable: true,
                            onSearchChange: (e, { searchQuery }) =>
                              searchQuery.length > 0 && this.searchCasNumber(searchQuery)
                          }}
                        />
                      </GridColumn>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={8}>
                        {quantityWrapper(
                          'element.assayMin',
                          {
                            min: 0,
                            type: 'number',
                            placeholder: '0'
                          },
                          this.formikProps
                          ,
                          <FormattedMessage
                            id='global.assayMin'
                            defaultMessage='Assay Min'
                          >
                            {text => text}
                          </FormattedMessage>
                        )}
                      </GridColumn>
                      <GridColumn width={8}>
                        {quantityWrapper(
                          'element.assayMax',
                          {
                            min: 0,
                            type: 'number',
                            placeholder: '0'
                          },
                          this.formikProps
                          ,
                          <FormattedMessage
                            id='global.assayMax'
                            defaultMessage='Assay Max'
                          >
                            {text => text}
                          </FormattedMessage>
                        )}
                      </GridColumn>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={8}>
                        {quantityWrapper(
                          'pkgAmount',
                          {
                            min: 0,
                            type: 'number',
                            placeholder: '0'
                          },
                          this.formikProps
                          ,
                          <FormattedMessage
                            id='wantedBoard.quantity'
                            defaultMessage='Quantity'
                          >
                            {text => text}
                          </FormattedMessage>
                        )}
                      </GridColumn>
                      <GridColumn  width={8}>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.measurement'
                              defaultMessage='Measurement'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='measurement'
                          options={listUnits}
                          inputProps={{
                            'data-test': 'new_inventory_grade_drpdn',
                            selection: true,
                            loading: listUnitsLoading
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn width={8}>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.deliveryLocation'
                              defaultMessage='Delivery Location'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='deliveryCountry'
                          options={listCountries}
                          inputProps={{
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectCountry'
                                defaultMessage='Select Country'
                              />
                            ),
                            'data-test': 'new_inventory_grade_drpdn',
                            selection: true
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Dropdown
                          label={'\u00A0'}  // &nbsp to not remove label (to not break positioning)
                          name='deliveryProvince'
                          options={listPackagingTypes}
                          inputProps={{
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectState'
                                defaultMessage='Select State'
                              />
                            ),
                            'data-test': 'new_inventory_grade_drpdn',
                            selection: true
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow className='label-row'>
                      <GridColumn width={8}>
                        <FormattedMessage id='wantedBoard.neededBy' defaultMessage='Needed By'>
                          {text => text}
                        </FormattedMessage>
                      </GridColumn>
                      <GridColumn width={8} className='float-right'>
                        <FormattedMessage id='wantedBoard.doesRequireExpire' defaultMessage='Does this request expire?'>
                          {text => text}
                        </FormattedMessage>
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn width={8}>
                        <Radio
                          name='neededNow'
                          value={true}
                          label={formatMessage({ id: 'wantedBoard.now', defaultMessage: 'Now' })}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Radio
                          name='doesExpire'
                          value={false}
                          label={formatMessage({ id: 'wantedBoard.no', defaultMessage: 'No' })}
                        />
                      </GridColumn>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={8}>
                        <Radio
                          name='neededNow'
                          value={false}
                          label={formatMessage({ id: 'wantedBoard.byDate', defaultMessage: 'By Date' })}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Radio
                          name='doesExpire'
                          value={true}
                          label={formatMessage({ id: 'wantedBoard.yes', defaultMessage: 'Yes' })}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn width={8}>
                        <DateInput
                          name='neededAt'
                          inputProps={{
                            'data-test': 'new_inventory_grade_drpdn',
                            placeholder:
                              formatMessage({
                                id: 'date.standardPlaceholder',
                                defaultMessage: '00/00/0000'
                              }),
                            clearable: true,
                            disabled: values.neededNow !== false
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <DateInput
                          name='expiresAt'
                          inputProps={{
                            'data-test': 'new_inventory_grade_drpdn',
                            placeholder:
                              formatMessage({
                                id: 'date.standardPlaceholder',
                                defaultMessage: '00/00/0000'
                              }),
                            disabled: values.doesExpire !== true
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.manufacturer'
                              defaultMessage='Manufacturer'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='manufacturers'
                          options={searchedManufacturers}
                          inputProps={{
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectManufacturer'
                                defaultMessage='Select manufacturer'
                              />
                            ),
                            loading: searchedManufacturersLoading,
                            'data-test': 'new_inventory_grade_drpdn',
                            size: 'large',
                            icon: 'search',
                            search: options => options,
                            selection: true,
                            multiple: true,
                            onSearchChange: (e, { searchQuery }) =>
                              searchQuery.length > 0 && this.searchManufacturers(searchQuery)
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn width={8}>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.condition'
                              defaultMessage='Condition'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='conditionConforming'
                          options={listConforming}
                          inputProps={{
                            'data-test': 'new_inventory_grade_drpdn',
                            selection: true,
                            clearable: true,
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectCondition'
                                defaultMessage='Select condition'
                              />
                            )
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.origin'
                              defaultMessage='Origin'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='origins'
                          options={listCountries}
                          inputProps={{
                            'data-test': 'new_inventory_grade_drpdn',
                            selection: true,
                            multiple: true,
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectOrigin'
                                defaultMessage='Select Origin'
                              />
                            )
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn width={8}>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.grade'
                              defaultMessage='Grade'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='grades'
                          options={listGrades}
                          inputProps={{
                            'data-test': 'new_inventory_grade_drpdn',
                            selection: true,
                            multiple: true,
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectGrade'
                                defaultMessage='Select Grade'
                              />
                            )
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.form'
                              defaultMessage='Form'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='forms'
                          options={listForms}
                          inputProps={{
                            'data-test': 'new_inventory_grade_drpdn',
                            selection: true,
                            multiple: true,
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectForm'
                                defaultMessage='Select form'
                              />
                            )
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.packaging'
                              defaultMessage='Packaging'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='packagingTypes'
                          options={listPackagingTypes}
                          inputProps={{
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectPackaging'
                                defaultMessage='Select packaging'
                              />
                            ),
                            'data-test': 'new_inventory_grade_drpdn',
                            selection: true,
                            multiple: true
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        {inputWrapper(
                          'maximumPricePerUOM',
                          {
                            min: 0,
                            type: 'number',
                            placeholder: '0.000'
                          },
                          <FormattedMessage
                            id='wantedBoard.maxDeliveredPrice'
                            defaultMessage='Max Delivered Price/LB'
                          >
                            {text => text}
                          </FormattedMessage>,
                          currencySymbol
                        )}
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <TextArea
                          name='notes'
                          label={
                            <FormattedMessage
                              id='wantedBoard.specialNotes'
                              defaultMessage='Special Notes'>
                              {text => text}
                            </FormattedMessage>
                          }
                          inputProps={{
                            'data-test': 'new_inventory_grade_drpdn',
                            placeholder:
                              formatMessage({
                                id: 'wantedBoard.writeNotesHere',
                                defaultMessage: 'Write notes here'
                              })
                          }}
                          />
                      </GridColumn>
                    </GridRow>

                  </Grid>
                </FlexContent>
                <BottomButtons>
                  <div>
                    <Button
                      size='large'
                      inputProps={{ type: 'button' }}
                      onClick={() => this.props.closeDetailSidebar()}
                      data-test='sidebar_inventory_cancel'>
                      {Object.keys(touched).length || this.state.changedForm
                        ? formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })
                        : formatMessage({ id: 'global.close', defaultMessage: 'Close' })}
                    </Button>
                    <Button
                      disabled={!(Object.keys(touched).length || this.state.changedForm)}
                      primary
                      size='large'
                      type='button'
                      onClick={() => submitForm()}
                      data-test='sidebar_inventory_save_new'>
                      {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                    </Button>
                  </div>
                </BottomButtons>
              </FlexSidebar>
            </Form>
          )
        }}
      </Formik>
    )
  }
}

const mapDispatchToProps = {
  //sidebarDetailTrigger,
  getAutocompleteData,
  //addProductOffer,
  getProductConditions,
  getPackagingTypes,
  getProductForms,
  getProductGrades,
  getWarehouses,
  getCountries,
  getUnits,
  searchManufacturers,
  searchCasNumber,
  //searchOrigins,
  //openBroadcast,
  //addAttachment,
  //loadFile,
  //removeAttachmentLink,
  //removeAttachment,
  //downloadAttachment,
  closeDetailSidebar,
  //getProductOffer,
  addPurchaseRequest,
  editPurchaseRequest
}

const mapStateToProps = ({
  wantedBoard: {
    autocompleteData,
    autocompleteDataLoading,
    listPackagingTypes,
    listConditions,
    listForms,
    listGrades,
    listWarehouses,
    listCountries,
    listUnits,
    listUnitsLoading,
    loading,
    //  sidebarActiveTab,
    //  sidebarDetailOpen,
    sidebarValues,
    searchedManufacturers,
    searchedManufacturersLoading,
    searchedCasNumbers,
    searchedCasNumbersLoading,
    //  searchedOrigins,
    //  searchedOriginsLoading,
    //  searchedProducts,
    //  searchedProductsLoading,
    //  warehousesList,
    //  listDocumentTypes,
    //  editProductOfferInitTrig
  }
  }) => ({
  autocompleteData,
  autocompleteDataLoading,
  listPackagingTypes,
  listConditions,
  listForms,
  listGrades,
  listWarehouses,
  listCountries,
  listUnits,
  listUnitsLoading,
  loading,
//  sidebarActiveTab,
//  sidebarDetailOpen,
  sidebarValues,
  searchedManufacturers,
  searchedManufacturersLoading,
  searchedCasNumbers,
  searchedCasNumbersLoading,
//  searchedOrigins,
//  searchedOriginsLoading,
//  searchedProducts,
//  searchedProductsLoading,
//  warehousesList,
//  listDocumentTypes,
//  editProductOfferInitTrig,
  currencySymbol: '$'
})

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(withToastManager(injectIntl(DetailSidebar))))