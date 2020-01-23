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
  Header
} from 'semantic-ui-react'

import { uniqueArrayByKey } from '~/utils/functions'

import confirm from '~/src/components/Confirmable/confirm'

import {
  datagridValues,
  replaceAmbigiousCharacters,
  dateFormat,
  dateDropdownOptions,
  filterTypes
} from '../constants/filter'
import { initialValues, validationSchema } from '../constants/validation'

import SavedFilters from './SavedFilters'
import Notifications from './Notifications'

import {
  FlexSidebar,
  FlexContent,
  FiltersContainer,
  AccordionTitle,
  AccordionItem,
  AccordionContent,
  WhiteSegment,
  GraySegment,
  Title,
  BottomMargedDropdown,
  LessPaddedRow,
  SaveFilterRow,
  SaveFilterTitle,
  SaveFilterClose,
  StyledGrid,
  SmallerTextColumn
} from '../constants/layout'

class InventoryFilter extends Component {
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
      fetchManufacturer,
      setParams
    } = this.props

    if (typeof this.props.searchWarehouseUrl !== 'undefined')
      this.props.getAutocompleteWarehouse(this.props.searchWarehouseUrl(''))

    if (typeof this.props.searchManufacturerUrl !== 'undefined')
      this.props.getAutocompleteManufacturer(this.props.searchManufacturerUrl(''))

    this.handleGetSavedFilters()
    setParams({ currencyCode: this.props.preferredCurrency, filterType: this.props.filterType })

    Promise.all([
      this.fetchIfNoData(fetchProductConditions, 'productConditions'),
      this.fetchIfNoData(fetchProductForms, 'productForms'),
      this.fetchIfNoData(fetchPackagingTypes, 'packagingTypes'),
      this.fetchIfNoData(fetchWarehouseDistances, 'warehouseDistances'),
      this.fetchIfNoData(fetchProductGrade, 'productGrade'),
      this.fetchIfNoData(fetchWarehouses, 'warehouses'),
      this.fetchIfNoData(fetchManufacturer, 'manufacturer')
    ]).finally(() => this.setState({ loaded: true }))
  }

  generateRequestData = ({ notifications, checkboxes, name, ...rest }) => {
    let { notificationMail, notificationPhone } = notifications
    let { notifyMail, notifyPhone, notifySystem, notificationEnabled } = checkboxes
    let { filters } = this.toSavedFilter(rest)

    return {
      filters,
      name,
      notificationEnabled: notificationEnabled,
      ...(notificationMail === undefined || notificationMail === '' ? null : { notificationMail }),
      ...(notificationPhone === undefined || notificationPhone === '' ? null : { notificationPhone }),
      notifyMail,
      notifyPhone,
      notifySystem
    }
  }

  toSavedFilter = inputs => {
    let datagridFilter = {
      filters: []
    }

    let keys = Object.keys(inputs)

    keys.forEach(key => {
      if (
        (inputs[key] || inputs[key] === false) &&
        inputs[key] !== '' &&
        (Object.keys(inputs[key]).length > 0 || typeof inputs[key] === 'boolean')
      ) {
        if (datagridValues[key] && !!datagridValues[key].nested) {
          var ids = [],
            names = []

          // If nested (checkboxes) take their id's and push them to an array

          Object.keys(inputs[key]).forEach(k => {
            if (inputs[key][k]) {
              ids.push(inputs[key][k].id)
              names.push(inputs[key][k].name)
            }
          })
          if (ids.length > 0) {
            datagridFilter.filters.push(datagridValues[key].toFilter(ids, names))
          }
        } else {
          try {
            if (typeof datagridValues[key] !== 'undefined') {
              let filter = datagridValues[key] && datagridValues[key].toFilter(inputs[key], this.props.filterType)
              if (!(filter.values instanceof Array)) filter.values = [filter.values] // We need values to be an array

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
      filters: filters.map(filter => ({
        operator: filter.operator,
        path: filter.path,
        values: filter.values.map(val => val.value)
      })),
      pageNumber: savedFilter.pageNumber,
      pageSize: 50
    }
  }

  handleSubmit = params => {
    // { setSubmitting }
    let { onApply, applyFilter } = this.props

    let filter = this.generateRequestData(params)

    applyFilter(filter)
    onApply(this.toDatagridFilter(filter))
  }

  handleFilterSave = params => {
    const { intl, toastManager } = this.props
    const { formatMessage } = intl
    let self = this

    async function callback(id) {
      let requestData = self.generateRequestData(params)

      try {
        if (id) await self.props.updateFilter(id, requestData)
        else {
          await self.props.saveFilter(self.props.savedUrl, {
            ...requestData,
            filters: requestData.filters.map(filter => ({
              operator: filter.operator,
              path: filter.path,
              values: filter.values
            }))
          })
        }

        toastManager.add(
          <div>
            <strong>
              <FormattedMessage id={`confirm.filter.${id ? 'updated' : 'saved'}`} values={{ name: params.name }} />
            </strong>
          </div>,
          { appearance: 'success', pauseOnHover: true }
        )

        if (params.checkboxes.automaticallyApply) {
          let filter = self.toDatagridFilter(requestData)
          self.props.onApply(filter)
          self.props.applyFilter(requestData)
        }
      } catch (err) {}
    }

    let filter = this.props.savedFilters.find(filter => filter.name === params.name)

    if (filter) {
      confirm(
        formatMessage({ id: 'confirm.filter.overwrite' }, { name: params.name }),
        formatMessage({ id: 'confirm.filter.overwriteContent' })
      )
        .then(() => {
          callback(filter.id)
          this.setState({ openedSaveFilter: false })
        })
        .catch(() => {
          return
        })
    } else {
      callback()
      this.setState({ openedSaveFilter: false })
    }
  }

  fetchIfNoData = (fn, propertyName) => {
    return new Promise(resolve => {
      if (!this.props[propertyName] || this.props[propertyName].length === 0) return fn()
      else resolve()
    })
  }

  toggleFilter = savedFiltersActive => {
    if (this.state.savedFiltersActive !== savedFiltersActive)
      this.setState({ savedFiltersActive, openedSaveFilter: false })
    else this.setState({ openedSaveFilter: false })
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
            checked={!!values[groupName] && !!values[groupName][name]}
            name={path}
            label={el.name}
            data-test='filter_FormikField_change'
          />
        </FormField>
      )
    }

    for (let i = 0; i < data.length / 2 - (data.length % 2); i++) {
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

    let formikValues = {}

    let datagridKeys = Object.keys(datagridValues)

    let { filters, name, ...rest } = filter

    for (let i = 0; i < filters.length; i++) {
      datagridKeys.forEach(key => {
        let datagrid = datagridValues[key]
        console.log('filters[i]====================================')
        console.log(filters[i])
        console.log('====================================')
        console.log('datagrid====================================')
        console.log(datagrid)
        console.log('====================================')
        console.log('datagrid.paths.includes(filters[i].path)====================================')
        console.log(datagrid.paths.includes(filters[i].path))
        console.log('====================================')
        console.log('filters[i].operator====================================')
        console.log(filters[i].operator)
        console.log('====================================')
        console.log('datagrid.operator====================================')
        console.log(datagrid.operator)
        console.log('====================================')
        if (datagrid.paths.includes(filters[i].path) && filters[i].operator === datagrid.operator) {
          console.log('datagrid.nested====================================')
          console.log(datagrid.nested)
          console.log('====================================')
          console.log('this.props[key]====================================')
          console.log(this.props[key])
          console.log('====================================')
          formikValues[key] = datagrid.toFormik(filters[i], datagrid.nested && this.props[key])

          console.log('formikValues[key]====================================')
          console.log(formikValues[key])
          console.log('====================================')
        }
      })
    }
    console.log('formikValues====================================')
    console.log(formikValues)
    console.log('====================================')

    let { notifyMail, notifyPhone, notifySystem, notificationMail, notificationPhone } = rest

    formikValues = {
      name,
      checkboxes: {
        notifyMail,
        notifyPhone,
        notifySystem,
        notificationEnabled: notifyMail || notifyPhone || notifySystem
      },
      notifications: { notificationMail, notificationPhone },
      ...formikValues
    }

    Object.keys(formikValues).forEach(key => {
      console.log('key====================================')
      console.log(key)
      console.log('====================================')
      console.log('formikValues[key]12====================================')
      console.log(formikValues[key])
      console.log('====================================')

      setFieldValue(key, formikValues[key])
    })

    this.toggleFilter(false)

    this.handleSubmit(formikValues)
  }

  handleGetSavedFilters = () => {
    let { packagingTypes, productConditions, productGrade, productForms } = this.props
    this.props.getSavedFilters(
      this.props.savedUrl,
      { packagingTypes, productConditions, productGrade, productForms },
      this.props.apiUrl,
      this.props.filterType
    )
  }

  toggleAccordion = name => {
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

  handleSearchManufacturer = debounce(({ searchQuery, name }) => {
    if (searchQuery.length > 1) {
      this.props.getAutocompleteManufacturer(this.props.searchManufacturerUrl(searchQuery))
      this.setState({ searchManufacturerQuery: searchQuery })
    }
  }, 250)

  handleSearchOrigin = debounce(({ searchQuery, name }) => {
    if (searchQuery.length > 1) {
      this.props.getAutocompleteOrigin(this.props.searchOriginUrl(searchQuery))
      this.setState({ searchOriginQuery: searchQuery })
    }
  }, 250)

  accordionTitle = (name, text) => (
    <AccordionTitle name={name} onClick={(e, { name }) => this.toggleAccordion(name)}>
      <Icon
        name={!this.state.inactiveAccordion[name] ? 'chevron down' : 'chevron right'}
        color={!this.state.inactiveAccordion[name] ? 'blue' : 'black'}
      />
      {text}
    </AccordionTitle>
  )

  toggleSaveFilter = () => {
    //e.preventDefault()
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
                Object.keys(values).forEach(key => {
                  if (typeof values[key] === 'string' && values[key].startsWith(name)) setFieldValue(key, '')
                })

                setFieldValue(inputName, '')
                this.setState(state => ({
                  ...state,
                  dateDropdown: {
                    ...state.dateDropdown,
                    [name]: data.value
                  }
                }))
              }
            }}
          />
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

  formSaveFilter = formikProps => {
    let { intl } = this.props
    let { values } = formikProps
    const { formatMessage } = intl

    return (
      <>
        <Grid verticalAlign='top'>
          {/* Save Filter */}
          <SaveFilterRow>
            <GridColumn width={13}>
              <SaveFilterTitle>
                <FormattedMessage id='filter.saveFilter' defaultMessage='Save Filter' />
              </SaveFilterTitle>
            </GridColumn>
            <GridColumn width={3} textAlign='right'>
              <SaveFilterClose name='close' size='large' onClick={this.toggleSaveFilter} />
            </GridColumn>
          </SaveFilterRow>

          <GridRow>
            <GridColumn computer={16} data-test='filter_name_inp'>
              <Input
                inputProps={{
                  placeholder: formatMessage({ id: 'filter.enterFilterName', defaultMessage: 'Enter Filter Name' })
                }}
                name='name'
                fluid
              />
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
        <Notifications values={values} formikProps={formikProps} />
      </>
    )
  }

  // {"id":"431210","name":"1,2-dibromo-3,3,3-trifluoropropane","casNumber":"431-21-0"}
  //  {"id":"431210","name":"1,2-dibromo-3,3,3-trifluoropropane","casNumberCombined":"431-21-0"}

  getOptions = options => {
    return options.map(option => {
      let parsed = JSON.parse(option.value)
      return {
        key: option.key,
        text: option.text,
        value: option.value,
        content: (
          <StyledGrid>
            <GridRow>
              <GridColumn computer={8}>{parsed.name}</GridColumn>

              <SmallerTextColumn computer={8} textAlign='right'>
                {parsed.casNumber}
              </SmallerTextColumn>
            </GridRow>
          </StyledGrid>
        )
      }
    })
  }

  formMarkup = ({ values, setFieldValue, handleChange, errors, setFieldError }) => {
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

    const optionsYesNo = [
      {
        text: <FormattedMessage id='global.selectOption' defaultMessage='Select Option' />
      },
      {
        key: 1,
        text: <FormattedMessage id='global.yes' defaultMessage='Yes' />,
        value: true
      },
      {
        key: 0,
        text: <FormattedMessage id='global.no' defaultMessage='No' />,
        value: false
      }
    ]

    const { formatMessage } = intl

    let packagingTypesRows = this.generateCheckboxes(packagingTypes, values, 'packagingTypes')
    let productConditionRows = this.generateCheckboxes(productConditions, values, 'productConditions')
    let productGradeRows = this.generateCheckboxes(productGrade, values, 'productGrade')
    let productFormsRows = this.generateCheckboxes(productForms, values, 'productForms')

    var noResultsMessage = null

    if (this.state.searchQuery.length <= 1)
      noResultsMessage = <FormattedMessage id='filter.startTypingToSearch' defaultMessage='Start typing to search...' />
    if (autocompleteDataLoading) noResultsMessage = <FormattedMessage id='global.loading' defaultMessage='Loading' />

    let dropdownProps = {
      search: _ => this.getOptions(autocompleteData),
      selection: true,
      multiple: true,
      fluid: true,
      options: this.getOptions(uniqueArrayByKey(autocompleteData, 'key')),
      loading: autocompleteDataLoading,
      name: 'search',
      placeholder: <FormattedMessage id='filter.searchProducts' defaultMessage='Search Products' />,
      noResultsMessage,
      onSearchChange: (_, data) => this.handleSearch(data),
      value: values.search,
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : [])
    }

    let noWarehouseResultsMessage = null

    if (this.state.searchWarehouseQuery.length <= 1)
      noWarehouseResultsMessage = (
        <FormattedMessage id='filter.startTypingToSearch' defaultMessage='Start typing to search...' />
      )
    if (autocompleteWarehouseLoading)
      noWarehouseResultsMessage = <FormattedMessage id='global.loading' defaultMessage='Loading' />

    let dropdownWarehouseProps = {
      search: true,
      selection: true,
      multiple: false,
      fluid: true,
      clearable: true,
      options: autocompleteWarehouse.map(warehouse => {
        console.log('warehouse====================================')
        console.log(warehouse)
        console.log('====================================')
        if (warehouse.text) {
          console.log('warehouse.text====================================')
          console.log(warehouse.text)
          console.log('====================================')
          var { text } = warehouse
        } else {
          var text = warehouse.deliveryAddress
            ? `${warehouse.deliveryAddress.address.streetAddress}, ${warehouse.deliveryAddress.address.city}, ${
                warehouse.deliveryAddress.address.zip.zip
              }${
                warehouse.deliveryAddress.address.province ? `, ${warehouse.deliveryAddress.address.province.name}` : ''
              }, ${warehouse.deliveryAddress.address.country.name}`
            : ''
        }

        return {
          key: warehouse.id,
          text: text,
          value: JSON.stringify({ id: warehouse.id, name: warehouse.name, text: text })
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
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : null)
    }

    let noManufacturerResultsMessage = null
    if (this.state.searchManufacturerQuery.length <= 1)
      noManufacturerResultsMessage = (
        <FormattedMessage id='filter.startTypingToSearch' defaultMessage='Start typing to search...' />
      )
    if (autocompleteManufacturerLoading)
      noManufacturerResultsMessage = <FormattedMessage id='global.loading' defaultMessage='Loading' />

    let dropdownManufacturerProps = {
      search: true,
      selection: true,
      multiple: false,
      fluid: true,
      clearable: true,
      options: autocompleteManufacturer.map(manufacturer => {
        console.log('manufacturer====================================')
        console.log(manufacturer)
        console.log('====================================')
        let text
        if (manufacturer.text) {
          console.log('manufacturer.text====================================')
          console.log(manufacturer.text)
          console.log('====================================')
          text = manufacturer.text
        } else {
          text = manufacturer.name
        }

        return {
          key: manufacturer.id,
          text: text,
          value: JSON.stringify({ id: manufacturer.id, name: text, text: text })
        }
      }),
      loading: autocompleteManufacturerLoading,
      name: 'manufacturer',
      placeholder: <FormattedMessage id='filter.searchManufacturer' defaultMessage='Search Manufacturer' />,
      noManufacturerResultsMessage,
      onSearchChange: (_, data) => this.handleSearchManufacturer(data),
      value: values.manufacturer,
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : null)
    }

    let noOriginResultsMessage = null
    if (this.state.searchOriginQuery.length <= 1)
      noOriginResultsMessage = (
        <FormattedMessage id='filter.startTypingToSearch' defaultMessage='Start typing to search...' />
      )
    if (autocompleteOriginLoading)
      noOriginResultsMessage = <FormattedMessage id='global.loading' defaultMessage='Loading' />

    let dropdownOriginProps = {
      search: true,
      selection: true,
      multiple: false,
      fluid: true,
      clearable: true,
      options: autocompleteOrigin.map(origin => {
        if (!origin && !origin.id) return
        return {
          key: origin.id,
          text: origin.name,
          value: JSON.stringify({ id: origin.id, name: origin.name, text: origin.name })
        }
      }),
      loading: autocompleteOriginLoading,
      name: 'origin',
      placeholder: <FormattedMessage id='filter.searchOrigin' defaultMessage='Search Origin' />,
      noOriginResultsMessage,
      onSearchChange: (_, data) => {
        this.handleSearchOrigin(data)
      },
      value: values.origin,
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : null)
    }

    let dropdownBroadcastedProps = {
      search: true,
      selection: true,
      multiple: false,
      fluid: true,
      clearable: true,
      options: optionsYesNo,
      name: 'broadcast',
      placeholder: <FormattedMessage id='filter.selectOption' defaultMessage='Select Option' />,
      value: values.broadcast,
      onChange: (e, data) => setFieldValue(data.name, data.value)
    }

    if (!autocompleteDataLoading) dropdownProps.icon = null
    //if (!autocompleteWarehouseLoading) dropdownWarehouseProps.icon = null

    let currencySymbol = getSafe(() => this.props.preferredCurrency.symbol, '$')

    return (
      <Accordion>
        <Segment basic>
          <AccordionItem>
            {this.accordionTitle('chemicalType', <FormattedMessage id='filter.keywordSearch' />)}
            <AccordionContent active={!this.state.inactiveAccordion.chemicalType}>
              <BottomMargedDropdown {...dropdownProps} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('warehouse', <FormattedMessage id='filter.warehouse' />)}
            <AccordionContent active={!this.state.inactiveAccordion.warehouse}>
              <BottomMargedDropdown {...dropdownWarehouseProps} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('broadcasted', <FormattedMessage id='filter.broadcast' />)}
            <AccordionContent active={!this.state.inactiveAccordion.broadcasted}>
              <BottomMargedDropdown {...dropdownBroadcastedProps} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle(
              'mfg',
              <FormattedMessage id='filter.mfg' defaultMessage='Days Since Manufacture Date' />
            )}
            <AccordionContent active={!this.state.inactiveAccordion.mfg}>
              <FormGroup widths='equal'>
                {this.dateField('mfg', { values, setFieldValue, handleChange, min: 0 })}
              </FormGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle(
              'expiration',
              <FormattedMessage id='filter.expiration' defaultMessage='Days Until Expiration' />
            )}
            <AccordionContent active={!this.state.inactiveAccordion.expiration}>
              <FormGroup widths='equal'>
                {this.dateField('expiration', { values, setFieldValue, handleChange, min: 1 })}
              </FormGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('manufacturer', <FormattedMessage id='filter.manufacturer' />)}
            <AccordionContent active={!this.state.inactiveAccordion.manufacturer}>
              <BottomMargedDropdown {...dropdownManufacturerProps} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('condition', <FormattedMessage id='filter.condition' defaultMessage='Condition' />)}
            <AccordionContent active={!this.state.inactiveAccordion.condition}>{productConditionRows}</AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('origin', <FormattedMessage id='filter.origin' />)}
            <AccordionContent active={!this.state.inactiveAccordion.origin}>
              <BottomMargedDropdown {...dropdownOriginProps} />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('productGrades', <FormattedMessage id='filter.grade' defaultMessage='Grade' />)}
            <AccordionContent active={!this.state.inactiveAccordion.productGrades}>{productGradeRows}</AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('productForms', <FormattedMessage id='filter.form' defaultMessage='Form' />)}
            <AccordionContent active={!this.state.inactiveAccordion.productForms}>{productFormsRows}</AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('packaging', <FormattedMessage id='filter.packaging' />)}
            <AccordionContent active={!this.state.inactiveAccordion.packaging}>{packagingTypesRows}</AccordionContent>
          </AccordionItem>

          <AccordionItem>
            {this.accordionTitle('quantity', <FormattedMessage id='filter.quantity' />)}
            <AccordionContent active={!this.state.inactiveAccordion.quantity}>
              <FormGroup widths='equal' data-test='filter_quantity_inp'>
                <Input
                  inputProps={{
                    type: 'number',
                    placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }),
                    min: 1
                  }}
                  label={<FormattedMessage id='filter.FromQuantity' defaultMessage='From' />}
                  name='quantityFrom'
                />
                <Input
                  inputProps={{
                    type: 'number',
                    placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' }),
                    min: 1
                  }}
                  label={<FormattedMessage id='filter.ToQuantity' defaultMessage='To' />}
                  name='quantityTo'
                />
              </FormGroup>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem>
            {this.accordionTitle('price', <FormattedMessage id='filter.price' />)}
            <AccordionContent active={!this.state.inactiveAccordion.price}>
              <FormGroup>
                <FormField width={8} data-test='filter_price_inp'>
                  <Input
                    inputProps={{
                      label: currencySymbol,
                      labelPosition: 'left',
                      type: 'number',
                      min: 0.01,
                      step: 0.01,
                      placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' })
                    }}
                    label={<FormattedMessage id='filter.FromPrice' defaultMessage='From Price' />}
                    name='priceFrom'
                  />
                </FormField>

                <FormField width={8}>
                  <Input
                    inputProps={{
                      label: currencySymbol,
                      labelPosition: 'left',
                      type: 'number',
                      min: 0.01,
                      step: 0.01,
                      placeholder: formatMessage({ id: 'global.enterValue', defaultMessage: 'Enter Value' })
                    }}
                    label={<FormattedMessage id='filter.ToPrice' defaultMessage='To Price' />}
                    name='priceTo'
                  />
                </FormField>
              </FormGroup>
            </AccordionContent>
          </AccordionItem>
        </Segment>
      </Accordion>
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
      isFilterSaving,
      intl: { formatMessage },
      toggleFilter
    } = this.props

    const { savedFiltersActive, openedSaveFilter } = this.state

    return (
      <Form
        enableReinitialize={true}
        initialValues={initialValues}
        validateOnChange={true}
        validationSchema={validationSchema(openedSaveFilter)}
        onSubmit={(values, { setSubmitting }) => {
          if (!openedSaveFilter) {
            this.handleSubmit(values)
          }
          setSubmitting(false)
        }}>
        {props => {
          this.submitForm = props.submitForm
          this.resetForm = props.resetForm
          this.setFieldValue = props.setFieldValue
          return (
            <FlexSidebar
              visible={isOpen}
              width={width}
              direction={direction}
              animation={animation}
              onHide={e => {
                // Workaround, close if you haven't clicked on calendar item or filter icon
                try {
                  if (
                    e &&
                    !(e.path[0] instanceof HTMLTableCellElement) &&
                    !(e.path[1] instanceof HTMLTableCellElement) &&
                    (!e.target || !e.target.className.includes('submenu-filter'))
                  ) {
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
                  {formatMessage({ id: 'filter.activeFilters', defaultMessage: 'ACTIVE FILTER' })}
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
                  {!this.state.savedFiltersActive ? (
                    this.formMarkup(props)
                  ) : (
                    <SavedFilters
                      params={this.props.params}
                      onApply={filter => this.handleSavedFilterApply(filter, props)}
                      savedFilters={this.props.savedFilters}
                      savedFiltersLoading={this.props.savedFiltersLoading}
                      getSavedFilters={this.handleGetSavedFilters}
                      deleteFilter={this.props.deleteFilter}
                      updateFilterNotifications={this.props.updateFilterNotifications}
                      savedFilterUpdating={this.props.savedFilterUpdating}
                    />
                  )}
                </Segment>
              </FlexContent>
              <GraySegment basic>
                <Transition visible={openedSaveFilter} animation='fade down' duration={500}>
                  <WhiteSegment basic>{this.formSaveFilter(props)}</WhiteSegment>
                </Transition>
                <Grid>
                  <GridRow>
                    <GridColumn computer={6} textAlign='left'>
                      <Button
                        disabled={savedFiltersActive}
                        type={'button'}
                        size='large'
                        loading={isFilterSaving}
                        primary={openedSaveFilter}
                        onClick={async () => {
                          if (openedSaveFilter) {
                            let { values } = props
                            const { validateForm, submitForm } = props

                            validateForm().then(err => {
                              const errors = Object.keys(err)
                              if (errors.length && errors[0] !== 'isCanceled') {
                                // Errors found
                                submitForm() // to show errors
                                return
                              } else {
                                // No errors found
                                this.handleFilterSave(values)
                              }
                            })
                          } else {
                            this.toggleSaveFilter()
                          }
                        }}
                        inputProps={{ type: 'button' }}
                        data-test='filter_save_new'>
                        {formatMessage({ id: 'filter.saveFilter', defaultMessage: 'Save Filter' })}
                      </Button>
                    </GridColumn>
                    <GridColumn computer={10} textAlign='right'>
                      <Button
                        disabled={openedSaveFilter}
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
                        disabled={openedSaveFilter}
                        size='large'
                        loading={isFilterApplying}
                        type='submit'
                        primary={!openedSaveFilter}
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

InventoryFilter.propTypes = {
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
  searchOriginUrl: func
}

InventoryFilter.defaultProps = {
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
  filterType: filterTypes.INVENTORY,
  autocompleteManufacturer: [],
  autocompleteOrigin: []
}

export default withToastManager(injectIntl(InventoryFilter))
