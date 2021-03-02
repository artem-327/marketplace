import { connect } from 'react-redux'
import moment from 'moment'
//Components
import Table from './Table'
//HOC
import { withDatagrid } from '../../datagrid'
//Services
import { getSafe } from '../../../utils/functions'
import { getLocaleDateFormat } from '../../../components/date-format'

//Actions
import { buttonActionsDetailRow } from '../actions'
//Constants
import { STATUSES, COLORS, mockRows } from '../constants'
//Styles
import { DivStatusLabel, DivCircle, DivCircles } from './Table.styles'

const getStatusLabel = status => {
  if (!status) return null
  let lowerCaseText = status.toLowerCase()
  let textLabel = `${lowerCaseText.charAt(0).toUpperCase()}${lowerCaseText.slice(1)}`
  return <DivStatusLabel>{textLabel}</DivStatusLabel>
}

const getCriteriaLabel = criteria => {
  if (!criteria) return null
  const criteriaKeys = Object.keys(criteria)
  return (
    <DivCircles>
      {criteriaKeys.map(key => {
        return <DivCircle background={COLORS[criteria[key].criteria_match] || '#f8f9fb'} />
      })}
    </DivCircles>
  )
}

const getDate = date => {
  if (!date) return null

  return moment(date).format(getLocaleDateFormat())
}

const mapDispatchToProps = {
  buttonActionsDetailRow
}

const mapStateToProps = (state, { datagrid }) => {
  //const { rows } = datagrid //FIXME

  return {
    datagrid,
    loadingDatagrid: datagrid.loading,
    rows: getSafe(() => mockRows.length, false) //mockRows replace to rows from datagrid
      ? mockRows.map(row => {
          return {
            ...row,
            member: <b>{getSafe(() => row.connectedCompany.cfDisplayName, '')}</b>,
            connectionStatus: getStatusLabel(row.status),
            eligibilityCriteria: getCriteriaLabel(row.criteria),
            date: getDate(row.updatedAt || row.createdAt),
            buttonActionsDetailRow: buttonActionsDetailRow
          }
        })
      : []
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(Table))
