import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { withDatagrid } from '~/modules/datagrid'
import ProdexTable from '~/components/table'
import { generateToastMarkup } from '~/utils/functions'
import { withToastManager } from 'react-toast-notifications'

import * as Actions from '../../actions'


class ProductCatalogTable extends Component {

  getRows = (rows) => {
    return rows.map((row) => {
      return {
        ...row,
        manufacturerName: row.manufacturer.name
      }
    })
  }

  render() {
    const {
      datagrid,
      columns,
      rows,
      intl: { formatMessage },
      openEditEchoProduct,
      openEditEchoAltNamesPopup
    } = this.props

    return (
      <React.Fragment>
        <ProdexTable
          {...datagrid.tableProps}
          tableName='admin_companies'
          columns={columns}
          rows={this.getRows(rows)}
          rowActions={[
            { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: (row) => openEditEchoProduct(row.id, row) },
            { text: formatMessage({ id: 'admin.editAlternativeNames', defaultMessage: 'Edit Alternative Names' }), callback: (row) => openEditEchoAltNamesPopup(row) },
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ admin }, { datagrid }) => {
  return {
    columns: admin.config[admin.currentTab.name].display.columns,
    productListDataRequest: admin.productListDataRequest,
    filterValue: admin.filterValue,
    currentTab: admin.currentTab,
    rows: datagrid.rows.map(c => ({
      ...c,
    })),
    confirmMessage: admin.confirmMessage,
    deleteRowById: admin.deleteRowById,
  }
}

export default withDatagrid(connect(mapStateToProps, Actions)(injectIntl(withToastManager(ProductCatalogTable))))