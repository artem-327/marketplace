import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import {
  Button,
  Input,
  TextArea,
  Dropdown,
  Checkbox as FormikCheckbox,
  Radio
} from 'formik-semantic-ui-fixed-validation'
import { Form } from 'semantic-ui-react'
import { Formik } from 'formik'
import { DateInput } from '~/components/custom-formik'
import { getSafe, generateToastMarkup, uniqueArrayByKey, removeEmpty } from '~/utils/functions'
import { debounce } from 'lodash'
import styled from 'styled-components'
import confirm from '~/components/Confirmable/confirm'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import { withToastManager } from 'react-toast-notifications'
import ProdexGrid from '~/components/table'
import * as val from 'yup'
import { errorMessages, dateValidation } from '~/constants/yupValidation'
import moment from 'moment'
import { withDatagrid } from '~/modules/datagrid'
import _ from 'lodash'
import { inputWrapper } from '../../components'
import { Required } from '~/components/constants/layout'
import { CompanyGenericProductRequestForm } from '~/modules/company-generic-product-request'
import { Inbox } from '@material-ui/icons'
import { X as XIcon } from 'react-feather'

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
  getProvinces,
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

import { FlexSidebar, FlexContent, HighSegment, BottomButtons, LabeledRow } from '../../constants/layout'

import { listFrequency } from '../../constants/constants'
import { comparationHelper } from '../../constants/validation'
import ErrorFocus from '~/components/error-focus'

const CustomHr = styled.hr`
  border: solid 0.5px #dee2e6;
  margin: 0.285714286em 0 0 0;
`

const initValues = {
  quantity: '',
  deliveryCountry: '',
  deliveryProvince: '',
  neededAt: '',
  expiresAt: '',
  manufacturers: [],
  conditionConforming: '',
  origins: [],
  grades: [],
  forms: [],
  packagingTypes: [],
  maximumPricePerUOM: '',
  notes: '',
  element: {
    productGroup: '',
    casProduct: '',
    assayMin: '',
    assayMax: ''
  },
  maximumDeliveredPrice: '', // not implemented on endpoint yet
  neededNow: null,
  doesExpire: null,
  //notificationEnabled: false, // not implemented on endpoint yet
  //notifyMail: false, // not implemented on endpoint yet
  //notifyPhone: false, // not implemented on endpoint yet
  unit: 7
}

