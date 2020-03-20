import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Input, Button, Grid, GridRow, GridColumn, Header, Icon, Dropdown } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { debounce } from 'lodash'
import moment from 'moment'
import { node, object, bool, array } from 'prop-types'
import { FileText } from 'react-feather'

import { withDatagrid, DatagridProvider } from '~/modules/datagrid'
import ProdexTable from '~/components/table'

import DocumentManagerPopup from '~/modules/settings/components/Documents/DocumentManagerPopup'
import { getDocumentTypes } from '~/modules/settings/actions'
import { getSafe } from '~/utils/functions'

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

const CustomButton = styled(Button)`
  color: #2599d5 !important;
  background-color: #ddf1fc !important;
  border: solid 1px #2599d5 !important;
  border-radius: 3px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`

const CustomIcon = styled(FileText)`
  padding-right: 10px !important;
  width: 28px;
`

class AttachmentClass extends Component {
  state = {
    open: false,
    uploadOpen: false,
    selectedRows: [],
    documentTypes: [],
    searchValue: ''
  }

  componentDidMount() {
    const { documentTypes, getDocumentTypes, isOpenManager, documentTypesForCertificates } = this.props
    if (documentTypes && !documentTypes.length) {
      getDocumentTypes()
    }
    if (documentTypesForCertificates && documentTypesForCertificates.length) {
      this.setState({ documentTypes: documentTypesForCertificates.map(doc => doc.value) })
    }
    if (isOpenManager) {
      this.setState({ open: true })
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.isOpenManager && this.props.isOpenManager) {
      this.setState({
        open: true
      })
    }
  }

  returnSelectedRows = async () => {
    const { datagrid } = this.props
    this.props.returnSelectedRows(
      this.state.selectedRows.map(id => {
        return { ...datagrid.rows.find(att => att.id === id) }
      })
    )
    this.handleSearch({ value: '', type: [] })
    this.setState({ open: false, documentTypes: '' })
  }

  handleSearch = debounce((value = '', type = []) => {
    let { datagrid } = this.props
    datagrid.setSearch(value, type)
  }, 150)

  returnCloseAttachmentManager = () => {
    if (this.props.returnCloseAttachmentManager) {
      this.props.returnCloseAttachmentManager(false)
    } else {
      return
    }
  }

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
    const { trigger, asModal, documentTypes, documentTypesForCertificates } = this.props
    if (!asModal) return this.getContent()

    return (
      <>
        <Modal
          closeIcon={
            <PaddedIcon
              onClick={() => {
                this.returnCloseAttachmentManager()
                //TODO type: []
                this.handleSearch('', '')
                this.setState({ open: false, documentTypes: '' })
              }}
              name='close icon'
            />
          }
          centered={true}
          open={this.state.open}
          trigger={React.cloneElement(trigger, {
            onClick: () => {
              this.setState({ open: true })
              if (documentTypesForCertificates && documentTypesForCertificates.length) {
                this.handleSearch(
                  '',
                  documentTypesForCertificates.map(doc => doc.value)
                )
              }
            }
          })}
          onClose={() => {
            this.returnCloseAttachmentManager()
            this.handleSearch('', [])
            this.setState({ open: false, documentTypes: [] })
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
                <GridColumn width={7}>
                  <CustomDropdown
                    multiple
                    name='documentTypes'
                    options={documentTypes}
                    value={this.state.documentTypes}
                    selection
                    onChange={(event, { name, value }) => {
                      const documents = documentTypesForCertificates || documentTypes
                      const data = documents.find(option => parseInt(option.value) === parseInt(value))

                      this.setState({ [name]: value })
                      this.handleSearch(this.state.searchValue, value)
                    }}
                    placeholder={
                      <FormattedMessage id='related.documents.selectType' defaultMessage='Select type'>
                        {text => text}
                      </FormattedMessage>
                    }
                  />
                </GridColumn>
                <GridColumn width={5}>
                  <Input
                    icon='search'
                    placeholder='Search...'
                    onChange={(_, data) => {
                      this.setState({ searchValue: data && data.value })
                      this.handleSearch(data.value, this.state.documentTypes)
                    }}
                  />
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
                this.returnCloseAttachmentManager()
                this.handleSearch('', [])
                this.setState({ open: false, documentTypes: [] })
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
  selectable: bool,
  documentTypesForCertificates: array
}

AttachmentModal.defaultProps = {
  trigger: (
    <CustomButton fluid type='button'>
      <CustomIcon size='14' />
      <FormattedMessage id='global.documentManager' defaultMessage='Document Manager'>
        {text => text}
      </FormattedMessage>
    </CustomButton>
  ),
  tableProps: {},
  asModal: true,
  selectable: true,
  documentTypesForCertificates: []
}

class AttachmentManager extends Component {
  getApiConfig = () => ({
    url: '/prodex/api/attachments/datagrid/',
    searchToFilter: (v, type) => {
      let filters = { or: [], and: [] }
      if (v) {
        filters.or = [
          { operator: 'LIKE', path: 'Attachment.name', values: [`%${v}%`] },
          {
            operator: 'LIKE',
            path: 'Attachment.customName',
            values: [`%${v}%`]
          }
        ]
      }
      if (type && type.length) {
        filters.and = [
          {
            operator: 'EQUALS',
            path: 'Attachment.documentType.id',
            values: type
          }
        ]
      }
      return filters
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
