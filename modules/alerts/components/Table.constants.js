import { FormattedMessage } from 'react-intl'

/**
 * @category Notifications
 * @default
 * @constant {array}
 */
export const COLUMNS = [
  {
    name: 'notification',
    title: <div></div>,
    width: 920,
    maxWidth: 2000,
    disabled: false
  },
  {
    name: 'time',
    title: <div></div>,
    sortPath: 'Message.createdAt',
    width: 160,
    disabled: false
  },
  {
    name: 'timeGroup',
    disabled: true
  },
  {
    name: 'expand',
    title: <div></div>,
    caption: (
      <FormattedMessage id='alerts.column.expand' defaultMessage='Expand'>
        {text => text}
      </FormattedMessage>
    ),
    align: 'center',
    width: 50,
    disabled: true
  }
]