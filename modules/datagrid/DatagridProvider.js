import { createContext, Component } from 'react'
import { connect } from 'react-redux'
import api from '~/api'
import pt from 'prop-types'
import { getSafe } from '~/utils/functions'
import { renderCopyright, cleanRenderCopyright } from '~/modules/settings/actions'
export const DatagridContext = createContext({})

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
  query: null,
  datagridParams: {
    orFilters: [],
    filters: [],
    pageSize: 50,
    pageNumber: 0
  },
  isScrollToUp: false,
  savedFilters: {},
  refreshTable: false,
  loadedAllData: false,
  isUpdatedRow: false
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
    this.setState({ savedFilters: {}, query: getSafe(() => this.props.apiConfig.params, null) })
  }

  refreshTable = () => {
    this.setState({ refreshTable: true })
    this.loadNextPage()
  }

  async componentWillUnmount() {
    await this.props.cleanRenderCopyright()
    await clearInterval(this.interval)
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
      this.props.cleanRenderCopyright()
      if (this.props.preserveFilters) {
        if (!this.props.skipInitLoad) {
          this.loadData()
        }
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

  loadNextPage = async (overPage = 0) => {
    console.log('loadNextPage')
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

    let dataOrParams =
      apiConfig.method === 'GET' && query
        ? { params: { ...query, pageNumber } }
        : {
            data: {
              ...datagridParams,
              pageNumber
            }
          }
    console.log('dataOrParams')
    console.log(dataOrParams)

    try {
      const response = await api.request({
        url: this.apiConfig && this.apiConfig.url ? this.apiConfig.url : apiConfig.url,
        method: apiConfig.method || 'POST',
        ...dataOrParams
      })
      if (
        (this.apiConfig && this.apiConfig.url && this.apiConfig.url !== response.config.url) ||
        (!this.apiConfig && response.config.url !== this.props.apiConfig.url)
      ) {
        return
      }

      const { data } = response
      const allLoaded = data.length < datagridParams.pageSize || data.length === 0

      if (this.state.loadedAllData || allLoaded) this.props.renderCopyright()
      else this.props.cleanRenderCopyright()

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
      this.setState({ isScrollToEnd: false, isScrollToUp: false, refreshTable: false, isUpdatedRow: false })
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

      return { rows, isUpdatedRow: true }
    })
  }

  removeRow = id => {
    this.removeRowById(id)
  }

  removeRowById = id => {
    this.setState(s => ({
      rows: s.rows.filter(r => r.id !== id),
      isUpdatedRow: true
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
    if (!this.props.allLoaded) {
      this.setState({
        loading: true
      })
      this.loadNextPage(overPage)
    }
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
        rows: [],
        allLoaded: false,
        loadedAllData: false
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

    const allFilters = {
      filters: this.joinFilterArrays(filters),
      orFilters: this.joinFilterArrays(orFilters)
    }

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

  joinFilterArrays = filter => {
    let filterObject = {}
    let newFilter = []

    filter.forEach(filt => {
      if (filt.operator) {
        if (filterObject[filt.operator]) {
          const index = filterObject[filt.operator].findIndex(el => el.path === filt.path)
          if (index >= 0) {
            filterObject[filt.operator][index].values = filterObject[filt.operator][index].values.concat(filt.values)
          } else {
            filterObject[filt.operator].push({
              path: filt.path,
              values: filt.values
            })
          }
        } else {
          filterObject[filt.operator] = [
            {
              path: filt.path,
              values: filt.values
            }
          ]
        }
      }
    })

    Object.keys(filterObject).forEach(key => {
      filterObject[key].forEach((filt, index) => {
        newFilter.push({
          operator: key,
          path: filterObject[key][index].path,
          values: [...new Set(filterObject[key][index].values)]
        })
      })
    })
    return newFilter
  }

  setQuery = (query, reload = true) => {
    this.setState(
      prevState => ({ query: { ...prevState.query, ...query } }),
      () => reload && this.loadData()
    )
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

  setUpdatedRow = (isUpdated = false) => {
    this.setState({ isUpdatedRow: isUpdated })
  }

  render() {
    const {
      rows,
      loading,
      datagridParams: { filters },
      savedFilters,
      loadedAllData,
      isUpdatedRow
    } = this.state

    console.log('render')

    return (
      <DatagridContext.Provider
        value={{
          apiConfig: this.props.apiConfig,
          rows,
          loading,
          filters,
          savedFilters,
          isUpdatedRow,
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
          setUpdatedRow: this.setUpdatedRow,

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
