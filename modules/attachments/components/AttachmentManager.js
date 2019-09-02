import React, { Component } from 'react'
import { Modal, Menu, Segment, Button } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import { FormattedMessage } from 'react-intl'
import ProdexTable from '~/components/table'

const AttachmentModal = withDatagrid(class extends Component {
  state = {
    open: false,
    selectedRows: []
  }

  returnSelectedRows = async () => {
    const { datagrid } = this.props
    await this.props.returnSelectedRows(this.state.selectedRows.map(srIndex => {
      return datagrid.rows[srIndex]
    }))
    this.setState({open: false})
  }

  render() {
    const { datagrid, lockSelection } = this.props

    return (
      <>
        <Modal centered={true} open={this.state.open} trigger={<Button basic type='button' onClick={() => this.setState({open: true})}>Attachements</Button>} onClose={() => this.setState({open: false})}>
          <Modal.Header>
            Attachements Manager
            <Button type='button' floated='right' primary disabled={!this.state.selectedRows.length} onClick={this.returnSelectedRows}>
              <FormattedMessage id={'attachments.attachSelected'} defaultMessage='Attach Selected Files'>{(text)=>text}</FormattedMessage>
            </Button>
          </Modal.Header>
          <Modal.Content scrolling>
            <ProdexTable
              {...datagrid.tableProps}
              rows={datagrid.rows.map(r => ({
                id: r.id,
                name: r.name,
                documentType: r.documentType.name
              }))}
              tableName="attachements"
              columns={[
                { name: "name", title: "File Name", width: 400 },
                { name: "documentType", title: "Type", width: 200 },
              ]}
              rowSelection
              lockSelection={lockSelection}
              showSelectAll={false}
              onSelectionChange={selectedRows => this.setState({ selectedRows })}
              getChildGroups={rows =>
                _(rows)
                  .groupBy('name')
                  .map(v => ({
                    key: `${v[0].name}_${v[0].documentType}_${v.length}`,
                    childRows: v
                  }))
                  .value()
              }
            />
          </Modal.Content>
        </Modal>
      </>
    )
  }
})

class AttachmentManager extends Component {
  render() {
    return (
      <DatagridProvider apiConfig={{ url: '/prodex/api/attachments/datagrid/' }}>
        <AttachmentModal returnSelectedRows={this.props.returnSelectedRows} lockSelection={this.props.lockSelection} />
      </DatagridProvider>
    )
  }
}

export default AttachmentManager
