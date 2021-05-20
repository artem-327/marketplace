import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage } from 'react-intl'
// Components
import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'
// Services
import confirm from '../../../../components/Confirmable/confirm'
// Constants
import { casProductsTableColumns } from '../../constants'

const CasProductsTable = props => {

  useEffect(() => {
    props.getHazardClassesDataRequest()
    props.getPackagingGroupsDataRequest()
  }, [])

  const getActions = () => {
    const { datagrid, intl, openPopup, openEditAltNamesCasPopup, deleteCasProduct } = props

    const { formatMessage } = intl
    return [
      {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: ({ hazardClassesLabeled, ...rest }) => openPopup(rest)
      },
      {
        text: formatMessage({ id: 'admin.editAlternativeNames', defaultMessage: 'Edit Alternative Names' }),
        callback: row => openEditAltNamesCasPopup(row)
      },
      {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
          confirm(
            formatMessage({ id: 'confirm.deleteCasProduct.title', defaultMessage: 'Delete CAS Product?' }),
            formatMessage(
              {
                id: 'confirm.deleteCasProduct.content',
                defaultMessage: `Do you really want to delete '${row.casIndexName}' CAS product?`
              },
              { name: row.casIndexName }
            )
          ).then(async () => {
            try {
              await deleteCasProduct(row.id)
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
      const { hazardClassesLabeled, ...rest } = row
      return {
        ...row,
        casIndexName: (
          <ActionCell
            row={row}
            getActions={getActions}
            content={row.casIndexName}
            onContentClick={() => props.openPopup(rest)}
          />
        )
      }
    })
  }

  const { datagrid, rows, editedId } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        {...datagrid.tableProps}
        tableName='admin_cas_products'
        columns={casProductsTableColumns}
        rows={getRows(rows)}
        defaultSorting={{
          columnName: 'casIndexName',
          sortPath: 'CasProduct.casIndexName',
          direction: 'asc'
        }}
        editingRowId={editedId}
      />
    </div>
  )
}

CasProductsTable.propTypes = {
  openPopup: PropTypes.func,
  openEditAltNamesCasPopup: PropTypes.func,
  closeConfirmPopup: PropTypes.func,
  getHazardClassesDataRequest: PropTypes.func,
  getPackagingGroupsDataRequest: PropTypes.func,
  deleteCasProduct: PropTypes.func,
  editedId: PropTypes.number,
  rows: PropTypes.array,
  datagrid: PropTypes.array,
  intl: PropTypes.object
}

CasProductsTable.defaultProps = {
  openPopup: () => {},
  openEditAltNamesCasPopup: () => {},
  closeConfirmPopup: () => {},
  getHazardClassesDataRequest: () => {},
  getPackagingGroupsDataRequest: () => {},
  deleteCasProduct: () => {},
  editedId: 0,
  rows: [],
  datagrid: [],
  intl: {}
}

export default injectIntl(CasProductsTable)
