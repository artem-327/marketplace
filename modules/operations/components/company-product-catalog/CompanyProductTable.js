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
        sortPath: 'CompanyProduct.intProductName'
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
        //sortPath: 'CompanyProduct.intProductCode'
      },
      {
        name: 'mapped',
        title: (
          <FormattedMessage id='operations.mapped' defaultMessage='Mapped'>
            {text => text}
          </FormattedMessage>
        ),
        width: 130,
        //sortPath: 'CompanyProduct.intProductCode'
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
      return {
        ...d,
        intProductName: getSafe(() => d.intProductName, 'N/A'),
        intProductCode: getSafe(() => d.intProductCode, 'N/A'),
        mapped: d.echoProduct
          ? <FormattedMessage id='global.yes' defaultMessage='Yes'/>
          : <FormattedMessage id='global.no' defaultMessage='No'/>,
        ProductOffersCnt: 'test ProductOffersCnt'
      }
    }),
    currentTab: getSafe(() => Router.router.query.type)
      ? state.operations.tabsNames.find(tab => tab.type === Router.router.query.type)
      : state.operations.tabsNames[0]
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CompanyProductTable)))
