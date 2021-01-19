import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProdexGrid from '~/components/table'
import ActionCell from '~/components/table/ActionCell'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'

import { getSafe } from '~/utils/functions'
import { currency } from '~/constants/index'
import { getLocaleDateFormat } from '~/components/date-format'

class CompanyProductTable extends Component {
  state = {
    columns: [
      {
        name: 'intProductName',
        title: (
          <FormattedMessage id='operations.productInternalName' defaultMessage='Product Internal Name'>
            {text => text}
          </FormattedMessage>
        ),
        width: 250,
        sortPath: 'CompanyProduct.intProductName',
        allowReordering: false
      },
      {
        name: 'intProductCode',
        title: (
          <FormattedMessage id='operations.productInternalCode' defaultMessage='Product Internal Code'>
            {text => text}
          </FormattedMessage>
        ),
        width: 250,
        sortPath: 'CompanyProduct.intProductCode'
      },
      {
        name: 'owner',
        title: (
          <FormattedMessage id='operations.owner' defaultMessage='Owner'>
            {text => text}
          </FormattedMessage>
        ),
        width: 250,
        sortPath: 'CompanyProduct.companyGenericProduct.company.cfDisplayName'
      },
      {
        name: 'mapped',
        title: (
          <FormattedMessage id='operations.mapped' defaultMessage='Mapped'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130,
        sortPath: 'CompanyProduct.companyGenericProduct.name'
      },
      {
        name: 'cfProductOfferCount',
        title: (
          <FormattedMessage id='operations.productOffersCnt' defaultMessage='Product Offers #'>
            {text => text}
          </FormattedMessage>
        ),
        align: 'right',
        width: 170,
        sortPath: 'CompanyProduct.cfProductOfferCount'
      }
    ]
  }

  getRows = rows => {
    return rows.map(row => {
      return {
        ...row,
        intProductName: <ActionCell row={row} content={row.intProductName} />
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
          tableName='operations_company_product_catalog'
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
      return {
        id: d.id,
        intProductName: getSafe(() => d.intProductName, 'N/A'),
        intProductCode: getSafe(() => d.intProductCode, 'N/A'),
        owner: getSafe(() => d.companyGenericProduct.company.cfDisplayName, 'N/A'),
        mapped: d.companyGenericProduct ? (
          <FormattedMessage id='global.yes' defaultMessage='Yes' />
        ) : (
          <FormattedMessage id='global.no' defaultMessage='No' />
        ),
        cfProductOfferCount: d.cfProductOfferCount
      }
    })
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CompanyProductTable)))
