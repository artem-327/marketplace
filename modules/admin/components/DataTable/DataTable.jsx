import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import confirm from '../../../../components/Confirmable/confirm'
import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
import {getDataRequest, openEditPopup, closeConfirmPopup, deleteConfirmation, postNewRequest} from '../../actions'
import {
  getProductForms,
  getProductConditions,
  getProductGrades,
  getPackagingTypes
} from '../../../global-data/actions'
import { withDatagrid } from '../../../datagrid'

const DataTable = props => {
  const getActions = () => {
    const { config, intl, openEditPopup, deleteConfirmation, datagrid } = props

    const { formatMessage } = intl
    const { addEditText, formattedMessageName } = props.config
    return [
      { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: row => openEditPopup(row) },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({
              id: `confirm.delete${formattedMessageName.charAt(0).toUpperCase() + formattedMessageName.slice(1)}.title`,
              defaultMessage: `Delete ${addEditText}`
            }),
            formatMessage(
              {
                id: `confirm.delete${
                  formattedMessageName.charAt(0).toUpperCase() + formattedMessageName.slice(1)
                }.content`,
                defaultMessage: `Do you really want to delete '${row.name}' ${formattedMessageName}?`
              },
              { name: row.name }
            )
          ).then(async () => {
            try {
              await deleteConfirmation(row.id, config)
              if (config.globalReload) props[config.globalReload]()
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          })
      }
    ]
  }

  const getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        name: (
          <ActionCell
            row={row}
            getActions={getActions}
            content={row.name}
            onContentClick={() => props.openEditPopup(row)}
          />
        )
      }
    })
  }

  const { loading, rows, datagrid, filterValue } = props

  const { tableName } = props.config
  const { columns } = props.config.display
  columns[0].allowReordering = false

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName={tableName}
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading}
        columns={columns}
        rows={getRows(rows)}
      />
    </div>
  )
}

const mapDispatchToProps = {
  getDataRequest,
  openEditPopup,
  closeConfirmPopup,
  deleteConfirmation,
  getProductForms,
  getProductConditions,
  getProductGrades,
  getPackagingTypes
}

const mapStateToProps = (state, { datagrid, currentTab }) => {
  let cfg = state.admin.config[currentTab]
  return {
    config: cfg,
    rows: datagrid.rows,
    filterValue: state.admin.filterValue,
    loading: state.admin.loading,
    confirmMessage: state.admin.confirmMessage,
    deleteRowById: state.admin.deleteRowById
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(DataTable)))
