import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Form, Input, Checkbox as FormikCheckbox, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Field as FormikField } from 'formik'
import { bool, string, object, func, array } from 'prop-types'
import { debounce } from 'lodash'
import { getSafe } from '~/utils/functions'

import { withToastManager } from 'react-toast-notifications'

import {
  Button,
  Accordion,
  Segment,
  FormGroup,
  Icon,
  FormField,
  Checkbox,
  Grid,
  GridRow,
  GridColumn,
  Dropdown as SemanticDropdown,
  Transition,
  Header,
  Dimmer,
  Label
} from 'semantic-ui-react'

import { uniqueArrayByKey } from '~/utils/functions'

import {
  datagridValues,
  replaceAmbigiousCharacters,
  dateFormat,
  dateDropdownOptions,
  filterTypes
} from '../constants/filter'

import {
  FlexSidebar,
  FlexContent,
  FiltersContainer,
  FilterAccordion,
  AccordionTitle,
  AccordionItem,
  AccordionContent,
  WhiteSegment,
  GraySegment,
  Title,
  BottomMargedDropdown,
  LessPaddedRow,
  SaveFilterButtonRow,
  SaveFilterTitle,
  SaveFilterClose,
  StyledGrid,
  SmallerTextColumn,
  TopButtons,
  BottomButtons,
  IconRight,
  DateInputStyledWrapper,
  SaveFiltersGrid,
  NormalColumn,
  SaveFilterNormalRow,
  InputWrapper,
  QuantityWrapper
} from '../constants/layout'

const initialValues = {

}

class WantedBoardFilter extends Component {
  state = {
    savedFiltersActive: false,
    openedSaveFilter: false,
    inactiveAccordion: {},
    dateDropdown: {
      expiration: dateDropdownOptions[0].value,
      mfg: dateDropdownOptions[0].value
    },
    searchQuery: '',
    searchWarehouseQuery: '',
    isTyping: false,
    searchManufacturerQuery: '',
    searchOriginQuery: ''
  }

  componentDidMount() {
    const {
      fetchProductConditions,
      fetchProductForms,
      fetchPackagingTypes,
      fetchWarehouseDistances,
      fetchProductGrade,
      fetchWarehouses,
      setParams,
      autocompleteManufacturer,
      autocompleteOrigin
    } = this.props

    setParams({ currencyCode: this.props.preferredCurrency, filterType: this.props.filterType })

    //this.fetchIfNoData(fetchProductConditions, 'productConditions')
    this.fetchIfNoData(fetchProductForms, 'productForms')
    //this.fetchIfNoData(fetchPackagingTypes, 'packagingTypes')
    //this.fetchIfNoData(fetchWarehouseDistances, 'warehouseDistances')
    this.fetchIfNoData(fetchProductGrade, 'productGrade')
    //this.fetchIfNoData(fetchWarehouses, 'warehouses')
  }

  fetchIfNoData = (fn, propertyName) => {
    return new Promise(resolve => {
      if (!this.props[propertyName] || this.props[propertyName].length === 0) return fn()
      else resolve()
    })
  }


  toggleAccordion = name => {
    let { inactiveAccordion } = this.state
    let inactive = inactiveAccordion[name]
    this.setState({ inactiveAccordion: { ...this.state.inactiveAccordion, [name]: !inactive } })
  }

  accordionTitle = (name, text) => (
    <AccordionTitle name={name} onClick={(e, { name }) => this.toggleAccordion(name)}>
      {text}
      <IconRight>
        <Icon
          name={!this.state.inactiveAccordion[name] ? 'chevron down' : 'chevron right'}
        />
      </IconRight>
    </AccordionTitle>
  )

  inputWrapper = (name, inputProps, label, labelText) => {
    return (
      <InputWrapper>
        {label && (<div className='field-label'>{label}</div>)}
        <div>
          <Input
            inputProps={inputProps}
            name={name}
          />
          <Label>{labelText}</Label>
        </div>
      </InputWrapper>
    )
  }

  quantityWrapper = (name, { values, setFieldValue, setFieldTouched, label }) => {
    return (
      <QuantityWrapper>
        {label && (<div className='field-label'>{label}</div>)}
        <div>
          <Input
            name={name}
            inputProps={{
              placeholder: '0',
              type: 'number'
            }}
          />
          <div className='sideButtons'>
            <Button
              type='button'
              className='buttonPlus'
              onClick={() => {
                if (isNaN(values[name]) || values[name] === '') {
                  setFieldValue(name, 1)
                  setFieldTouched(name, true, true)
                }
                else {
                  setFieldValue(name, parseInt(values[name]) + 1)
                  setFieldTouched(name, true, true)
                }
              }}
            >+</Button>
            <Button
              type='button'
              className='buttonMinus'
              onClick={() => {
                if (isNaN(values[name]) || values[name] === '' ) {
                  setFieldValue(name, 1)
                  setFieldTouched(name, true, true)
                }
                else {
                  const value = parseInt(values[name])
                  if (value > 1) setFieldValue(name, value - 1)
                  setFieldTouched(name, true, true)
                }
              }}
            >-</Button>
          </div>
        </div>
      </QuantityWrapper>
    )
  }

