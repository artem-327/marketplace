import { FormattedMessage } from 'react-intl'
import moment from 'moment/moment'
// Components
import ActionCell from '../../../../components/table/ActionCell'
//Services
import { getSafe } from '../../../../utils/functions'

export const getRows = datagrid => datagrid?.rows?.map(d => {
    const isComplete =
        (d.validityDate ? moment().isBefore(d.validityDate) : true) &&
        (d.cfStatus === 'Broadcasting' || d.cfStatus === 'Not broadcasting')
    return {
        id: d.id,
        productName: getSafe(() => d.companyProduct.intProductName, 'N/A'),
        productCode: getSafe(() => d.companyProduct.intProductCode, 'N/A'),
        owner: getSafe(() => d.owner.cfDisplayName, 'N/A'),
        complete: isComplete ? (
        <FormattedMessage id='global.yes' defaultMessage='Yes' />
        ) : (
        <FormattedMessage id='global.no' defaultMessage='No' />
        ),
        broadcasted:
        d.cfStatus === 'Broadcasting' ? (
            <FormattedMessage id='global.yes' defaultMessage='Yes' />
        ) : (
            <FormattedMessage id='global.no' defaultMessage='No' />
        )
    }
})

export const columns = [
    {
        name: 'productName',
        title: (
            <FormattedMessage id='operations.productName' defaultMessage='Product Name' />
        ),
        sortPath: 'ProductOffer.companyProduct.intProductName',
        allowReordering: false
    },
    {
        name: 'productCode',
        title: (
            <FormattedMessage id='operations.productCode' defaultMessage='Product Code' />
        ),
        sortPath: 'ProductOffer.companyProduct.intProductCode'
    },
    {
        name: 'owner',
        title: (
            <FormattedMessage id='operations.owner' defaultMessage='Owner' />
        ),
        sortPath: 'ProductOffer.owner.cfDisplayName'
    },
    {
        name: 'complete',
        title: (
            <FormattedMessage id='operations.complete' defaultMessage='Complete' />
        )
    },
    {
        name: 'broadcasted',
        title: (
            <FormattedMessage id='operations.broadcasted' defaultMessage='Broadcasted' />
        ),
        sortPath: 'ProductOffer.cfStatus'
    }
]

export const getRowss = rows => {
    return rows.map(row => {
        return {
            ...row,
            productName: <ActionCell row={row} content={row.productName} />
        }
    })
}
