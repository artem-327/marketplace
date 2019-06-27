import React from 'react'
import _ from 'lodash'
import { DatagridContext } from './DatagridProvider'

export default (Component) => {
  class DatagridComponent extends React.Component {
    static contextType = DatagridContext

    render() {
      return (
        <Component {...this.props}
          datagrid={this.context}
        />
      )
    }
  }

  return DatagridComponent
}