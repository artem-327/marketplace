import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Form, Input, Checkbox as FormikCheckbox, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { bool, string, object, func, array } from 'prop-types'
import { debounce } from 'lodash'
import { generateToastMarkup, getSafe } from '~/utils/functions'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { removeEmpty } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'
import ErrorFocus from '~/components/error-focus'

import {
  Button,
  FormField,
  GridRow,
  GridColumn,
  Dimmer,
  Label,
  Modal,
  Menu
} from 'semantic-ui-react'

import { uniqueArrayByKey } from '~/utils/functions'

import confirm from '~/src/components/Confirmable/confirm'

import {
  datagridValues,
  dateDropdownOptions,
  filterTypes
} from '../constants/filter'
import { initialValues, validationSchema } from '../constants/validation'

import SavedFilters from './SavedFilters'
import Notifications from './Notifications'

import {
  FlexContent,
  BottomMargedDropdown,
  StyledGrid,
  SmallerTextColumn,
  BottomButtons,
  DateInputStyledWrapper,
  SaveFiltersGrid,
  InputWrapper,
  StyledModalContent,
  CustomMenu,
  SmallGrid,
  PopupGrid,
  StyledModalHeader
} from '../constants/layout'

const optionsYesNo = [
  {
    id: 0,
    text: 'Select Option',
    value: ''
  },
  {
    id: 1,
    text: 'Yes',
    value: true
  },
  {
    id: 2,
    text: 'No',
    value: false
  }
]

class InventoryFilter extends Component {
  state = {
    savedFiltersActive: false,
    openedSaveFilter: false,
    dateDropdown: {
      expiration: dateDropdownOptions[0].value,
      mfg: dateDropdownOptions[0].value
    },
    searchQuery: '',
    searchWarehouseQuery: '',
    isTyping: false,
    searchManufacturerQuery: '',
    searchOriginQuery: '',
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
      autocompleteOrigin,
      filterState,
      appliedFilter,
      onApply,
      applyDatagridFilter
    } = this.props

    setParams({ currencyCode: this.props.preferredCurrency, filterType: this.props.filterType })

    if (typeof this.props.searchWarehouseUrl !== 'undefined')
      this.props.getAutocompleteWarehouse(this.props.searchWarehouseUrl(''))

    //It is nessery to get all manufacturer to options in dropdown if user select saved filter and want to see parametr in dropdown
    //In the future if will be a lot of manufacturer we can added search to the dropdown and here we can specify pattern to the searchManufacturerUrl
    //if (!autocompleteManufacturer || !autocompleteManufacturer.length)
    //  this.props.getAutocompleteManufacturer(this.props.searchManufacturerUrl(''))

    //if (!autocompleteOrigin || !autocompleteOrigin.length) {
    //  this.props.getAutocompleteOrigin(this.props.getOriginUrl)
    //}
    //this.handleGetSavedFilters()

