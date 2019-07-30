import React, { Component } from 'react'
import { Modal, Menu, Segment } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import ProdexTable from '~/components/table'

class AttachementManager extends Component {
  render() {
    
    return (
      <DatagridProvider apiConfig={{ url: '/prodex/api/attachements/datagrid/' }}>
        <Modal open centered={false}>
          <Modal.Header>Attachements Manager</Modal.Header>
          <Modal.Content>
            <ProdexTable 
              columns={[
                { name: "customName", title: "File Name", width: 300 },
              ]}
              {...this.props.datagrid} 
            />
          </Modal.Content>
        </Modal>
      </DatagridProvider>
    )
  }
}

export default withDatagrid(AttachementManager)
