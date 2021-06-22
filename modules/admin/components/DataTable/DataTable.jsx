import PropTypes from 'prop-types'
// Components
import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
// Services
import confirm from '../../../../components/Confirmable/confirm'

/**
 * DataTable Component
 * @category Admin Settings
 * @components
 */
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

DataTable.propTypes = {
  openEditPopup: PropTypes.func,
  deleteConfirmation: PropTypes.func,
  rows: PropTypes.array,
  filterValue: PropTypes.string,
  loading: PropTypes.bool,
  config: PropTypes.object,
  datagrid: PropTypes.object,
  intl: PropTypes.object
}

DataTable.defaultValues = {
  openEditPopup: () => {},
  deleteConfirmation: () => {},
  rows: [],
  filterValue: '',
  loading: false,
  config: {},
  datagrid: {},
  intl: {}
}

export default DataTable
