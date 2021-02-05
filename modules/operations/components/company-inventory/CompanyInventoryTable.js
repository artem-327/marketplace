import { Component } from 'react'
import { connect } from 'react-redux'

import ProdexGrid from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'

import { getSafe } from '~/utils/functions'
import { currency } from '~/constants/index'
import { getLocaleDateFormat } from '~/components/date-format'
import moment from 'moment/moment'

class CompanyInventoryTable extends Component {
  state = {
    columns: [
      {
        name: 'productName',
        title: (
          <FormattedMessage id='operations.productName' defaultMessage='Product Name'>
            {text => text}
          </FormattedMessage>
        ),
        sortPath: 'ProductOffer.companyProduct.intProductName',
        allowReordering: false
      },
      {
        name: 'productCode',
        title: (
          <FormattedMessage id='operations.productCode' defaultMessage='Product Code'>
            {text => text}
          </FormattedMessage>
        ),
        sortPath: 'ProductOffer.companyProduct.intProductCode'
      },
      {
        name: 'owner',
        title: (
          <FormattedMessage id='operations.owner' defaultMessage='Owner'>
            {text => text}
          </FormattedMessage>
        ),
        sortPath: 'ProductOffer.owner.cfDisplayName'
      },
      {
        name: 'complete',
        title: (
          <FormattedMessage id='operations.complete' defaultMessage='Complete'>
            {text => text}
          </FormattedMessage>
        )
        //sortPath: 'CompanyProduct.complete'
      },
      {
        name: 'broadcasted',
        title: (
          <FormattedMessage id='operations.broadcasted' defaultMessage='Broadcasted'>
            {text => text}
          </FormattedMessage>
        ),
        sortPath: 'ProductOffer.cfStatus'
      }
    ]
  }

  getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        productName: <ActionCell row={row} content={row.productName} />
      }
    })
  }

  render() {
    const { datagrid, rows, filterValue, loading, intl } = this.props

    let { columns } = this.state
    const { formatMessage } = intl

    return (
      <div className='flex stretched listings-wrapper'>
        <ProdexGrid
          tableName='operations_company_inventory'
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={columns}
          rows={this.getRows(rows)}
          loading={datagrid.loading || loading}
          style={{ marginTop: '5px' }}
        />
      </div>
    )
  }
}

const mapDispatchToProps = {}

const mapStateToProps = (state, { datagrid }) => {
  return {
    filterValue: state.operations.filterValue,
    loading: state.operations.loading,
    rows: datagrid.rows.map(d => {
      const isComplete =
        (d.validityDate ? moment().isBefore(d.validityDate) : true) &&
        (d.cfStatus === 'Broadcasting' || d.cfStatus === 'Not broadcasting')
      return {
        id: d.id,
        productName: getSafe(() => d.companyProduct.intProductName, 'N/A'),
        productCode: getSafe(() => d.companyProduct.intProductCode, 'N/A'),
        owner: getSafe(() => d.owner.cfDisplayName, 'N/A'),
        complete: isComplete ? (
          <FormattedMessage id='global.yes' defaultMessage='Yes' />
        ) : (
          <FormattedMessage id='global.no' defaultMessage='No' />
        ),
        broadcasted:
          d.cfStatus === 'Broadcasting' ? (
            <FormattedMessage id='global.yes' defaultMessage='Yes' />
          ) : (
            <FormattedMessage id='global.no' defaultMessage='No' />
          )
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CompanyInventoryTable)))
