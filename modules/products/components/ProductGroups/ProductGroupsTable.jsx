import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'
import { withToastManager } from 'react-toast-notifications'
// Components
import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
// Services
import confirm from '../../../../components/Confirmable/confirm'
// Constants
import { productGroupsTableColumns } from '../../constants'

/**
 * @Component
 * @category Products - Components / ProductGroups / ProductGroupsTable
 */
const ProductGroupsTable = props => {
  const {
    loading,
    rows,
    datagrid,
    filterValue,
    openPopup,
    deleteProductGroups,
    editedId,
    intl
  } = props

  const getActions = () => {
    const { formatMessage } = intl
    return [
      { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: row => openPopup(row) },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({
              id: `confirm.delete.operations.tag.title`,
              defaultMessage: `Delete`
            }),
            formatMessage(
              {
                id: `confirm.delete.product.groups.content`,
                defaultMessage: `Do you really want to delete Product Group?`
              },
              { name: row.name }
            )
          ).then(async () => {
            try {
              await deleteProductGroups(row.id)
              datagrid.removeRow(row.id)
            } catch (e) {
              console.error(e)
            }
          }),
        disabled: row => props.editedId === row.id
      }
    ]
  }

  const getRows = rows => {
    return rows.map((row, _i) => {
      return {
        ...row,
        name: (
          <ActionCell
            key={_i}
            row={row}
            getActions={getActions}
            content={row.name}
            onContentClick={() => props.openPopup(row)}
          />
        )
      }
    })
  }

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName={'product_group'}
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading}
        columns={productGroupsTableColumns}
        rows={getRows(rows)}
        editingRowId={editedId}
      />
    </div>
  )
}

ProductGroupsTable.propTypes = {
  loading: PropTypes.bool,
  rows: PropTypes.array,
  datagrid: PropTypes.object,
  filterValue: PropTypes.string,
  openPopup: PropTypes.func,
  deleteProductGroups: PropTypes.func,
  editedId: PropTypes.number,
  intl: PropTypes.object
}

ProductGroupsTable.defaultProps = {
  loading: false,
  rows: [],
  datagrid: {},
  filterValue: '',
  openPopup: () => {},
  deleteProductGroups: () => {},
  editedId: null,
  intl: {}
}

export default injectIntl(withToastManager(ProductGroupsTable))
