import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Input, Button, Grid, GridRow, GridColumn, Header, Icon, Dropdown } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { debounce } from 'lodash'
import moment from 'moment'
import { node, object, bool } from 'prop-types'

import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import ProdexTable from '~/components/table'

import DocumentManagerPopup from '~/modules/settings/components/Documents/DocumentManagerPopup'
import { getDocumentTypes } from '~/modules/settings/actions'

const CustomHeader = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  margin-right: 25px;
`

const PaddedIcon = styled(Icon)`
  padding-top: 1.1rem !important;
`

const CustomDropdown = styled(Dropdown)`
  z-index: 601 !important;
`

const CustomGridColumn = styled(GridColumn)`
  padding-left: 0px !important;
  padding-right: 0px !important;
`

class AttachmentClass extends Component {
  state = {
    open: false,
    uploadOpen: false,
    selectedRows: [],
    documentTypes: '',
    documentTypeText: '',
    isManualyUpdated: false
  }

  componentDidMount() {
    const {
      documentTypes,
      getDocumentTypes,
      isOpenManager,
      relatedDocumentType: { text, value }
    } = this.props
    if (documentTypes && !documentTypes.length) {
      getDocumentTypes()
    }
    if (isOpenManager) {
      this.setState({ open: true })
    }
    if (text && value) {
      this.handleSearch({ value: text })
      this.setState({ documentTypes: value, documentTypeText: text, isManualyUpdated: false })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.documentTypeText) {
      const {
        relatedDocumentType: { text, value }
      } = this.props
      console.log('prevState====================================')
      console.log(prevState)
      console.log('====================================')
      console.log('this.state====================================')
      console.log(this.state)
      console.log('====================================')
      const wrongRows = this.props.datagrid.rows.filter(row => row.documentType.name !== this.state.documentTypeText)
      console.log('wrongRows====================================')
      console.log(wrongRows)
      console.log('====================================')
      if (wrongRows && wrongRows.length && !this.state.isManualyUpdated) {
        this.handleSearch({ value: this.state.documentTypeText })
      }
    }
  }

  returnSelectedRows = async () => {
    const { datagrid } = this.props
    this.props.returnSelectedRows(
      this.state.selectedRows.map(id => {
        return { ...datagrid.rows.find(att => att.id === id) }
      })
    )
    this.handleSearch({ value: '' })
    this.setState({ open: false, documentTypes: '' })
  }

  handleSearch = debounce(({ value }) => {
    let { datagrid } = this.props
    datagrid.setSearch(value)
  }, 150)

  getContent = () => {
    const { datagrid, lockSelection, tableProps, selectable } = this.props

    return (
      <ProdexTable
        {...datagrid.tableProps}
        {...tableProps}
        rows={datagrid.rows.map(r => ({
          id: r.id,
          name: r.name,
          documentType: r && r.documentType && r.documentType.name,
          expirationDate: r.expirationDate && moment(r.expirationDate).format('MM/DD/YYYY'),
          description: r.description ? r.description : ''
        }))}
        tableName='attachements'
        columns={[
          { name: 'name', title: 'File Name', width: 270 },
          { name: 'documentType', title: 'Type', width: 150 },
          { name: 'expirationDate', title: 'Expiration Date', width: 120 },
          { name: 'description', title: 'Description', width: 210 }
        ]}
        rowSelection={selectable}
        lockSelection={false}
        showSelectAll={false}
        normalWidth={true}
        showSelectionColumn
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
    )
  }

  render() {
    const {
      trigger,
      asModal,
      documentTypes,
      relatedDocumentType: { text, value }
    } = this.props
    if (!asModal) return this.getContent()

    return (
      <>
        <Modal
          closeIcon={
            <PaddedIcon
              onClick={() => {
                this.handleSearch({ value: '' })
                this.setState({ open: false, documentTypes: '', isManualyUpdated: false })
              }}
              name='close icon'
            />
          }
          onClose={() => {
            this.setState({ open: false })
          }}
          centered={true}
          open={this.state.open}
          trigger={React.cloneElement(trigger, {
            onClick: () => {
              if (text && value) {
                this.setState({ open: true, documentTypes: value })
                this.handleSearch({ value: text })
              } else {
                this.setState({ open: true })
              }
            }
          })}
          onClose={() => {
            this.handleSearch({ value: '' })
            this.setState({ open: false, documentTypes: '', isManualyUpdated: false })
          }}>
          <CustomHeader>
            <Grid verticalAlign='middle'>
              <GridRow>
                <GridColumn width={6}>
                  <Header as='h2'>
                    <FormattedMessage id='global.documentManager' defaultMessage='Document Manager'>
                      {text => text}
                    </FormattedMessage>
                  </Header>
                </GridColumn>
              </GridRow>
            </Grid>
          </CustomHeader>
          <Modal.Content scrolling>
            <Grid style={{ justifyContent: 'flex-end' }}>
              <GridRow>
                <GridColumn width={4}>
                  <CustomDropdown
                    name='documentTypes'
                    options={documentTypes}
                    value={this.state.documentTypes}
                    selection
                    onChange={(event, { name, value }) => {
                      const data = documentTypes.find(option => parseInt(option.value) === parseInt(value))
                      this.handleSearch({ value: data.text })
                      this.setState({ [name]: value, isManualyUpdated: true })
                    }}
                    placeholder={
                      <FormattedMessage id='related.documents.selectType' defaultMessage='Select type'>
                        {text => text}
                      </FormattedMessage>
                    }
                  />
                </GridColumn>
                <GridColumn width={5}>
                  <Input icon='search' placeholder='Search...' onChange={(_, data) => this.handleSearch(data)} />
                </GridColumn>

                <CustomGridColumn width={4}>
                  <Button
                    type='button'
                    style={{ color: 'white', backgroundColor: '#2599d5' }}
                    disabled={!this.state.selectedRows.length}
                    onClick={this.returnSelectedRows}>
                    <FormattedMessage id='attachments.attachSelected' defaultMessage='Attach Selected Files'>
                      {text => text}
                    </FormattedMessage>
                  </Button>
                </CustomGridColumn>
              </GridRow>
            </Grid>
            {this.getContent()}
          </Modal.Content>

          <Modal.Actions>
            <Button
              basic
              onClick={() => {
                this.handleSearch({ value: '' })
                this.setState({ open: false, documentTypes: '', isManualyUpdated: false })
              }}>
              <FormattedMessage id='global.cancel' defaultMessage='Cancel'>
                {text => text}
              </FormattedMessage>
            </Button>
            <Button
              style={{ color: 'white', backgroundColor: '#2599d5' }}
              onClick={() => this.setState({ uploadOpen: true })}>
              <FormattedMessage id='global.uploadAnother' defaultMessage='Upload Another'>
                {text => text}
              </FormattedMessage>
            </Button>
            {this.state.uploadOpen && (
              <DocumentManagerPopup
                onClose={() => {
                  this.setState({ uploadOpen: false })
                }}
              />
            )}
          </Modal.Actions>
        </Modal>
      </>
    )
  }
}
const mapDispatchToProps = {
  getDocumentTypes
}

const mapStateToProps = state => {
  return {
    documentTypes: state.settings.documentTypes
  }
}
const AttachmentModal = withDatagrid(connect(mapStateToProps, mapDispatchToProps)(AttachmentClass))

AttachmentModal.propTypes = {
  trigger: node,
  tableProps: object,
  asModal: bool,
  selectable: bool
}

AttachmentModal.defaultProps = {
  trigger: (
    <Button fluid type='button' style={{ color: 'white', backgroundColor: '#2599d5' }}>
      <FormattedMessage id='global.documentManager' defaultMessage='Document Manager'>
        {text => text}
      </FormattedMessage>
    </Button>
  ),
  tableProps: {},
  asModal: true,
  selectable: true
}

class AttachmentManager extends Component {
  getApiConfig = () => ({
    url: '/prodex/api/attachments/datagrid/',
    searchToFilter: v =>
      v
        ? [
            { operator: 'LIKE', path: 'Attachment.name', values: [`%${v}%`] },
            {
              operator: 'LIKE',
              path: 'Attachment.customName',
              values: [`%${v}%`]
            },
            {
              operator: 'LIKE',
              path: 'Attachment.documentType.name',
              values: [`%${v}%`]
            }
          ]
        : [],
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
