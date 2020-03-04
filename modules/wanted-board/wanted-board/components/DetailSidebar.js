import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Button, Input, TextArea, Dropdown, Checkbox as FormikCheckbox } from 'formik-semantic-ui-fixed-validation'
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
  Dimmer,
  Loader,
  Grid,
  GridRow,
  GridColumn,
} from 'semantic-ui-react'

import {
  //sidebarDetailTrigger,
  getAutocompleteData,
  getPackagingTypes,
  getWarehouses,
  getCountries,
  getProductGrades,
  getProductForms,
  getProductConditions,
  searchManufacturers,
  closeDetailSidebar,
} from '../../actions'



import {
  FlexSidebar,
  FlexContent,
  HighSegment,
  BottomButtons,
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
      listPackagingTypes,
      listForms,
      listCountries,
      loading,
      sidebarValues,
      searchedManufacturers,
      intl: { formatMessage },
      toastManager,
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
                              id='wantedBoard.searchProduct'
                              defaultMessage='Search Product'>
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
                                id='wantedBoard.keyword'
                                defaultMessage='Keyword'
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
                        {quantityWrapper(
                          'assayMin',
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
                          'assayMax',
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
                            'data-test': 'new_inventory_grade_drpdn',
                            selection: true,
                            multiple: true
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
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
                                defaultMessage='Select condition'
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
                      <GridColumn>
                        <Dropdown
                          label={
                            <FormattedMessage
                              id='global.origin'
                              defaultMessage='Country of Origin'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='origins'
                          options={listCountries}
                          inputProps={{
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectCountryOfOrigin'
                                defaultMessage='Select country of origin'
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
                            placeholder: (
                              <FormattedMessage
                                id='wantedBoard.selectForm'
                                defaultMessage='Select form'
                              />
                            ),
                            'data-test': 'new_inventory_grade_drpdn',
                            selection: true,
                            multiple: true
                          }}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow className='label-row'>
                      <GridColumn>
                        <FormattedMessage id='wantedBoard.quantityLbs' defaultMessage='Quantity(LBS)'>
                          {text => text}
                        </FormattedMessage>
                      </GridColumn>
                    </GridRow>
                    <GridRow className='light-labels'>
                      <GridColumn width={8}>
                        {quantityWrapper(
                          'quantityFrom',
                          {
                            min: 0,
                            type: 'number',
                            placeholder: '0'
                          },
                          this.formikProps
                          ,
                          <FormattedMessage
                            id='global.from'
                            defaultMessage='From'
                          >
                            {text => text}
                          </FormattedMessage>
                        )}
                      </GridColumn>
                      <GridColumn width={8}>
                        {quantityWrapper(
                          'quantityTo',
                          {
                            min: 0,
                            type: 'number',
                            placeholder: '0'
                          },
                          this.formikProps
                          ,
                          <FormattedMessage
                            id='global.to'
                            defaultMessage='To'
                          >
                            {text => text}
                          </FormattedMessage>
                        )}
                      </GridColumn>
                    </GridRow>

                    <GridRow className='label-row'>
                      <GridColumn>
                        <FormattedMessage id='wantedBoard.fobPrice' defaultMessage='FOB Price'>
                          {text => text}
                        </FormattedMessage>
                      </GridColumn>
                    </GridRow>
                    <GridRow className='light-labels'>
                      <GridColumn width={8}>
                        {inputWrapper(
                          'priceFrom',
                          {
                            min: 0,
                            type: 'number',
                            placeholder: '0'
                          },
                          <FormattedMessage
                            id='global.from'
                            defaultMessage='From'
                          >
                            {text => text}
                          </FormattedMessage>,
                          currencySymbol
                        )}
                      </GridColumn>
                      <GridColumn width={8}>
                        {inputWrapper(
                          'priceTo',
                          {
                            min: 0,
                            type: 'number',
                            placeholder: '0'
                          },
                          <FormattedMessage
                            id='global.to'
                            defaultMessage='To'
                          >
                            {text => text}
                          </FormattedMessage>,
                          currencySymbol
                        )}
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <DateInput
                          label={
                            <FormattedMessage
                              id='wantedBoard.neededBy'
                              defaultMessage='Needed By'>
                              {text => text}
                            </FormattedMessage>
                          }
                          name='neededAt'
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
                        <CustomHr/>
                      </GridColumn>
                    </GridRow>

                    <GridRow className='label-row'>
                      <GridColumn width={8}>
                        <FormattedMessage id='wantedBoard.enableNotifications' defaultMessage='Enable Notifications'>
                          {text => text}
                        </FormattedMessage>
                      </GridColumn>
                      <GridColumn width={8} className='float-right'>
                        <FormikCheckbox
                          inputProps={{ toggle: true, style: { marginBottom: '-4px' }, float: 'right' }}
                          name='notificationEnabled'
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <FormikCheckbox
                          inputProps={{
                            disabled: !values.notificationEnabled,
                            'data-test': 'filter_notifications_notifyMail_chckb'
                          }}
                          name='notifyMail'
                          label={formatMessage({id: 'wantedBoard.notifyMail', defaultMessage: 'Email Notifications'})}
                        />
                      </GridColumn>
                    </GridRow>

                    <GridRow>
                      <GridColumn>
                        <FormikCheckbox
                          inputProps={{
                            disabled: !values.notificationEnabled,
                            'data-test': 'filter_notifications_notifyMail_chckb'
                          }}
                          name='notifyPhone'
                          label={formatMessage({id: 'wantedBoard.notifyPhone', defaultMessage: 'Phone Notifications'})}
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
  //  sidebarValues,
    searchedManufacturers,
    searchedManufacturersLoading,
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
//  sidebarValues,
  searchedManufacturers,
  searchedManufacturersLoading,
//  editProductOfferInitTrig,
  currencySymbol: '$'
})

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(withToastManager(injectIntl(DetailSidebar))))