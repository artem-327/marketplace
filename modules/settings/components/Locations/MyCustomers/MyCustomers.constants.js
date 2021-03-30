import { FormattedMessage, injectIntl } from 'react-intl'

export const COLUMNS = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.name' defaultMessage='Name'>
        {text => text}
      </FormattedMessage>
    ),
    width: 290,
    //sortPath: 'Branch.deliveryAddress.addressName',
    allowReordering: false
  },
  {
    name: 'streetAddress',
    title: (
      <FormattedMessage id='global.streetAddress' defaultMessage='Street Address'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150,
    //sortPath: 'Branch.deliveryAddress.address.streetAddress'
  },
  {
    name: 'city',
    title: (
      <FormattedMessage id='global.city' defaultMessage='City'>
        {text => text}
      </FormattedMessage>
    ),
    width: 130,
    //sortPath: 'Branch.deliveryAddress.address.city'
  },
  {
    name: 'provinceName',
    title: (
      <FormattedMessage id='global.state' defaultMessage='State'>
        {text => text}
      </FormattedMessage>
    ),
    width: 110,
    //sortPath: 'Branch.deliveryAddress.address.province.name'
  },
  {
    name: 'countryName',
    title: (
      <FormattedMessage id='global.country' defaultMessage='Country'>
        {text => text}
      </FormattedMessage>
    ),
    width: 90,
    //sortPath: 'Branch.deliveryAddress.address.country.name'
  },
  {
    name: 'contactName',
    title: (
      <FormattedMessage id='addCompany.contactName' defaultMessage='Contact Name'>
        {text => text}
      </FormattedMessage>
    ),
    width: 140,
    //sortPath: 'Branch.deliveryAddress.contactName'
  },
  {
    name: 'contactEmail',
    title: (
      <FormattedMessage id='global.email' defaultMessage='E-mail'>
        {text => text}
      </FormattedMessage>
    ),
    width: 140,
    //sortPath: 'Branch.deliveryAddress.contactEmail'
  },
  {
    name: 'phoneFormatted',
    title: (
      <FormattedMessage id='global.phone' defaultMessage='Phone'>
        {text => text}
      </FormattedMessage>
    ),
    width: 130,
    //sortPath: 'Branch.deliveryAddress.contactPhone'
  },
  {
    name: 'chevron',
    title: ' ',
    width: 42,
    allowReordering: false
  }
]