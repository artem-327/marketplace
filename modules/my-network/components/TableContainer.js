import { connect } from 'react-redux'
import { FormattedNumber } from 'react-intl'
import { Image } from 'semantic-ui-react'
//Components
import Table from './Table'
import Logo from '../../../assets/images/nav/logo-bluepallet.png' //DELETE
//HOC
import { withDatagrid } from '../../datagrid'
//Services
import { getStatusLabel, getCriteriaLabel, getStatuses, getDate, getTradeCriteriaValues } from '../MyNetwork.services'
//Actions
import { buttonActionsDetailRow, connectionsStatuses } from '../actions'
import { getCompanyLogo } from '../../company-form/actions'

//Constants
import { mockRows } from '../constants'

const mapDispatchToProps = {
  buttonActionsDetailRow,
  connectionsStatuses,
  getCompanyLogo
}

const mapStateToProps = ({ myNetwork }, { datagrid }) => {
  //const { rows } = datagrid //FIXME

  return {
    datagrid,
    loadingDatagrid: datagrid.loading,
    statuses: getStatuses(mockRows),
    rows: mockRows?.length
      ? mockRows.map((row, i) => {
          return {
            ...row,
            id: row?.connectionId,
            member: (
              <div key={i}>
                {/*FIXME row?.connectedCompany?.logo */}
                <Image verticalAlign='middle' size='mini' spaced={true} src={Logo} />

                <b>{row?.connectedCompany?.name}</b>
              </div>
            ),
            logo: <Image verticalAlign='middle' size='small' spaced={true} src={Logo} />, //FIXME row?.connectedCompany?.logo
            connectionStatus: getStatusLabel(row?.status),
            eligibilityCriteria: getCriteriaLabel(row?.criteria),
            date: getDate(row?.updatedAt),
            buttonActionsDetailRow: buttonActionsDetailRow,
            tradeCriteria: getTradeCriteriaValues(row?.criteria),
            legalData: {
              legalBusinessName: row?.connectedCompany?.name,
              ein: row?.connectedCompany?.tin,
              telephoneNumber: row?.connectedCompany?.phone,
              inBusinessSince: row?.connectedCompany?.inBusinessSince,
              numberOfEmployees: (
                <FormattedNumber
                  minimumFractionDigits={0}
                  maximumFractionDigits={0}
                  value={row?.connectedCompany?.numberOfEmployees}
                />
              )
            },
            marketingData: {
              website: row?.connectedCompany?.website,
              facebookHandle: row?.connectedCompany?.socialFacebook,
              instagramHandle: row?.connectedCompany?.socialInstagram,
              linkedInHandle: row?.connectedCompany?.socialLinkedin,
              twitterHandle: row?.connectedCompany?.socialTwitter,
              tradePassConnection: row?.connectedCompany?.connectionsCount || 0
            },
            verifiedData: {
              articlesIncorporation: row?.connectedCompany?.articlesIncorporation ? 'Verified' : 'Unverified', //FIXME missing from endpoint
              certificateInsurance: row?.connectedCompany?.certificateInsurance ? 'Verified' : 'Unverified', //FIXME missing from endpoint
              linkedBankAccounts: row?.connectedCompany?.paymentProcessor ? 'Verified' : 'Unverified', //FIXME missing from endpoint
              tradeOrganization: row?.connectedCompany?.dunsNumber ? 'NACD' : 'Unverified' //FIXME maybe is correct
            }
          }
        })
      : []
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(Table))
