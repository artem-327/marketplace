import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '~/api'
import pt from 'prop-types'
import { getSafe } from '~/utils/functions'
export const DatagridContext = React.createContext({})

const initialState = {
  ready: false,
  rows: [],
  allLoaded: false,
  loading: true,
  query: {},
  datagridParams: {
    orFilters: [],
    filters: [],
    pageSize: 50,
    pageNumber: 0
  },
  isScrollToEnd: false,
  savedFilters: {},
  refreshTable: false
}

// singleton instance
export let Datagrid

class DatagridProvider extends Component {
  static propTypes = {
    apiConfig: pt.shape({
      url: pt.string.isRequired,
      method: pt.oneOf(['POST', 'GET'])
    }).isRequired,
    autoRefresh: pt.bool
  }

  constructor(props) {
    super(props)

    this.state = initialState

    Datagrid = this
  }

  componentDidMount() {
    //Refresh datagrid
    if (this.props.autoRefresh)
      this.interval = setInterval(
        this.refreshTable,
        getSafe(() => this.props.refreshInterval, 60000)
      )
    this.setState({ savedFilters: {} })
  }

  refreshTable = () => {
    this.setState({ refreshTable: true })
    this.loadNextPage()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  // componentWillReceiveProps({apiConfig}) {
  //   if (JSON.stringify(apiConfig) !== JSON.stringify(this.props.apiConfig)) {
  //     this.setState(initialState)
  //     this.loadData()
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (
      prevProps.apiConfig &&
      prevProps.apiConfig.url &&
      this.props.apiConfig &&
      this.props.apiConfig.url &&
      prevProps.apiConfig.url !== this.props.apiConfig.url
    ) {
      if (this.props.preserveFilters) {
        this.loadData()
      } else {
        this.setState({ savedFilters: {} }, () => this.setFilter({ filters: [], orFilters: [] }))
      }
    }
  }

  clear = () => {
    this.setState(initialState)
  }

  isReady = () => {
    return this.state.ready && this.props.apiConfig
  }

  loadNextPage = async () => {
    if (!this.props.apiConfig) return

    const { datagridParams, query, isScrollToEnd, refreshTable } = this.state
    const { apiConfig } = this.props

    this.setState({ loading: true })
    //if is filtering and is not scroll to end or if is not any filter and is not scroll to end we need to set pageNumber to 0
    const pageNumber =
      (getSafe(() => datagridParams.filters.length, false) && !isScrollToEnd) ||
      (getSafe(() => datagridParams.orFilters.length, false) && !isScrollToEnd) ||
      (!getSafe(() => datagridParams.filters.length, false) &&
        !getSafe(() => datagridParams.orFilters.length, false) &&
        datagridParams.pageNumber > 0 &&
        !isScrollToEnd &&
        !refreshTable)
        ? 0
        : datagridParams.pageNumber

    if (datagridParams.sortDirection) {
      datagridParams.sortDirection = datagridParams.sortDirection.toUpperCase()
    }

    try {
      const response = await api.request({
        url: this.apiConfig && this.apiConfig.url ? this.apiConfig.url : apiConfig.url,
        method: apiConfig.method || 'POST',
        params: query,
        data: {
          ...datagridParams,
          pageNumber
        }
      })
      if (
        (this.apiConfig && this.apiConfig.url && this.apiConfig.url !== response.config.url) ||
        (!this.apiConfig && response.config.url !== this.props.apiConfig.url)
      ) {
        return
      }

      const { data } = response
      const allLoaded = data.length < datagridParams.pageSize || data.length === 0

      this.setState(s => ({
        rows: _.unionBy(s.rows, data, 'id'),
        loading: false,
        allLoaded,
        datagridParams: {
          ...s.datagridParams,
          pageNumber: pageNumber + (allLoaded ? 0 : 1)
        },
        refreshTable: false
      }))
    } catch (e) {
      console.error(e)
      this.setState({ loading: false, refreshTable: false })
    } finally {
      this.setState({ isScrollToEnd: false, refreshTable: false })
      this.apiConfig = null
    }
  }

  updateRow = (id, updateFn) => {
    this.setState(s => {
      let rows = s.rows.slice(0).map((ro, i) => {
        if (getSafe(() => ro.id, null) === id) {
          return updateFn(ro)
        } else return ro
      })

      return { rows }
    })
  }

  removeRow = id => {
    this.removeRowById(id)
  }

