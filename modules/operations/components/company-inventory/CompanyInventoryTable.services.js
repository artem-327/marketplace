import { FormattedMessage } from 'react-intl'
import moment from 'moment/moment'
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