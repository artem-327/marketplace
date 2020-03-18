import React, { Component } from 'react'
import ProdexGrid from '~/components/table'
import { connect } from 'react-redux'
import { withDatagrid } from '~/modules/datagrid'
import { injectIntl } from 'react-intl'
import { companyDatagridColumns, mapCompanyRows } from '~/constants/index'

const columns = companyDatagridColumns

class Table extends Component {
  render() {
    const { datagrid, rows } = this.props
    // TODO - byl tam nejaky jeden field navic u tech client companies oproti norm. company
    // TODO - otestovat jakmile budou endpointy aktivni
    // TODO - pridat row actions na edit/delete
    return <ProdexGrid {...datagrid.tableProps} tableName='settings_client_companies' rows={rows} columns={columns} />
  }
}

const mapStateToProps = (_state, { datagrid }) => {
  return {
    rows: mapCompanyRows(datagrid.rows)
  }
}

export default withDatagrid(connect(mapStateToProps, {})(injectIntl(Table)))
