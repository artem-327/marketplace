import { Component } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import styled from 'styled-components'

import ProdexGrid from '~/components/table'
import { withDatagrid } from '~/modules/datagrid'

import { openSidebar } from '~/modules/settings/actions'
import { removeAttachment } from '~/modules/inventory/actions'
import { getSafe } from '~/utils/functions'
import { bool, array } from 'prop-types'
import { getLocaleDateFormat } from '~/components/date-format'
import ActionCell from '~/components/table/ActionCell'

const BasicLink = styled.a`
  color: black !important;
  text-decoration: none !important;
  &:hover {
    color: white !important;
    text-decoration: none !important;
  }
`

class DocumentManager extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        // TODO - check en.json for those ids
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.docName' defaultMessage='Document Name'>
              {text => text}
            </FormattedMessage>
          ),
          allowReordering: false
        },
        {
          name: 'documentTypeName',
          title: (
            <FormattedMessage id='global.docType' defaultMessage='Document Type'>
              {text => text}
            </FormattedMessage>
          )
        },
        {
          name: 'linkCount',
          title: (
            <FormattedMessage id='global.linkCount' defaultMessage='Links Count'>
              {text => text}
            </FormattedMessage>
          )
        },
        {
          name: 'expirationDate',
          title: (
            <FormattedMessage id='global.expirationDate' defaultMessage='Expiration Date'>
              {text => text}
            </FormattedMessage>
          )
        }
      ],
      columnsReduced: [
        // TODO - check en.json for those ids
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.docName' defaultMessage='Document Name'>
              {text => text}
            </FormattedMessage>
          ),
          allowReordering: false
        },
        {
          name: 'documentTypeName',
          title: (
            <FormattedMessage id='global.docType' defaultMessage='Document Type'>
              {text => text}
            </FormattedMessage>
          )
        },
        {
          name: 'expirationDate',
          title: (
            <FormattedMessage id='global.expirationDate' defaultMessage='Expiration Date'>
              {text => text}
            </FormattedMessage>
          )
        }
      ]
    }
  }

  getRows = (data = []) =>
    data.map(row => ({
      ...row,
      documentTypeName: getSafe(() => row.documentType.name, ''),
      expirationDate: row.expirationDate && moment(row.expirationDate).format(getLocaleDateFormat()),
      issuedAt: row.issuedAt && moment(row.issuedAt).format(getLocaleDateFormat()),
      customName: getSafe(() => row.customName, row.name),
      name: (
        <ActionCell
          row={row}
          getActions={this.getActions}
          content={row.name}
          onContentClick={() => this.props.openSidebar(row)}
        />
      )
    }))

  getActions = () => {
    const { datagrid, openSidebar, removeAttachment, edit, download, deletable } = this.props

    return [
      ...(edit
        ? [
            {
              text: (
                <FormattedMessage id='global.edit' defaultMessage='Edit'>
                  {text => text}
                </FormattedMessage>
              ),
              callback: row => openSidebar(row)
            }
          ]
        : []),
      ...(download
        ? [
            {
              text: (
                <FormattedMessage id='global.download' defaultMessage='Download'>
                  {text => text}
                </FormattedMessage>
              ),
              callback: async row => {
                await window.open(`/download/attachments/${row.id}`, '_blank')
              }
            }
          ]
        : []),
      ...(deletable
        ? [
            {
              text: (
                <FormattedMessage id='global.delete' defaultMessage='Delete'>
                  {text => text}
                </FormattedMessage>
              ),
              callback: async row => {
                try {
                  await removeAttachment(row.id)
                  datagrid.removeRow(row.id)
                } catch (e) {
                  console.error(e)
                }
              },
              disabled: row => this.props.editedId === row.id
            }
          ]
        : [])
    ]
  }

  render() {
    const { datagrid, loading, items, normalWidth, reduceColumns, editedId } = this.props

    let rows = this.getRows(items ? items : this.props.rows)

    return (
      <div className='flex stretched listings-wrapper'>
        <ProdexGrid
          tableName='settings_documents'
          {...datagrid.tableProps}
          columns={reduceColumns ? this.state.columnsReduced : this.state.columns}
          rows={rows}
          loading={items ? false : loading || datagrid.loading}
          style={{ marginTop: '5px' }}
          normalWidth={normalWidth}
          editingRowId={editedId}
        />
      </div>
    )
  }
}

DocumentManager.propTypes = {
  edit: bool,
  download: bool,
  delete: bool,
  items: array,
  normalWidth: bool,
  reduceColumns: bool
}

DocumentManager.defaultProps = {
  edit: true,
  download: true,
  deletable: true,
  normalWidth: false,
  reduceColumns: false
}

const mapStateToProps = (store, { datagrid }) => {
  return {
    loading: store.settings.loading,
    editedId: store.settings.editedId,
    rows: datagrid.rows
  }
}

const mapDispatchToProps = {
  openSidebar,
  removeAttachment
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(DocumentManager))
