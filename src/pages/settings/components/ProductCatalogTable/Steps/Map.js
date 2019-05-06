import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table, Dropdown } from 'semantic-ui-react'

const mapping = [
  { text: 'CAS Number', value: 'CAS Number' },
  { text: 'Packaging Minimum', value: 'Packaging Minimum' },
  { text: 'Packaging Size', value: 'Packaging Size' },
  { text: 'Packaging Splits', value: 'Packaging Splits' },
  { text: 'Packaging Type', value: 'Packaging Type' },
  { text: 'Unit', value: 'Unit' },
  { text: 'Product Name', value: 'Product Name' }
]

class Map extends Component {
  state = {
    newHeaders: null
  }

  componentDidMount() {
    this.setState({ newHeaders: this.props.CSV.headerCSV })
  }

  render() {
    const { CSV } = this.props
    console.log(this.state.newHeaders)
    return (
      <Table celled padded textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>CSV Columns</Table.HeaderCell>
            <Table.HeaderCell>CSV Preview</Table.HeaderCell>
            <Table.HeaderCell>Mapping</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {CSV && (
          <Table.Body>
            {CSV.headerCSV.map(lineHeader => (
              <Table.Row key={lineHeader.columnNumber}>
                <Table.Cell>{lineHeader.content}</Table.Cell>
                <Table.Cell>
                  {CSV.bodyCSV.map(line => {
                    return line.columns.map(lineBody => {
                      return (
                        lineHeader.columnNumber === lineBody.columnNumber &&
                        lineBody.content + ' '
                      )
                    })
                  })}
                </Table.Cell>
                <Table.Cell>
                  <Dropdown
                    placeholder="Select Column"
                    columnNumber={lineHeader.columnNumber}
                    selection
                    clearable
                    options={mapping}
                    onChange={this.selectMapping}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>
    )
  }

  selectMapping = (e, { columnNumber, value }) => {
    console.log('csv header:', columnNumber, 'map:', value)
    this.state.newHeaders.map(line => {
      if (columnNumber === line.columnNumber) {
        line['header'] = value
        return line
      }
      return line
    })
    console.log(this.state.newHeaders)
  }
}

const mapDispatchToProps = {}

const mapStateToProps = state => {
  return {
    csvFileId: state.settings.fileCSVId,
    CSV: state.settings.CSV
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
