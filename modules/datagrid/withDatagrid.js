import React from 'react'
import pt from 'prop-types'
import api from '~/api'
import _ from 'lodash'

export default (Component, { apiUrl, searchUrl, savedFiltersUrl, filters = [] }) => {
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
        searchedProducts: [],
        searchedProductsLoading: false,
        savedFilters: [],
        savedFiltersLoading: false
      }

      this.loadNextPage = this.loadNextPage.bind(this)
      this.searchProducts = this.searchProducts.bind(this)
      this.getSavedFilters = this.getSavedFilters.bind(this)
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
          rows: _.unionBy(s.rows, data, 'id'),
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
        rows: s.rows.filter((r, i) => i !== index)
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

    clearFilter = () => {
      this.setState({ filters: [] }, this.loadData)
    }

    removeFilter = i => {
      let { filters } = this.state

      filters.splice(i, 1)
      this.setState({ filters }, this.loadData)
    }

    async searchProducts(text) {
      this.setState({ searchedProductsLoading: true })
      const { data } = await api.get(searchUrl(text))

      this.setState({ searchedProducts: data.concat(this.state.searchedProducts), searchedProductsLoading: false })
    }

    async getSavedFilters() {
      this.setState({ savedFiltersLoading: true })

      const { data } = await api.get(savedFiltersUrl)

      this.setState({ savedFilters: data, savedFiltersLoading: false })
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
            clearFilter: this.clearFilter,
            removeFilter: this.removeFilter,
            searchProducts: this.searchProducts,
            searchedProducts: this.state.searchedProducts,
            searchedProductsLoading: this.state.searchedProductsLoading,
            savedFilters: this.state.savedFilters,
            getSavedFilters: this.getSavedFilters,
            savedFiltersLoading: this.state.savedFiltersLoading
          }}
        />
      )
    }
  }

  return DatagridProvider
}