import React, { Component } from 'react'
import api from '~/api'
export const DatagridContext = React.createContext({})

export class DatagridProvider extends Component {

  constructor(props) {
    super(props)

    this.state = {
      rows: [],
      allLoaded: false,
      loading: true,
      query: {},
      datagridParams: {
        filters: [],
        pageSize: 50,
        pageNumber: 0
      }
    }
  }

  // componentDidUpdate({apiUrl}) {
  //   console.log()
  //   if (apiUrl !== this.props.apiUrl && this.state.ready) {
  //     this.loadData()
  //   }
  // }

  loadNextPage = async () => {
    if (!this.props.apiUrl) return

    const { datagridParams, query } = this.state
    const { apiUrl } = this.props

    this.setState({ loading: true })

    try {
      const { data } = await api.request({
        url: apiUrl,
        method: 'POST',
        params: query,
        data: {
          ...datagridParams
        }
      })

      const allLoaded = data.length < datagridParams.pageSize || data.length === 0

      this.setState(s => ({
        rows: _.unionBy(s.rows, data, 'id'),
        loading: false,
        allLoaded,
        datagridParams: {
          ...s.datagridParams,
          pageNumber: s.datagridParams.pageNumber + (allLoaded ? 0 : 1),
        }
      }))
    } catch (e) {
      this.setState({ loading: false })
    }
  }

  removeRowById = (id) => {
    this.setState(s => ({
      rows: s.rows.filter(r => r.id !== id)
    }))
  }

  removeRowByIndex = (index) => {
    this.setState(s => ({
      rows: s.rows.filter((r, i) => i !== index)
    }))
  }

  loadNextPageSafe = () => {
    const { allLoaded } = this.state

    !allLoaded && this.loadNextPage()
  }

  loadData = (params = {}, query = {}) => {
    this.setState(s => ({
      datagridParams: {
        pageNumber: 0,
        ...s.datagridParams,
        ...params
      },
      rows: []
    }), this.loadNextPage)
  }

  setApiUrl = (apiUrl, reload = true) => {
    this.apiUrl = apiUrl
    reload && this.loadData()
  }

  setFilter = (filters, reload = true) => {
    this.setState(s => ({
      datagridParams: {
        ...s.datagridParams,
        ...filters,
        pageNumber: 0
      },
      rows: []
    }), () => reload && this.loadData())
  }

  setQuery = (query, reload = true) => {
    this.setState({query}, () => reload && this.loadData())
  }

  onTableReady = () => {
    this.setState({ ready: true })
    this.loadData()
  }

  render() {
    const { rows, loading, datagridParams: { filters } } = this.state

    return (
      <DatagridContext.Provider
        value={{
          rows,
          loading,
          filters,
          removeRow: this.removeRowById,
          loadData: this.loadData,
          setFilter: this.setFilter,
          setQuery: this.setQuery,
          setApiUrl: this.setApiUrl,
          loadNextPage: this.loadNextPageSafe,

          tableProps: {
            rows,
            loading,
            onTableReady: this.onTableReady,
            onSortingChange: this.setFilter,
            onScrollToEnd: this.loadNextPageSafe
          }
        }}
      >
        {this.props.children}
      </DatagridContext.Provider>
    )
  }
}
