import { FormattedNumber } from 'react-intl'
import { currency } from '../../../../constants/index'
import { getLocaleDateFormat } from '../../../../components/date-format'
import moment from 'moment/moment'

export const getRows = datagrid => datagrid?.rows?.map(d => {
    return {
        data: d, // all row data, used for edit popup
        id: d.id,
        carrierName: d.carrierName || '',
        price: d.price ? (
        <FormattedNumber
            minimumFractionDigits={2}
            maximumFractionDigits={2}
            style='currency'
            currency={currency}
            value={d.price}
        />
        ) : (
        'N/A'
        ),
        quoteId: d.quoteId || '',
        validityDate: d.validityDate ? moment(d.validityDate).format(getLocaleDateFormat()) : 'N/A'
    }
})