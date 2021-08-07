import { FormattedNumber } from 'react-intl'
import moment from 'moment'
import * as Yup from 'yup'
import { FormattedMessage, IntlProvider } from 'react-intl'
import { debounce } from 'lodash'
import { Dropdown } from 'semantic-ui-react'
import { MoreVertical } from 'react-feather'
import { Formik } from 'formik'
// Components
import ActionCell from '../../../../components/table/ActionCell'
import { DateInput } from '../../../../components/custom-formik'
// Services
import { errorMessages, dateValidation } from '../../../../constants/yupValidation'
import confirm from '../../../../components/Confirmable/confirm'
import { getLocaleDateFormat } from '../../../../components/date-format'
import { getStringISODate } from '../../../../components/date-format'
import { getMimeType } from '../../../../utils/functions'
// Constants
import { currency } from '../../../../constants/index'
// Styles
import { RowDropdown, RowDropdownIcon } from '../../styles'

/**
 * get Rows function used in ShippingQuotesTableContainer
 * @category Operations
 * @services
 */
export const getRows = props => props?.datagrid?.rows?.map(d => {
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
        validityDate: d.validityDate ? moment(d.validityDate).format(getLocaleDateFormat()) : 'N/A',
        relatedOrder: d.relatedOrderId ? d.relatedOrderId : '',
        bol: !!d.relatedOrderAttachments.length ? (
          <RowDropdown
            onOpen={(e, data) => {
            }}
            onClose={(e, data) => {
            }}
            trigger={<RowDropdownIcon><MoreVertical /></RowDropdownIcon>}>
              <Dropdown.Menu>
                {d.relatedOrderAttachments.map(att => (
                  <Dropdown.Item key={att.id} onClick={() => downloadAttachment(att.name, att.id, props)}>{att.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
          </RowDropdown>
        ) : null
    }
})

const downloadAttachment = async (documentName, documentId, props) => {
  const element = await prepareLinkToAttachment(documentId, props)

  element.download = documentName
  document.body.appendChild(element) // Required for this to work in FireFox
  element.click()
}

const prepareLinkToAttachment = async (documentId, props) => {
  let downloadedFile = await props.downloadAttachment(documentId)
  const fileName = extractFileName(downloadedFile.value.headers['content-disposition'])
  const mimeType = fileName && getMimeType(fileName)
  const element = document.createElement('a')
  const file = new Blob([downloadedFile.value.data], { type: mimeType })
  let fileURL = URL.createObjectURL(file)
  element.href = fileURL

  return element
}

const extractFileName = contentDispositionValue => {
  var filename = ''
  if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
    var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
    var matches = filenameRegex.exec(contentDispositionValue)
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '')
    }
  }
  return filename
}

const generateBOLValidation = () =>
  Yup.lazy(values =>
    Yup.object().shape({
      pickupDate: dateValidation(false).concat(
          Yup.string().test(
              'min-date',
              errorMessages.mustBeInFuture,
              val => !val || moment('00:00:00', 'hh:mm:ss').diff(getStringISODate(val), 'days') <= -1
          )
        )
    })
  )

/**
 * columns used in ShippingQuotesTable Component
 * @category Operations
 * @services
 */
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
    },
    {
      name: 'relatedOrder',
      title: (
        <FormattedMessage id='operations.relatedOrder' defaultMessage='Related order' />
      ),
      width: 200
    },
    {
      name: 'bol',
      title: (
        <FormattedMessage id='operations.bol' defaultMessage='BOL' />
      ),
      width: 200
    }
]

const getActions = (row, props) => {
    const { intl, deleteShippingQuote, datagrid, generateBOL } = props
    const { formatMessage } = intl
    let formikPropsNew = null

    const action = row.relatedOrder ? 
      {
        text: formatMessage({ id: 'operations.generateBOL', defaultMessage: 'Generate BOL' }),
        callback: row =>
        confirm(
            formatMessage({ id: 'operations.generateBOL', defaultMessage: 'Generate BOL' }),
            (
              <IntlProvider locale='en'>
                <Formik
                  initialValues={{ pickupDate: '' }}
                  validationSchema={generateBOLValidation()}
                  onSubmit={() => {}}
                  render={formikProps => {
                    formikPropsNew = formikProps
                    return (
                      <DateInput
                        label={formatMessage({ id: 'operations.pickupDate', defaultMessage: 'Pick Up Date' })}
                        name='pickupDate'
                        inputProps={{
                          clearable: true,
                          style: { width: '100%' }
                        }}
                      />
                    )
                  }}
                />
              </IntlProvider>
            )
        ).then(async () => {
          try {
            formikPropsNew ? await generateBOL(row.id, row.carrierName, getStringISODate(formikPropsNew.values.pickupDate)) : null
          } catch (e) {
          }
        })
      }
    :
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

    return [ action ]
}

/**
 * get Rows function used in ShippingQuotesTable Component
 * @category Operations
 * @services
 */
export const getRowss = (rows, props) => {
    return rows.map(row => {
        return {
            ...row,
            quoteId: <ActionCell row={row} getActions={() => getActions(row, props)} content={row.quoteId} />
        }
    })
}

/**
 * handle Search function used in ShippingQuotesPopup Component
 * @category Operations
 * @services
 */
export const handleSearch = debounce((text, props) => {
    props.searchManualQuoteRequest(text)
}, 250)

/**
 * initial Form Values used in ShippingQuotesPopup Component
 * @category Operations
 * @services
 */
export const initialFormValues = {
    carrierName: '',
    quoteId: '',
    price: '',
    validityDate: '',
    shippingQuoteRequestId: ''
}

/**
 * form Validation used in ShippingQuotesPopup Component
 * @category Operations
 * @services
 */
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
  