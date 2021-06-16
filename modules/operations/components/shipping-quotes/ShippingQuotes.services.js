import { FormattedNumber } from 'react-intl'
import moment from 'moment'
import * as Yup from 'yup'
import { FormattedMessage } from 'react-intl'
import { debounce } from 'lodash'
// Components
import ActionCell from '../../../../components/table/ActionCell'
// Services
import { errorMessages, dateValidation } from '../../../../constants/yupValidation'
import confirm from '../../../../components/Confirmable/confirm'
import { getLocaleDateFormat } from '../../../../components/date-format'
import { getStringISODate } from '../../../../components/date-format'
// Constants
import { currency } from '../../../../constants/index'

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

export const columns = [
    {
      name: 'quoteId',
      title: (
        <FormattedMessage id='operations.quoteId' defaultMessage='Quote Id' />
      ),
      allowReordering: false,
      width: 400
    },
    {
      name: 'validityDate',
      title: (
        <FormattedMessage id='operations.validityDate' defaultMessage='Validity Date' />
      ),
      width: 200
    },
    {
      name: 'price',
      title: (
        <FormattedMessage id='operations.price' defaultMessage='Price' />
      ),
      width: 100
    },
    {
      name: 'carrierName',
      title: (
        <FormattedMessage id='operations.carrierName' defaultMessage='Carrier Name' />
      ),
      width: 200
    }
]

const getActions = (props) => {
    const { intl, deleteShippingQuote, datagrid } = props

    const { formatMessage } = intl
    return [
    {
        text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
        callback: row =>
        confirm(
            formatMessage({ id: 'confirm.deleteShippingQuote', defaultMessage: 'Delete Shipping Quote' }),
            formatMessage(
            { id: 'confirm.deleteItem', defaultMessage: `Do you really want to delete ${row.quoteId}?` },
            { item: row.quoteId }
            )
        ).then(async () => {
            try {
            await deleteShippingQuote(row.id)
            datagrid.removeRow(row.id)
            } catch (e) {
            console.error(e)
            }
        })
    }
    ]
}

export const getRowss = (rows, props) => {
    return rows.map(row => {
        return {
            ...row,
            quoteId: <ActionCell row={row} getActions={() => getActions(props)} content={row.quoteId} />
        }
    })
}

export const handleSearch = debounce((text, props) => {
    props.searchManualQuoteRequest(text)
}, 250)

export const initialFormValues = {
    carrierName: '',
    quoteId: '',
    price: '',
    validityDate: '',
    shippingQuoteRequestId: ''
}

export const formValidation = () =>
    Yup.lazy(values =>
        Yup.object().shape({
            validityDate: dateValidation(false).concat(
            Yup.string().test(
                'min-date',
                errorMessages.mustBeInFuture,
                val => !val || moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
            )
            ),
            carrierName: Yup.string().trim().min(3, errorMessages.minLength(3)),
            quoteId: Yup.string().trim().min(3, errorMessages.minLength(3)).required(errorMessages.requiredMessage),
            price: Yup.number().typeError(errorMessages.mustBeNumber).required(errorMessages.requiredMessage)
        })
    )
  