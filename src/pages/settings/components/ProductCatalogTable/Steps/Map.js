import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Table, Dropdown } from 'semantic-ui-react'

class Map extends Component {
  render() {
    const arr = [0, 1, 2, 3]
    return (
      <Table celled padded textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>CSV Columns</Table.HeaderCell>
            <Table.HeaderCell>CSV Preview</Table.HeaderCell>
            <Table.HeaderCell>Mapping</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {arr.map((row, i) => (
            <Table.Row key={i}>
              <Table.Cell>{row}</Table.Cell>
              <Table.Cell>Preview</Table.Cell>
              <Table.Cell>
                <Dropdown placeholder="Select Column" selection />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}

const mapDispatchToProps = {}

const mapStateToProps = state => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map)