  removeRowById = id => {
    this.setState(s => ({
      rows: s.rows.filter(r => r.id !== id)
    }))
  }

  removeRowByIndex = index => {
    this.setState(s => ({
      rows: s.rows.filter((r, i) => i !== index)
    }))
  }

  onScrollToEnd = () => {
    this.setState({ isScrollToEnd: true })
    this.loadNextPageSafe()
  }

  loadNextPageSafe = () => {
    const { allLoaded } = this.state

    !allLoaded && this.loadNextPage()
  }

  loadData = (params = {}, query = {}) => {
    this.setState(
      s => ({
        ready: true,
        datagridParams: {
          // pageNumber: 0,
          ...s.datagridParams,
          ...params
        },
        rows: []
      }),
      this.loadNextPage
    )
  }

  // setApiUrl = (apiUrl, reload = true) => {
  //   this.api.url = apiUrl
  //   reload && this.loadData()
  // }

  setSorting = (sortFilter, reload = true) => {
    this.setState(
      s => ({
        datagridParams: {
          ...s.datagridParams,
          ...sortFilter
          //pageNumber: 0
        },
        rows: []
      }),
      () => reload && this.loadData()
    )
  }

  setFilter = (filterValue, reload = true, filterId = null) => {
    let filters = [],
      orFilters = []

    let savedFilters = this.state.savedFilters

    if (filterId) {
      savedFilters[filterId] = filterValue
    } else {
      if (filterValue && filterValue.filters) filters = filterValue.filters
      if (filterValue && filterValue.orFilters) orFilters = filterValue.orFilters
    }

    Object.keys(savedFilters).forEach(key => {
      if (savedFilters[key].filters) filters = filters.concat(savedFilters[key].filters)
      if (savedFilters[key].orFilters) orFilters = orFilters.concat(savedFilters[key].orFilters)
    })

    const allFilters = { filters, orFilters }

    this.setState(
      s => ({
        datagridParams: {
          ...s.datagridParams,
          ...allFilters
          //pageNumber: 0
        },
        rows: [],
        savedFilters
      }),
      () => reload && this.loadData()
    )
  }

  setQuery = (query, reload = true) => {
    this.setState({ query }, () => reload && this.loadData())
  }

  setSearch = (value, reload = true, filterId = null) => {
    const {
      apiConfig: { searchToFilter, params }
    } = this.props

    let filters = typeof searchToFilter !== 'function' ? this.apiConfig.searchToFilter(value) : searchToFilter(value)

    if (filters.url) {
      this.apiConfig = { url: filters.url }
    }
    this.setState(
      s => ({
        datagridParams: { ...s.datagridParams, ...params },
        isScrollToEnd: false
      }),
      () => {
        this.setFilter(
          {
            orFilters: filters.or ? filters.or : filters.length ? filters : [],
            filters: filters.and ? filters.and : []
          },
          reload,
          filterId
        )
      }
    )
  }

  setLoading = loading => {
    this.setState({
      loading
    })
  }

  onTableReady = (params = {}) => {
    if (!this.props.skipInitLoad) this.loadData(params)
  }

  setApiConfig = apiConfig => {
    this.apiConfig = apiConfig
    this.loadData()
  }

  render() {
    const {
      rows,
      loading,
      datagridParams: { filters }
    } = this.state

    return (
      <DatagridContext.Provider
        value={{
          apiConfig: this.props.apiConfig,
          rows,
          loading,
          filters,
          autoRefresh: this.props.autoRefresh,
          removeRow: this.removeRowById,
          updateRow: this.updateRow,
          loadData: this.loadData,
          setFilter: this.setFilter,
          setQuery: this.setQuery,
          setSearch: this.setSearch,
          setLoading: this.setLoading,
          loadNextPage: this.loadNextPageSafe,
          clear: this.clear,
          setApiConfig: this.setApiConfig,
          setSearchPattern: this.setSearchPattern,

          tableProps: {
            rows,
            loading,
            onTableReady: this.onTableReady,
            onSortingChange: this.setSorting,
            onScrollToEnd: this.onScrollToEnd
          }
        }}>
        {this.props.children}
      </DatagridContext.Provider>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const refreshInterval = getSafe(() => auth.identity.settings, []).find(
    set => set.key === 'COMPANY_DATATABLE_REFRESH_INTERVAL' && set.value !== 'EMPTY_SETTING'
  )
  return {
    refreshInterval: getSafe(() => refreshInterval.value, null)
  }
}

export default connect(mapStateToProps)(DatagridProvider)
