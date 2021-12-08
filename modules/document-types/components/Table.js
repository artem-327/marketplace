import { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import confirm from '~/components/Confirmable/confirm'
import ProdexTable from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import { openPopup, deleteDocumentType } from '../actions'
import { getDocumentTypes } from '../../global-data/actions'
import { withDatagrid } from '~/modules/datagrid'
import { FormattedMessage } from 'react-intl'

class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        {
          name: 'name',
          title: (
            <FormattedMessage id='global.name' defaultMessage='Name'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'DocumentType.name',
          allowReordering: false
        },
        {
          name: 'group',
          title: (
            <FormattedMessage id='global.documentTypeGroup' defaultMessage='Document Type Group'>
              {text => text}
            </FormattedMessage>
          ),
          sortPath: 'DocumentType.group.name'
        }
      ]
    }
  }

  getActions = () => {
    const { intl, openPopup, deleteDocumentType, datagrid, getDocumentTypes } = this.props

    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openPopup(row),
        hidden: row => !row.editable
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({
              id: `confirm.deleteDocumentType.title`,
              defaultMessage: `Delete Document Type`
            }),
            formatMessage(
              {
                id: `confirm.deleteDocumentType.content`,
                defaultMessage: `Do you really want to delete '${row.name}' document type?`
              },
              { name: row.name }
            )
          ).then(async () => {
            try {
              await deleteDocumentType(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
      }
    ]
  }

  getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        name: (
          <ActionCell
            row={row}
            getActions={this.getActions}
            content={row.name}
            onContentClick={row.editable ? () => this.props.openPopup(row) : null}
          />
        ),
        group: row.group?.name
      }
    })
  }

  render() {
    const { loading, rows, datagrid, filterValue } = this.props

    return (
      <div className='flex stretched listings-wrapper'>
        <ProdexTable
          tableName='admin_document_types'
          {...datagrid.tableProps}
          filterValue={filterValue}
          loading={datagrid.loading || loading}
          columns={this.state.columns}
          rows={this.getRows(rows)}
          defaultSorting={{ columnName: 'name', sortPath: 'DocumentType.name', direction: 'asc' }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = {
  getDocumentTypes,
  openPopup,
  deleteDocumentType
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows,
    filterValue: state.admin.filterValue,
    loading: state.documentTypes.loading
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(Table)))