const validationSchema = () =>
  val.lazy(values => {
    return val.object().shape({
      ...(values.doesExpire && {
        expiresAt: dateValidation(false).concat(
          val
            .string()
            .required(errorMessages.requiredMessage)
            .test('minDate', errorMessages.dateNotInPast, function (date) {
              const enteredDate = moment(getStringISODate(date)).endOf('day').format()
              return enteredDate >= moment().endOf('day').format()
            })
        )
      }),
      ...(values.neededNow === false && {
        neededAt: dateValidation(false).concat(
          val
            .string()
            .required(errorMessages.requiredMessage)
            .test('minDate', errorMessages.dateNotInPast, function (date) {
              const enteredDate = moment(getStringISODate(date)).endOf('day').format()
              return enteredDate >= moment().endOf('day').format()
            })
        )
      }),
      element: val.object().shape({
        productGroup: val
          .string()
          .trim()
          .test('required', errorMessages.requiredMessage, function (value) {
            const { casProduct } = this.parent
            if (casProduct === null || casProduct === '') {
              return value !== null && value !== ''
            }
            return true
          }),
        casProduct: val
          .string()
          .trim()
          .test('required', errorMessages.requiredMessage, function (value) {
            const { productGroup } = this.parent
            if (productGroup === null || productGroup === '') {
              return value !== null && value !== ''
            }
            return true
          }),
        assayMin: val
          .string()
          .test('v', errorMessages.minUpToMax, function (v) {
            const { assayMax: v2 } = this.parent
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            if (v2 === null || v2 === '' || isNaN(v2)) return true // No max limit value - can not be tested
            return Number(v) <= v2
          })
          .test('v', errorMessages.minimum(0), function (v) {
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            return Number(v) >= 0
          })
          .test('v', errorMessages.maximum(100), function (v) {
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            return Number(v) <= 100
          })
          .test('v', errorMessages.mustBeNumber, function (v) {
            return v === null || v === '' || !isNaN(v)
          }),
        assayMax: val
          .string()
          .test('v', errorMessages.maxAtLeastMin, function (v) {
            const { assayMin: v2 } = this.parent
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            if (v2 === null || v2 === '' || isNaN(v2)) return true // No min limit value - can not be tested
            return Number(v) >= v2
          })
          .test('v', errorMessages.minimum(0), function (v) {
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            return Number(v) >= 0
          })
          .test('v', errorMessages.maximum(100), function (v) {
            if (v === null || v === '' || isNaN(v)) return true // No number value - can not be tested
            return Number(v) <= 100
          })
          .test('v', errorMessages.mustBeNumber, function (v) {
            return v === null || v === '' || !isNaN(v)
          })
      }),
      quantity: val
        .number()
        .typeError(errorMessages.requiredMessage)
        .moreThan(0, errorMessages.greaterThan(0))
        //.integer(errorMessages.integer)
        .required(errorMessages.requiredMessage),
      maximumPricePerUOM: val.number().positive(errorMessages.positive).typeError(errorMessages.requiredMessage),
      maximumDeliveredPrice: val.number().positive(errorMessages.positive).typeError(errorMessages.requiredMessage)
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
    //sidebarValues: null,
    hasProvinces: false
  }

  componentDidMount = async () => {
    this.fetchIfNoData('listPackagingTypes', this.props.getPackagingTypes)
    //this.fetchIfNoData('listConditions', this.props.getProductConditions)
    this.fetchIfNoData('listForms', this.props.getProductForms)
    this.fetchIfNoData('listGrades', this.props.getProductGrades)
    this.fetchIfNoData('listWarehouses', this.props.getWarehouses)
    this.fetchIfNoData('listCountries', this.props.getCountries)
    this.fetchIfNoData('listUnits', this.props.getUnits)
    if (!this.props.sidebarValues) {
      //this.props.searchManufacturers('', 200)
    } else {
      if (this.props.sidebarValues.deliveryCountry && this.props.sidebarValues.deliveryCountry.hasProvinces) {
        this.props.getProvinces(this.props.sidebarValues.deliveryCountry.id)
        this.setState({ hasProvinces: true })
      }
    }
  }

  fetchIfNoData = (name, fn) => {
    if (this.props[name].length === 0) fn()
  }

  searchProducts = debounce(text => {
    this.props.getAutocompleteData({
      searchUrl: `/prodex/api/product-groups/search?pattern=${text}`
    })
  }, 250)

  searchManufacturers = debounce(text => {
    this.props.searchManufacturers(text, 5)
  }, 250)

  searchCasNumber = debounce(text => {
    this.props.searchCasNumber(text, 5)
  }, 250)

  submitForm = async (values, setSubmitting, setTouched) => {
    const { addPurchaseRequest, editPurchaseRequest, openGlobalAddForm } = this.props
    const { sidebarValues } = this.props

    let neededAt = null,
      expiresAt = null

    if (values.neededNow) {
      neededAt = moment().endOf('day').format()
    } else {
      if (values.neededAt.length) {
        neededAt = moment(getStringISODate(values.neededAt)).endOf('day').format()
      }
    }

    if (values.doesExpire) {
      expiresAt = moment(getStringISODate(values.expiresAt)).endOf('day').format()
    }

    let body = {
      ...values,
      element: {
        ...values.element
      },
      neededAt,
      expiresAt
    }
    delete body.neededNow
    delete body.doesExpire

    removeEmpty(body)
    try {
      const response = await addPurchaseRequest(body)
      //datagrid.loadData() // Not needed here - endpoint affects datagrid in another tab
      openGlobalAddForm ? openGlobalAddForm('') : this.props.closeDetailSidebar()
    } catch (e) {}
    setSubmitting(false)
  }

  getInitialFormValues = () => {
    const { sidebarValues } = this.props

    let initialValues = {
      ...this.state.initValues,
      ...(sidebarValues
        ? {
            conditionConforming: getSafe(() => sidebarValues.conditionConforming, ''),
            deliveryCountry: getSafe(() => sidebarValues.deliveryCountry.id, ''),
            deliveryProvince: getSafe(() => sidebarValues.deliveryProvince.id, ''),
            element: {
              productGroup: getSafe(() => sidebarValues.element.productGroup.id, ''),
              casProduct: getSafe(() => sidebarValues.element.casProduct.id, ''),
              assayMin: getSafe(() => sidebarValues.element.assayMin, ''),
              assayMax: getSafe(() => sidebarValues.element.assayMax, '')
            },
            expiresAt: getSafe(() => sidebarValues.expiresAt, ''),
            forms: sidebarValues.forms.map(d => d.id),
            grades: sidebarValues.grades.map(d => d.id),
            manufacturers: sidebarValues.manufacturers.map(d => d.id),
            maximumPricePerUOM: getSafe(() => sidebarValues.maximumPricePerUOM, ''),
            neededAt: getSafe(() => sidebarValues.neededAt, ''),
            notes: getSafe(() => sidebarValues.notes, ''),
            origins: sidebarValues.origins.map(d => d.id),
            packagingTypes: sidebarValues.packagingTypes.map(d => d.id),
            quantity: getSafe(() => sidebarValues.quantity, ''),
            unit: getSafe(() => sidebarValues.unit.id, '')
          }
        : null)
    }

    if (initialValues.expiresAt) {
      initialValues.expiresAt = moment(initialValues.expiresAt).format(getLocaleDateFormat())
      initialValues.doesExpire = true
    }
    if (initialValues.neededAt) {
      initialValues.neededAt = moment(initialValues.neededAt).format(getLocaleDateFormat())
      initialValues.neededNow = false
    }

    return initialValues
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
      listCountriesLoading,
      countries,
      listProvinces,
      listProvincesLoading,
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
      currencySymbol,
      openGlobalAddForm
    } = this.props

    const { hasProvinces } = this.state

    return (
      <Formik
        enableReinitialize
        initialValues={this.getInitialFormValues()}
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

          return (
            <Form>
              <FlexSidebar
                className={openGlobalAddForm ? 'full-screen-sidebar' : ''}
                visible={true}
                width='very wide'
                style={{ width: '430px' }}
                direction='right'
                animation='overlay'>
                <Dimmer inverted active={loading}>
                  <Loader />
                </Dimmer>
                <HighSegment basic>
                  {openGlobalAddForm ? (
                    <>
                      <div>
                        <span>
                          <FormattedMessage id='createMenu.addWanted' defaultMessage='Add Wanted' />
                        </span>
                        <Inbox className='title-icon' />
                      </div>
                      <div style={{ position: 'absolute', right: '20px' }}>
                        <XIcon onClick={() => openGlobalAddForm('')} className='close-icon' />
                      </div>
                    </>
                  ) : (
                    <FormattedMessage id='wantedBoard.specificProducts' defaultMessage='SPECIFIC PRODUCT(S)' />
                  )}
                </HighSegment>
                <FlexContent>
                  <Grid>
                    <GridRow>
                      <GridColumn width={16}>
                        <Dropdown
                          label={
                            <>
                              <FormattedMessage id='wantedBoard.productName' defaultMessage='Product Name'>
                                {text => text}
                              </FormattedMessage>
                              <Required />
                            </>
                          }
                          name='element.productGroup'
                          options={this.props.autocompleteData}
                          inputProps={{
                            placeholder: formatMessage({
                              id: 'wantedBoard.enterProductName',
                              defaultMessage: 'Enter any Product Name'
                            }),
                            loading: this.props.autocompleteDataLoading,
                            'data-test': 'wanted_board_sidebar_productName_drpdn',
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
                        {!values.element.productGroup && (
                          <div style={{ marginTop: '-10px' }}>
                            <CompanyGenericProductRequestForm
                              asLink
                              buttonCaption={
                                <FormattedMessage
                                  id='wantedBoard.requestACompanyGenericProduct'
                                  defaultMessage='Request a Company Generic Product'>
                                  {text => text}
                                </FormattedMessage>
                              }
                              headerCaption={
                                <FormattedMessage
                                  id='wantedBoard.requestACompanyGenericProduct'
                                  defaultMessage='Request a Company Generic Product'
                                />
                              }
                            />
                          </div>
                        )}
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <Dropdown
                          label={
                            <>
                              <FormattedMessage
                                id='wantedBoard.functionalEquivalent'
                                defaultMessage='Functional Equivalent'>
                                {text => text}
                              </FormattedMessage>
                              <Required />
                            </>
                          }
                          name='element.casProduct'
                          options={searchedCasNumbers}
                          inputProps={{
                            placeholder: formatMessage({
                              id: 'wantedBoard.enterCasNumber',
                              defaultMessage: 'Enter CAS Number'
                            }),
                            loading: searchedCasNumbersLoading,
                            'data-test': 'wanted_board_sidebar_casNumber_drpdn',
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
                      <GridColumn width={8} data-test='wanted_board_sidebar_assayMin_inp'>
                        <Input
                          name='element.assayMin'
                          inputProps={{
                            placeholder: '0',
                            min: 0,
                            type: 'number'
                          }}
                          label={
                            <FormattedMessage id='global.assayMin' defaultMessage='Assay Min'>
                              {text => text}
                            </FormattedMessage>
                          }
                        />
                      </GridColumn>
                      <GridColumn width={8} data-test='wanted_board_sidebar_assayMax_inp'>
                        <Input
                          name='element.assayMax'
                          inputProps={{
                            placeholder: '0',
                            min: 0,
                            type: 'number'
                          }}
                          label={
                            <FormattedMessage id='global.assayMax' defaultMessage='Assay Max'>
                              {text => text}
                            </FormattedMessage>
                          }
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn data-test='wanted_board_sidebar_fobPrice_inp'>
                        {inputWrapper(
                          'maximumPricePerUOM',
                          {
                            min: 0,
                            type: 'number',
                            placeholder: '0.00'
                          },
                          <FormattedMessage id='wantedBoard.maxPrice' defaultMessage='Max Price/Unit'>
                            {text => text}
                          </FormattedMessage>,
                          currencySymbol
                        )}
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn width={8} data-test='wanted_board_sidebar_quantity_inp'>
                        <Input
                          name='quantity'
                          inputProps={{
                            placeholder: '0',
                            min: 0,
                            type: 'number'
                          }}
                          label={
                            <FormattedMessage id='wantedBoard.quantityNeeded' defaultMessage='Quantity Needed'>
                              {text => text}
                            </FormattedMessage>
                          }
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Dropdown
                          label={
                            <FormattedMessage id='wantedBoard.weightUnit' defaultMessage='Weight Unit'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='unit'
                          options={listUnits}
                          inputProps={{
                            'data-test': 'wanted_board_sidebar_measurement_drpdn',
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
                            <FormattedMessage id='wantedBoard.deliveryLocation' defaultMessage='Customer Ship To'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='deliveryCountry'
                          options={listCountries}
                          inputProps={{
                            placeholder: formatMessage({
                              id: 'wantedBoard.selectCountry',
                              defaultMessage: 'Select Country'
                            }),
                            'data-test': 'wanted_board_sidebar_deliveryLocation_drpdn',
                            selection: true,
                            onChange: (_, value) => {
                              const country = countries.find(val => val.id === value.value)
                              setFieldValue('deliveryProvince', '')
                              if (country && country.hasProvinces) {
                                this.props.getProvinces(country.id)
                              }
                              this.setState({ hasProvinces: country.hasProvinces })
                            },
                            loading: listCountriesLoading
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Dropdown
                          label={'\u00A0'} // &nbsp to not remove label (to not break positioning)
                          name='deliveryProvince'
                          options={listProvinces}
                          inputProps={{
                            placeholder: formatMessage({
                              id: 'wantedBoard.selectState',
                              defaultMessage: 'Select State'
                            }),
                            'data-test': 'wanted_board_sidebar_selectState_drpdn',
                            selection: true,
                            loading: listProvincesLoading,
                            disabled: !hasProvinces
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow className='label-row'>
                      <GridColumn width={8}>
                        <FormattedMessage id='wantedBoard.dateNeededBy' defaultMessage='Date Needed By'>
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
                          inputProps={{ 'data-test': 'wanted_board_sidebar_neededNow_radio' }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Radio
                          name='doesExpire'
                          value={false}
                          label={formatMessage({ id: 'wantedBoard.no', defaultMessage: 'No' })}
                          inputProps={{ 'data-test': 'wanted_board_sidebar_expireNo_radio' }}
                        />
                      </GridColumn>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={8}>
                        <Radio
                          name='neededNow'
                          value={false}
                          label={formatMessage({ id: 'wantedBoard.byDate', defaultMessage: 'By Date' })}
                          inputProps={{ 'data-test': 'wanted_board_sidebar_neededByDate_radio' }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Radio
                          name='doesExpire'
                          value={true}
                          label={formatMessage({ id: 'wantedBoard.yes', defaultMessage: 'Yes' })}
                          inputProps={{ 'data-test': 'wanted_board_sidebar_expireYes_radio' }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn width={8}>
                        <DateInput
                          name='neededAt'
                          inputProps={{
                            'data-test': 'wanted_board_sidebar_neededAt_inp',
                            placeholder: formatMessage({
                              id: 'date.standardPlaceholder',
                              defaultMessage: '00/00/0000'
                            }),
                            clearable: true,
                            disabled: values.neededNow !== false
                            // minDate: moment() TypeError: Cannot read property 'position' of undefined
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <DateInput
                          name='expiresAt'
                          inputProps={{
                            'data-test': 'wanted_board_sidebar_expiresAt_inp',
                            placeholder: formatMessage({
                              id: 'date.standardPlaceholder',
                              defaultMessage: '00/00/0000'
                            }),
                            disabled: values.doesExpire !== true
                            //  minDate: moment() TypeError: Cannot read property 'position' of undefined
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    {false && (
                      <GridRow>
                        <GridColumn>
                          <Dropdown
                            label={
                              <FormattedMessage id='wantedBoard.manufacturer' defaultMessage='Manufacturer'>
                                {text => text}
                              </FormattedMessage>
                            }
                            name='manufacturers'
                            options={searchedManufacturers}
                            inputProps={{
                              placeholder: formatMessage({
                                id: 'wantedBoard.selectManufacturer',
                                defaultMessage: 'Select manufacturer'
                              }),
                              loading: searchedManufacturersLoading,
                              'data-test': 'wanted_board_sidebar_manufacturer_drpdn',
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
                    )}

                    <GridRow>
                      <GridColumn>
                        <Dropdown
                          label={
                            <FormattedMessage id='wantedBoard.condition' defaultMessage='Condition'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='conditionConforming'
                          options={listConforming}
                          inputProps={{
                            'data-test': 'wanted_board_sidebar_condition_drpdn',
                            selection: true,
                            clearable: true,
                            placeholder: formatMessage({
                              id: 'wantedBoard.selectCondition',
                              defaultMessage: 'Select condition'
                            })
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <Dropdown
                          label={
                            <FormattedMessage id='wantedBoard.countryOfOrigin' defaultMessage='Country of Origin'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='origins'
                          options={listCountries}
                          inputProps={{
                            'data-test': 'wanted_board_sidebar_origins_drpdn',
                            selection: true,
                            multiple: true,
                            placeholder: formatMessage({
                              id: 'wantedBoard.selectOrigin',
                              defaultMessage: 'Select Origin'
                            })
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <Dropdown
                          label={
                            <FormattedMessage id='wantedBoard.grade' defaultMessage='Grade'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='grades'
                          options={listGrades}
                          inputProps={{
                            'data-test': 'wanted_board_sidebar_grade_drpdn',
                            selection: true,
                            multiple: true,
                            placeholder: formatMessage({
                              id: 'wantedBoard.selectGrade',
                              defaultMessage: 'Select Grade'
                            })
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <Dropdown
                          label={
                            <FormattedMessage id='wantedBoard.form' defaultMessage='Form'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='forms'
                          options={listForms}
                          inputProps={{
                            'data-test': 'wanted_board_sidebar_forms_drpdn',
                            selection: true,
                            multiple: true,
                            placeholder: formatMessage({ id: 'wantedBoard.selectForm', defaultMessage: 'Select form' })
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <Dropdown
                          label={
                            <FormattedMessage id='wantedBoard.packaging' defaultMessage='Packaging'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='packagingTypes'
                          options={listPackagingTypes}
                          inputProps={{
                            placeholder: formatMessage({
                              id: 'wantedBoard.selectPackaging',
                              defaultMessage: 'Select packaging'
                            }),
                            'data-test': 'wanted_board_sidebar_packaging_drpdn',
                            selection: true,
                            multiple: true
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn data-test='wanted_board_sidebar_maximumDeliveredPrice_inp'>
                        {inputWrapper(
                          'maximumDeliveredPrice',
                          {
                            min: 0,
                            type: 'number',
                            placeholder: '0.00'
                          },
                          <FormattedMessage id='wantedBoard.maxDeliveredPrice' defaultMessage='Max Delivered Price/LB'>
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
                            <FormattedMessage id='wantedBoard.specialNotes' defaultMessage='Special Notes'>
                              {text => text}
                            </FormattedMessage>
                          }
                          inputProps={{
                            'data-test': 'wanted_board_sidebar_specialNotes_inp',
                            placeholder: formatMessage({
                              id: 'wantedBoard.writeNotesHere',
                              defaultMessage: 'Write notes here'
                            })
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    {false /* temporary hidden */ && (
                      <>
                        <GridRow>
                          <GridColumn>
                            <CustomHr />
                          </GridColumn>
                        </GridRow>

                        <GridRow className='label-row'>
                          <GridColumn width={8}>
                            <FormattedMessage
                              id='wantedBoard.enableNotifications'
                              defaultMessage='Enable Notifications'>
                              {text => text}
                            </FormattedMessage>
                          </GridColumn>
                          <GridColumn width={8} className='float-right'>
                            <FormikCheckbox
                              inputProps={{
                                toggle: true,
                                style: { marginBottom: '-4px' },
                                float: 'right',
                                'data-test': 'wanted_board_sidebar_enableNotifications_chckb'
                              }}
                              name='notificationEnabled'
                            />
                          </GridColumn>
                        </GridRow>

                        <GridRow>
                          <GridColumn>
                            <FormikCheckbox
                              inputProps={{
                                disabled: !values.notificationEnabled,
                                'data-test': 'wanted_board_sidebar_notifyMail_chckb'
                              }}
                              name='notifyMail'
                              label={formatMessage({
                                id: 'wantedBoard.notifyMail',
                                defaultMessage: 'Email Notifications'
                              })}
                            />
                          </GridColumn>
                        </GridRow>

                        <GridRow>
                          <GridColumn>
                            <FormikCheckbox
                              inputProps={{
                                disabled: !values.notificationEnabled,
                                'data-test': 'wanted_board_sidebar_notifyMail_chckb'
                              }}
                              name='notifyPhone'
                              label={formatMessage({
                                id: 'wantedBoard.notifyPhone',
                                defaultMessage: 'Phone Notifications'
                              })}
                            />
                          </GridColumn>
                        </GridRow>
                      </>
                    )}
                  </Grid>
                </FlexContent>
                <BottomButtons className='bottom-buttons'>
                  <div>
                    {!openGlobalAddForm && (
                      <Button
                        size='large'
                        onClick={this.props.closeDetailSidebar}
                        data-test='wanted_board_sidebar_cancel_btn'>
                        {Object.keys(touched).length || this.state.changedForm
                          ? formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })
                          : formatMessage({ id: 'global.close', defaultMessage: 'Close' })}
                      </Button>
                    )}
                    <Button
                      disabled={!(Object.keys(touched).length || this.state.changedForm)}
                      primary
                      size='large'
                      type='button'
                      onClick={() => {
                        validateForm().then(err => {
                          const errors = Object.keys(err)
                          if (errors.length && errors[0] !== 'isCanceled') {
                            // Errors found
                            submitForm() // to show errors
                          } else {
                            // No errors found
                            this.submitForm(values, setSubmitting, setTouched)
                          }
                        })
                      }}
                      data-test='wanted_board_sidebar_save_btn'>
                      {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                    </Button>
                  </div>
                </BottomButtons>
              </FlexSidebar>
              <ErrorFocus />
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
  getProvinces,
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
    listCountriesLoading,
    countries,
    listProvinces,
    listProvincesLoading,
    listUnits,
    listUnitsLoading,
    loading,
    //  sidebarActiveTab,
    //  sidebarDetailOpen,
    sidebarValues,
    searchedManufacturers,
    searchedManufacturersLoading,
    searchedCasNumbers,
    searchedCasNumbersLoading
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
  listCountriesLoading,
  countries,
  listProvinces,
  listProvincesLoading,
  listUnits,
  listUnitsLoading,
  loading,
  //  sidebarActiveTab,
  //  sidebarDetailOpen,
  sidebarValues: sidebarValues ? sidebarValues.rawData : null,
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
