import { FormattedMessage } from 'react-intl'
// Components
import ActionCell from '../../../../components/table/ActionCell'
// Services
import confirm from '../../../../components/Confirmable/confirm'

/**
 * Get Rows in Selecotrs
 * @category Admin Settings - Units of Measure
 * @method
 */
export const makeRows = datagrid => datagrid.rows.map(d => {
  return {
    id: d.id,
    name: d.name,
    nameAbbreviation: d.nameAbbreviation,
    measureType: d.measureType.name,
    measureTypeId: d.measureType.id,
    ratioToBaseSiUnit: d.ratioToBaseSiUnit,
    system: d.system
  }
})

export const columns = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.name' defaultMessage='Name' />
    ),
    allowReordering: false
  },
  {
    name: 'nameAbbreviation',
    title: (
      <FormattedMessage id='global.nameAbbreviation' defaultMessage='Name Abbreviation' />
    )
  },
  {
    name: 'measureType',
    title: (
      <FormattedMessage id='global.measureType' defaultMessage='Measure Type' />
    )
  },
  {
    name: 'ratioToBaseSiUnit',
    title: (
      <FormattedMessage id='global.ratioToBaseSiUnit' defaultMessage='Ratio to Base SI Unit' />
    )
  }
]


const getActions = props => {
  const { intl, openEditPopup, deleteUnit, datagrid } = props

  const { formatMessage } = intl
  return [
    {
      text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
      hidden: row => row.system,
      callback: row => openEditPopup(row)
    },
    {
      text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
      callback: row =>
      confirm(
        formatMessage({ id: 'confirm.deleteMeasurement.title', defaultMessage: 'Delete Unit of Measure' }),
        formatMessage(
        {
            id: 'confirm.deleteMeasurement.content',
            defaultMessage: `Do you really want to delete '${row.name}' unit?`
        },
        { name: row.name }
        )
      ).then(async () => {
        try {
          await deleteUnit(row.id)
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
 * @category Admin Settings - Units of Measure
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
        {...(row.system === false && { onContentClick: () => props.openEditPopup(row) })}
      />
      )
    }
  })
}
