import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table } from 'semantic-ui-react'

import { dataHeaderCSV } from '../../../actions'

class Preview extends Component {
  state = {
    filteredHeader: null,
    data: null
  }

  componentDidMount() {
    const filteredHeader =
      this.props.mappedHeader &&
      this.props.mappedHeader.filter(column => {
        return column.header
      })

    const data = filteredHeader.reduce(
      (prev, next) => {
        if (next.header === 'CAS Number') {
          prev['casNumberMapper'] = next.content
        } else if (next.header === 'Packaging Minimum') {
          prev['packagingMinimumMapper'] = next.content
        } else if (next.header === 'Packaging Size') {
          prev['packagingSizeMapper'] = next.content
        } else if (next.header === 'Packaging Splits') {
          prev['packagingSplitsMapper'] = next.content
        } else if (next.header === 'Packaging Type') {
          prev['packagingTypeNameMapper'] = next.content
        } else if (next.header === 'Unit') {
          prev['packagingUnitNameMaper'] = next.content
        } else if (next.header === 'Product Name') {
          prev['productNameMapper'] = next.content
        }
        return prev
      },
      { headerLine: true }
    )
    this.setState({ filteredHeader, data })
    data && this.props.dataHeaderCSV(data)
  }

  render() {
    const { CSV } = this.props
    const { filteredHeader, data } = this.state

    console.log(data)

    return (
      <Table celled padded textAlign="center">
        <Table.Header>
          <Table.Row>
            {filteredHeader &&
              filteredHeader.map(column => (
                <Table.HeaderCell key={column.columnNumber}>
                  {column.header}
                </Table.HeaderCell>
              ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {CSV.bodyCSV.map(row => (
            <Table.Row>
              {row.columns.map(cell => {
                return (
                  filteredHeader &&
                  filteredHeader.map(
                    header =>
                      header.columnNumber === cell.columnNumber && (
                        <Table.Cell>{cell.content}</Table.Cell>
                      )
                  )
                )
              })}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

const mapDispatchToProps = {
  dataHeaderCSV
}

const mapStateToProps = state => {
  return {
    mappedHeader: state.settings.mappedHeaders,
    CSV: state.settings.CSV
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Preview)
