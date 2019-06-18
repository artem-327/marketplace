import React from 'react'
import pt from 'prop-types'
import api from '~/api'
import _ from 'lodash'

export default (Component, { apiUrl, filters = [] }) => {
  class DatagridProvider extends React.Component {

    state = {
      apiUrl,
      rows: [],
      allLoaded: false,
      loading: false,
      datagridParams: {
        filters: [],
        pageSize: 50,
        pageNumber: 0
      }
    }

    componentDidMount() {
      //this.loadNextPage()
    }

    async loadNextPage() {
      const { datagridParams } = this.state

      this.setState({ loading: true })

      try {
        const { data } = await api.post(apiUrl, {
          ...datagridParams
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

    loadData = (params = {}) => {
      this.setState(s => ({
        datagridParams: {
          pageNumber: 0,
          ...s.datagridParams,
          ...params
        },
        rows: []
      }), this.loadNextPage)
    }

    setFilter = (filters, reload = true) => {
      this.setState(s => ({
        datagridParams: {
          ...s.datagridParams,
          ...filters,
          pageNumber: 0
        },
        rows: []
      }), () => reload && this.loadNextPage())
    }

    clearFilter = () => {
      this.setState(s => ({
        datagridParams: {
          filters: [],
          pageNumber: 0
        }
      }), this.loadNextPage())
    }

    render() {
      const { rows, loading } = this.state

      return (
        <Component {...this.props}
          datagrid={{
            rows,
            loading,
            removeRow: this.removeRowById,
            loadData: this.loadData,
            setFilter: this.setFilter,
            loadNextPage: this.loadNextPageSafe
          }}
        />
      )
    }
  }

  return DatagridProvider
}