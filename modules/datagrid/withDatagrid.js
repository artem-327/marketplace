import React from 'react'
import pt from 'prop-types'
import api from '~/api'
import _ from 'lodash'

export default (Component, { apiUrl, filters = [] }) => {
  class DatagridProvider extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        rows: [],
        filters: [],
        pageSize: 50,
        pageNumber: 0,
        allLoaded: false,
        loading: false,
      }

      this.loadNextPage = this.loadNextPage.bind(this)
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

        this.setState(s => ({
          rows: _.unionBy(s.rows, data, 'id'),
          pageNumber: s.pageNumber + 1,
          loading: false
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

    onScrollToEnd = () => {
      const { rows, datagridParams: { pageSize, pageNumber } } = this.state

      !(rows.length < pageSize * pageNumber) && this.loadNextPage()
    }

    loadData = (pageNumber = 0) => {
      this.setState(s => ({
        datagridParams: { 
          ...s.datagridParams,
          pageNumber 
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
      }), reload && this.loadNextPage)
    }

    clearFilter = () => {
      this.setState(s => ({
        datagridParams: {
          filters: [],
          pageNumber: 0
        }
      }), this.loadNextPage())
    }

    clearFilter = () => {
      this.setState({ filters: [] }, this.loadData)
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
            onScrollToEnd: this.onScrollToEnd,
            filters: this.state.filters,
            setFilter: this.setFilter,
          }}
        />
      )
    }
  }

  return DatagridProvider
}