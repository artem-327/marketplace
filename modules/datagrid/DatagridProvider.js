import React, { Component } from 'react'
import api from '~/api'
import pt from 'prop-types'
export const DatagridContext = React.createContext({})

const initialState = {
  ready: false,
  rows: [],
  allLoaded: false,
  loading: true,
  query: {},
  datagridParams: {
    filters: [],
    pageSize: 50
    //pageNumber: 0
  }
}

// singleton instance
export let Datagrid

export class DatagridProvider extends Component {
  static propTypes = {
    apiConfig: pt.shape({
      url: pt.string.isRequired,
      method: pt.oneOf(['POST', 'GET'])
    }).isRequired
  }

  constructor(props) {
    super(props)

    this.state = initialState

    Datagrid = this
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
      this.setFilter({ filters: [] })
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

    const { datagridParams, query } = this.state
    const { apiConfig } = this.props

    this.setState({ loading: true })

    try {
      const response = await api.request({
        url: this.apiConfig && this.apiConfig.url ? this.apiConfig.url : apiConfig.url,
        method: apiConfig.method || 'POST',
        params: query,
        data: {
          ...datagridParams
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
          ...s.datagridParams
          //pageNumber: s.datagridParams.pageNumber + (allLoaded ? 0 : 1)
        }
      }))
    } catch (e) {
      console.error(e)
      this.setState({ loading: false })
    } finally {
      this.apiConfig = null
    }
  }

  updateRow = (id, updateFn) => {
    this.setState(s => {
      let rows = s.rows.slice(0).map((r, i) => {
        if (r.id === id) {
          return updateFn(r)
        } else return r
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

  loadNextPageSafe = () => {
    const { allLoaded } = this.state

    !allLoaded && this.loadNextPage()
  }

  loadData = (params = {}, query = {}) => {
    this.setState(
      s => ({
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

  setFilter = (filters, reload = true) => {
    this.setState(
      s => ({
        datagridParams: {
          ...s.datagridParams,
          ...filters
          //pageNumber: 0
        },
        rows: []
      }),
      () => reload && this.loadData()
    )
  }

  setQuery = (query, reload = true) => {
    this.setState({ query }, () => reload && this.loadData())
  }

  setSearch = (value, reload = true) => {
    const {
      apiConfig: { searchToFilter, params }
    } = this.props

    this.setState(
      s => ({
        datagridParams: { ...s.datagridParams, ...params }
      }),
      () => {
        this.setFilter(
          {
            filters: typeof searchToFilter !== 'function' ? this.apiConfig.searchToFilter(value) : searchToFilter(value)
          },
          reload
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
    this.setState({ ready: true })
    this.loadData(params)
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

          tableProps: {
            rows,
            loading,
            onTableReady: this.onTableReady,
            onSortingChange: this.setFilter,
            onScrollToEnd: this.loadNextPageSafe
          }
        }}>
        {this.props.children}
      </DatagridContext.Provider>
    )
  }
}
