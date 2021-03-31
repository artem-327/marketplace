import { FormattedMessage } from 'react-intl'

export const COLUMNS = [
  {
    name: 'name',
    title: <div></div>,
    width: 310,
    //sortPath: 'ProductOffer.companyProduct.intProductName',
    allowReordering: false
  },
  {
    name: 'description',
    title: <div></div>,
    caption: (
      <FormattedMessage id='marketplace.description' defaultMessage='Description'>
        {text => text}
      </FormattedMessage>
    ),
    width: 600,
    maxWidth: 2000
  },
  {
    name: 'createdAt',
    title: <div></div>,
    caption: (
      <FormattedMessage id='marketplace.createdAt' defaultMessage='Created At'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150
    //sortPath: 'ProductOffer.pkgAvailable'
  }
]