import React, { Component } from 'react'
import { Modal, Input, Button, Grid, GridRow, GridColumn, Header } from 'semantic-ui-react'
import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { debounce } from 'lodash'

import ProdexTable from '~/components/table'
import DocumentManagerPopup from '~/modules/settings/components/Documents/DocumentManagerPopup'
import { node, object } from 'prop-types'

const CustomHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
`

const AttachmentModal = withDatagrid(class extends Component {
  state = {
    open: false,
    uploadOpen: false,
    selectedRows: [],
  }

  returnSelectedRows = async () => {
    const { datagrid } = this.props

    this.props.returnSelectedRows(this.state.selectedRows.map(srIndex => {
      return { ...datagrid.rows[srIndex], index: srIndex }
    }))
    this.setState({ open: false })
  }



  handleSearch = debounce(({ value }) => {
    let { datagrid } = this.props
    datagrid.setSearch(value)
  }, 250)


  render() {
    const { datagrid, lockSelection, trigger, tableProps } = this.props

    return (
      <>
        <Modal closeIcon onClose={() => this.setState({ open: false })} centered={true} open={this.state.open}
          trigger={React.cloneElement(trigger, { onClick: () => this.setState({ open: true }) })}
          onClose={() => this.setState({ open: false })}>
          <CustomHeader>
            <Grid verticalAlign='middle'>
              <GridRow>
                <GridColumn width={6}><Header as='h2'>
                  <FormattedMessage id='global.documentManager' defaultMessage='Document Manager'>{text => text}</FormattedMessage></Header>
                </GridColumn>

                <GridColumn width={4} floated='right'>
                  <Input icon='search' fluid placeholder='Search...' onChange={(_, data) => this.handleSearch(data)} />
                </GridColumn>

                <GridColumn width={4}>
                  <Button type='button' fluid primary disabled={!this.state.selectedRows.length} onClick={this.returnSelectedRows}>
                    <FormattedMessage id='attachments.attachSelected' defaultMessage='Attach Selected Files'>{(text) => text}</FormattedMessage>
                  </Button>
                </GridColumn>
              </GridRow>

            </Grid>

          </CustomHeader>
          <Modal.Content scrolling>
            <ProdexTable
              {...datagrid.tableProps}
              {...tableProps}
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


          <Modal.Actions>
            <Button basic onClick={() => this.setState({ open: false })}><FormattedMessage id='global.cancel' defaultMessage='Cancel'>{text => text}</FormattedMessage></Button>
            <Button primary onClick={() => this.setState({ uploadOpen: true })}><FormattedMessage id='global.uploadAnother' defaultMessage='Upload Another'>{text => text}</FormattedMessage></Button>
            {this.state.uploadOpen && <DocumentManagerPopup onClose={() => this.setState({ uploadOpen: false })} />}
          </Modal.Actions>

        </Modal>
      </>
    )
  }
})


AttachmentModal.propTypes = {
  trigger: node,
  tableProps: object
}

AttachmentModal.defaultProps = {
  trigger: <Button basic type='button'><FormattedMessage id='global.documentManager' defaultMessage='Document Manager'>{text => text}</FormattedMessage></Button>,
  tableProps: {}
}

class AttachmentManager extends Component {
  getApiConfig = () => ({
    url: '/prodex/api/attachments/datagrid/',
    searchToFilter: v => v ? ([
      { operator: 'LIKE', path: 'Attachment.name', values: [`%${v}%`] },
      { operator: 'LIKE', path: 'Attachment.customName', values: [`%${v}%`] },
      { operator: 'LIKE', path: 'Attachment.documentType.name', values: [`%${v}%`] }
    ]) : [],
    params: {
      orOperator: true
    }
  })

  render() {
    return (
      <DatagridProvider apiConfig={this.getApiConfig()}>
        <AttachmentModal {...this.props} />
      </DatagridProvider>
    )
  }
}

export default AttachmentManager
