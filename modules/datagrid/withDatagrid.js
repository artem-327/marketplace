import React from 'react'
import pt from 'prop-types'
import api from '~/api'
import _ from 'lodash'

export default (apiUrl, Component) => {
  class DatagridProvider extends React.Component {

    static propTypes = {
      apiUrl: pt.string.isRequired,
      filters: pt.arrayOf(pt.shape({
        operator: pt.string,
        path: pt.string,
        values: pt.arrayOf(pt.string)
      }))
    }

    static defaultProps = {
      filters: []
    }

    state = {
      rows: [],
      pageSize: 50,
      pageNumber: 0,
      allLoaded: false,
      loading: false
    }

    componentDidMount() {
      this.loadNextPage()
    }

    async loadNextPage() {
      const { filters } = this.props
      const { pageNumber, pageSize } = this.state

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

    onScrollToEnd = () => {
      const { rows, pageSize, pageNumber } = this.state

      !(rows.length < pageSize * pageNumber) && this.loadNextPage()
    }

    render() {
      const { rows, loading } = this.state

      return (
        <Component {...this.props}
          datagrid={{
            rows,
            loading,
            removeRow: this.removeRowById,
            onScrollToEnd: this.onScrollToEnd
          }}
        />
      )
    }
  }

  return DatagridProvider
}