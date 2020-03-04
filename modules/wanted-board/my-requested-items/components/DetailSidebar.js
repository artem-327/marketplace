import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Button, Input, TextArea, Dropdown, Checkbox as FormikCheckbox, Radio } from 'formik-semantic-ui-fixed-validation'
import { Form } from 'semantic-ui-react'
import { Formik } from 'formik'
import { DateInput } from '~/components/custom-formik'
import { getSafe, generateToastMarkup, uniqueArrayByKey } from '~/utils/functions'
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
  //addProductOffer,
  getProductGrades,
  //searchOrigins,
  getProductForms,
  getProductConditions,
  searchManufacturers,
  //addAttachment,
  //loadFile,
  //removeAttachmentLink,
  //removeAttachment,
  //downloadAttachment,
  closeDetailSidebar,
  //getProductOffer
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

const CustomHr = styled.hr`
  border: solid 0.5px #dee2e6;
  margin: 0.285714286em 0 0 0;
`

const initValues = {
  product: null,
  assayMin: '',
  assayMax: '',
  quantityFrom: '',
  quantityTo: '',
  priceFrom: '',
  priceTo: '',
  neededAt: '',
  notificationEnabled: false,
  notifyMail: false,
  notifyPhone: false,
  packagingTypes: [],
  manufacturers: [],
  conditionConforming: null,
  origins: [],
  forms: [],
}

const validationScheme = val.object().shape({

  }
)

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

const listFrequency = [
  {
    key: 1,
    text: <FormattedMessage id='wantedBoard.oneTime' defaultMessage='One Time' />,
    value: 1
  },
  {
    key: 2,
    text: <FormattedMessage id='wantedBoard.biWeekly' defaultMessage='Bi Weekly' />,
    value: 2
  },
  {
    key: 3,
    text: <FormattedMessage id='wantedBoard.monthly' defaultMessage='Monthly' />,
    value: 3
  },
  {
    key: 4,
    text: <FormattedMessage id='wantedBoard.biMonthly' defaultMessage='Bi Monthly' />,
    value: 4
  },
  {
    key: 5,
    text: <FormattedMessage id='wantedBoard.yearly' defaultMessage='Yearly' />,
    value: 5
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


  render() {
    let {
      // addProductOffer,
      listPackagingTypes,
      listConditions,
      listForms,
      listGrades,
      listWarehouses,
      listCountries,
      loading,
      // openBroadcast,
      // sidebarDetailOpen,
      sidebarValues,
      searchedManufacturers,
      searchedManufacturersLoading,
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
        validationSchema={validationScheme}
        onSubmit={async (values, { setSubmitting, setTouched }) => {
          //! !this.submitForm(values, setSubmitting, setTouched)
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
                      <GridColumn width={16}>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.productName'
                              defaultMessage='Product Name'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='product'
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
                      <GridColumn width={8}>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.casNumber'
                              defaultMessage='CAS Number'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='product'
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
                                id='wantedBoard.enterCasNumber'
                                defaultMessage='Enter CAS Number'
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
                      <GridColumn width={8}>
                        <Input
                          label={
                            <FormattedMessage
                              id='wantedBoard.assay'
                              defaultMessage='Assay'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='assay'
                          inputProps={{
                            min: 0,
                            type: 'number',
                            placeholder:
                              formatMessage({
                                id: 'wantedBoard.selectAssay',
                                defaultMessage: 'Select Assay'
                              })
                          }}
                          />
                      </GridColumn>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={8}>
                        {quantityWrapper(
                          'quantity',
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
                      <GridColumn width={8}>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='wantedBoard.orderFrequency'
                              defaultMessage='Order Frequency'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='orderFrequency'
                          options={listFrequency}
                          inputProps={{
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectFrequency'
                                defaultMessage='Select Frequency'
                              />
                            ),
                            'data-test': 'new_inventory_grade_drpdn',
                            selection: true,
                            clearable: true
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
                          name='deliveryLocation'
                          options={listPackagingTypes}
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
                          label={' picasi '}
                          name='deliveryState'
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
                        <FormattedMessage id='wantedBoard.neededBy' defaultMessage='ENeeded By'>
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
                          name='neededBy'
                          value='now'
                          label={formatMessage({ id: 'wantedBoard.now', defaultMessage: 'Now' })}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Radio
                          name='requireExpire'
                          value='no'
                          label={formatMessage({ id: 'wantedBoard.no', defaultMessage: 'No' })}
                        />
                      </GridColumn>
                    </GridRow>
                    <GridRow>
                      <GridColumn width={8}>
                        <Radio
                          name='neededBy'
                          value='now'
                          label={formatMessage({ id: 'wantedBoard.byDate', defaultMessage: 'By Date' })}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <Radio
                          name='requireExpire'
                          value='no'
                          label={formatMessage({ id: 'wantedBoard.yes', defaultMessage: 'Yes' })}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn width={8}>
                        <DateInput
                          name='neededBy'
                          inputProps={{
                            'data-test': 'new_inventory_grade_drpdn',
                            placeholder:
                              formatMessage({
                                id: 'date.standardPlaceholder',
                                defaultMessage: '00/00/0000'
                              }),
                            clearable: true
                          }}
                        />
                      </GridColumn>
                      <GridColumn width={8}>
                        <DateInput
                          name='expire'
                          inputProps={{
                            'data-test': 'new_inventory_grade_drpdn',
                            placeholder:
                              formatMessage({
                                id: 'date.standardPlaceholder',
                                defaultMessage: '00/00/0000'
                              }),
                            clearable: true
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
                            'data-test': 'new_inventory_grade_drpdn',
                            selection: true,
                            multiple: true,
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectManufacturer'
                                defaultMessage='Select manufacturer'
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
                          name='origin'
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
                          name='grade'
                          options={listForms}
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
                          'maxDeliveredPrice',
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
                      onClick={() =>
                        validateForm().then(r => {
                          if (Object.keys(r).length && this.state.activeTab !== 1) {
                            //this.switchToErrors(r)
                            //submitForm() // to show errors
                          } else {
                            //this.submitForm(values, setSubmitting, setTouched)
                          }
                        })
                      }
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
  searchManufacturers,
  //searchOrigins,
  //openBroadcast,
  //addAttachment,
  //loadFile,
  //removeAttachmentLink,
  //removeAttachment,
  //downloadAttachment,
  closeDetailSidebar,
  //getProductOffer
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
    //  loading,
    //  sidebarActiveTab,
    //  sidebarDetailOpen,
    //  sidebarValues,
    searchedManufacturers,
    searchedManufacturersLoading,
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
//  loading,
//  sidebarActiveTab,
//  sidebarDetailOpen,
//  sidebarValues,
  searchedManufacturers,
  searchedManufacturersLoading,
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