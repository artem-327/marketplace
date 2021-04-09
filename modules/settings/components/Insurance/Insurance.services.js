import { FormattedMessage } from 'react-intl'
//Components
import BasicButton from '../../../../components/buttons/BasicButton'

/**
 * @category My TradePass - Insurance
 * @method
 * @param {Array} rows
 * @returns
 */
export const prepareDataForTable = rows => {
  return rows.map(row => {
    const language = typeof navigator !== 'undefined' ? navigator.language : 'en-US'
    return {
      type: <b>{row?.type}</b>,
      carrier: row?.carrier,
      coverage: row?.coverage,
      expiration: new Intl.DateTimeFormat(language).format(new Date(row?.expiration)),
      update: (
        <BasicButton onClick={e => console.log('click on update in row:', row)}>
          <FormattedMessage id='global.update' defaultMessage='Update' />
        </BasicButton>
      )
    }
  })
}
