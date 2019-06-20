import React from 'react'
import pt from 'prop-types'
import api from '~/api'
import _ from 'lodash'

export default (Component, { apiUrl }) => {
  class DatagridProvider extends React.Component {

    constructor(props) {
      super(props)

      this.apiUrl = apiUrl
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


    async loadNextPage() {
      const { datagridParams, query } = this.state

      this.setState({ loading: true })

      try {
        const { data } = await api.request({
          url: this.apiUrl, 
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

    setFilter = (filters, query = {}, reload = true) => {
      this.setState(s => ({
        datagridParams: {
          ...s.datagridParams,
          ...filters,
          pageNumber: 0
        },
        query,
        rows: []
      }), () => reload && this.loadNextPage())
    }


    render() {
      const { rows, loading, datagridParams: { filters } } = this.state

      return (
        <Component {...this.props}
          datagrid={{
            rows,
            loading,
            filters,
            removeRow: this.removeRowById,
            loadData: this.loadData,
            setFilter: this.setFilter,
            setApiUrl: this.setApiUrl,
            loadNextPage: this.loadNextPageSafe,

            tableProps: {
              rows,
              loading,
              onTableReady: this.loadData,
              onSortingChange: this.setFilter,
              onScrollToEnd: this.loadNextPageSafe
            }
          }}
        />
      )
    }
  }

  return DatagridProvider
}