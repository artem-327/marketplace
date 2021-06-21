import { FormattedMessage } from 'react-intl'

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