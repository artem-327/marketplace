import React, { PureComponent } from 'react'
import DataTable from '~/components/table'

export default class Table extends PureComponent {
  render() {
    return (
      <DataTable 
        {...this.props}
      />
    )
  }
}
