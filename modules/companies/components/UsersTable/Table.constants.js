import { FormattedMessage } from 'react-intl'

export const COLUMNS = [
  {
    name: 'name',
    title: (
      <FormattedMessage id='global.user' defaultMessage='User'>
        {text => text}
      </FormattedMessage>
    ),
    width: 180,
    sortPath: 'User.name',
    allowReordering: false
  },
  {
    name: 'companyName',
    title: (
      <FormattedMessage id='global.companyName' defaultMessage='Company Name'>
        {text => text}
      </FormattedMessage>
    ),
    width: 180
  },
  {
    name: 'jobTitle',
    title: (
      <FormattedMessage id='global.jobTitle' defaultMessage='Job Title'>
        {text => text}
      </FormattedMessage>
    ),
    width: 130
  },
  {
    name: 'email',
    title: (
      <FormattedMessage id='global.email' defaultMessage='E-mail'>
        {text => text}
      </FormattedMessage>
    ),
    width: 180,
    sortPath: 'User.email'
  },
  {
    name: 'phoneFormatted',
    title: (
      <FormattedMessage id='global.phone' defaultMessage='Phone'>
        {text => text}
      </FormattedMessage>
    ),
    width: 160
  },
  /*
  {
    name: 'homeBranchName',
    title: (
      <FormattedMessage id='global.homeBranch' defaultMessage='Home Branch'>
        {text => text}
      </FormattedMessage>
    ),
    width: 180
  },
  */
  {
    name: 'userRoles',
    title: (
      <FormattedMessage id='global.roles' defaultMessage='Roles'>
        {text => text}
      </FormattedMessage>
    ),
    width: 160
  },
  /*
  {
    name: 'lastLoginAt',
    title: (
      <FormattedMessage id='global.lastLogin' defaultMessage='Last Login'>
        {text => text}
      </FormattedMessage>
    ),
    width: 180
  },
  */
  {
    name: 'switchEnable',
    title: (
      <FormattedMessage id='global.enableUser' defaultMessage='Enable User'>
        {text => text}
      </FormattedMessage>
    ),
    width: 120,
    align: 'right'
  }
]