  generateCheckboxes = (data, values, groupName = null) => {
    if (!data) return []
    let group = null

    if (groupName) group = `${groupName}.`

    let tmp = []
    let getCheckbox = (el, i) => {
      let name = replaceAmbigiousCharacters(el.name)
      let path = `${group}${name}`

      return (
        <FormField key={i}>
          <FormikField
            onChange={(e, data) => {
              let { setFieldValue } = data.form
              setFieldValue(path, data.checked ? { id: el.id, name: el.name } : false)
            }}
            component={Checkbox}
            checked={!!values[groupName] && !!values[groupName][name]}
            name={path}
            label={el.name.charAt(0).toUpperCase() + el.name.slice(1)}
            data-test='filter_FormikField_change'
          />
        </FormField>
      )
    }

    let length = data.length
    let seeAllLength
    if (length > 6) {
      seeAllLength = length
      length = 6
    }
    else {
      seeAllLength = 0
    }

    for (let i = 0; i < length; i++) {
      tmp.push(
        <FormGroup>
          {/* First/Last Item Increasing/Decreasing according to index */}
          {getCheckbox(data[i], i)}
        </FormGroup>
      )
    }

    if (seeAllLength) {
      tmp.push(
        <div className='see-all'>
          <FormattedMessage id={'filter.seeAll'} values={{ value: seeAllLength }} />
        </div>
      )
    }

    return tmp
  }

  formMarkup = ({ values, setFieldValue, handleChange, errors, setFieldError, setFieldTouched }) => {
    let {
      productConditions,
      productForms,
      packagingTypes,
      productGrade,
      intl,
      isFilterSaving,
      autocompleteData,
      autocompleteDataLoading,
      autocompleteWarehouse,
      autocompleteWarehouseLoading,
      layout,
      savedAutocompleteData,
      autocompleteManufacturer,
      autocompleteManufacturerLoading,
      autocompleteOrigin,
      autocompleteOriginLoading
    } = this.props

    const { formatMessage } = intl

    let productGradeRows = this.generateCheckboxes(productGrade, values, 'productGrade')
    let productFormsRows = this.generateCheckboxes(productForms, values, 'productForms')

    let noResultsMessage = null

    let dropdownProps = {
      search: _ => options,
      selection: true,
      multiple: true,
      fluid: true,
      options: [],//! !options,
      loading: autocompleteDataLoading,
      name: 'search',
      placeholder: <FormattedMessage id='filter.enterAnyChemicalOrCas' defaultMessage='Enter any Chemical Name or CAS' />,
      noResultsMessage,
      onSearchChange: (_, data) => this.handleSearch(data),
      value: values.search,
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : [])
    }

    if (!autocompleteDataLoading) dropdownProps.icon = null

    let currencySymbol = getSafe(() => this.props.preferredCurrency.symbol, '$')

