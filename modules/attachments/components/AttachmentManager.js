import React, { Component } from 'react'
import { Modal, Menu, Segment, Button } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import ProdexTable from '~/components/table'

const AttachmentModal = withDatagrid(class extends Component {
  render() {
    const { datagrid } = this.props

    return (
      <Modal centered={false} trigger={<Button basic type='button'>Attachements</Button>}>
        <Modal.Header>Attachements Manager</Modal.Header>
        <Modal.Content scrolling>
          <ProdexTable
            {...datagrid.tableProps}
            rows={datagrid.rows.map(r => ({
              name: r.name,
              documentType: r.documentType.name
            }))}
            tableName="attachements"
            columns={[
              { name: "name", title: "File Name", width: 400 },
              { name: "documentType", title: "Type", width: 200 },
            ]}
          />
        </Modal.Content>
      </Modal>
    )
  }
})

class AttachmentManager extends Component {
  render() {
    return (
      <DatagridProvider apiConfig={{ url: '/prodex/api/attachments/datagrid/' }}>
        <AttachmentModal />
      </DatagridProvider>
    )
  }
}

export default AttachmentManager
