import React from 'react'
import pt from 'prop-types'
import api from '~/api'
import _ from 'lodash'

export default (Component, {apiUrl, filters = []}) => {
  class DatagridProvider extends React.Component {

    state = {
      apiUrl,
      rows: [],
      filters: [],
      pageSize: 50,
      pageNumber: 0,
      allLoaded: false,
      loading: false
    }

    componentDidMount() {
      //this.loadNextPage()
    }

    async loadNextPage() {
      const { pageNumber, pageSize, filters } = this.state

      this.setState({ loading: true })

      try {
        const { data } = await api.post(apiUrl, {
          filters,
          pageNumber,
          pageSize
        })

        this.setState(s => ({
          rows:  _.unionBy(s.rows, data, 'id'),
          pageNumber: pageNumber + 1,
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
        rows: s.rows.filter((r,i) => i !== index)
      }))
    }

    onScrollToEnd = () => {
      const { rows, pageSize, pageNumber } = this.state

      !(rows.length < pageSize * pageNumber) && this.loadNextPage()
    }

    loadData = (pageNumber = 0) => {
      this.setState({
        pageNumber,
        rows: []
      }, this.loadNextPage)
    }

    setFilter = (filters, reload = true) => {
      this.setState({
        ...filters,
        rows: [],
        pageNumber: 0
      }, reload && this.loadNextPage)
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
            onScrollToEnd: this.onScrollToEnd
          }}
        />
      )
    }
  }

  return DatagridProvider
}