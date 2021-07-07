import { FormattedMessage } from 'react-intl'

export const COLUMNS = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.name' defaultMessage='Name' />
    ),
    width: 270
  },
  {
    name: 'documentTypeName',
    title: (
      <FormattedMessage id='global.docType' defaultMessage='Document Type' />
    ),
    width: 270
  }
]