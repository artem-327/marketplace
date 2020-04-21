import React, { Component } from 'react'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Form, Input, Checkbox as FormikCheckbox, Dropdown } from 'formik-semantic-ui-fixed-validation'
import { Field as FormikField } from 'formik'
import { bool, string, object, func, array } from 'prop-types'
import { debounce } from 'lodash'
import { getSafe } from '~/utils/functions'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { removeEmpty } from '~/utils/functions'
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
  SaveFilterRow,
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

class Filter extends Component {
  state = {
    savedFiltersActive: false,
    openedSaveFilter: false,
    activeAccordion: { chemicalType: true },
    dateDropdown: {
      expiration: dateDropdownOptions[0].value,
      mfg: dateDropdownOptions[0].value
    },
    searchQuery: '',
    searchWarehouseQuery: '',
    isTyping: false,
    hasProvinces: false,
    savedProvinces: {},
    provinceOptions: []
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
      filterState,
      appliedFilter,
      onApply,
      applyDatagridFilter,
      fetchCountries,
    } = this.props

    setParams({ currencyCode: this.props.preferredCurrency, filterType: this.props.filterType })

    if (typeof this.props.searchWarehouseUrl !== 'undefined')
      this.props.getAutocompleteWarehouse(this.props.searchWarehouseUrl(''))

    this.handleGetSavedFilters()

