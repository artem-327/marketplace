import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Button, Input, TextArea, Dropdown, Checkbox as FormikCheckbox } from 'formik-semantic-ui-fixed-validation'
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
  Dimmer,
  Loader,
  Grid,
  GridRow,
  GridColumn,
} from 'semantic-ui-react'

import {
  myOffersSidebarTrigger,
  getAutocompleteData,
  getPackagingTypes,
  getWarehouses,
  getCountries,
  getProductGrades,
  getUnits,
  getProductForms,
  getProductConditions,
  searchManufacturers,
  closeDetailSidebar,
  editMyPurchaseOffer,
  updateEditedId
} from '../../actions'



import {
  FlexSidebar,
  FlexContent,
  HighSegment,
  BottomButtons,
} from '../../constants/layout'

import { listFrequency } from '../../constants/constants'

const initValues = {
  product: '',
  pricePerUOM: '',
  manufacturers: '',
  conditionConforming: '',
  packagingTypes: '',
  expiresAt: '',
  measurement: 7      // pounds [lb]
}

const validationSchema = () =>
  val.lazy(values => {
    return val.object().shape({
        product: val
          .number()
          .typeError(errorMessages.requiredMessage)
          .required(errorMessages.requiredMessage),
        pricePerUOM: val
          .number()
          .positive(errorMessages.positive)
          .moreThan(0, errorMessages.greaterThan(0))
          .typeError(errorMessages.mustBeNumber)
          .test('maxdec', errorMessages.maxDecimals(3), val => {
            return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
          })
          .required(errorMessages.requiredMessage),
        ...(values.expiresAt.length && {
          expiresAt: val.string()
            .test('minDate', errorMessages.dateNotInPast, function(date) {
              const enteredDate = moment(getStringISODate(date)).endOf('day').format()
              return enteredDate >= moment().endOf('day').format()
            }),
        }),
      }
    )
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
    this.fetchIfNoData('listUnits', this.props.getUnits)
    this.props.searchManufacturers('', 200)
    this.props.updateEditedId(this.props.sidebarValues.id)
    this.setState({ sidebarValues: this.props.sidebarValues})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.editInitTrig !== this.props.editInitTrig) {
      const { intl } = this.props
      let { formatMessage } = intl
      const { touched, validateForm, submitForm, values, setSubmitting, setTouched } = this.formikProps
      if (_.isEmpty(touched)) {
        this.props.updateEditedId(this.props.sidebarValues.id)
        this.setState({ sidebarValues: this.props.sidebarValues})
      } else {
        // Form edited
        validateForm().then(err => {
          const errors = Object.keys(err)
          if (errors.length && errors[0] !== 'isCanceled') {
            submitForm() // to show errors
          } else {
            confirm(
              formatMessage({
                id: 'confirm.global.unsavedChanges.header',
                defaultMessage: 'Unsaved changes'
              }),
              formatMessage({
                id: 'confirm.global.unsavedChanges.content',
                defaultMessage: 'You have unsaved changes. Do you wish to save them?'
              })
            )
            .then(
              async () => {
                // Confirm
                if (await this.submitForm(values, setSubmitting, setTouched).sendSuccess) {
                  this.setState({sidebarValues: this.props.sidebarValues})
                  this.props.updateEditedId(this.props.sidebarValues.id)
                }
              },
              () => {
                // Cancel
                this.setState({ sidebarValues: this.props.sidebarValues})
                this.props.updateEditedId(this.props.sidebarValues.id)
              }
            )
            .catch(() => {})
          }
        })
      }
    }
  }

  fetchIfNoData = (name, fn) => {
    if (this.props[name].length === 0) fn()
  }

  searchProducts = debounce(text => {
    this.props.getAutocompleteData({
      searchUrl: `/prodex/api/echo-products/search/include-alternative-names?pattern=${text}`
    })
  }, 250)

  searchManufacturers = debounce(text => {
    this.props.searchManufacturers(text, 5)
  }, 250)

  submitForm = async (values, setSubmitting, setTouched) => {
    const { editMyPurchaseOffer, datagrid } = this.props
    const { sidebarValues } = this.state
    let sendSuccess = false

    let expiresAt = null
    if (values.expiresAt) {
      expiresAt = moment(getStringISODate(values.expiresAt)).endOf('day').format()
    }

    let body = {
      expiresAt,
      pricePerUOM: values.pricePerUOM
    }
    try {
      if (sidebarValues) {
        const response = await editMyPurchaseOffer(sidebarValues.id, body)
        sendSuccess = true
        datagrid.updateRow(sidebarValues.id, () => response.value.data)

      } else {
        //const response = await addMyPurchaseOffer(body)
      }
      this.props.closeDetailSidebar()
    } catch (e) {}
    setSubmitting(false)
    return { sendSuccess }
  }

  getInitialFormValues = () => {
    const { sidebarValues } = this.state
    let initialValues = {
      ...this.state.initValues,
      ...(sidebarValues
          ? {
            product: getSafe(() => sidebarValues.productOffer.companyProduct.echoProduct.id, ''),
            pricePerUOM: getSafe(() => sidebarValues.pricePerUOM, ''),
            manufacturers: getSafe(() => sidebarValues.productOffer.companyProduct.echoProduct.manufacturer.id, ''),
            conditionConforming: getSafe(() => sidebarValues.productOffer.conforming, ''),
            packagingTypes: getSafe(() => sidebarValues.productOffer.companyProduct.packagingType.id, ''),
            measurement: getSafe(() => sidebarValues.productOffer.companyProduct.packagingUnit.id, ''),
            expiresAt: getSafe(() => sidebarValues.expiresAt, ''),
          }
          : null
      )
    }
    if (initialValues.expiresAt) {
      initialValues.expiresAt = moment(initialValues.expiresAt).format(getLocaleDateFormat())
    }
    return initialValues
  }

  render() {
    let {
      listPackagingTypes,
      listPackagingTypesLoading,
      listUnits,
      listUnitsLoading,
      loading,
      searchedManufacturers,
      searchedManufacturersLoading,
      intl: { formatMessage },
      toastManager,
      currencySymbol
    } = this.props

    return (
      <Formik
        enableReinitialize
        initialValues={this.getInitialFormValues()}
        validationSchema={validationSchema()}
        onSubmit={async (values, { setSubmitting, setTouched }) => {
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
                      <GridColumn>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.productName'
                              defaultMessage='Product Name'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='product'
                          options={this.props.autocompleteData}
                          inputProps={{
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectProduct'
                                defaultMessage='Select Product'
                              />
                            ),
                            loading: this.props.autocompleteDataLoading,
                            'data-test': 'my_offer_product_search_drpdn',
                            size: 'large',
                            minCharacters: 1,
                            icon: 'search',
                            search: options => options,
                            selection: true,
                            disabled: true,
                            onSearchChange: (e, { searchQuery }) =>
                              searchQuery.length > 0 && this.searchProducts(searchQuery)
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        {inputWrapper(
                          'pricePerUOM',
                          {
                            min: 0,
                            type: 'number',
                            placeholder: '0.000',
                            'data-test': 'my_offer_fob_price_inp'
                          },
                          <FormattedMessage
                            id='wantedBoard.fobPrice'
                            defaultMessage='FOB Price'
                          >
                            {text => text}
                          </FormattedMessage>,
                          currencySymbol
                        )}
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
                                defaultMessage='Select Manufacturer'
                              />
                            ),
                            loading: searchedManufacturersLoading,
                            'data-test': 'my_offer_manufacturer_drpdn',
                            size: 'large',
                            icon: 'search',
                            search: options => options,
                            selection: true,
                            multiple: false,
                            disabled: true,
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
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectCondition'
                                defaultMessage='Select Condition'
                              />
                            ),
                            'data-test': 'my_offer_conforming_drpdn',
                            selection: true,
                            clearable: true,
                            disabled: true,
                          }}
                        />
                      </GridColumn>
                      <GridColumn  width={8}>
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
                                defaultMessage='Select Packaging'
                              />
                            ),
                            'data-test': 'my_offer_packaging_drpdn',
                            selection: true,
                            multiple: false,
                            disabled: true,
                            loading: listPackagingTypesLoading
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
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
                            'data-test': 'my_offer_measurement_drpdn',
                            selection: true,
                            disabled: true,
                            loading: listUnitsLoading
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <DateInput
                          name='expiresAt'
                          label={
                            <FormattedMessage
                              id='wantedBoard.expirationDate'
                              defaultMessage='Expiration Date'>
                              {text => text}
                            </FormattedMessage>
                          }
                          inputProps={{
                            'data-test': 'my_offer_expiration_date_inp',
                            placeholder:
                              formatMessage({
                                id: 'date.standardPlaceholder',
                                defaultMessage: '00/00/0000'
                              }),
                            minDate: moment(),
                            clearable: true
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
                      inputProps={{
                        type: 'button',
                        'data-test': 'my_offer_close_btn',
                      }}
                      onClick={() => this.props.closeDetailSidebar()}
                      data-test='sidebar_inventory_cancel'>
                      {Object.keys(touched).length || this.state.changedForm
                        ? formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })
                        : formatMessage({ id: 'global.close', defaultMessage: 'Close' })}
                    </Button>
                    <Button
                      disabled={!(Object.keys(touched).length || this.state.changedForm)}
                      inputProps={{
                        'data-test': 'my_offer_save_btn',
                      }}
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
                      }}>
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
  myOffersSidebarTrigger,
  getAutocompleteData,
  getProductConditions,
  getPackagingTypes,
  getUnits,
  searchManufacturers,
  closeDetailSidebar,
  editMyPurchaseOffer,
  updateEditedId
}

const mapStateToProps = ({
  wantedBoard: {
    editInitTrig,
    autocompleteData,
    autocompleteDataLoading,
    listPackagingTypes,
    listPackagingTypesLoading,
    listUnits,
    listUnitsLoading,
    loading,
    sidebarValues,
    searchedManufacturers,
    searchedManufacturersLoading,
  }
}) => ({
  editInitTrig,
  autocompleteData,
  autocompleteDataLoading,
  listPackagingTypes,
  listPackagingTypesLoading,
  listUnits,
  listUnitsLoading,
  loading,
  sidebarValues,
  searchedManufacturers,
  searchedManufacturersLoading,
  currencySymbol: '$'
})

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(withToastManager(injectIntl(DetailSidebar))))