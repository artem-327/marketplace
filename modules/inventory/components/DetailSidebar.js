import React, { Component } from 'react'
import {connect} from "react-redux"
import { injectIntl, FormattedMessage } from 'react-intl'
import { Form, Button, Input, TextArea, Checkbox as FormikCheckbox, Dropdown, Radio } from 'formik-semantic-ui-fixed-validation'
import { DateInput } from '~/components/custom-formik'
import { getSafe } from '~/utils/functions'
import { bool, string, object, func, array } from 'prop-types'
import { debounce } from 'lodash'
import styled from "styled-components"
import { Sidebar, Segment, Tab, Menu, Grid, GridRow, GridColumn, Header, Icon, Popup, FormField, Input as SemanticInput } from 'semantic-ui-react'
import { withToastManager } from 'react-toast-notifications'
import {
  sidebarDetailTrigger, getAutocompleteData, getWarehouses, addProductOffer, getProductGrades,
  searchOrigins, getProductForms, getProductConditions, searchManufacturers, getDocumentTypes
} from '../actions'
import { Broadcast } from '~/modules/broadcast'
import { openBroadcast } from '~/modules/broadcast/actions'
import * as val from 'yup'
import { errorMessages, dateValidation } from '~/constants/yupValidation'
import moment from "moment"

export const FlexSidebar = styled(Sidebar)`
  display: flex;
  flex-direction: column;
  background-color: #fbfbfb;
  top: 105px !important;
  padding-bottom: 105px;
  box-shadow: -3px 4px 4px 0px rgba(0, 0, 0, 0.075);
  z-index: 4;
  text-align: left;
`

export const FlexTabs = styled.div`
  margin: 0 15px 0 0;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
  padding: 10px 0 15px 0;
  font-weight: bold;
  font-size: 1.1rem;
`

export const FlexContent = styled.div`
  flex: 1;
  overflow-y: auto;
`

const TopMargedColumn = styled(GridColumn)`
  margin-top: 6px !important;
`

export const GraySegment = styled(Segment)`
  background-color: #ededed !important;
`

