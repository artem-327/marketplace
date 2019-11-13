import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Form, Input, Checkbox as FormikCheckbox, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Field as FormikField } from 'formik'
import { bool, string, object, func, array } from 'prop-types'
import { debounce } from 'lodash'
import { getSafe } from '~/utils/functions'

import { withToastManager } from 'react-toast-notifications'

import {
  Button, Accordion,
  Segment, FormGroup,
  Icon, FormField,
  Checkbox, Grid,
  GridRow, GridColumn,
  Dropdown as SemanticDropdown,
  Transition, Header
} from 'semantic-ui-react'

import { uniqueArrayByKey } from '~/utils/functions'

import confirm from '~/src/components/Confirmable/confirm'

import { datagridValues, replaceAmbigiousCharacters, dateFormat, dateDropdownOptions, filterTypes } from '../constants/filter'
import { initialValues, validationSchema } from '../constants/validation'

import SavedFilters from './SavedFilters'
import Notifications from './Notifications'


import {
  FlexSidebar, FlexContent,
  FiltersContainer, AccordionTitle,
  AccordionItem, AccordionContent,
  WhiteSegment, GraySegment,
  Title, BottomMargedDropdown,
  LessPaddedRow, SaveFilterRow,
  SaveFilterTitle, SaveFilterClose,
  StyledGrid, SmallerTextColumn
} from '../constants/layout'