    Promise.all([
      this.fetchIfNoData(fetchProductConditions, 'productConditions'),
      this.fetchIfNoData(fetchProductForms, 'productForms'),
      this.fetchIfNoData(fetchPackagingTypes, 'packagingTypes'),
      this.fetchIfNoData(fetchWarehouseDistances, 'warehouseDistances'),
      this.fetchIfNoData(fetchProductGrade, 'productGrades'),
      //this.fetchIfNoData(fetchWarehouses, 'warehouses'),
      this.fetchIfNoData(fetchCountries, 'countries')
    ]).finally(() =>
      this.setState({
        ...(filterState !== null && filterState.state),
        loaded: true
      })
    )
    if (appliedFilter && appliedFilter.filters) {
      let datagridFilter = this.toDatagridFilter(appliedFilter)
      applyDatagridFilter(datagridFilter)
      onApply(datagridFilter)
    }
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
      //pageNumber: savedFilter.pageNumber,
      pageSize: 50
    }
  }

  handleSubmit = params => {
    // { setSubmitting }
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
            label={el.name.charAt(0).toUpperCase() + el.name.slice(1)}
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
        if (datagrid.paths.includes(filters[i].path) && filters[i].operator === datagrid.operator) {
          if (filters[i].path === 'ProductOffer.lotExpirationDate') {
            formikValues['expiration'] = datagridValues['expiration'].toFormik(filters[i].operator)
          }
          if (filters[i].path === 'ProductOffer.lotManufacturedDate') {
            formikValues['mfg'] = datagridValues['mfg'].toFormik(filters[i].operator)
          }
          if (filters[i].path === 'ProductOffer.companyProduct.echoProduct.id') {
            this.searchProductOffer(filters[i].values)
          }
          formikValues[key] = datagrid.toFormik(filters[i], datagrid.nested && this.props[key])
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

    this.handleSubmit(formikValues)
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

  toggleAccordion = name => {
    let { activeAccordion } = this.state
    let active = activeAccordion[name]
    this.setState({ activeAccordion: { ...this.state.activeAccordion, [name]: !active } })
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

  accordionTitle = (name, text) => (
    <AccordionTitle name={name} onClick={(e, { name }) => this.toggleAccordion(name)}>
      {text}
      <IconRight>
        <Icon name={this.state.activeAccordion[name] ? 'chevron down' : 'chevron right'} />
      </IconRight>
    </AccordionTitle>
  )

  toggleSaveFilter = () => {
    //e.preventDefault()
    this.setState(prevState => ({ openedSaveFilter: !prevState.openedSaveFilter }))
  }

  inputWrapper = (name, inputProps, label, labelText) => {
    return (
      <InputWrapper>
        {label && <div className='field-label'>{label}</div>}
        <div>
          <Input inputProps={inputProps} name={name} />
          <Label>{labelText}</Label>
        </div>
      </InputWrapper>
    )
  }

  quantityWrapper = (name, { values, setFieldValue, setFieldTouched, label }) => {
    return (
      <QuantityWrapper>
        {label && <div className='field-label'>{label}</div>}
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
                } else {
                  setFieldValue(name, parseInt(values[name]) + 1)
                  setFieldTouched(name, true, true)
                }
              }}>
              +
            </Button>
            <Button
              type='button'
              className='buttonMinus'
              onClick={() => {
                if (isNaN(values[name]) || values[name] === '') {
                  setFieldValue(name, 1)
                  setFieldTouched(name, true, true)
                } else {
                  const value = parseInt(values[name])
                  if (value > 1) setFieldValue(name, value - 1)
                  setFieldTouched(name, true, true)
                }
              }}>
              -
            </Button>
          </div>
        </div>
      </QuantityWrapper>
    )
  }

  dateField = (name, { values, setFieldValue, handleChange, min }) => {
    let inputName = `${name}${values[name]}`
    let { intl } = this.props
    const { formatMessage } = intl

    return (
      <>
        <FormField width={8}>
          <Dropdown
            name={name}
            options={dateDropdownOptions}
            selection
            onChange={handleChange}
            inputProps={{
              'data-test': 'filter_dateField_drpdn',
              value: this.state.dateDropdown[name],
              disabled: !values[inputName],
              onChange: (_, data) => {
                setFieldValue(data.name, data.value)
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

        <FormField width={8} data-test='filter_dateField_inp'>
          <DateInputStyledWrapper>
            <Input
              name={inputName}
              onChange={handleChange}
              inputProps={{
                label: formatMessage({ id: 'filter.days', defaultMessage: 'days' }),
                labelPosition: 'right',
                type: 'number',
                min: min.toString(),
                placeholder: '0'
              }}
            />
          </DateInputStyledWrapper>
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
        <SaveFiltersGrid>
          <GridRow>
            <GridColumn width={9}>
              <SaveFilterTitle>
                <FormattedMessage id='filter.saveFilterHeader' defaultMessage='SAVE FILTER' />
              </SaveFilterTitle>
            </GridColumn>
            <GridColumn width={7} textAlign='right'>
              <Button type='button' size='large' onClick={this.toggleSaveFilter} data-test='filter_save_cancel_btn'>
                {formatMessage({ id: 'global.cancel', defaultMessage: 'Cancel' })}
              </Button>
            </GridColumn>
          </GridRow>
        </SaveFiltersGrid>
        <PerfectScrollbar>
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
                    placeholder: formatMessage({ id: 'filter.enterFilterName', defaultMessage: 'Your filter name' })
                  }}
                  name='name'
                  fluid
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

  formMarkup = ({ values, setFieldValue, handleChange, errors, setFieldError, setFieldTouched }) => {
    let {
      productConditions,
      productForms,
      packagingTypes,
      productGrades,
      intl,
      isFilterSaving,
      autocompleteData,
      autocompleteDataLoading,
      autocompleteWarehouse,
      autocompleteWarehouseLoading,
      layout,
      savedAutocompleteData,
      countries,
      countriesLoading,
      provinces,
      provincesLoading,
      fetchProvinces
    } = this.props

    const { formatMessage } = intl

    let packagingTypesRows = this.generateCheckboxes(packagingTypes, values, 'packagingTypes')
    let productConditionRows = this.generateCheckboxes(productConditions, values, 'productConditions')
    let productGradeRows = this.generateCheckboxes(productGrades, values, 'productGrades')
    let productFormsRows = this.generateCheckboxes(productForms, values, 'productForms')

    var noResultsMessage = null

    if (this.state.searchQuery.length <= 1)
      noResultsMessage = <FormattedMessage id='filter.startTypingToSearch' defaultMessage='Start typing to search...' />
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
      placeholder: <FormattedMessage id='filter.searchProductsInventory' defaultMessage='Chemical, CAS, Trade' />,
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
      placeholder: <FormattedMessage id='filter.searchLocation' defaultMessage='Search Location' />,
      noWarehouseResultsMessage,
      onSearchChange: (_, data) => {
        this.handleSearchWarehouse(data)
      },
      value: values.warehouse,
      onChange: (e, data) => setFieldValue(data.name, data.value.length !== 0 ? data.value : null)
    }

    if (!autocompleteDataLoading) dropdownProps.icon = null
    //if (!autocompleteWarehouseLoading) dropdownWarehouseProps.icon = null

    let dropdownCountry = {
      search: true,
      selection: true,
      multiple: true,
      fluid: true,
      clearable: true,
      options: countries.map(d => ({
        key: d.id,
        text: d.name,
        value: JSON.stringify({ id: d.id, name: d.name, text: d.name, hasProvinces: d.hasProvinces })
      })),
      loading: countriesLoading,
      name: 'country',
      placeholder: <FormattedMessage id='filter.selectCountry' defaultMessage='Select Country' />,
      value: values.country,
      onChange: async (e, data) => {
        console.log('!!!!!!!!!! onChange country data.value', data.value)
        setFieldValue('country', data.value)
        //setFieldValue('province', [])

        let savedProvinces = this.state.savedProvinces
        let provinceOptions = []


        for (const d of data.value) {




          console.log('!!!!!!!!!! forEach d', d)
          const parsed = JSON.parse(d)

          console.log('!!!!!!!!!! forEach parsed', parsed)

          if (parsed.hasProvinces) {
            let provinces = []
            if (savedProvinces[parsed.id]) {
              provinces = savedProvinces[parsed.id]
            } else {
              const { value } = await fetchProvinces(parsed.id)
              console.log('!!!!!!!!!! 1111 value', value)
              provinces = value.map(d => ({
                key: d.id,
                text: d.name,
                value: JSON.stringify({ id: d.id, name: d.name, text: d.name })
              }))
              savedProvinces[[parsed.id]] = provinces
            }
            provinceOptions = provinceOptions.concat(provinces)
          }
        }

        console.log('!!!!!!!!!! onChange savedProvinces', savedProvinces)
        console.log('!!!!!!!!!! onChange provinceOptions', provinceOptions)

        this.setState({ savedProvinces, provinceOptions })

          /*
          let provinces = []
          const parsed = data.value ? JSON.parse(data.value) : null
          if (parsed && parsed.hasProvinces) {

            const { value } = await fetchProvinces(parsed.id)
            provinces = value.map(d => ({
              key: d.id,
              text: d.name,
              value: JSON.stringify({ id: d.id, name: d.name, text: d.name })
            }))

            console.log('!!!!!!!!!! onChange provinces', provinces)
          }
          this.setState({ hasProvinces: parsed && parsed.hasProvinces })
          */
      }
    }

    let dropdownProvince = {
      search: true,
      selection: true,
      multiple: true,
      fluid: true,
      clearable: true,
      options: this.state.provinceOptions,
      loading: provincesLoading,
      name: 'province',
      disabled: !this.state.provinceOptions.length,
      placeholder: <FormattedMessage id='filter.selectState' defaultMessage='Select State' />,
      value: values.province,
      onChange: (e, data) => {
        console.log('!!!!!!!!!! onChange province data.value', data.value)
        setFieldValue('province', data.value)
      }
    }

    let currencySymbol = getSafe(() => this.props.preferredCurrency.symbol, '$')

    return (
      <FilterAccordion>
        <AccordionItem>
          {this.accordionTitle('chemicalType', <FormattedMessage id='filter.chemicalProductName' />)}
          <AccordionContent active={this.state.activeAccordion.chemicalType}>
            <BottomMargedDropdown {...dropdownProps} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle('quantity', <FormattedMessage id='filter.quantity' />)}
          <AccordionContent active={this.state.activeAccordion.quantity}>
            <FormGroup widths='equal' data-test='filter_quantity_inp'>
              <FormField width={8}>
                {this.quantityWrapper('quantityFrom', {
                  values,
                  setFieldValue,
                  setFieldTouched,
                  label: <FormattedMessage id='filter.FromQuantity' defaultMessage='From' />
                })}
              </FormField>
              <FormField width={8}>
                {this.quantityWrapper('quantityTo', {
                  values,
                  setFieldValue,
                  setFieldTouched,
                  label: <FormattedMessage id='filter.ToQuantity' defaultMessage='To' />
                })}
              </FormField>
            </FormGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle('price', <FormattedMessage id='filter.price' />)}
          <AccordionContent active={this.state.activeAccordion.price}>
            <FormGroup>
              <FormField className='price-input' width={8} data-test='filter_price_inp'>
                {this.inputWrapper(
                  'priceFrom',
                  {
                    type: 'number',
                    min: 0.01,
                    step: 0.01,
                    placeholder: '0.000'
                  },
                  <FormattedMessage id='filter.FromPrice' defaultMessage='From' />,
                  currencySymbol
                )}
              </FormField>
              <FormField className='price-input' width={8}>
                {this.inputWrapper(
                  'priceTo',
                  {
                    type: 'number',
                    min: 0.01,
                    step: 0.01,
                    placeholder: '0.000'
                  },
                  <FormattedMessage id='filter.ToPrice' defaultMessage='To' />,
                  currencySymbol
                )}
              </FormField>
            </FormGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle('location', <FormattedMessage id='filter.location' />)}
          <AccordionContent active={this.state.activeAccordion.location}>
            <div className='field-label'><FormattedMessage id='global.country' /></div>
            <BottomMargedDropdown {...dropdownCountry} />
            <div className='field-label'><FormattedMessage id='global.state' /></div>
            <BottomMargedDropdown {...dropdownProvince} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle('packaging', <FormattedMessage id='filter.packaging' />)}
          <AccordionContent active={this.state.activeAccordion.packaging}>{packagingTypesRows}</AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle('productGrades', <FormattedMessage id='filter.grade' defaultMessage='Grade' />)}
          <AccordionContent active={this.state.activeAccordion.productGrades}>{productGradeRows}</AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle('condition', <FormattedMessage id='filter.condition' defaultMessage='Condition' />)}
          <AccordionContent active={this.state.activeAccordion.condition}>{productConditionRows}</AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle('productForms', <FormattedMessage id='filter.form' defaultMessage='Form' />)}
          <AccordionContent active={this.state.activeAccordion.productForms}>{productFormsRows}</AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle(
            'expiration',
            <FormattedMessage id='filter.expiration' defaultMessage='Days Until Expiration' />
          )}
          <AccordionContent active={this.state.activeAccordion.expiration}>
            <FormGroup widths='equal'>
              {this.dateField('expiration', { values, setFieldValue, handleChange, min: 1 })}
            </FormGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle('assay', <FormattedMessage id='filter.percentage' />)}
          <AccordionContent active={this.state.activeAccordion.assay}>
            <FormGroup data-test='filter_assay_inp'>
              <FormField width={8}>
                {this.inputWrapper(
                  'assayFrom',
                  {
                    type: 'number',
                    min: 0,
                    placeholder: '0'
                  },
                  <FormattedMessage id='filter.Minimum' defaultMessage='Minimum' />,
                  '%'
                )}
              </FormField>
              <FormField width={8}>
                {this.inputWrapper(
                  'assayTo',
                  {
                    type: 'number',
                    min: 0,
                    placeholder: '0'
                  },
                  <FormattedMessage id='filter.Maximum' defaultMessage='Maximum' />,
                  '%'
                )}
              </FormField>
            </FormGroup>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem>
          {this.accordionTitle(
            'mfg',
            <FormattedMessage id='filter.mfg' defaultMessage='Days Since Manufacture Date' />
          )}
          <AccordionContent active={this.state.activeAccordion.mfg}>
            <FormGroup widths='equal'>
              {this.dateField('mfg', { values, setFieldValue, handleChange, min: 0 })}
            </FormGroup>
          </AccordionContent>
        </AccordionItem>
      </FilterAccordion>
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
      filterState
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

          console.log('!!!!!!!!!! render this.state', this.state)
          console.log('!!!!!!!!!! render values', props.values)


          return (
            <FlexSidebar {...additionalSidebarProps}>
              <TopButtons>
                <Button
                  type='button'
                  onClick={() => this.toggleFilter(false)}
                  primary={!this.state.savedFiltersActive}
                  data-test='filter_set_filters'>
                  {formatMessage({ id: 'filter.activeFilters', defaultMessage: 'Set Filters' })}
                </Button>

                <Button
                  type='button'
                  onClick={() => this.toggleFilter(true)}
                  primary={this.state.savedFiltersActive}
                  data-test='filter_saved_filters'>
                  {formatMessage({ id: 'filter.savedFilter', defaultMessage: 'Saved Filters' })}
                </Button>
              </TopButtons>
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
                    />
                  </PerfectScrollbar>
                )}
                <Dimmer active={this.state.openedSaveFilter} />
              </Dimmer.Dimmable>
              <Transition visible={openedSaveFilter} animation='fade up' duration={500}>
                <div basic>{this.formSaveFilter(props)}</div>
              </Transition>
              <BottomButtons>
                <Button
                  disabled={savedFiltersActive}
                  type={'button'}
                  size='large'
                  loading={isFilterSaving}
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
                <Button
                  disabled={openedSaveFilter || savedFiltersActive}
                  type='button'
                  size='large'
                  onClick={(e, data) => {
                    this.resetForm({ ...initialValues })
                    this.props.applyFilter({ filters: [] })
                    this.props.applyDatagridFilter({ filters: [] })
                    this.props.onClear(e, data)
                  }}
                  inputProps={{ type: 'button' }}
                  data-test='filter_clear'>
                  {formatMessage({ id: 'filter.clear', defaultMessage: 'Clear' })}
                </Button>
                <Button
                  disabled={openedSaveFilter || savedFiltersActive}
                  size='large'
                  loading={isFilterApplying}
                  type='submit'
                  primary
                  inputProps={{ type: 'button' }}
                  data-test='filter_apply'>
                  {formatMessage({ id: 'global.apply', defaultMessage: 'Apply' })}
                </Button>
              </BottomButtons>
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
  filterType: filterTypes.MARKETPLACE,
  savedUrl: '/prodex/api/product-offers/broadcasted/datagrid/saved-filters',
  searchUrl: text => `/prodex/api/company-products/broadcasted/search?pattern=${text}&onlyMapped=true`,
  searchWarehouseUrl: text => `/prodex/api/branches/warehouses/search?pattern=${text}`,
  onApply: filter => {},
  onClear: () => {}
}

export default withToastManager(injectIntl(Filter))
