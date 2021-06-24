import { FormattedMessage } from 'react-intl'
// Components
import ActionCell from '../../../../components/table/ActionCell'
// Services
import confirm from '../../../../components/Confirmable/confirm'

/**
 * Get Rows in Selecotrs
 * @category Admin Settings - Logistics
 * @method
 */
export const makeRows = datagrid => datagrid.rows.map(row => {
    return {
        ...row,
        rawData: row,
        name: <div style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>{row.name}</div>,
        reinvoice: row.reinvoice ? (
            <FormattedMessage id='global.yes' defaultMessage='Yes' />
        ) : (
            <FormattedMessage id='global.no' defaultMessage='No' />
        )
    }
})

export const columns = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.name' defaultMessage='Name' />
    ),
    width: 300,
    allowReordering: false
  },
  {
    name: 'identifierType',
    title: (
      <FormattedMessage id='logistics.identifierType' defaultMessage='Identifier Type' />
    ),
    width: 300
  },
  {
    name: 'identifierValue',
    title: (
      <FormattedMessage id='logistics.identifierValue' defaultMessage='Identifier Value' />
    ),
    width: 300
  },
  {
    name: 'reinvoice',
    title: (
      <FormattedMessage id='logistics.reinvoice' defaultMessage='Re-Invoice' />
    ),
    width: 120
  },
  {
    name: 'email',
    title: (
      <FormattedMessage id='global.email' defaultMessage='Email' />
    ),
    width: 200
  }
]

const getActions = props => {
  const {
    datagrid,
    openPopup,
    intl: { formatMessage },
    deleteLogisticsProvider
  } = props

  return [
    {
        text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
        callback: row => openPopup(row.rawData)
    },
    {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
        confirm(
            formatMessage({
            id: 'confirm.admin.deleteLogisticProvider.title',
            defaultMessage: 'Delete Logistic Provider'
            }),
            formatMessage(
            {
                id: 'confirm.admin.deleteLogisticProvider.content',
                defaultMessage: "Do you really want to delete '{name}' logistic provider?"
            },
            { name: row.rawData.name }
            )
        ).then(async () => {
            try {
            await deleteLogisticsProvider(row.id)
            datagrid.removeRow(row.id)
            } catch (e) {
            console.error(e)
            }
        })
    }
  ]
}

/**
 * Get Rows in Components
 * @category Admin Settings - Logistics
 * @method
 */
export const getRows = (rows, props) => {
  return rows.map(row => {
    return {
      ...row,
      name: (
      <ActionCell
        row={row}
        getActions={() => getActions(props)}
        content={row.name}
        onContentClick={() => props.openPopup(row.rawData)}
      />
      )
    }
  })
}
