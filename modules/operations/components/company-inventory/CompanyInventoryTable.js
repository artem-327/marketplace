import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProdexGrid from '~/components/table'
import confirm from '~/src/components/Confirmable/confirm'
import { FormattedMessage, FormattedNumber, injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'

import { getSafe } from '~/utils/functions'
import { currency } from '~/constants/index'
import { getLocaleDateFormat } from '~/components/date-format'
import moment from 'moment/moment'

import {
} from '../../actions'
import Router from 'next/router'

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
        sortPath: 'ProductOffer.companyProduct.intProductName'
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
        sortPath: 'ProductOffer.companyProduct.owner.cfDisplayName'
      },
      {
        name: 'complete',
        title: (
          <FormattedMessage id='operations.complete' defaultMessage='Complete'>
            {text => text}
          </FormattedMessage>
        ),
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

  render() {
    const { datagrid, rows, filterValue, loading, intl } = this.props

    let { columns } = this.state
    const { formatMessage } = intl

    return (
      <React.Fragment>
        <ProdexGrid
          tableName='operations_company_product_catalog'
          {...datagrid.tableProps}
          filterValue={filterValue}
          columns={columns}
          rows={rows}
          loading={datagrid.loading || loading}
          style={{ marginTop: '5px' }}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
}

const mapStateToProps = (state, { datagrid }) => {
  return {
    filterValue: state.operations.filterValue,
    loading: state.operations.loading,
    rows: datagrid.rows.map(d => {
      const isComplete =
        (d.validityDate ? moment().isBefore(d.validityDate) : true)
      && (d.cfStatus === 'Broadcasting' || d.cfStatus === 'Not broadcasting')
      return {
        id: d.id,
        productName: getSafe(() => d.companyProduct.intProductName, 'N/A'),
        productCode: getSafe(() => d.companyProduct.intProductCode, 'N/A'),
        owner: getSafe(() => d.owner.cfDisplayName, 'N/A'),
        complete: isComplete
          ? <FormattedMessage id='global.yes' defaultMessage='Yes'/>
          : <FormattedMessage id='global.no' defaultMessage='No'/>,
        broadcasted: d.cfStatus === 'Broadcasting'
          ? <FormattedMessage id='global.yes' defaultMessage='Yes'/>
          : <FormattedMessage id='global.no' defaultMessage='No'/>,
      }
    }),
    currentTab: getSafe(() => Router.router.query.type)
      ? state.operations.tabsNames.find(tab => tab.type === Router.router.query.type)
      : state.operations.tabsNames[0]
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CompanyInventoryTable)))