    Promise.all([
      this.fetchIfNoData(fetchProductConditions, 'productConditions'),
      this.fetchIfNoData(fetchProductForms, 'productForms'),
      this.fetchIfNoData(fetchPackagingTypes, 'packagingTypes'),
      this.fetchIfNoData(fetchWarehouseDistances, 'warehouseDistances'),
      this.fetchIfNoData(fetchProductGrade, 'productGrades'),
      this.fetchIfNoData(fetchWarehouses, 'warehouses')
    ]).finally(() =>
      this.setState({
        ...(filterState !== null && filterState.state),
        loaded: true
      })
    )
  }

  componentWillUnmount() {
    this.props.saveFilterState({ state: this.state, values: this.values })
  }

  generateRequestData = ({ notifications, checkboxes, name, ...rest }) => {
    let { notificationMail, notificationPhone } = notifications
    let { notifyMail, notifyPhone, notifySystem, notificationEnabled } = checkboxes
    let { filters } = this.toSavedFilter(rest)
    let data = {
      filters,
      name,
      notificationEnabled: notificationEnabled,
      ...(notificationMail === undefined || notificationMail === '' ? null : { notificationMail }),
      ...(notificationPhone === undefined || notificationPhone === '' ? null : { notificationPhone }),
      notifyMail,
      notifyPhone,
      notifySystem
    }
    removeEmpty(data)
    return data
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
        (Object.keys(inputs[key]).length > 0 || typeof inputs[key] === 'boolean' || typeof inputs[key] === 'number') &&
        key !== 'expiration' &&
        key !== 'neededAt' &&
        key !== 'mfg'
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
          if (ids.length > 0) datagridFilter.filters.push(datagridValues[key].toFilter(ids, names))
        } else {
          try {
            if (typeof datagridValues[key] !== 'undefined') {
              let filter = datagridValues[key] && datagridValues[key].toFilter(inputs[key], this.props.filterType)
              if (filter) {
                if (!(filter.values instanceof Array)) filter.values = [filter.values] // We need values to be an array
                datagridFilter.filters.push(filter)
              }
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
      //pageNumber: savedFilter.pageNumber,
      pageSize: 50
    }
  }

  handleSubmit = params => {
    let { onApply, applyFilter, applyDatagridFilter } = this.props

    let filter = this.generateRequestData(params)
    let datagridFilter = this.toDatagridFilter(filter)

    applyFilter(filter)
    applyDatagridFilter(datagridFilter)
    onApply(datagridFilter)
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
          self.props.applyDatagridFilter(filter)
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

  generateDropdown = (data, values, placeholder, groupName = null) => {
    if (!data) return []

    const options = data.map(d => {
      const text = d.text ? d.text : d.name
      return {
        key: d.id,
        value: JSON.stringify({ id: d.id, name: d.name }),
        text: text.charAt(0).toUpperCase() + text.slice(1)
      }
    })

    return (
      <Dropdown
        name={groupName}
        options={options}
        selection
        inputProps={{
          multiple: true,
          fluid: true,
          placeholder
        }}
      />
    )
  }

  handleSavedFilterApply = async (filter, { setFieldValue, resetForm }) => {
    resetForm({ ...initialValues })

    let formikValues = {}

    let datagridKeys = Object.keys(datagridValues)

    let { filters, name, ...rest } = filter

    for (let i = 0; i < filters.length; i++) {
      datagridKeys.forEach(key => {
        let datagrid = datagridValues[key]
        if (
          datagrid &&
          datagrid.paths &&
          datagrid.paths.includes(filters[i].path) &&
          filters[i].operator === datagrid.operator
        ) {
          if (filters[i].path === 'ProductOffer.lotExpirationDate') {
            formikValues['expiration'] = datagridValues['expiration'].toFormik(filters[i].operator)
          }
          if (filters[i].path === 'ProductOffer.lotManufacturedDate') {
            formikValues['mfg'] = datagridValues['mfg'].toFormik(filters[i].operator)
          }
          if (filters[i].path === 'ProductOffer.companyProduct.id') {
            this.searchProductOffer(filters[i].values)
          }
          formikValues[key] = datagrid.toFormik(filters[i], this.props)
        }
      })
    }

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

    Object.keys(formikValues).forEach(key => setFieldValue(key, formikValues[key]))

    this.toggleFilter(false)

    //this.handleSubmit(formikValues)
  }

  handleGetSavedFilters = () => {
    let { packagingTypes, productConditions, productGrades, productForms } = this.props
    this.props.getSavedFilters(
      this.props.savedUrl,
      { packagingTypes, productConditions, productGrades, productForms },
      this.props.apiUrl,
      this.props.filterType
    )
  }

  handleSearch = debounce(({ searchQuery }) => {
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

  searchProductOffer = async filters => {
    let searchQuery = ''
    if (filters.length > 1) {
      for (let i = 0; i < filters.length; i++) {
        searchQuery = JSON.parse(
          getSafe(() => filters[i].description),
          null
        )
        if (searchQuery && searchQuery.name) {
          let params = { searchUrl: this.props.searchUrl(searchQuery.name), searchQuery: searchQuery.name }
          try {
            await this.props.getAutocompleteData(params)
          } catch (err) {
            console.error(err)
          }
        }
      }
    } else {
      searchQuery = JSON.parse(
        getSafe(() => filters[0].description),
        null
      )
      if (searchQuery && searchQuery.name) {
        try {
          this.handleSearch({ searchQuery: searchQuery.name })
        } catch (err) {
          console.error(err)
        }
      }
    }
  }

  toggleSaveFilter = () => {
    //e.preventDefault()
    this.setState(prevState => ({ openedSaveFilter: !prevState.openedSaveFilter }))
  }

  inputWrapper = (name, inputProps, labelText, labelClass = null) => {
    return (
      <InputWrapper>
        <Input name={name} inputProps={inputProps} />
        <Label className={labelClass}>{labelText}</Label>
      </InputWrapper>
    )
  }

  dateField = (name, { values, setFieldValue, handleChange, min }) => {
    let inputName = `${name}${values[name]}`
    let { intl } = this.props
    const { formatMessage } = intl

    return (
      <SmallGrid>
        <GridRow>
          <GridColumn width={8}>
            <Dropdown
              name={name}
              options={dateDropdownOptions}
              selection
              onChange={handleChange}
              inputProps={{
                'data-test': 'filter_dateField_drpdn',
                value: values[name],
                fluid: true,
                onChange: (_, data) => {
                  setFieldValue(data.name, data.value)
                  let newInputName = `${data.name}${data.value}`
                  setFieldValue(newInputName, values[inputName])
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
          </GridColumn>
          <GridColumn width={8} data-test='filter_dateField_inp'>
            <DateInputStyledWrapper>
              <Input
                name={inputName}
                onChange={handleChange}
                inputProps={{
                  type: 'number',
                  min: min.toString(),
                  placeholder: '0',
                  fluid: true
                }}
              />
              <Label>{formatMessage({ id: 'filter.days', defaultMessage: 'days' })}</Label>
            </DateInputStyledWrapper>
          </GridColumn>
        </GridRow>
      </SmallGrid>
    )
  }

  formSaveFilter = formikProps => {
    let { intl } = this.props
    let { values } = formikProps
    const { formatMessage } = intl

    return (
      <>
        <StyledModalHeader>
          <FormattedMessage id='filter.saveFilterHeader' defaultMessage='SAVE FILTER' />
        </StyledModalHeader>
        <StyledModalContent>
          <PerfectScrollbar style={{ margin: '-10px -10px' }}>
            <SaveFiltersGrid>
              {/* Save Filter */}
              <GridRow>
                <GridColumn computer={16} data-test='filter_name_inp'>
                  <FormattedMessage id='filter.filterNameHeader' defaultMessage='Filter Name' />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn computer={16} data-test='filter_name_inp'>
                  <Input
                    inputProps={{
                      placeholder: formatMessage({ id: 'filter.enterFilterName', defaultMessage: 'Your filter name' }),
                      fluid: true
                    }}
                    name='name'
                  />
                </GridColumn>
              </GridRow>
              <GridRow>
                <GridColumn computer={12}>
                  <label>
                    {formatMessage({ id: 'filter.automaticallyApply', defaultMessage: 'Automatically apply' })}
                  </label>
                </GridColumn>
                <GridColumn computer={4}>
                  <FormikCheckbox
                    inputProps={{ toggle: true, style: { marginBottom: '-4px' } }}
                    name='checkboxes.automaticallyApply'
                  />
                </GridColumn>
              </GridRow>
            </SaveFiltersGrid>
            <Notifications values={values} formikProps={formikProps} />
          </PerfectScrollbar>
        </StyledModalContent>
      </>
    )
  }

  // {"id":"431210","name":"1,2-dibromo-3,3,3-trifluoropropane","casNumber":"431-21-0"}
  //  {"id":"431210","name":"1,2-dibromo-3,3,3-trifluoropropane","casNumberCombined":"431-21-0"}

  getOptions = options => {
    return options.map(option => {
      let parsed = option.value ? JSON.parse(option.value) : JSON.parse(option)
      return {
        key: option.key || parsed.id,
        text: option.text || parsed.name + ` ${parsed.casNumber}`,
        value: option.value || option,
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

  formMarkup = ({ values, setFieldValue, handleChange, errors, setFieldError, setFieldTouched }) => {
    let {
      productConditions,
      productForms,
      packagingTypes,
      productGrades,
      intl,
      autocompleteData,
      autocompleteDataLoading,
      autocompleteWarehouse,
      autocompleteWarehouseLoading,
      autocompleteManufacturer,
      autocompleteManufacturerLoading,
      autocompleteOrigin,
      autocompleteOriginLoading
    } = this.props

    const { formatMessage } = intl

    let packagingTypesDropdown = this.generateDropdown(
      packagingTypes,
      values,
      formatMessage({ id: 'filter.selectPackaging', defaultMessage: 'Select Packaging (Multiple Select)' }),
      'packagingTypes'
    )
    let productConditionDropdown = this.generateDropdown(
      productConditions,
      values,
      formatMessage({ id: 'filter.selectCondition', defaultMessage: 'Select Condition (Multiple Select)' }),
      'productConditions'
    )
    let productGradeDropdown = this.generateDropdown(
      productGrades,
      values,
      formatMessage({ id: 'filter.selectGrade', defaultMessage: 'Select Grade (Multiple Select)' }),
      'productGrades'
    )
    let productFormsDropdown = this.generateDropdown(
      productForms,
      values,
      formatMessage({ id: 'filter.selectForm', defaultMessage: 'Select Form (Multiple Select)' }),
      'productForms'
    )

    var noResultsMessage = null

    if (this.state.searchQuery.length <= 1)
      noResultsMessage = <FormattedMessage id='filter.startTypingToSearch' defaultMessage='Start typing to search' />
    if (autocompleteDataLoading) noResultsMessage = <FormattedMessage id='global.loading' defaultMessage='Loading' />
    const options = this.getOptions(uniqueArrayByKey(autocompleteData, 'key'))

    let dropdownProps = {
      search: _ => options,
      selection: true,
      multiple: true,
      fluid: true,
      options: options,
      loading: autocompleteDataLoading,
      name: 'search',
      placeholder: formatMessage({ id: 'filter.searchProductsInventory', defaultMessage: 'Chemical, CAS, Trade' }),
      noResultsMessage,
      onSearchChange: (_, data) => this.handleSearch(data),
      value: values.search,
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : [])
    }

    let noWarehouseResultsMessage = null

    if (this.state.searchWarehouseQuery.length <= 1)
      noWarehouseResultsMessage = (
        <FormattedMessage id='filter.startTypingToSearch' defaultMessage='Start typing to search' />
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
        if (warehouse.text) {
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
      noWarehouseResultsMessage: noWarehouseResultsMessage,
      onSearchChange: (_, data) => {
        this.handleSearchWarehouse(data)
      },
      value: values.warehouse,
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : null)
    }

    let noManufacturerResultsMessage = null
    if (this.state.searchManufacturerQuery.length <= 1)
      noManufacturerResultsMessage = (
        <FormattedMessage id='filter.startTypingToSearch' defaultMessage='Start typing to search' />
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
        return {
          key: manufacturer.id,
          text: manufacturer.name,
          value: JSON.stringify({ id: manufacturer.id, text: manufacturer.name })
        }
      }),
      loading: autocompleteManufacturerLoading,
      name: 'manufacturer',
      placeholder: <FormattedMessage id='filter.searchManufacturer' defaultMessage='Search Manufacturer' />,
      noManufacturerResultsMessage,
      value: values.manufacturer,
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : null)
    }

    let noOriginResultsMessage = null
    if (this.state.searchOriginQuery.length <= 1)
      noOriginResultsMessage = (
        <FormattedMessage id='filter.startTypingToSearch' defaultMessage='Start typing to search' />
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
          value: JSON.stringify({ id: origin.id, text: origin.name })
        }
      }),
      loading: autocompleteOriginLoading,
      name: 'origin',
      placeholder: <FormattedMessage id='filter.searchOrigin' defaultMessage='Search Origin' />,
      noOriginResultsMessage,
      value: values.origin,
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : null)
    }

    let dropdownBroadcastedProps = {
      search: true,
      selection: true,
      multiple: false,
      fluid: true,
      clearable: true,
      options: optionsYesNo.map(option => {
        return {
          key: option.id,
          text: option.text,
          value: option.value
        }
      }),
      name: 'broadcast',
      placeholder: <FormattedMessage id='filter.selectOption' defaultMessage='Select Option' />,
      value: values.broadcast,
      onChange: (e, data) => setFieldValue(data.name, data.value)
    }

    if (!autocompleteDataLoading) dropdownProps.icon = null
    //if (!autocompleteWarehouseLoading) dropdownWarehouseProps.icon = null

    let currencySymbol = getSafe(() => this.props.preferredCurrency.symbol, '$')

    return (
      <PopupGrid>
        <GridRow>
          <GridColumn width={8}>
            <FormField>
              <FormattedMessage id='filter.chemicalProductName' defaultMessage='Chemical / Product Name'>
                {text => text}
              </FormattedMessage>
              <BottomMargedDropdown {...dropdownProps} />
            </FormField>
          </GridColumn>
          <GridColumn width={8}>
            <FormField>
              <FormattedMessage id='filter.warehouse' defaultMessage='Warehouse'>
                {text => text}
              </FormattedMessage>
              <BottomMargedDropdown {...dropdownWarehouseProps} />
            </FormField>
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn width={8}>
            <FormattedMessage id='filter.expiration' defaultMessage='Days Until Expiration' />
            {this.dateField('expiration', { values, setFieldValue, handleChange, min: 1 })}
          </GridColumn>
          <GridColumn width={8}>
            <FormattedMessage id='filter.mfg' defaultMessage='Days Since Manufacture Date' />
            {this.dateField('mfg', { values, setFieldValue, handleChange, min: 0 })}
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn width={8}>
            <FormattedMessage id='filter.quantity' />
            <SmallGrid>
              <GridRow>
                <GridColumn width={8}>
                  <Input
                    name='quantityFrom'
                    inputProps={{
                      placeholder: '0',
                      type: 'number',
                      label: formatMessage({ id: 'filter.FromQuantity', defaultMessage: 'From' }),
                      labelPosition: 'left',
                      fluid: true
                    }}
                  />
                </GridColumn>
                <GridColumn width={8}>
                  <Input
                    name='quantityTo'
                    inputProps={{
                      placeholder: '0',
                      type: 'number',
                      label: formatMessage({ id: 'filter.ToQuantity', defaultMessage: 'To' }),
                      labelPosition: 'left',
                      fluid: true
                    }}
                  />
                </GridColumn>
              </GridRow>
            </SmallGrid>
          </GridColumn>
          <GridColumn width={8}>
            <FormattedMessage id='filter.price' />
            <SmallGrid>
              <GridRow>
                <GridColumn width={8} data-test='filter_price_inp'>
                  {this.inputWrapper(
                    'priceFrom',
                    {
                      type: 'number',
                      placeholder: '0.00',
                      label: formatMessage({ id: 'filter.FromPrice', defaultMessage: 'From' }),
                      labelPosition: 'left',
                      fluid: true
                    },
                    currencySymbol,
                    'green'
                  )}
                </GridColumn>
                <GridColumn className='price-input' width={8}>
                  {this.inputWrapper(
                    'priceTo',
                    {
                      type: 'number',
                      placeholder: '0.00',
                      label: formatMessage({ id: 'filter.ToPrice', defaultMessage: 'To' }),
                      labelPosition: 'left',
                      fluid: true
                    },
                    currencySymbol,
                    'green'
                  )}
                </GridColumn>
              </GridRow>
            </SmallGrid>
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn width={8}>
            <FormattedMessage id='filter.packaging' />
            {packagingTypesDropdown}
          </GridColumn>
          <GridColumn width={8}>
            <FormattedMessage id='filter.grade' defaultMessage='Grade' />
            {productGradeDropdown}
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn width={8}>
            <FormattedMessage id='filter.condition' defaultMessage='Condition' />
            {productConditionDropdown}
          </GridColumn>
          <GridColumn width={8}>
            <FormattedMessage id='filter.form' defaultMessage='Form' />
            {productFormsDropdown}
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn width={8}>
            <FormattedMessage id='filter.percentage' />
            <SmallGrid>
              <GridRow>
                <GridColumn width={8}>
                  {this.inputWrapper(
                    'assayFrom',
                    {
                      type: 'number',
                      placeholder: '0.00',
                      label: formatMessage({ id: 'filter.min', defaultMessage: 'Min' }),
                      labelPosition: 'left',
                      fluid: true
                    },
                    '%'
                  )}
                </GridColumn>
                <GridColumn width={8}>
                  {this.inputWrapper(
                    'assayTo',
                    {
                      type: 'number',
                      placeholder: '0.00',
                      label: formatMessage({ id: 'filter.max', defaultMessage: 'Max' }),
                      labelPosition: 'left',
                      fluid: true
                    },
                    '%'
                  )}
                </GridColumn>
              </GridRow>
            </SmallGrid>
          </GridColumn>
          <GridColumn width={4}>
            <FormattedMessage id='filter.incomplete' defaultMessage='Incomplete' />
            <Dropdown
              name='incomplete'
              options={[
                {
                  key: 1,
                  text: formatMessage({ id: 'global.yes', defaultMessage: 'Yes' }),
                  value: true
                },
                {
                  id: 2,
                  text: formatMessage({ id: 'global.no', defaultMessage: 'No' }),
                  value: false
                },
              ]}
              selection
              inputProps={{
                fluid: true,
                clearable: true,
                upward: true,
                placeholder: formatMessage({ id: 'global.select', defaultMessage: 'Select' }),
              }}
            />
          </GridColumn>
        </GridRow>
      </PopupGrid>
    )
  }

  render() {
    let {
      isFilterApplying,
      isFilterSaving,
      intl: { formatMessage },
      filterState,
      onClose,
      toastManager,
      filterType
    } = this.props

    const { savedFiltersActive, openedSaveFilter } = this.state

    return (
      <Form
        enableReinitialize={true}
        initialValues={filterState ? filterState.values : initialValues}
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
          this.values = props.values

          return (
            <Modal onClose={() => onClose()} open centered={true} size={openedSaveFilter ? 'tiny' : 'large'}>
              {!openedSaveFilter ? (
                <>
                  <CustomMenu pointing secondary>
                    <Menu.Item
                      key={'advancedFilter'}
                      onClick={() => this.toggleFilter(false)}
                      active={!savedFiltersActive}
                      data-test='filter_advanced_filter'>
                      {formatMessage({ id: 'filter.advancedFilter', defaultMessage: 'Advanced Filter' })}
                    </Menu.Item>
                    <Menu.Item
                      key={'savedFilters'}
                      onClick={() => this.toggleFilter(true)}
                      active={savedFiltersActive}
                      data-test='filter_saved_filters'>
                      {formatMessage({ id: 'filter.savedFilters', defaultMessage: 'Saved Filters' })}
                    </Menu.Item>
                  </CustomMenu>

                  <StyledModalContent>
                    <Dimmer.Dimmable as={FlexContent}>
                      {!this.state.savedFiltersActive ? (
                        <PerfectScrollbar key='set'>{this.formMarkup(props)}</PerfectScrollbar>
                      ) : (
                        <PerfectScrollbar key='saved'>
                          <SavedFilters
                            params={this.props.params}
                            onApply={filter => this.handleSavedFilterApply(filter, props)}
                            savedFilters={this.props.savedFilters}
                            savedFiltersLoading={this.props.savedFiltersLoading}
                            getSavedFilters={this.handleGetSavedFilters}
                            deleteFilter={this.props.deleteFilter}
                            updateFilterNotifications={this.props.updateFilterNotifications}
                            savedFilterUpdating={this.props.savedFilterUpdating}
                            filterType={filterType}
                          />
                        </PerfectScrollbar>
                      )}
                      <Dimmer active={this.state.openedSaveFilter} />
                    </Dimmer.Dimmable>
                  </StyledModalContent>
                </>
              ) : (
                <>
                  {this.formSaveFilter(props)}
                </>
              )}

              <BottomButtons>
                {openedSaveFilter ? (
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      type='button'
                      size='large'
                      className='light'
                      onClick={this.toggleSaveFilter}
                      data-test='filter_save_cancel_btn'>
                      {formatMessage({id: 'global.cancel', defaultMessage: 'Cancel'})}
                    </Button>
                    <Button
                      disabled={savedFiltersActive}
                      type='button'
                      size='large'
                      className='secondary'
                      loading={isFilterSaving}
                      onClick={async () => {
                        let {values} = props
                        const {validateForm, submitForm} = props

                        validateForm().then(err => {
                          const errors = Object.keys(err)
                          if (errors.length && errors[0] !== 'isCanceled') {
                            // Errors found
                            submitForm() // to show errors
                          } else {
                            // No errors found
                            this.handleFilterSave(values)
                          }
                        })
                      }}
                      data-test='filter_save_new'>
                      {formatMessage({ id: 'global.save', defaultMessage: 'Save' })}
                    </Button>
                  </div>
                ) : (
                  savedFiltersActive ? (
                    <div style={{ textAlign: 'right'}}>
                      <Button
                        type='button'
                        size='large'
                        className='light'
                        onClick={() => onClose()}
                        data-test='filter_close'>
                        {formatMessage({ id: 'global.close', defaultMessage: 'Close' })}
                      </Button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <div>
                        <Button
                          type='button'
                          size='large'
                          onClick={() => onClose()}
                          className='light greyText'
                          data-test='filter_cancel'>
                          {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
                        </Button>
                        <Button
                          type='button'
                          size='large'
                          className='light danger'
                          onClick={(e, data) => {
                            this.resetForm({...initialValues})
                            //this.props.applyFilter({filters: []})
                            //this.props.applyDatagridFilter({filters: []})
                            //this.props.onClear(e, data)
                          }}
                          data-test='filter_clear'>
                          {formatMessage({ id: 'filter.clear', defaultMessage: 'Clear' })}
                        </Button>
                      </div>
                      <div>
                        <Button
                          type={'button'}
                          size='large'
                          className='secondary outline'
                          loading={isFilterSaving}
                          onClick={async () => {
                            const {validateForm, submitForm, values} = props

                            validateForm().then(err => {
                              const errors = Object.keys(err)
                              if (errors.length && errors[0] !== 'isCanceled') {
                                // Errors found
                                submitForm() // to show errors
                              } else {
                                // No errors found
                                const requestData = this.generateRequestData(values)
                                if (requestData.filters.length) {
                                  this.toggleSaveFilter()
                                } else {
                                  toastManager.add(
                                    generateToastMarkup(
                                      <FormattedMessage id='filter.saveEmptyFilterHeader' defaultMessage='Empty Filter' />,
                                      <FormattedMessage
                                        id='filter.saveEmptyFilter'
                                        defaultMessage='There are no any filters configured'
                                      />
                                    ),
                                    {
                                      appearance: 'warning'
                                    }
                                  )
                                }
                              }
                            })
                          }}
                          data-test='filter_save_new'>
                          {formatMessage({ id: 'filter.saveFilter', defaultMessage: 'Save Filter' })}
                        </Button>
                        <Button
                          size='large'
                          loading={isFilterApplying}
                          type='submit'
                          secondary
                          onClick={async () => {
                            let {values} = props
                            const {validateForm, submitForm} = props

                            validateForm().then(async (err) => {
                              const errors = Object.keys(err)
                              if (errors.length && errors[0] !== 'isCanceled') {
                                // Errors found
                                submitForm() // to show errors
                              } else {
                                // No errors found
                                await submitForm()
                                onClose()
                              }
                            })
                          }}
                          data-test='filter_apply'>
                          {formatMessage({ id: 'global.apply', defaultMessage: 'Apply' })}
                        </Button>
                      </div>
                    </div>
                  )
                )}
              </BottomButtons>
              <ErrorFocus />
            </Modal>
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
  getOriginUrl: string,
  onClose: func
}

InventoryFilter.defaultProps = {
  isOpen: false,
  width: 'very wide',
  direction: 'right',
  animation: 'overlay',
  filters: [],
  autocompleteData: [],
  autocompleteWarehouse: [],
  savedFilters: [],
  savedFiltersLoading: false,
  layout: 'MyInventory',
  filterType: filterTypes.INVENTORY,
  autocompleteManufacturer: [],
  autocompleteOrigin: [],
  getOriginUrl: '/prodex/api/countries',
  savedUrl: '/prodex/api/product-offers/own/datagrid/saved-filters',
  searchUrl: text => `/prodex/api/company-products/own/search?pattern=${text}&onlyMapped=false`,
  searchWarehouseUrl: text => `/prodex/api/branches/warehouses/search?pattern=${text}`,
  searchManufacturerUrl: text => `/prodex/api/manufacturers/search?search=${text}`,
  onApply: filter => {},
  onClear: () => {},
  onClose: () => {}
}

export default withToastManager(injectIntl(InventoryFilter))
