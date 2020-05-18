import React, { Component } from 'react'
import confirm from '~/src/components/Confirmable/confirm'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Popup, Label } from 'semantic-ui-react'
import { connect } from 'react-redux'

import ProdexTable from '~/components/table'
import {
  openPopup,
  openEditAltNamesCasPopup,
  closeConfirmPopup,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  deleteCasProduct
} from '../../actions'
import { withDatagrid } from '~/modules/datagrid'

class CasProductsTable extends Component {
  componentDidMount() {
    this.props.getHazardClassesDataRequest()
    this.props.getPackagingGroupsDataRequest()
  }

  render() {
    const { datagrid, config, intl, rows, openPopup, openEditAltNamesCasPopup, deleteCasProduct } = this.props

    const { formatMessage } = intl
    const { columns } = config.display

    return (
      <React.Fragment>
        <ProdexTable
          {...datagrid.tableProps}
          tableName='admin_cas_products'
          columns={columns}
          rows={rows}
          defaultSorting={{
            columnName: 'casIndexName',
            sortPath: 'CasProduct.casIndexName',
            direction: 'asc'
          }}
          rowActions={[
            {
              text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }),
              callback: ({ hazardClassesLabeled, ...rest }) => openPopup(rest)
            },
            {
              text: formatMessage({ id: 'admin.editAlternativeNames', defaultMessage: 'Edit Alternative Names' }),
              callback: row => openEditAltNamesCasPopup(row)
            },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              callback: row =>
                confirm(
                  formatMessage({ id: 'confirm.deleteCasProduct.title', defaultMessage: 'Delete CAS Product?' }),
                  formatMessage(
                    {
                      id: 'confirm.deleteCasProduct.content',
                      defaultMessage: `Do you really want to delete '${row.chemicalName}' CAS product?`
                    },
                    { name: row.chemicalName }
                  )
                ).then(() => {
                  deleteCasProduct(row.id)
                  datagrid.removeRow(row.id)
                })
            }
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  openPopup,
  openEditAltNamesCasPopup,
  closeConfirmPopup,
  getHazardClassesDataRequest,
  getPackagingGroupsDataRequest,
  deleteCasProduct
}

const transformHazardClasses = classes => (
  <Label.Group color='blue'>
    {classes.map((b, i) => (
      <Popup
        key={i}
        content={b.description}
        trigger={
          <Label size='tiny' key={i}>
            {b.classCode}
          </Label>
        }
      />
    ))}
  </Label.Group>
)

const mapStateToProps = (state, { datagrid }) => {
  let cfg = state.admin.config[state.admin.currentTab.name]

  return {
    config: cfg,
    filterCasIds: state.admin.filterCasIds,
    filterValue: state.admin.filterValue,
    currentTab: state.admin.currentTab,
    casListDataRequest: state.admin.casListDataRequest,
    rows: datagrid.rows.map(d => {
      return {
        ...d,
        hazardClassesLabeled: transformHazardClasses(d.hazardClasses)
      }
    }),
    confirmMessage: state.admin.confirmMessage,
    deleteRowById: state.admin.deleteRowById
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CasProductsTable)))
