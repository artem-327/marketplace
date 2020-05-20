import { FormattedMessage } from 'react-intl'
import { getSafe, getFormattedAddress } from '~/utils/functions'

export const otherPermissions = [
  { value: 'NONE', id: 'NONE', text: 'None' },
  { value: 'VIEW', id: 'VIEW', text: 'View' },
  { value: 'USE', id: 'USE', text: 'Use' },
  { value: 'ALL', id: 'ALL', text: 'All' }
]

export const sharedTo = [
  { value: 'NOT_SHARED', id: 'NOT_SHARED', text: 'Not Shared' },
  { value: 'BRANCH_SHARING', id: 'BRANCH_SHARING', text: 'Branch Sharing' },
  { value: 'COMPANY_SHARING', id: 'COMPANY_SHARING', text: 'Company Sharing' }
]

export const currency = 'USD'
export const currencyId = 1

export const companyDatagridColumns = [
  {
    name: 'displayName',
    title: (
      <FormattedMessage id='global.companyName' defaultMessage='Company Name'>
        {text => text}
      </FormattedMessage>
    ),
    sortPath: 'Company.name'
  },
  {
    name: 'primaryBranchAddress',
    title: (
      <FormattedMessage id='global.headquaterAddress' defaultMessage='Headquarters Address'>
        {text => text}
      </FormattedMessage>
    ),
    sortPath: 'Company.primaryBranch.deliveryAddress.address.streetAddress'
  },
  {
    name: 'primaryContact',
    title: (
      <FormattedMessage id='global.primaryContact' defaultMessage='Primary Contact'>
        {text => text}
      </FormattedMessage>
    ),
    sortPath: 'ClientCompany.primaryBranch.deliveryAddress.contactName'
  },
  {
    name: 'contactEmail',
    title: (
      <FormattedMessage id='global.contactEmail' defaultMessage='Contact E-mail'>
        {text => text}
      </FormattedMessage>
    ),
    sortPath: 'ClientCompany.primaryBranch.deliveryAddress.contactEmail'
  },
  {
    name: 'hasDwollaAccount',
    title: (
      <FormattedMessage id='global.dwollaAccount' defaultMessage='Dwolla Account'>
        {text => text}
      </FormattedMessage>
    )
  },
  {
    name: 'hasLogisticsAccounts',
    title: (
      <FormattedMessage id='global.logisticAccounts' defaultMessage='Logistics Accounts'>
        {text => text}
      </FormattedMessage>
    )
  },
  {
    name: 'reviewRequested',
    title: (
      <FormattedMessage id='global.reviewRequested' defaultMessage='Review Requested'>
        {text => text}
      </FormattedMessage>
    )
  },
  {
    name: 'nacdMember',
    title: (
      <FormattedMessage id='global.nacdMember' defaultMessage='NACD Member'>
        {text => text}
      </FormattedMessage>
    )
  }
]

export const mapCompanyRows = companyRows =>
  companyRows.map(c => ({
    rawData: c,
    ...c,
    displayName: getSafe(() => c.name, ''),
    hasLogisticsAccounts: getSafe(() => c.logisticsAccount, false) ? 'Yes' : 'No',
    hasDwollaAccount: getSafe(() => c.dwollaAccountStatus === 'verified', '') ? 'Yes' : 'No',
    primaryBranchAddress: getFormattedAddress({
      street: getSafe(() => c.primaryBranch.deliveryAddress.address.streetAddress, ''),
      city: getSafe(() => c.primaryBranch.deliveryAddress.address.city, ''),
      zip: getSafe(() => c.primaryBranch.deliveryAddress.address.zip.zip, ''),
      province: getSafe(() => c.primaryBranch.deliveryAddress.address.province.name, ''),
      country: getSafe(() => c.primaryBranch.deliveryAddress.address.country.name, '')
    }),
    primaryContact: getSafe(() => c.primaryBranch.deliveryAddress.contactName, ''),
    contactEmail: getSafe(() => c.primaryBranch.deliveryAddress.contactEmail, ''),
    reviewRequested: getSafe(() => c.reviewRequested, false)
      ? 'Yes'
      : getSafe(() => c.reviewRequested === false, false)
      ? 'No'
      : '',
    hasLogo: getSafe(() => c.hasLogo, false),
    nacdMember: getSafe(() => c.nacdMember, false) ? 'Yes' : getSafe(() => c.nacdMember === false, false) ? 'No' : ''
  }))

export const currencySymbol = '$'
