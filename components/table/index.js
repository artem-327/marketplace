import React, {Component} from 'react'
import {Table} from 'semantic-ui-react'

export default class _Table extends Component {
  render() {
    const {rows, columns} = this.props
    return (
      <Table>
        <Table.Header>
          {columns.map(c => (
            <Table.HeaderCell>{c.title}</Table.HeaderCell>
          ))}
        </Table.Header>
      </Table>
    )
  }
}