const initValues = {
  edit: {
    product: null,
    fobPrice: null,
    cost: null,
    lotNumber: '',
    lotExpDate: '',
    lotMfgDate: '',
    pkgAvailable: 1,
    warehouse: '',
    productGrades: [],
    productForm: '',
    origin: '',
    productCondition: '',
    conditionNotes: '',
    inStock: false,
    leadTime: '',
    offerExpire: false,
    expirationDate: '',
    minimum: 1, // minPkg
    splits: 1, // splitPkg
    externalNotes: '',
    internalNotes: ''
  },
  priceTiers: {
    priceTiers: 1,
    pricingTiers: []
  }
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

const validationScheme = val.object().shape({
  edit: val.object().shape({
    product: val.number().typeError(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
    fobPrice: val.number().typeError(errorMessages.mustBeNumber).nullable().required(errorMessages.requiredMessage),
    lotNumber: val.string().typeError(errorMessages.requiredMessage).required(errorMessages.requiredMessage),
    inStock: val.bool().required(errorMessages.requiredMessage),
    minimum: val.number().typeError(errorMessages.mustBeNumber).required(errorMessages.requiredMessage),
    pkgAvailable: val.number().typeError(errorMessages.mustBeNumber).required(errorMessages.requiredMessage),
    splits: val.number().typeError(errorMessages.mustBeNumber).required(errorMessages.requiredMessage),
    warehouse: val.number(errorMessages.requiredMessage)
      .nullable(errorMessages.requiredMessage)
      .moreThan(0, errorMessages.requiredMessage)
      .required(errorMessages.requiredMessage)
  }),
  priceTiers: val.object().shape({
    priceTiers: val.number(),
    pricingTiers: val.array().of(val.object().uniqueProperty('quantityFrom', 'Quantity has to be unique').shape({
      quantityFrom: val.number().typeError(errorMessages.mustBeNumber).nullable()
        .moreThan(0, errorMessages.greaterThan(0)).required(errorMessages.requiredMessage),
      price: val.number().typeError(errorMessages.mustBeNumber).nullable()
        .moreThan(0, errorMessages.greaterThan(0)).required(errorMessages.requiredMessage).test('maxdec', errorMessages.maxDecimals(3), val => {
          return !val || val.toString().indexOf('.') === -1 || val.toString().split('.')[1].length <= 3
        }),
      manuallyModified: val.number().min(0).max(1)
    }))
  })
})

class DetailSidebar extends Component {

  state = {
    activeTab: 0
  }

  componentDidMount = () => {
    this.props.getProductConditions()
    this.props.getProductForms()
    this.props.getProductGrades()
    this.props.getWarehouses()
  }

  componentDidUpdate = (oldProps) => {
    if (getSafe(() => this.props.sidebarValues.id, false) && (oldProps.sidebarValues !== this.props.sidebarValues)) {
      this.props.getDocumentTypes()
      this.props.searchManufacturers('', 200)
      this.props.searchOrigins('', 200)
      if (this.props.sidebarValues.companyProduct)
        this.searchProducts(this.props.sidebarValues.companyProduct.intProductName)

      //this.props.openBroadcast(this.props.sidebarValues)
    }
  }

  formEdit = () => {
    return (
      <>

      </>
    )
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

  handleQuantities = (setFieldValue, values, splits, quantity = 0) => {
    // be sure that splits is integer and larger than 0
    splits = parseInt(splits)
    if (splits < 1 || isNaN(splits)) return false

    // correct quantity before anchor calculation
    if (quantity > 0) quantity -= splits

    const prices = getSafe(() => values.pricingTiers, [])

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

  onSplitsChange = debounce(async (value, values, setFieldValue, validateForm) => {
    value = parseInt(value)
    const minimum = parseInt(values.minimum)

    this.handleQuantities(setFieldValue, values, value)

    if (isNaN(value) || isNaN(minimum))
      return false

    if (values.minimumRequirement) {
      if (minimum !== value && ((minimum % value) !== 0)) {
        await setFieldValue('minimum', value)
      }
    } else {
      await setFieldValue('minimum', value)
    }
    validateForm()
  }, 250)

  renderPricingTiers = (count, setFieldValue) => {
    let tiers = []

    for (let i = 0; i < count; i++) {

      tiers.push(
        <Grid>
          <TopMargedColumn computer={2} textAlign='center'>
            <label name={`priceTiers.pricingTiers[${i}].level`}>{i + 1}</label>
          </TopMargedColumn>

          <TopMargedColumn computer={2}>
            <Icon name='greater than equal' />
          </TopMargedColumn>

          <GridColumn computer={5} data-test={`add_inventory_quantityFrom_${i}_inp`} >
            <Input name={`priceTiers.pricingTiers[${i}].quantityFrom`} inputProps={{
              type: 'number', min: 1, value: null, onChange: (e, { value }) => {
                setFieldValue(`tabs[2].pricingTiers[${i}].manuallyModified`, 1)
                if (i === 0) setFieldValue('minimum', value)
              }
            }} />
          </GridColumn>

          <GridColumn computer={5} data-test={`add_inventory_price_${i}_inp`} >
            <Input name={`priceTiers.pricingTiers[${i}].price`} inputProps={{ type: 'number', step: '0.001', min: 0.001, value: null }} />
          </GridColumn>

          <GridColumn computer={1} data-test={`add_inventory_manuallyModified_${i}_inp`} >
            <Input name={`priceTiers.pricingTiers[%{i}].manuallyModified`} inputProps={{ type: 'hidden', value: 0 }} />
          </GridColumn>
        </Grid>
      )
    }

    return (
      <>
        <Grid key={0}>
          <GridColumn computer={2}><FormattedMessage id='addInventory.level' defaultMessage='Level' /></GridColumn>
          <GridColumn computer={2} />
          <GridColumn computer={5}><FormattedMessage id='global.quantity' defaultMessage='Quantity' /></GridColumn>
          <GridColumn computer={5}><FormattedMessage id='addInventory.fobPrice' defaultMessage='FOB Price' /></GridColumn>
        </Grid>
        {tiers}
      </>
    )
  }

  searchProducts = debounce((text) => {
    this.props.getAutocompleteData({ searchUrl: `/prodex/api/company-products/own/search?pattern=${text}&onlyMapped=false` })
  }, 250)

  switchTab = (newTab) => {
    this.setState({
      activeTab: newTab
    })
  }

  render() {
    let {
      addProductOffer,
      listConditions,
      listForms,
      listGrades,
      sidebarDetailOpen,
      sidebarValues,
      searchedManufacturers,
      searchedManufacturersLoading,
      searchedOrigins,
      searchedOriginsLoading,
      searchedProducts,
      searchedProductsLoading,
      searchOrigins,
      warehousesList,
      intl: { formatMessage }
    } = this.props

    const leftWidth = 6
    const rightWidth = 10

    const {
      toggleFilter
    } = this.props

    let editValues = {}
    editValues = {
      edit: {
        conditionNotes: getSafe(() => sidebarValues.conditionNotes, ''),
        costPerUOM: getSafe(() => sidebarValues.costPerUOM, ''),
        externalNotes: getSafe(() => sidebarValues.externalNotes, ''),
        fobPrice: getSafe(() => sidebarValues.pricingTiers[0].pricePerUOM, ''),
        inStock: getSafe(() => sidebarValues.inStock, false),
        internalNotes: getSafe(() => sidebarValues.internalNotes, ''),
        leadTime: getSafe(() => sidebarValues.leadTime, 1),
        lotNumber: getSafe(() => sidebarValues.lotNumber, null),
        lotExpirationDate: getSafe(() => sidebarValues.lotExpirationDate.substring(0, 10), ''),
        lotManufacturedDate: getSafe(() => sidebarValues.lotManufacturedDate.substring(0, 10), ''),
        minimum: getSafe(() => sidebarValues.minPkg, 1),
        origin: getSafe(() => sidebarValues.origin.id, null),
        pkgAvailable: getSafe(() => sidebarValues.pkgAvailable, ''),
        product: getSafe(() => sidebarValues.companyProduct.id, null),
        productCondition: getSafe(() => sidebarValues.condition.id, null),
        productForm: getSafe(() => sidebarValues.form.id, null),
        productGrades: getSafe(() => sidebarValues.grades.map(grade => grade.id), []),
        splits: getSafe(() => sidebarValues.splitPkg, 1),
        doesExpire: getSafe(() => sidebarValues.validityDate.length > 0, false),
        expirationDate: getSafe(() => sidebarValues.validityDate.substring(0, 10), ''),
        warehouse: getSafe(() => sidebarValues.warehouse.id, null)
      },
      priceTiers: {
        priceTiers: getSafe(() => sidebarValues.pricingTiers.length, 0),
        pricingTiers: getSafe(() => sidebarValues.pricingTiers.map(priceTier => ({
          price: priceTier.pricePerUOM,
          quantityFrom: priceTier.quantityFrom
        })), [])
      }
    }

    return (
      <Form
        enableReinitialize={true}
        initialValues={{
          ...initValues,
          ...editValues
        }}
        validateOnChange={false}
        validationSchema={validationScheme}
        onSubmit={async (values, { setSubmitting }) => {
          let props = {}
          switch (this.state.activeTab) {
            case 0:
              props = {
                ...values.edit,
                expirationDate: values.edit.doesExpire ? values.edit.expirationDate+'T00:00:00.000Z' : null,
                leadTime: values.edit.leadTime,
                lotExpirationDate: values.edit.lotExpirationDate ? values.edit.lotExpirationDate+'T00:00:00.000Z' : null,
                lotNumber: values.edit.lotNumber,
                lotManufacturedDate: values.edit.lotManufacturedDate ? values.edit.lotManufacturedDate+'T00:00:00.000Z' : null,
                pkgAvailable: parseInt(values.edit.pkgAvailable),
                pricingTiers: values.priceTiers.pricingTiers.length ?
                  values.priceTiers.pricingTiers :
                  [{
                    quantityFrom: values.edit.minimum,
                    price: values.edit.fobPrice
                  }],
                productGrades: values.edit.productGrades.length ? values.edit.productGrades : []
              }
              break;
            case 2:
              props = values.priceTiers
              break;
          }

          try {
            await addProductOffer(props, getSafe(() => this.props.sidebarValues.id, null))
          } catch (e) { console.error(e) }
          finally { setSubmitting(false) }
        }}>
        {({values, setFieldValue, validateForm, submitForm}) => {

          return (
            <FlexSidebar
              visible={sidebarDetailOpen}
              width='very wide'
              direction='right'
              animation='overlay'
              onHide={(e) => {
                // Workaround, close if you haven't clicked on calendar item or filter icon
                try {
                  if (e && (!(e.path[0] instanceof HTMLTableCellElement) && !(e.path[1] instanceof HTMLTableCellElement) && (!e.target || !e.target.className.includes('submenu-filter')))) {
                    toggleFilter(false)
                  }
                } catch (e) {
                  console.error(e)
                }
              }}>
              <FlexContent>
                <Segment basic>
                  <FlexTabs>
                    <Tab className='inventory-sidebar tab-menu flex stretched'
                         menu={{ secondary: true, pointing: true }}
                         renderActiveOnly={false}
                         activeIndex={this.state.activeTab}
                         panes={[
                           {
                             menuItem: (
                               <Menu.Item key='edit' onClick={() => {
                                 validateForm()
                                   .then(r => {
                                     // stop when errors found
                                     if (Object.keys(r).length) {
                                       submitForm() // show errors
                                       return false
                                     }

                                     // if validation is correct - switch tabs
                                     this.switchTab(0)
                                   })
                                   .catch(e => {
                                     console.log('CATCH', e)
                                   })
                               }}
                                          data-test='detail_inventory_tab_edit'>
                                 {formatMessage({ id: 'global.edit', defaultMessage: 'Edit' })}
                               </Menu.Item>
                             ),
                             pane: (
                               <Tab.Pane key='edit' style={{ padding: '18px' }}>
                                 <Grid>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='addInventory.companyProduct' defaultMessage='Company Product'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <Dropdown
                                         name='edit.product'
                                         options={this.props.autocompleteData.map((el) => ({
                                           key: el.id,
                                           text: `${getSafe(() => el.intProductCode, '')} ${getSafe(() => el.intProductName, '')}`,
                                           value: el.id
                                         }))}
                                         inputProps={{
                                           placeholder: <FormattedMessage id='global.startTypingToSearch' defaultMessage='Start typing to begin search' />,
                                           loading: this.props.autocompleteDataLoading,
                                           'data-test': 'new_inventory_product_search_drpdn',
                                           style: { width: '300px' },
                                           size: 'large',
                                           minCharacters: 3,
                                           icon: 'search',
                                           search: options => options,
                                           selection: true,
                                           clearable: true,
                                           onSearchChange: (e, { searchQuery }) => searchQuery.length > 2 && this.searchProducts(searchQuery)
                                         }}
                                       />
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='global.fobPrice' defaultMessage='FOB Price'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <FormField width={16} data-test='detail_sidebar_fob_price' >
                                         <Input
                                           name='edit.fobPrice'
                                           inputProps={{ type: 'number' }} />
                                       </FormField>
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='global.cost' defaultMessage='Cost'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <FormField width={16} data-test='detail_sidebar_cost' >
                                         <Input
                                           name='edit.costPerUOM'
                                           inputProps={{ type: 'number' }} />
                                       </FormField>
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn>
                                       <Segment style={{ margin: '0 -1em' }}>
                                         <Header as='h3'><FormattedMessage id='global.lot' defaultMessage='Lot' /></Header>
                                         <Grid>
                                           <GridRow>
                                             <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                               <FormattedMessage id='global.lotNumber' defaultMessage='Lot #'>{text => text}</FormattedMessage>
                                             </GridColumn>
                                             <GridColumn mobile={rightWidth} computer={rightWidth}>
                                               <Input type="text" name="edit.lotNumber" />
                                             </GridColumn>
                                           </GridRow>
                                           <GridRow>
                                             <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                               <FormattedMessage id='global.expDate' defaultMessage='Exp Date'>{text => text}</FormattedMessage>
                                             </GridColumn>
                                             <GridColumn mobile={rightWidth} computer={rightWidth}>
                                               <DateInput
                                                 inputProps={{ 'data-test': 'sidebar_detail_lot_exp_date' }}
                                                 name='edit.lotExpirationDate' />
                                             </GridColumn>
                                           </GridRow>
                                           <GridRow>
                                             <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                               <FormattedMessage id='global.mfgDate' defaultMessage='Mfg Date'>{text => text}</FormattedMessage>
                                             </GridColumn>
                                             <GridColumn mobile={rightWidth} computer={rightWidth}>
                                               <DateInput
                                                 inputProps={{ 'data-test': 'sidebar_detail_lot_mfg_date', maxDate: moment() }}
                                                 name='edit.lotManufacturedDate' />
                                             </GridColumn>
                                           </GridRow>
                                         </Grid>
                                       </Segment>
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='addInventory.pkgsAvailable' defaultMessage='Pkgs Available'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <Input type='text'
                                              name='edit.pkgAvailable' />
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='global.warehouse' defaultMessage='Warehouse'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <Dropdown
                                         name='edit.warehouse'
                                         options={warehousesList}
                                         inputProps={{
                                           selection: true,
                                           value: 0,
                                           'data-test': 'new_inventory_warehouse_drpdn'
                                         }} />
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='addInventory.grades' defaultMessage='Grades'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <Dropdown
                                         name='edit.productGrades'
                                         options={listGrades}
                                         inputProps={{ 'data-test': 'new_inventory_grade_drpdn', selection: true, multiple: true }} />
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='addInventory.form' defaultMessage='Form'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <Dropdown
                                         name='edit.productForm'
                                         options={listForms}
                                         inputProps={{ 'data-test': 'new_inventory_form_drpdn' }} />
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='addInventory.origin' defaultMessage='Origin'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <Dropdown
                                         name='edit.origin'
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
                                           onSearchChange: debounce((e, { searchQuery }) => searchOrigins(searchQuery), 250)
                                         }}
                                       />
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='addInventory.condition' defaultMessage='Condition'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <Dropdown
                                         name='edit.productCondition'
                                         options={listConditions}
                                         inputProps={{ 'data-test': 'new_inventory_condition_drpdn' }} />
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='addInventory.conditionNotes' defaultMessage='Condition Notes'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <FormField width={16} data-test='detail_sidebar_condition_notes' >
                                         <Input
                                           type='text'
                                           name='edit.conditionNotes' />
                                       </FormField>
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='global.inStock' defaultMessage='In Stock'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <Grid>
                                         <GridColumn computer={5} tablet={8}>
                                           <Radio fieldProps={{ width: 5 }} label={formatMessage({ id: 'global.no', defaultMessage: 'No' })} value={false} name='edit.inStock' data-test='add_inventory_instock_no_rad' />
                                         </GridColumn>
                                         <GridColumn computer={5} tablet={8}>
                                           <Radio fieldProps={{ width: 5 }} label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })} value={true} name='edit.inStock' data-test='add_inventory_instock_yes_rad' />
                                         </GridColumn>
                                       </Grid>
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='global.leadTime' defaultMessage='Lead Time'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth - 5} computer={rightWidth - 5}>
                                       <Input name='edit.leadTime'
                                              inputProps={{ type: 'number' }} />
                                     </GridColumn>
                                     <GridColumn mobile={5} computer={5} verticalAlign='middle'>
                                       <FormattedMessage id='global.days' defaultMessage='Days'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='global.offerExpiration' defaultMessage='Offer Expiration'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <Grid>
                                         <GridColumn computer={5} tablet={8}>
                                           <Radio fieldProps={{ width: 5 }} label={formatMessage({ id: 'global.no', defaultMessage: 'No' })} value={false} name='edit.doesExpire' data-test='add_inventory_expire_no_rad' />
                                         </GridColumn>
                                         <GridColumn computer={5} tablet={8}>
                                           <Radio fieldProps={{ width: 5 }} label={formatMessage({ id: 'global.yes', defaultMessage: 'Yes' })} value={true} name='edit.doesExpire' data-test='add_inventory_expire_yes_rad' />
                                         </GridColumn>
                                       </Grid>
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='addInventory.offerExpirationDate' defaultMessage='Offer Expiration Date'>{text => text}</FormattedMessage>
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth}>
                                       <DateInput
                                         inputProps={{ disabled: !values.edit.doesExpire, 'data-test': 'sidebar_detail_expiration_date' }}
                                         name='edit.expirationDate' />
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='global.minimumPkgs' defaultMessage='Minimum PKGs' />
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth} data-test='add_inventory_product_minimumOQ_inp'>
                                       <Input
                                         name='edit.minimum'
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
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth} computer={leftWidth} verticalAlign='middle'>
                                       <FormattedMessage id='global.splitPkgs' defaultMessage='Split PKGs' />
                                     </GridColumn>
                                     <GridColumn mobile={rightWidth} computer={rightWidth} data-test='add_inventory_product_splits_inp' >
                                       <Input
                                         name='edit.splits'
                                         inputProps={{
                                           type: 'number',
                                           min: 1,
                                           onChange: (e, { value }) => this.onSplitsChange(value, values, setFieldValue, validateForm)
                                         }} />
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth + rightWidth} computer={leftWidth + rightWidth}>
                                  <TextArea
                                    name='edit.externalNotes'
                                    label={formatMessage({ id: 'addInventory.externalNotes', defaultMessage: 'External Notes' })}
                                  />
                                     </GridColumn>
                                   </GridRow>
                                   <GridRow>
                                     <GridColumn mobile={leftWidth + rightWidth} computer={leftWidth + rightWidth}>
                                  <TextArea
                                    name='edit.internalNotes'
                                    label={formatMessage({ id: 'addInventory.internalNotes', defaultMessage: 'Internal Notes' })}
                                  />
                                     </GridColumn>
                                   </GridRow>
                                 </Grid>
                               </Tab.Pane>
                             )
                           },
                           {
                             menuItem: (
                               <Menu.Item key='priceBook' onClick={() => {
                                 validateForm()
                                   .then(r => {
                                     // stop when errors found
                                     if (Object.keys(r).length) {
                                       submitForm() // show errors
                                       return false
                                     }

                                     // if validation is correct - switch tabs
                                     this.switchTab(1)
                                   })
                                   .catch(e => {
                                     console.log('CATCH', e)
                                   })
                               }}
                                          data-test='detail_inventory_tab_priceBook'>
                                 {formatMessage({ id: 'global.priceBook', defaultMessage: 'Price Book' })}
                               </Menu.Item>
                             ),
                             pane: (
                               <Tab.Pane key='priceBook' style={{ padding: '18px' }}>
                                 {false ? (<Broadcast />) : null}
                               </Tab.Pane>
                             )
                           },
                           {
                             menuItem: (
                               <Menu.Item key='priceTiers' onClick={() => {
                                 validateForm()
                                   .then(r => {
                                     // stop when errors found
                                     if (Object.keys(r).length) {
                                       submitForm() // show errors
                                       return false
                                     }

                                     // if validation is correct - switch tabs
                                     this.switchTab(2)
                                   })
                                   .catch(e => {
                                     console.log('CATCH', e)
                                   })
                               }}
                                          data-test='detail_inventory_tab_priceTiers'>
                                 {formatMessage({ id: 'global.priceTiers', defaultMessage: 'Price Tiers' })}
                               </Menu.Item>
                             ),
                             pane: (
                               <Tab.Pane key='priceTiers' style={{ padding: '18px' }}>
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
                                 <Dropdown
                                   label={formatMessage({ id: 'addInventory.priceTiers', defaultMessage: 'Price Tiers' })}
                                   name='priceTiers.priceTiers'
                                   options={this.getPriceTiers(10)}
                                   inputProps={{
                                     'data-test': 'new_inventory_price_tiers_drpdn',
                                     fluid: true,
                                     onChange: (e, { value }) => {
                                       let pricingTiers = values.priceTiers.pricingTiers.slice()
                                       let difference = value - pricingTiers.length
                                       if (difference < 0) pricingTiers.splice(pricingTiers.length - value)
                                       else for (let i = 0; i < difference; i++) pricingTiers.push({ price: 0.001, quantityFrom: 1 })
                                       setFieldValue('pricingTiers', pricingTiers)
                                     }
                                   }}
                                 />
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
                                 {/* <Grid> */}
                                 {this.renderPricingTiers(values.priceTiers.priceTiers, setFieldValue)}
                                 {/* </Grid> */}
                               </Tab.Pane>
                             )
                           }
                         ]} />
                  </FlexTabs>
                </Segment>
              </FlexContent>
              <GraySegment basic style={{ position: 'relative', overflow: 'visible', height: '4.57142858em', margin: '0' }}>
                <Grid>
                  <GridRow>
                    <GridColumn computer={6} textAlign='left'>
                      <Button
                        size='large'
                        inputProps={{ type: 'button' }}
                        onClick={() => {
                          this.props.sidebarDetailTrigger(null, false)
                        }}
                        data-test='sidebar_inventory_cancel'>
                        {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
                      </Button>
                    </GridColumn>
                    <GridColumn computer={10} textAlign='right'>
                      <Button.Submit
                        size='large'
                        inputProps={{ type: 'button' }}
                        data-test='sidebar_inventory_save_new'>
                        {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                      </Button.Submit>
                    </GridColumn>
                  </GridRow>
                </Grid>
              </GraySegment>
            </FlexSidebar>
          )
        }}
      </Form>
    )
  }
}

const mapDispatchToProps = {
  sidebarDetailTrigger,
  getAutocompleteData,
  getDocumentTypes,
  addProductOffer,
  getProductConditions,
  getProductForms,
  getProductGrades,
  getWarehouses,
  searchManufacturers,
  searchOrigins,
  openBroadcast
}

const mapStateToProps = ({ simpleAdd: {
  autocompleteData,
  autocompleteDataLoading,
  listConditions,
  listForms,
  listGrades,
  sidebarDetailOpen,
  sidebarValues,
  searchedManufacturers,
  searchedManufacturersLoading,
  searchedOrigins,
  searchedOriginsLoading,
  searchedProducts,
  searchedProductsLoading,
  warehousesList
} }) => ({
  autocompleteData,
  autocompleteDataLoading,
  listConditions,
  listForms,
  listGrades,
  sidebarDetailOpen,
  sidebarValues,
  searchedManufacturers,
  searchedManufacturersLoading,
  searchedOrigins,
  searchedOriginsLoading,
  searchedProducts,
  searchedProductsLoading,
  warehousesList
})

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(injectIntl(DetailSidebar)))