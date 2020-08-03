import React, { Component } from 'react'
import { connect } from 'react-redux'
import api from '~/api'
import pt from 'prop-types'
import { getSafe } from '~/utils/functions'
import { renderCopyright, cleanRenderCopyright } from '~/modules/settings/actions'
export const DatagridContext = React.createContext({})

const CONSTANTS_INTERVALS = {
  '30s': 30000,
  '60s': 60000,
  '5min': 300000,
  '10min': 600000,
  '15min': 900000
}

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
  isScrollToUp: false,
  savedFilters: {},
  refreshTable: false,
  loadedAllData: false
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
    this.props.cleanRenderCopyright()
    clearInterval(this.interval)
  }

  // componentWillReceiveProps({apiConfig}) {
  //   if (JSON.stringify(apiConfig) !== JSON.stringify(this.props.apiConfig)) {
  //     this.setState(initialState)
  //     this.loadData()
  //   }
  // }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.apiConfig &&
      prevProps.apiConfig.url &&
      this.props.apiConfig &&
      this.props.apiConfig.url &&
      prevProps.apiConfig.url !== this.props.apiConfig.url
    ) {
      if (this.props.preserveFilters) {
        if (!this.props.skipInitLoad) {
          this.loadData()
        }
      } else {
        this.setState({ savedFilters: {} }, () => this.setFilter({ filters: [], orFilters: [] }))
      }
    }

    if (this.state.loadedAllData && !prevState.loadedAllData) {
      this.props.renderCopyright()
    }
  }

  clear = () => {
    this.setState(initialState)
  }

  isReady = () => {
    return this.state.ready && this.props.apiConfig
  }

  loadNextPage = async (overPage = 0) => {
    if (!this.props.apiConfig) return

    const { datagridParams, query, refreshTable, allLoaded } = this.state
    const { apiConfig } = this.props

    let pageNumber = 0
    if (refreshTable) {
      if (allLoaded) {
        pageNumber = datagridParams.pageNumber
      } else {
        pageNumber = datagridParams.pageNumber - 1
      }
    } else if (
      getSafe(() => datagridParams.filters.length, false) ||
      getSafe(() => datagridParams.orFilters.length, false)
    ) {
      pageNumber = 0
    } else {
      pageNumber = datagridParams.pageNumber + overPage
    }
    if (pageNumber < 0) {
      pageNumber = 0
    }

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

      let arrRows = this.state.rows
      if (arrRows && arrRows.length) {
        arrRows.forEach((row, i) => {
          if (data && data.length) {
            data.forEach((d, j) => {
              if (d.id === row.id) {
                arrRows.splice(i, 1, d)
                data.splice(j, 1)
              }
              return
            })
          }
        })
      }
      const newRows =
        arrRows && arrRows.length
          ? arrRows.concat(data && data.length ? data : [])
          : [].concat(data && data.length ? data : [])

      this.setState(s => ({
        rows: newRows,
        loading: false,
        allLoaded,
        loadedAllData: s.loadedAllData ? s.loadedAllData : allLoaded,
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
      this.setState({ isScrollToEnd: false, isScrollToUp: false, refreshTable: false })
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

  onScrollToEnd = (overBottoms = 0) => {
    const overPage =
      !this.props.autoRefresh || (this.state.datagridParams.pageNumber === 1 && overBottoms <= 1) ? 0 : overBottoms - 1
    this.setState({
      loading: true
    })
    this.loadNextPageSafe(overPage)
  }

  onScrollOverNewEnd = (overBottoms = 0) => {
    const overPage = overBottoms <= 1 ? 0 : overBottoms - 1

    this.props.autoRefresh && this.loadNextPage(overPage)
  }

  onScrollOverNewUp = (overTops = 0) => {
    const overPage = this.state.allLoaded ? overTops : overTops - 1

    this.props.autoRefresh && this.loadNextPage(overPage)
  }

  loadNextPageSafe = (overPage = 0) => {
    const { allLoaded } = this.state

    !allLoaded && this.loadNextPage(overPage)
  }

  loadData = (params = { pageNumber: 0 }, query = {}) => {
    this.setState(
      s => ({
        ready: true,
        loading: true,
        datagridParams: {
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
          ...sortFilter,
          pageNumber: 0
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
    if (this.props.apiConfig) {
      const {
        apiConfig: { searchToFilter, params }
      } = this.props

      let filters = typeof searchToFilter !== 'function' ? this.apiConfig.searchToFilter(value) : searchToFilter(value)

      if (filters.url) {
        this.apiConfig = { url: filters.url }
      }
      this.setState(
        s => ({
          datagridParams: { ...s.datagridParams, ...params }
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
    } else {
      console.warn('Missing apiConfig in DatagridProvider')
    }
  }

  setLoading = loading => {
    this.setState({
      loading
    })
  }

  onTableReady = (params = {}) => {
    if (this.props.skipInitLoad) {
      this.setState(s => ({
        ready: true,
        datagridParams: {
          ...s.datagridParams,
          ...params
        },
        rows: []
      }))
    } else {
      this.loadData(params)
    }
  }

  setApiConfig = apiConfig => {
    this.apiConfig = apiConfig
    this.loadData()
  }

  render() {
    const {
      rows,
      loading,
      datagridParams: { filters },
      savedFilters,
      loadedAllData
    } = this.state

    return (
      <DatagridContext.Provider
        value={{
          apiConfig: this.props.apiConfig,
          rows,
          loading,
          filters,
          savedFilters,
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
            loadedAllData,
            onTableReady: this.onTableReady,
            onSortingChange: this.setSorting,
            onScrollToEnd: this.onScrollToEnd,
            onScrollOverNewEnd: this.onScrollOverNewEnd,
            onScrollOverNewUp: this.onScrollOverNewUp
          }
        }}>
        {this.props.children}
      </DatagridContext.Provider>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  const refreshIntervalObject = getSafe(() => auth.identity.settings, []).find(
    set => set.key === 'COMPANY_DATATABLE_REFRESH_INTERVAL' && set.value !== 'EMPTY_SETTING'
  )

  const refreshIntervalValue =
    refreshIntervalObject && refreshIntervalObject.value && parseInt(refreshIntervalObject.value) >= 30000
      ? parseInt(refreshIntervalObject.value)
      : 60000

  return {
    refreshInterval: refreshIntervalValue
  }
}

export default connect(mapStateToProps, { renderCopyright, cleanRenderCopyright })(DatagridProvider)
