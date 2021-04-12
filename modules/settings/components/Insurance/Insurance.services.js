import { FormattedMessage } from 'react-intl'
//Components
import { BasicButtonUpdate } from './Insurance.styles'

/**
 * @category My TradePass - Insurance
 * @method
 * @param {Array} rows
 * @returns
 */
export const prepareDataForTable = data => {
  const language = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
  let rows = []

  if (data) {
    Object.keys(data).forEach(key => {
      const row = data[key]
      rows.push({
        id: row.document_public_id,
        file_type: key.toUpperCase(),
        type: (
          <b>{
            key
              .replace(/insurance_/g, '')
              .split('_')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')
          }</b>
        ),
        carrier: row?.insurer,
        coverage: row?.coverage,
        expiration: row?.expiration_date ? new Intl.DateTimeFormat(language).format(new Date(row.expiration_date)) : ''
      })
    })
  }
  return rows
}

/**
 * @category My TradePass - Insurance
 * @method
 * @param {Array} rows
 * @param {object} props
 * @returns
 */
export const getRows = (rows, props) => {
  return rows.map(row => ({
    ...row,
    update: (
      <BasicButtonUpdate onClick={() => props.openPopup(row)}>
        <FormattedMessage id='global.update' defaultMessage='Update' />
      </BasicButtonUpdate>
    )
  }))
}
