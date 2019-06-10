import React, { Component } from 'react'
import pt from 'prop-types'
import DataTable from '~/components/table'
import api from '~/api'

export default class Table extends Component {

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


  constructor(props) {
    super(props)

    const { pageSize, pageNumber } = props

    this.state = {
      rows: [],
      pageSize: pageSize || 50,
      pageNumber: pageNumber || 0
    }
  }

  async loadData() {
    const { apiUrl, filters } = this.props
    const { pageSize, pageNumber } = this.state

    const { data } = await api.post(apiUrl, {
      filters,
      pageSize,
      pageNumber: pageNumber + 1
    })

    this.setState({
      rows: [
        ...data
      ],
      pageNumber: pageNumber + 1
    })
  }

  render() {
    const { rows, pageSize } = this.state

    return (
      <DataTable
        {...this.props}
        rows={rows}
        pageSize={pageSize}
      />
    )
  }
}
