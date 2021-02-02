import { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Input, Dropdown } from 'semantic-ui-react'
import { Input as FormikInput } from 'formik-semantic-ui-fixed-validation'
import { DateInput } from '~/components/custom-formik'
import moment from 'moment'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { errorMessages, dateValidation, dateBefore } from '~/constants/yupValidation'
import { getLocaleDateFormat, getStringISODate } from '~/components/date-format'
import { debounce } from 'lodash'
import styled from 'styled-components'
import { OrdersFilters } from '../constants'

import * as Actions from '../actions'
import { withDatagrid, Datagrid } from '~/modules/datagrid'
import { FormattedMessage, injectIntl } from 'react-intl'
import { getSafe, uniqueArrayByKey } from '~/utils/functions'
import ColumnSettingButton from '~/components/table/ColumnSettingButton'
import { PlusCircle } from 'react-feather'

const PositionHeaderSettings = styled.div`
  position: relative;
  z-index: 602;
`

const CustomRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 15px 25px;
  flex-wrap: wrap;

  > div {
    align-items: top;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .column {
    margin: 5px 5px;
  }

  input,
  .ui.dropdown {
    height: 40px;
  }
`

const DivColumn = styled.div`
  margin-right: 9px !important;
`

const textsTable = {
  'shipping-quotes': {
    BtnAddText: 'operations.tables.shippingQuotes.buttonAdd',
    SearchText: 'operations.tables.shippingQuotes.search'
  },
  tags: {
    BtnAddText: 'operations.tables.tags.buttonAdd',
    SearchText: 'operations.tables.tags.search'
  },
  'company-product-catalog': {
    SearchText: 'operations.tables.companyProductCatalog.search',
    SearchCompanyText: 'operations.tables.companyProductCatalog.SearchCompanyText',
    MappedText: 'operations.tables.companyProductCatalog.MappedText'
  },
  'company-inventory': {
    SearchText: 'operations.tables.companyInventory.search'
  },
  orders: {
    SearchText: 'operations.tables.orders.search'
  },
  'company-generic-products': {
    SearchText: 'operations.tables.companyGenericProduct.search'
  }
}

const PlusIcon = styled(PlusCircle)`
    width: 18px;
    height: 20px;
    margin-right: 10px;
    vertical-align: top;
    color: inherit;
`

const validationSchema = Yup.lazy(values => {
  let validationObject = {
    dateFrom:
      values.dateFrom &&
      values.dateTo &&
      dateValidation(false).concat(
        Yup.string().test(
          'is-before',
          <FormattedMessage
            id='orders.dateMustBeSameOrBefore'
            defaultMessage={`Date must be same or before ${values.dateTo}`}
            values={{ date: values.dateTo }}
          />,
          function () {
            let parsedDate = moment(this.parent['dateFrom'], getLocaleDateFormat())
            let parsedBeforeDate = moment(this.parent['dateTo'], getLocaleDateFormat())
            return !parsedBeforeDate.isValid() || parsedDate.isSameOrBefore(parsedBeforeDate)
          }
        )
      ),
    orderId:
      values.orderId &&
      Yup.number()
        .typeError(errorMessages.mustBeNumber)
        .test('int', errorMessages.integer, val => {
          return val % 1 === 0
        })
        .positive(errorMessages.positive)
        .test('numbers', errorMessages.mustBeNumber, value => /^[0-9]*$/.test(value))
  }
  return Yup.object().shape({ ...validationObject })
})

class TablesHandlers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'shipping-quotes': {
        searchInput: ''
      },
      tags: {
        searchInput: ''
      },
      'company-product-catalog': {
        searchInput: '',
        company: ''
      },
      'company-inventory': {
        searchInput: ''
      },
      orders: {
        status: 'all',
        orderId: '',
        company: '',
        dateFrom: '',
        dateTo: ''
      },
      'company-generic-products': {
        searchInput: ''
      }
    }
    this.handleFiltersValue = debounce(this.handleFiltersValue, 300)
  }

  componentDidMount() {
    const { tableHandlersFilters, currentTab } = this.props
    if (currentTab === '') return
    if (tableHandlersFilters) {
      this.initFilterValues(tableHandlersFilters)
    } else {
      let filterValue = this.state[currentTab]
      if (currentTab === 'orders') {
        const status = localStorage['operations-orders-status-filter']
        filterValue = {
          ...filterValue,
          status: status ? status : filterValue.status
        }
        this.setState({ orders: filterValue }) // ! ! Otestovat
      }
      this.handleFiltersValue(filterValue)
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.currentTab !== this.props.currentTab) {
      const { currentTab } = this.props
      if (currentTab === '') return

      let filterValue = this.state[currentTab]
      if (currentTab === 'orders') {
        const status = localStorage['operations-orders-status-filter']
        filterValue = {
          ...filterValue,
          status: status ? status : filterValue.status
        }
        this.setState({ orders: filterValue })
      }
      this.handleFiltersValue(filterValue)
    }
  }

  componentWillUnmount() {
    this.props.saveFilters(this.state)
  }

  initFilterValues = initTableHandlersFilters => {
    const { currentTab } = this.props
    if (currentTab === '') return
    const status = localStorage['operations-orders-status-filter']

    const tableHandlersFilters = {
      ...initTableHandlersFilters,
      orders: {
        ...initTableHandlersFilters.orders,
        status: status ? status : initTableHandlersFilters.orders.status
      }
    }

    const { setValues, setFieldTouched } = this.formikProps
    this.setState({ ...tableHandlersFilters })

    setValues({
      dateFrom: tableHandlersFilters.orders.dateFrom,
      dateTo: tableHandlersFilters.orders.dateTo,
      orderId: tableHandlersFilters.orders.orderId
    })
    setFieldTouched('dateFrom', true, true)

    this.handleFiltersValue(tableHandlersFilters[currentTab])
  }

  handleFiltersValue = value => {
    const { datagrid, currentTab } = this.props

    const orderIdError = getSafe(() => this.formikProps.errors.orderId, false)
    const dateFromError = getSafe(() => this.formikProps.errors.dateFrom, false)

    let filter = value
    if (currentTab === 'orders') {
      filter = {
        ...value,
        status: getSafe(() => OrdersFilters[value.status].filters, ''),
        orderId: !orderIdError && value.orderId ? value.orderId : '',
        dateFrom: value.dateFrom && !dateFromError ? getStringISODate(value.dateFrom) : '',
        dateTo: value.dateTo ? moment(getStringISODate(value.dateTo)).endOf('day').format() : ''
      }
    }
    datagrid.setSearch(filter, true, 'pageFilters')
  }

  handleFilterChangeMappedUnmapped = (e, { value }) => {
    const { currentTab } = this.props
    if (currentTab === '') return
    this.props.setProductMappedUnmaped(value)
    this.handleFiltersValue(this.state[currentTab])
  }

  handleFilterChangeInputSearch = (e, data) => {
    const { currentTab } = this.props
    if (currentTab === '') return

    this.setState({
      [currentTab]: {
        ...this.state[currentTab],
        [data.name]: data.value
      }
    })

    if (currentTab === 'orders' && data.name === 'status') {
      localStorage['operations-orders-status-filter'] = data.value
    }

    const filter = {
      ...this.state[currentTab],
      [data.name]: data.value
    }
    this.handleFiltersValue(filter)
  }

  handleFilterChangeCompany = (e, data) => {
    const { currentTab } = this.props
    if (currentTab === '') return

    this.setState({
      [currentTab]: {
        ...this.state[currentTab],
        [data.name]: data.value
      }
    })

    const filter = {
      ...this.state[currentTab],
      [data.name]: data.value
    }
    this.handleFiltersValue(filter)
  }

  searchCompanies = debounce(text => {
    this.props.searchCompany(text, 5)
  }, 250)

  renderHandler = () => {
    const {
      currentTab,
      openPopup,
      intl: { formatMessage },
      searchedCompaniesLoading,
      searchedCompanies,
      searchedCompaniesByName,
      companyProductUnmappedOnly
    } = this.props

    let companiesOptions, companiesOptionsByName

    const item = textsTable[currentTab]

    const filterValue = this.state[currentTab]

    if (filterValue && filterValue.company) {
      const d = JSON.parse(filterValue.company)
      companiesOptions = uniqueArrayByKey(
        searchedCompanies.concat([
          {
            key: d.id,
            value: filterValue.company,
            text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
          }
        ]),
        'key'
      )

      companiesOptionsByName = uniqueArrayByKey(
        searchedCompaniesByName.concat([
          {
            key: d.id,
            value: filterValue.company,
            text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
          }
        ]),
        'key'
      )
    } else {
      companiesOptions = searchedCompanies
      companiesOptionsByName = searchedCompaniesByName
    }

    return (
      <Formik
        initialValues={{ dateFrom: '', dateTo: '', orderId: '' }}
        validationSchema={validationSchema}
        onSubmit={() => {}}
        validateOnChange={true}
        render={formikProps => {
          this.formikProps = formikProps

          switch (currentTab) {
            case 'company-product-catalog':
              return (
                <>
                  <div>
                    <div className='column'>
                      <Input
                        style={{ width: 340 }}
                        name='searchInput'
                        icon='search'
                        value={filterValue.searchInput}
                        placeholder={formatMessage({
                          id: item.SearchText,
                          defaultMessage: 'Select Credit Card'
                        })}
                        onChange={this.handleFilterChangeInputSearch}
                      />
                    </div>
                    <div className='column'>
                      <Dropdown
                        style={{ width: 340 }}
                        name='company'
                        placeholder={formatMessage({
                          id: item.SearchCompanyText,
                          defaultMessage: 'Search product catalog by company'
                        })}
                        icon='search'
                        selection
                        clearable
                        options={companiesOptions}
                        search={options => options}
                        value={filterValue.company}
                        loading={searchedCompaniesLoading}
                        onSearchChange={(e, { searchQuery }) => {
                          searchQuery.length > 0 && this.searchCompanies(searchQuery)
                        }}
                        onChange={this.handleFilterChangeCompany}
                      />
                    </div>
                    <DivColumn className='column'>
                      <Dropdown
                        style={{ width: 250 }}
                        name='mappedUnmapped'
                        placeholder={formatMessage({
                          id: item.MappedText,
                          defaultMessage: 'Select mapped/unmapped only'
                        })}
                        fluid
                        selection
                        options={[
                          {
                            key: 0,
                            text: formatMessage({ id: 'operations.noSelection', defaultMessage: 'All' }),
                            value: 'ALL'
                          },
                          {
                            key: 1,
                            text: formatMessage({ id: 'operations.unmapped', defaultMessage: 'Unmapped Only' }),
                            value: 'UNMAPPED'
                          },
                          {
                            key: 2,
                            text: formatMessage({ id: 'operations.mappedOnly', defaultMessage: 'Mapped Only' }),
                            value: 'MAPPED'
                          }
                        ]}
                        value={companyProductUnmappedOnly}
                        onChange={this.handleFilterChangeMappedUnmapped}
                      />
                    </DivColumn>
                    <ColumnSettingButton divide={true} />
                  </div>
                </>
              )

            case 'orders':
              return (
                <>
                  <div>
                    <div className='column'>
                      <Dropdown
                        style={{ width: '220px' }}
                        name='status'
                        selection
                        value={filterValue.status}
                        options={Object.keys(OrdersFilters).map((name, index) => ({
                          key: index,
                          text: formatMessage({ id: `orders.statusOptions.${name}` }),
                          value: name
                        }))}
                        onChange={this.handleFilterChangeInputSearch}
                      />
                    </div>
                    <div className='column'>
                      <FormikInput
                        name='orderId'
                        inputProps={{
                          style: { width: '370px' },
                          placeholder: formatMessage({
                            id: 'orders.searchByOrderID',
                            defaultMessage: 'Search By Order ID'
                          }),
                          icon: 'search',
                          onChange: this.handleFilterChangeInputSearch
                        }}
                      />
                    </div>
                    <div className='column'>
                      <Dropdown
                        style={{ width: 340 }}
                        name='company'
                        placeholder={formatMessage({
                          id: item.SearchText,
                          defaultMessage: 'Search orders by company'
                        })}
                        icon='search'
                        selection
                        clearable
                        options={companiesOptionsByName}
                        search={options => options}
                        value={filterValue.company}
                        loading={searchedCompaniesLoading}
                        onSearchChange={(e, { searchQuery }) => {
                          searchQuery.length > 0 && this.searchCompanies(searchQuery)
                        }}
                        onChange={this.handleFilterChangeCompany}
                      />
                    </div>
                  </div>

                  <div>
                    <div className='column' style={{ paddingTop: '10px' }}>
                      <FormattedMessage id='orders.orderDate' defaultMessage='Order Date' />
                    </div>
                    <div className='column'>
                      <DateInput
                        name='dateFrom'
                        inputProps={{
                          style: { width: '220px' },
                          maxDate: moment(),
                          clearable: true,
                          placeholder: formatMessage({
                            id: 'global.from',
                            defaultMessage: 'From'
                          }),
                          onChange: this.handleFilterChangeInputSearch
                        }}
                      />
                    </div>
                    <DivColumn className='column'>
                      <DateInput
                        name='dateTo'
                        inputProps={{
                          style: { width: '220px' },
                          maxDate: moment(),
                          clearable: true,
                          placeholder: formatMessage({
                            id: 'global.to',
                            defaultMessage: 'To'
                          }),
                          onChange: this.handleFilterChangeInputSearch
                        }}
                      />
                    </DivColumn>
                    <ColumnSettingButton divide={true} />
                  </div>
                </>
              )

            default:
              return (
                <>
                  <div>
                    {item.SearchText && (
                      <div className='column'>
                        <Input
                          style={{ width: 340 }}
                          name='searchInput'
                          icon='search'
                          value={filterValue.searchInput}
                          placeholder={formatMessage({
                            id: item.SearchText,
                            defaultMessage: 'Select Credit Card'
                          })}
                          onChange={this.handleFilterChangeInputSearch}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    {item.BtnAddText && (
                      <DivColumn className='column'>
                        <Button fluid primary size='large' onClick={() => openPopup()} data-test='operations_open_popup_btn'>
                          <PlusIcon />
                          <FormattedMessage id={item.BtnAddText}>{text => text}</FormattedMessage>
                        </Button>
                      </DivColumn>
                    )}
                    <ColumnSettingButton divide={currentTab === 'company-generic-products' ? false : true} />
                  </div>
                </>
              )
          }
        }}
      />
    )
  }

  render() {
    return (
      <PositionHeaderSettings>
        <CustomRowDiv>{this.renderHandler()}</CustomRowDiv>
      </PositionHeaderSettings>
    )
  }
}

const mapStateToProps = state => {
  return {
    tableHandlersFilters: state.operations.tableHandlersFilters,
    searchedCompanies: state.operations.searchedCompanies.map(d => ({
      key: d.id,
      value: JSON.stringify(d),
      text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
    })),
    searchedCompaniesByName: state.operations.searchedCompanies.map(d => ({
      key: d.id,
      value: JSON.stringify(d),
      text: getSafe(() => d.cfDisplayName, '') ? d.cfDisplayName : getSafe(() => d.name, '')
    })),
    searchedCompaniesLoading: state.operations.searchedCompaniesLoading,
    companyProductUnmappedOnly: state.operations.companyProductUnmappedOnly
  }
}

export default withDatagrid(connect(mapStateToProps, { ...Actions })(injectIntl(TablesHandlers)))
