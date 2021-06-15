import { injectIntl } from 'react-intl'
import { FormattedMessage } from 'react-intl'
import { withToastManager } from 'react-toast-notifications'

import confirm from '../../../../components/Confirmable/confirm'
import ProdexTable from '../../../../components/table'
import ActionCell from '../../../../components/table/ActionCell'

const TagsTable = props => {
  const columns = [
    {
      name: 'name',
      title: (
        <FormattedMessage id='operations.tagName' defaultMessage='Tag Name' />
      ),
      sortPath: 'Tag.name',
      allowReordering: false
    }
  ]

  const getActions = () => {
    const { intl, openPopup, deleteTag, datagrid } = props

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
                id: `confirm.delete.operations.tag.content`,
                defaultMessage: `Do you really want to delete tag?`
              },
              { name: row.name }
            )
          ).then(async () => {
            try {
              await deleteTag(row.id)
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
            onContentClick={() => props.openPopup(row)}
          />
        )
      }
    })
  }

  const { loading, rows, datagrid, filterValue } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName={'operations_tag'}
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading}
        columns={columns}
        rows={getRows(rows)}
      />
    </div>
  )
}

export default injectIntl(withToastManager(TagsTable))