    return (
      <FilterAccordion>
        <AccordionItem>
          {this.accordionTitle('chemicalType', <FormattedMessage id='filter.keywordSearch' />)}
          <AccordionContent active={!this.state.inactiveAccordion.chemicalType}>
            <BottomMargedDropdown {...dropdownProps} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle('assay', <FormattedMessage id='filter.assay' />)}
          <AccordionContent active={!this.state.inactiveAccordion.assay}>
            <FormGroup data-test='filter_assay_inp'>
              <FormField width={8}>
                {this.inputWrapper(
                  'assayFrom',
                  {
                    type: 'number',
                    min: 0,
                    placeholder: '0.00',
                  },
                  <FormattedMessage id='filter.from' defaultMessage='From' />,
                  '%'
                )}
              </FormField>
              <FormField width={8}>
                {this.inputWrapper(
                  'assayTo',
                  {
                    type: 'number',
                    min: 0,
                    placeholder: '0.00',
                  },
                  <FormattedMessage id='filter.To' defaultMessage='To' />,
                  '%'
                )}
              </FormField>
            </FormGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle('quantity', <FormattedMessage id='filter.quantity' />)}
          <AccordionContent active={!this.state.inactiveAccordion.quantity}>
            <FormGroup widths='equal' data-test='filter_quantity_inp'>
              <FormField width={8}>
                {this.quantityWrapper(
                  'quantityFrom',
                  {
                    values,
                    setFieldValue,
                    setFieldTouched,
                    label: <FormattedMessage id='filter.FromQuantity' defaultMessage='From' />
                  }
                )}
              </FormField>
              <FormField width={8}>
                {this.quantityWrapper(
                  'quantityTo',
                  {
                    values,
                    setFieldValue,
                    setFieldTouched,
                    label: <FormattedMessage id='filter.ToQuantity' defaultMessage='To' />
                  }
                )}
              </FormField>
            </FormGroup>
          </AccordionContent>
        </AccordionItem>







        <AccordionItem>
          {this.accordionTitle('productGrades', <FormattedMessage id='filter.grade' defaultMessage='Grade' />)}
          <AccordionContent
            active={!this.state.inactiveAccordion.productGrades}
          >
            {productGradeRows}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle('productForms', <FormattedMessage id='filter.form' defaultMessage='Form' />)}
          <AccordionContent active={!this.state.inactiveAccordion.productForms}
          >
            {productFormsRows}
          </AccordionContent>
        </AccordionItem>
      </FilterAccordion>
    )
  }

  handleSubmit = params => {
    // { setSubmitting }
    let { onApply, applyFilter, applyDatagridFilter } = this.props

    //let filter = this.generateRequestData(params)
    //let datagridFilter = this.toDatagridFilter(filter)

    //applyFilter(filter)
    //applyDatagridFilter(datagridFilter)
    //onApply(datagridFilter)
  }

  render() {
    let {
      isOpen,
      width,
      direction,
      animation,
      additionalSidebarProps,
      isFilterApplying,
      isFilterSaving,
      intl: {formatMessage},
      toggleFilter
    } = this.props


    return (
      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        validateOnChange={true}
        onSubmit={(values, { setSubmitting }) => {
          this.handleSubmit(values)
          setSubmitting(false)
        }}>
        {props => {
          this.submitForm = props.submitForm
          this.resetForm = props.resetForm
          this.setFieldValue = props.setFieldValue
          return (
            <FlexSidebar
              {...additionalSidebarProps}>
              <FlexContent>
                {this.formMarkup(props)}
              </FlexContent>
              <BottomButtons>
                <Button
                  type='button'
                  size='large'
                  onClick={(e, data) => {
                    this.resetForm({ ...initialValues })
                    toggleFilter(false)
                    this.props.applyFilter({ filters: [] })
                    this.props.applyDatagridFilter({ filters: [] })
                    this.props.onClear(e, data)
                  }}
                  inputProps={{ type: 'button' }}
                  data-test='filter_clear'>
                  {formatMessage({ id: 'filter.clearFilter', defaultMessage: 'Clear Filter' })}
                </Button>
                <Button
                  size='large'
                  loading={isFilterApplying}
                  type='submit'
                  primary
                  inputProps={{ type: 'button' }}
                  data-test='filter_apply'>
                  {formatMessage({ id: 'filter.applyFilter', defaultMessage: 'Apply Filter' })}
                </Button>
              </BottomButtons>
            </FlexSidebar>
          )
        }}
      </Form>
    )
  }
}

WantedBoardFilter.propTypes = {
  isOpen: bool,
  width: string,
  direction: string,
  animation: string,
  additionalSidebarProps: object,
  onApply: func,
  onClear: func,
  filters: array,
  getAutocompleteData: func,
  autocompleteData: array,
  getAutocompleteWarehouse: func,
  autocompleteWarehouse: array,
  savedFilters: array,
  getSavedFilters: func,
  savedFiltersLoading: bool,
  savedUrl: string,
  searchUrl: func,
  searchWarehouseUrl: func,
  layout: string,
  filterType: string,
  autocompleteManufacturer: array,
  getAutocompleteManufacturer: func,
  searchManufacturerUrl: func,
  autocompleteOrigin: array,
  getAutocompleteOrigin: func,
  searchOriginUrl: func,
  getOriginUrl: string
}

WantedBoardFilter.defaultProps = {
  isOpen: false,
  width: 'very wide',
  direction: 'right',
  animation: 'overlay',
  additionalSidebarProps: {},
  filters: [],
  autocompleteData: [],
  autocompleteWarehouse: [],
  savedFilters: [],
  savedFiltersLoading: false,
  layout: 'MyInventory',
  filterType: filterTypes.WANTED_BOARD,
  autocompleteManufacturer: [],
  autocompleteOrigin: [],
  getOriginUrl: '/prodex/api/countries',
  savedUrl: '/prodex/api/product-offers/own/datagrid/saved-filters',
  searchUrl: text => `/prodex/api/company-products/own/search?pattern=${text}&onlyMapped=false`,
  searchWarehouseUrl: text => `/prodex/api/branches/warehouses/search?pattern=${text}`,
  searchManufacturerUrl: text => `/prodex/api/manufacturers/search?search=${text}`,
  onApply: filter => {},
  onClear: () => {},
}

export default injectIntl(WantedBoardFilter)