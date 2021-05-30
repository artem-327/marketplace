import { FormattedMessage } from 'react-intl'

/**
 * @category Companies/Companies
 * @constant {array} Table columns
 */
export const COLUMNS = [
  {
    name: 'companyName',
    title: (
      <FormattedMessage id='global.companyName' defaultMessage='Company Name'>
        {text => text}
      </FormattedMessage>
    ),
    width: 220,
    sortPath: 'Company.name',
    allowReordering: false
  },
  {
    name: 'dba',
    title: (
      <FormattedMessage id='global.dba' defaultMessage='DBA'>
        {text => text}
      </FormattedMessage>
    ),
    width: 220,
    sortPath: 'Company.dba'
  },
  {
    name: 'p44CompanyId',
    title: (
      <FormattedMessage id='global.p44CompanyId' defaultMessage='P44 Company ID'>
        {text => text}
      </FormattedMessage>
    ),
    width: 210
  },
  {
    name: 'associations',
    title: (
      <FormattedMessage id='admin.associations' defaultMessage='Associations'>
        {text => text}
      </FormattedMessage>
    ),
    width: 165
  },
  {
    name: 'primaryBranchAddress',
    title: (
      <FormattedMessage id='global.headquaterAddress' defaultMessage='Headquarters Address'>
        {text => text}
      </FormattedMessage>
    ),
    width: 185,
    sortPath: 'Company.primaryBranch.deliveryAddress.address.streetAddress'
  },
  {
    name: 'primaryContact',
    title: (
      <FormattedMessage id='global.primaryContact' defaultMessage='Primary Contact'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150,
    sortPath: 'Company.primaryBranch.deliveryAddress.contactName'
  },
  {
    name: 'contactEmail',
    title: (
      <FormattedMessage id='global.contactEmail' defaultMessage='Contact E-mail'>
        {text => text}
      </FormattedMessage>
    ),
    width: 175,
    sortPath: 'Company.primaryBranch.deliveryAddress.contactEmail'
  },
  {
    name: 'paymentAccountStatus',
    title: (
      <FormattedMessage id='global.paymentAccount' defaultMessage='Payment Account'>
        {text => text}
      </FormattedMessage>
    ),
    width: 145
  },
  {
    name: 'hasLogisticsAccounts',
    title: (
      <FormattedMessage id='global.logisticAccounts' defaultMessage='Logistics Accounts'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150
  },
  {
    name: 'reviewRequested',
    title: (
      <FormattedMessage id='global.reviewRequested' defaultMessage='Review Requested'>
        {text => text}
      </FormattedMessage>
    ),
    width: 150,
    align: 'center'
  },
  {
    name: 'enabled',
    title: (
      <FormattedMessage id='global.enabled' defaultMessage='Enabled'>
        {text => text}
      </FormattedMessage>
    ),
    width: 130,
    align: 'center'
  }
]