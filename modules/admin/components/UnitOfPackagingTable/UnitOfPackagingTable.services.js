import { FormattedMessage } from 'react-intl'
// Components
import ActionCell from '../../../../components/table/ActionCell'
// Services
import confirm from '../../../../components/Confirmable/confirm'

export const makeRows = datagrid => datagrid.rows.map(d => {
    return {
        id: d.id,
        name: d.name,
        nameAbbreviation: d.nameAbbreviation,
        measureType: d.measureType.name,
        measureTypeId: d.measureType.id,
        length: d.length,
        width: d.width,
        height: d.height,
        palletPkgMax: d.palletPkgMax,
        palletPkgMin: d.palletPkgMin,
        weight: d.weight,
        weightUnit: d.weightUnit,
        dimensionUnit: d.dimensionUnit
    }
})

export const columns = [
    {
      name: 'name',
      title: (
        <FormattedMessage id='global.name' defaultMessage='Name' />
      ),
      sortPath: 'PackagingType.name',
      allowReordering: false
    },
    {
      name: 'measureType',
      title: (
        <FormattedMessage id='global.measureType' defaultMessage='Measure Type' />
      ),
      sortPath: 'PackagingType.measureType.name'
    }
]


const getActions = props => {
    const { intl, openEditPopup, deleteUnitOfPackaging, datagrid, config } = props

    const { formatMessage } = intl

    return [
    { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: row => openEditPopup(row) },
    {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
        confirm(
            formatMessage({ id: 'confirm.deletePackaging.title', defaultMessage: 'Delete Unit of Packaging' }),
            formatMessage(
            {
                id: 'confirm.deletePackaging.content',
                defaultMessage: `Do you really want to delete '${row.name}' unit?`
            },
            { name: row.name }
            )
        ).then(async () => {
            try {
            await deleteUnitOfPackaging(row.id)
            if (config.globalReload) props[config.globalReload]()
            datagrid.removeRow(row.id)
            } catch (e) {
            console.error(e)
            }
        })
    }
    ]
}

export const getRows = (rows, props) => {
    return rows.map(row => {
    return {
        ...row,
        name: (
        <ActionCell
            row={row}
            getActions={() => getActions(props)}
            content={row.name}
            onContentClick={() => props.openEditPopup(row)}
        />
        )
    }
    })
}