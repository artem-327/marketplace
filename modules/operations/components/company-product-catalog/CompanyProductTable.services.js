import { FormattedMessage } from 'react-intl'
// Components
import ActionCell from '../../../../components/table/ActionCell'
//Services
import { getSafe } from '../../../../utils/functions'

/**
 * get Rows function used in CompanyProductTableContainer
 * @category Operations
 * @services
 */
export const getRows = datagrid => datagrid?.rows?.map(d => {
    return {
        id: d.id,
        intProductName: getSafe(() => d.intProductName, 'N/A'),
        intProductCode: getSafe(() => d.intProductCode, 'N/A'),
        owner: getSafe(() => d.companyGenericProduct.company.cfDisplayName, 'N/A'),
        mapped: d.companyGenericProduct ? (
        <FormattedMessage id='global.yes' defaultMessage='Yes' />
        ) : (
        <FormattedMessage id='global.no' defaultMessage='No' />
        ),
        cfProductOfferCount: d.cfProductOfferCount
    }
})

/**
 * columns used in CompanyProductTable Component
 * @category Operations
 * @services
 */
export const columns = [
    {
        name: 'intProductName',
        title: (
            <FormattedMessage id='operations.productInternalName' defaultMessage='Product Internal Name' />
        ),
        width: 250,
        sortPath: 'CompanyProduct.intProductName',
        allowReordering: false
    },
    {
        name: 'intProductCode',
        title: (
            <FormattedMessage id='operations.productInternalCode' defaultMessage='Product Internal Code' />
        ),
        width: 250,
        sortPath: 'CompanyProduct.intProductCode'
    },
    {
        name: 'owner',
        title: (
            <FormattedMessage id='operations.owner' defaultMessage='Owner' />
        ),
        width: 250,
        sortPath: 'CompanyProduct.companyGenericProduct.company.cfDisplayName'
    },
    {
        name: 'mapped',
        title: (
            <FormattedMessage id='operations.mapped' defaultMessage='Mapped' />
        ),
        width: 130,
        sortPath: 'CompanyProduct.companyGenericProduct.name'
    },
    {
        name: 'cfProductOfferCount',
        title: (
            <FormattedMessage id='operations.productOffersCnt' defaultMessage='Product Offers #' />
        ),
        align: 'right',
        width: 170,
        sortPath: 'CompanyProduct.cfProductOfferCount'
    }
]

/**
 * get Rows function used in CompanyProductTable Component
 * @category Operations
 * @services
 */
export const getRowss = rows => {
    return rows.map(row => {
        return {
            ...row,
            intProductName: <ActionCell row={row} content={row.intProductName} />
        }
    })
}
