import { FormattedMessage } from 'react-intl'
//Services
import { getSafe } from '../../../../utils/functions'

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