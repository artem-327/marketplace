import { FormattedMessage } from 'react-intl'

export const COLUMNS = [
  {
    name: 'name',
    title: <div></div>,
    width: 310,
    allowReordering: false
  },
  {
    name: 'description',
    title: <div></div>,
    caption: (
      <FormattedMessage id='marketplace.description' defaultMessage='Description' />
    ),
    width: 600,
    maxWidth: 2000
  },
  {
    name: 'createdAt',
    title: <div></div>,
    caption: (
      <FormattedMessage id='marketplace.createdAt' defaultMessage='Created At' />
    ),
    width: 150
  }
]