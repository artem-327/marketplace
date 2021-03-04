import { connect } from 'react-redux'
import { FormattedNumber } from 'react-intl'
import { Image } from 'semantic-ui-react'
import api from '../../../api'
import axios from 'axios'

//Components
import Table from './Table'
//HOC
import { withDatagrid } from '../../datagrid'
//Services
import { getStatusLabel, getCriteriaLabel, getStatuses, getDate, getTradeCriteriaValues } from '../MyNetwork.services'
//Actions
import { buttonActionsDetailRow, connectionsStatuses } from '../actions'
import { getCompanyLogo } from '../../company-form/actions'

const mapDispatchToProps = {
  buttonActionsDetailRow,
  connectionsStatuses,
  getCompanyLogo
}

const mapStateToProps = (state, { datagrid }) => {
  const { rows } = datagrid

  return {
    datagrid,
    loadingDatagrid: datagrid.loading,
    statuses: getStatuses(rows),
    rows: rows?.length
      ? rows.map(row => {
          return {
            ...row,
            id: row?.connectionId,
            member: <b>{row?.connectedCompany?.name}</b>,
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