class Filter extends Component {

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
    isTyping: false
  }

  componentDidMount() {
    const {
      fetchProductConditions,
      fetchProductForms,
      fetchPackagingTypes,
      fetchWarehouseDistances,
      fetchProductGrade,
      fetchWarehouses,
      setParams
    } = this.props

    if (typeof this.props.searchWarehouseUrl !== 'undefined')
      this.props.getAutocompleteWarehouse(this.props.searchWarehouseUrl(''))

    this.handleGetSavedFilters()
    setParams({ currencyCode: this.props.preferredCurrency, filterType: this.props.filterType })

    Promise.all([
      this.fetchIfNoData(fetchProductConditions, 'productConditions'),
      this.fetchIfNoData(fetchProductForms, 'productForms'),
      this.fetchIfNoData(fetchPackagingTypes, 'packagingTypes'),
      this.fetchIfNoData(fetchWarehouseDistances, 'warehouseDistances'),
      this.fetchIfNoData(fetchProductGrade, 'productGrade'),
      this.fetchIfNoData(fetchWarehouses, 'warehouses')
    ]).finally(() => this.setState({ loaded: true }))


  }

  generateRequestData = ({ notifications, checkboxes, name, ...rest }) => {
    let { notificationMail } = notifications
    let { notifyMail, notifyPhone, notifySystem } = checkboxes
    let { filters } = this.toSavedFilter(rest)

    return {
      filters,
      name,
      notificationEnabled: notifyMail || notifyPhone || notifySystem,
      notificationMail,
      notifyMail, notifyPhone, notifySystem
    }
  }


  toSavedFilter = (inputs) => {
    let datagridFilter = {
      filters: []
    }

    let keys = Object.keys(inputs)

    keys.forEach((key) => {
      if (inputs[key] && inputs[key] !== '' && Object.keys(inputs[key]).length > 0) {

        if (datagridValues[key] && !!datagridValues[key].nested) {
          var ids = [], names = []

          // If nested (checkboxes) take their id's and push them to an array
          Object.keys(inputs[key]).forEach(k => {
            if (inputs[key][k]) {
              ids.push(inputs[key][k].id)
              names.push((inputs[key][k].name))
            }
          })

          if (ids.length > 0) datagridFilter.filters.push(datagridValues[key].toFilter(ids, names))
        }
        else {
          try {
            if (typeof datagridValues[key] !== 'undefined') {

              let filter = datagridValues[key] && datagridValues[key].toFilter(inputs[key], this.props.filterType)
              if (!(filter.values instanceof Array)) filter.values = [filter.values]  // We need values to be an array

              datagridFilter.filters.push(filter)
            }
          } catch (err) {
            console.error(err)
          }
        }
      }
    })

    return datagridFilter
  }

  toDatagridFilter = savedFilter => {
    let { filters, ...rest } = savedFilter

    return {
      filters: filters.map((filter) => ({ operator: filter.operator, path: filter.path, values: filter.values.map((val) => val.value) })),
      pageNumber: savedFilter.pageNumber,
      pageSize: 50
    }
  }


  handleSubmit = (params) => { // { setSubmitting }
    let { onApply, applyFilter } = this.props

    let filter = this.generateRequestData(params)

    applyFilter(filter)
    onApply(this.toDatagridFilter(filter))
  }

  handleFilterSave = (params) => {
    const { intl, toastManager } = this.props
    const { formatMessage } = intl
    let self = this

    async function callback(id) {
      let requestData = self.generateRequestData(params)

      if (id) await self.props.updateFilter(id, requestData)
      else {

        await self.props.saveFilter(self.props.savedUrl, {
          ...requestData, filters: requestData.filters.map((filter) => ({
            operator: filter.operator,
            path: filter.path,
            values: filter.values
          }))
        })
      }


      toastManager.add(<div>
        <strong><FormattedMessage id={`confirm.filter.${id ? 'updated' : 'saved'}`} values={{ name: params.name }} /></strong>
      </div>, { appearance: 'success', pauseOnHover: true })


      if (params.checkboxes.automaticallyApply) {
        let filter = self.toDatagridFilter(requestData)
        self.props.onApply(filter)
        self.props.applyFilter(requestData)
      }
    }

    let filter = this.props.savedFilters.find((filter) => filter.name === params.name)

    if (filter) {
      confirm(
        formatMessage({ id: 'confirm.filter.overwrite' }, { name: params.name }),
        formatMessage({ id: 'confirm.filter.overwriteContent' }))
        .then(() => {
          callback(filter.id)
        }).catch(() => { return })
    } else callback()
  }

  fetchIfNoData = (fn, propertyName) => {
    return new Promise((resolve) => {
      if (!this.props[propertyName] || this.props[propertyName].length === 0) return fn()
      else resolve()
    })
  }

  toggleFilter = savedFiltersActive => {
    if (this.state.savedFiltersActive !== savedFiltersActive)
      this.setState({ savedFiltersActive })
  }

  generateCheckboxes = (data, values, groupName = null) => {
    if (!data) return []
    let group = null

    if (groupName) group = `${groupName}.`

    let tmp = []
    var getCheckbox = (el, i) => {
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
            checked={!!values[groupName] && values[groupName][name]}
            name={path} label={el.name}
            data-test='filter_FormikField_change' />
        </FormField>
      )
    }

    for (let i = 0; i < (data.length / 2 - data.length % 2); i++) {
      tmp.push(
        <FormGroup widths='equal'>
          {/* First/Last Item Increasing/Decreasing according to index */}
          {[data[i], data[data.length - (i + 1)]].map((el, j) => getCheckbox(el, i + j))}
        </FormGroup>
      )
    }

    // Add last item, which is at index = middle of an array
    if (data.length % 2 === 1) {
      tmp.push(<FormGroup widths='equal'>{getCheckbox(data[Math.round(data.length / 2) - 1])}</FormGroup>)
    }


    return tmp
  }

  handleSavedFilterApply = async (filter, { setFieldValue, resetForm }) => {
    resetForm({ ...initialValues })

    let formikValues = {

    }

    let datagridKeys = Object.keys(datagridValues)

    let { filters, name, ...rest } = filter

    for (let i = 0; i < filters.length; i++) {
      datagridKeys.forEach(key => {
        let datagrid = datagridValues[key]
        if (datagrid.paths.includes(filters[i].path) && filters[i].operator === datagrid.operator) {
          formikValues[key] = datagrid.toFormik(filters[i], datagrid.nested && this.props[key])
        }
      })
    }

    let { notifyMail, notifyPhone, notifySystem, notificationMail } = rest

    formikValues = {
      name,
      checkboxes: {
        notifyMail,
        notifyPhone,
        notifySystem,
        notificationEnabled: notifyMail || notifyPhone || notifySystem
      },
      notifications: { notificationMail },
      ...formikValues
    }


    Object.keys(formikValues)
      .forEach(key => setFieldValue(key, formikValues[key]))

    this.handleSubmit(formikValues)
  }


  handleGetSavedFilters = () => {
    let { packagingTypes, productConditions, productGrade, productForms } = this.props
    this.props.getSavedFilters(this.props.savedUrl, { packagingTypes, productConditions, productGrade, productForms }, this.props.apiUrl, this.props.filterType)
  }


  toggleAccordion = (name) => {
    let { inactiveAccordion } = this.state
    let inactive = inactiveAccordion[name]
    this.setState({ inactiveAccordion: { ...this.state.inactiveAccordion, [name]: !inactive } })
  }

  handleSearch = debounce(({ searchQuery, name }) => {
    if (searchQuery.length > 1) {
      let params = { searchUrl: this.props.searchUrl(searchQuery), searchQuery }
      this.props.getAutocompleteData(params)
    }
  }, 250)

  handleSearchWarehouse = debounce(({ searchQuery, name }) => {
    if (searchQuery.length > 1) {
      this.props.getAutocompleteWarehouse(this.props.searchWarehouseUrl(searchQuery))
      this.setState({ searchWarehouseQuery: searchQuery })
    }

  }, 250)

  accordionTitle = (name, text) => (
    <AccordionTitle name={name} onClick={(e, { name }) => this.toggleAccordion(name)}>
      <Icon name={!this.state.inactiveAccordion[name] ? 'chevron down' : 'chevron right'} color={!this.state.inactiveAccordion[name] ? 'blue' : 'black'} />
      {text}
    </AccordionTitle>
  )

  toggleSaveFilter = (e) => {
    e.preventDefault()
    this.setState(prevState => ({ openedSaveFilter: !prevState.openedSaveFilter }))
  }

  dateField = (name, { values, setFieldValue, handleChange, min }) => {
    let inputName = `${name}${this.state.dateDropdown[name]}`

    return (
      <>
        <FormField>
          <Dropdown
            name={name}
            options={dateDropdownOptions}
            selection
            onChange={handleChange}
            inputProps={{
              'data-test': 'filter_dateField_drpdn',
              value: this.state.dateDropdown[name],
              onChange: (_, data) => {
                Object.keys(values)
                  .forEach(key => {
                    if (typeof values[key] === 'string' && values[key].startsWith(name)) setFieldValue(key, '')
                  })

                setFieldValue(inputName, '')
                this.setState((state) => ({
                  ...state,
                  dateDropdown: {
                    ...state.dateDropdown,
                    [name]: data.value
                  }
                }))
              }
            }} />
        </FormField>

        <FormField data-test='filter_dateField_inp'>
          <Input
            name={inputName}
            onChange={handleChange}
            inputProps={{
              //label: 'Days1',
              //labelPosition: 'right',
              type: 'number',
              min: min.toString()
            }}
          />
        </FormField>
      </>
    )
  }

  formSaveFilter = ({ values, setFieldError }) => {
    let { intl, isFilterSaving } = this.props

    const { formatMessage } = intl

    return (
      <>
        <Grid verticalAlign='top'>
          {/* Save Filter */}
          <SaveFilterRow>
            <GridColumn width={13}>
              <SaveFilterTitle><FormattedMessage id='filter.saveFilter' defaultMessage='Save Filter' /></SaveFilterTitle>
            </GridColumn>
            <GridColumn width={3} textAlign='right'>
              <SaveFilterClose name='close' size='large' onClick={this.toggleSaveFilter} />
            </GridColumn>
          </SaveFilterRow>

          <GridRow>
            <GridColumn computer={12} data-test='filter_name_inp'>
              <Input inputProps={{ placeholder: formatMessage({ id: 'filter.enterFilterName', defaultMessage: 'Enter Filter Name' }) }} name='name' fluid />
            </GridColumn>

            <GridColumn computer={4}>
              <Button onClick={(e) => {
                e.preventDefault()
                if (!values.name) setFieldError('name', <FormattedMessage id='validation.required' />)
                else this.handleFilterSave(values)
              }} positive basic loading={isFilterSaving} style={{ marginRight: '0' }}
                data-test='filter_name_save'>Save</Button>
            </GridColumn>
          </GridRow>

          <LessPaddedRow>
            <GridColumn computer={13}>
              <label>{formatMessage({ id: 'filter.automaticallyApply', defaultMessage: 'Automatically apply' })}</label>
            </GridColumn>
            <GridColumn computer={3}>
              <FormikCheckbox
                inputProps={{ toggle: true, style: { marginBottom: '-4px' } }}
                name='checkboxes.automaticallyApply'
              />
            </GridColumn>
          </LessPaddedRow>
        </Grid>
        <Notifications values={values} />
      </>
    )
  }

  // {"id":"431210","name":"1,2-dibromo-3,3,3-trifluoropropane","casNumber":"431-21-0"}
  //  {"id":"431210","name":"1,2-dibromo-3,3,3-trifluoropropane","casNumberCombined":"431-21-0"}

  getOptions = (options) => {

    return options.map(option => {
      let parsed = JSON.parse(option.value)

      return ({
        key: option.key,
        text: option.text,
        value: option.value,
        content: (
          <StyledGrid>
            <GridRow>
              <GridColumn computer={8}>
                {parsed.name}
              </GridColumn>

              <SmallerTextColumn computer={8} textAlign='right'>
                {parsed.casNumber}
              </SmallerTextColumn>
            </GridRow>
          </StyledGrid>
        )
      })
    })

  }

  formMarkup = ({ values, setFieldValue, handleChange, errors, setFieldError }) => {
    let {
      productConditions, productForms, packagingTypes,
      productGrade, intl, isFilterSaving,
      autocompleteData, autocompleteDataLoading,
      autocompleteWarehouse, autocompleteWarehouseLoading,
      layout, savedAutocompleteData
    } = this.props

    const { formatMessage } = intl

    let packagingTypesRows = this.generateCheckboxes(packagingTypes, values, 'packagingTypes')
    let productConditionRows = this.generateCheckboxes(productConditions, values, 'productConditions')
    let productGradeRows = this.generateCheckboxes(productGrade, values, 'productGrade')
    let productFormsRows = this.generateCheckboxes(productForms, values, 'productForms')

    var noResultsMessage = null

    if (this.state.searchQuery.length <= 1) noResultsMessage = <FormattedMessage id='filter.startTypingToSearch' defaultMessage='Start typing to search...' />
    if (autocompleteDataLoading) noResultsMessage = <FormattedMessage id='global.loading' defaultMessage='Loading' />

    let dropdownProps = {
      search: (val) => val,
      selection: true,
      multiple: true,
      fluid: true,
      options: this.getOptions(uniqueArrayByKey(autocompleteData.concat(savedAutocompleteData), 'key')),
      loading: autocompleteDataLoading,
      name: 'search',
      placeholder: <FormattedMessage id='filter.searchProducts' defaultMessage='Search Products' />,
      noResultsMessage,
      onSearchChange: (_, data) => this.handleSearch(data),
      value: values.search,
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : null),
    }

    let noWarehouseResultsMessage = null

    if (this.state.searchWarehouseQuery.length <= 1) noWarehouseResultsMessage = <FormattedMessage id='filter.startTypingToSearch' defaultMessage='Start typing to search...' />
    if (autocompleteWarehouseLoading) noWarehouseResultsMessage = <FormattedMessage id='global.loading' defaultMessage='Loading' />

    let dropdownWarehouseProps = {
      search: true,
      selection: true,
      multiple: false,
      fluid: true,
      clearable: true,
      options: autocompleteWarehouse.map((warehouse) => {
        let text
        warehouse.text ?
          text = warehouse.text
          :
          text = warehouse.name +
          (warehouse.deliveryAddress ?
            ', ' + warehouse.deliveryAddress.address.streetAddress +
            ', ' + warehouse.deliveryAddress.address.city +
            ', ' + warehouse.deliveryAddress.address.zip.zip +
            (
              warehouse.deliveryAddress.address.province ?
                ', ' + warehouse.deliveryAddress.address.province.name : ''
            ) +
            ', ' + warehouse.deliveryAddress.address.country.name
            :
            ''
          )
        return {
          key: warehouse.id,
          text: text,
          value: JSON.stringify({ id: warehouse.id, name: warehouse.name, text: text }),
        }
      }),
      loading: autocompleteWarehouseLoading,
      name: 'warehouse',
      placeholder: <FormattedMessage id='filter.searchWarehouse' defaultMessage='Search Warehouse' />,
      noWarehouseResultsMessage,
      onSearchChange: (_, data) => {
        this.handleSearchWarehouse(data)
      },
      value: values.warehouse,
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : null),
    }

    if (!autocompleteDataLoading) dropdownProps.icon = null
    if (!autocompleteWarehouseLoading) dropdownWarehouseProps.icon = null

    let currencySymbol = getSafe(() => this.props.preferredCurrency.symbol, '$')

    return (
      <Accordion>
        <Segment basic>
          <AccordionItem>
            {this.accordionTitle('chemicalType', <FormattedMessage id='filter.chemicalProductName' />)}
            <AccordionContent active={!this.state.inactiveAccordion.chemicalType}>
              <BottomMargedDropdown {...dropdownProps} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('quantity', <FormattedMessage id='filter.quantity' />)}
            <AccordionContent active={!this.state.inactiveAccordion.quantity}>
              <FormGroup widths='equal' data-test='filter_quantity_inp'>
                <Input inputProps={{
                  type: 'number',
                  placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }),
                  min: 1
                }}
                  label={<FormattedMessage id='filter.FromQuantity' defaultMessage='From' />}
                  name='quantityFrom' />
                <Input inputProps={{
                  type: 'number',
                  placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }),
                  min: 1
                }}
                  label={<FormattedMessage id='filter.ToQuantity' defaultMessage='To' />}
                  name='quantityTo' />
              </FormGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('price', <FormattedMessage id='filter.price' />)}
            <AccordionContent active={!this.state.inactiveAccordion.price}>
              <FormGroup>
                <FormField width={8} data-test='filter_price_inp'>
                  <Input inputProps={{
                    label: currencySymbol,
                    labelPosition: 'left',
                    type: 'number',
                    min: 0.01,
                    step: 0.01,
                    placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' })
                  }}
                    label={<FormattedMessage id='filter.FromPrice' defaultMessage='From Price' />}
                    name='priceFrom' />
                </FormField>

                <FormField width={8}>
                  <Input inputProps={{
                    label: currencySymbol,
                    labelPosition: 'left',
                    type: 'number',
                    min: 0.01,
                    step: 0.01,
                    placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' })
                  }}
                    label={<FormattedMessage id='filter.ToPrice' defaultMessage='To Price' />}
                    name='priceTo' />
                </FormField>
              </FormGroup>
            </AccordionContent>
          </AccordionItem>

          {(layout === 'MyInventory') && (<AccordionItem>
            {this.accordionTitle('warehouse', <FormattedMessage id='filter.warehouse' />)}
            <AccordionContent active={!this.state.inactiveAccordion.warehouse}>
              <BottomMargedDropdown {...dropdownWarehouseProps} />
            </AccordionContent>
          </AccordionItem>
          )}

          <AccordionItem>
            {this.accordionTitle('packaging', <FormattedMessage id='filter.packaging' />)}
            <AccordionContent active={!this.state.inactiveAccordion.packaging}>
              {packagingTypesRows}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('productGrades', <FormattedMessage id='filter.grade' defaultMessage='Grade' />)}
            <AccordionContent active={!this.state.inactiveAccordion.productGrades}>
              {productGradeRows}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('condition', <FormattedMessage id='filter.condition' defaultMessage='Condition' />)}
            <AccordionContent active={!this.state.inactiveAccordion.condition}>
              {productConditionRows}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('productForms', <FormattedMessage id='filter.form' defaultMessage='Form' />)}
            <AccordionContent active={!this.state.inactiveAccordion.productForms}>
              {productFormsRows}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('expiration', <FormattedMessage id='filter.expiration' defaultMessage='Days Until Expiration' />)}
            <AccordionContent active={!this.state.inactiveAccordion.expiration}>
              <FormGroup widths='equal'>
                {this.dateField('expiration', { values, setFieldValue, handleChange, min: 1 })}

              </FormGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('assay', <FormattedMessage id='filter.assay' />)}
            <AccordionContent active={!this.state.inactiveAccordion.assay}>
              <FormGroup widths='equal' data-test='filter_assay_inp'>
                <Input
                  inputProps={{ type: 'number', min: 0, placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }) }}
                  label={<FormattedMessage id='filter.Minimum(%)' defaultMessage='Minimum' />} name='assayFrom' />
                <Input
                  inputProps={{ type: 'number', min: 0, placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }) }}
                  label={<FormattedMessage id='filter.Maximum(%)' defaultMessage='Maximum' />} name='assayTo' />
              </FormGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('mfg', <FormattedMessage id='filter.mfg' defaultMessage='Days Since Manufacture Date' />)}
            <AccordionContent active={!this.state.inactiveAccordion.mfg}>
              <FormGroup widths='equal'>
                {this.dateField('mfg', { values, setFieldValue, handleChange, min: 0 })}
              </FormGroup>
            </AccordionContent>
          </AccordionItem>
        </Segment>
      </Accordion >
    )
  }

  render() {
    let {
      isOpen,
      width,
      direction,
      animation,
      additionalSidebarProps,
      isFilterApplying,
      intl: { formatMessage }
    } = this.props

    const {
      toggleFilter
    } = this.props

    return (

      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        validateOnChange={true}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          this.handleSubmit(values)
          setSubmitting(false)
        }}>
        {(props) => {
          this.submitForm = props.submitForm
          this.resetForm = props.resetForm
          this.setFieldValue = props.setFieldValue
          return (
            <FlexSidebar
              visible={isOpen}
              width={width}
              direction={direction}
              animation={animation}
              onHide={(e) => {
                // Workaround, close if you haven't clicked on calendar item or filter icon
                try {
                  if (e && (!(e.path[0] instanceof HTMLTableCellElement) && !(e.path[1] instanceof HTMLTableCellElement) && (!e.target || !e.target.className.includes('submenu-filter')))) {
                    toggleFilter(false)
                  }
                } catch (e) {
                  console.error(e)
                }
              }}
              {...additionalSidebarProps}>
              <FiltersContainer>
                <Button
                  type='button'
                  onClick={() => this.toggleFilter(false)}
                  primary={!this.state.savedFiltersActive}
                  data-test='filter_set_filters'>
                  {formatMessage({ id: 'filter.setFilters', defaultMessage: 'SET FILTERS' })}
                </Button>

                <Button
                  type='button'
                  onClick={() => this.toggleFilter(true)}
                  primary={this.state.savedFiltersActive}
                  data-test='filter_saved_filters'>
                  {formatMessage({ id: 'filter.savedFilter', defaultMessage: 'SAVED FILTERS' })}
                </Button>
              </FiltersContainer>
              <FlexContent>
                <Segment basic>
                  {!this.state.savedFiltersActive
                    ? this.formMarkup(props)
                    : (
                      <SavedFilters
                        params={this.props.params}
                        onApply={(filter) => this.handleSavedFilterApply(filter, props)}
                        savedFilters={this.props.savedFilters}
                        savedFiltersLoading={this.props.savedFiltersLoading}
                        getSavedFilters={this.handleGetSavedFilters}
                        deleteFilter={this.props.deleteFilter}
                        updateFilterNotifications={this.props.updateFilterNotifications}
                        savedFilterUpdating={this.props.savedFilterUpdating} />
                    )}
                </Segment>
              </FlexContent>
              <GraySegment basic>
                <Transition visible={this.state.openedSaveFilter} animation='fade down' duration={500}>
                  <WhiteSegment basic>
                    {this.formSaveFilter(props)}
                  </WhiteSegment>
                </Transition>
                <Grid>
                  <GridRow>
                    <GridColumn computer={6} textAlign='left'>
                      <Button
                        size='large'
                        onClick={this.toggleSaveFilter}
                        inputProps={{ type: 'button' }}
                        data-test='filter_save_new'>
                        {formatMessage({ id: 'filter.saveFilter', defaultMessage: 'Save Filter' })}
                      </Button>
                    </GridColumn>
                    <GridColumn computer={10} textAlign='right'>
                      <Button
                        type='button'
                        size='large'
                        onClick={(e, data) => {
                          this.resetForm({ ...initialValues })
                          toggleFilter(false)
                          this.props.onClear(e, data)
                        }}
                        inputProps={{ type: 'button' }}
                        data-test='filter_clear'>
                        {formatMessage({ id: 'filter.clearFilter', defaultMessage: 'Clear Filter' })}
                      </Button>
                      <Button
                        size='large'
                        loading={isFilterApplying}
                        primary
                        onClick={() => this.submitForm()}
                        inputProps={{ type: 'button' }}
                        data-test='filter_apply'>
                        {formatMessage({ id: 'global.apply', defaultMessage: 'Apply' })}
                      </Button>
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

Filter.propTypes = {
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
  filterType: string
}

Filter.defaultProps = {
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
  layout: '',
  filterType: filterTypes.INVENTORY
}

export default withToastManager(injectIntl(Filter))