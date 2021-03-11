/* eslint-disable react-hooks/exhaustive-deps */
import { connect } from 'react-redux'
import { injectIntl, FormattedNumber } from 'react-intl'
import { getSafe } from '~/utils/functions'

// Components
import { withDatagrid } from '~/modules/datagrid'
import ProdexTable from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import { Checkbox } from 'semantic-ui-react'

// Constants
import { COLUMNS } from './Carriers.constants'
import { currency } from '~/constants/index'

// Services
import { getActions, handleToggleSwitch } from './Carriers.services'
import { deleteCarrier, updateCarrier, openPopup } from '../../actions'

const getRows = (rows, props) => {
  return rows.map(row => {
    return {
      ...row,
      code: (
        <ActionCell
          row={row}
          getActions={() => getActions(props)}
          content={row.code}
          onContentClick={() => props.openPopup(row.rawData)}
        />
      ),
      priceMarkup:
        row.priceMarkup
          ? (
              <FormattedNumber
                minimumFractionDigits={2}
                maximumFractionDigits={2}
                style='currency'
                currency={currency}
                value={row.priceMarkup}
              />
            )
          : '',
      blindShipmentSupport: (
        <Checkbox
          key={`enabled${row.id}`}
          toggle={true}
          defaultChecked={row.blindShipmentSupport}
          onClick={() => handleToggleSwitch(row.rawData, props)}
          data-test={`admin_carrier_table_blind_shipment_support_${row.id}_chckb`}
        />
      )
    }
  })
}

const Carriers = props => {
  const { loading, updating, rows, datagrid, filterValue } = props

  return (
    <div className='flex stretched listings-wrapper'>
      <ProdexTable
        tableName='admin_carriers'
        {...datagrid.tableProps}
        filterValue={filterValue}
        loading={datagrid.loading || loading || updating}
        columns={COLUMNS}
        rows={getRows(rows, props)}
      />
    </div>
  )
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    rows: datagrid.rows.map((row, index) => {
      return {
        ...row,
        rawData: row
      }
    }),
    editId: state.admin.popupValues && state.admin.popupValues.id,
    filterValue: state.admin.filterValue,
    loading: state.admin.loading,
    updating: state.admin.updating
  }
}

export default withDatagrid(connect(mapStateToProps, { deleteCarrier, updateCarrier, openPopup })(injectIntl(Carriers)))