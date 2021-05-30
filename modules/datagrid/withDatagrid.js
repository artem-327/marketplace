import * as React from 'react'
import { DatagridContext } from './DatagridProvider'

const Datagrid = Component => {
  class DatagridComponent extends React.Component {
    static contextType = DatagridContext

    render() {
      return <Component {...this.props} datagrid={this.context} />
    }
  }

  return DatagridComponent
}

export default Datagrid
