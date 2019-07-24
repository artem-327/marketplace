import React, { Component } from "react"
import { connect } from "react-redux"
import confirm from '~/src/components/Confirmable/confirm'
import { injectIntl } from 'react-intl'
import { Popup, Label } from 'semantic-ui-react'
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
    const {
      datagrid,
      config,
      intl,
      rows,
      openPopup,
      openEditAltNamesCasPopup,
      deleteCasProduct
    } = this.props

    const { formatMessage } = intl
    const { columns } = config.display

    return (
      <React.Fragment>
        <ProdexTable
          {...datagrid.tableProps}
          tableName='admin_cas_products'
          columns={columns}
          rows={rows}
          rowActions={[
            { text: formatMessage({ id: 'global.edit', defaultMessage: 'Edit' }), callback: (row) => openPopup(row) },
            { text: formatMessage({ id: 'admin.editAlternativeNames', defaultMessage: 'Edit Alternative Names' }), callback: (row) => openEditAltNamesCasPopup(row) },
            {
              text: formatMessage({ id: 'global.delete', defaultMessage: 'Delete' }),
              callback: (row) => confirm(
                formatMessage({id: 'confirm.deleteCasProduct.title', defaultMessage: 'Delete CAS Product?'}),
                formatMessage({
                  id: 'confirm.deleteCasProduct.content',
                  defaultMessage: `Do you really want to delete '${row.chemicalName}' CAS product?`
                }, {name: row.chemicalName})
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
    {classes.map((b, i) => <Popup content={b.description} trigger={<Label size='tiny' key={i}>{b.classCode}</Label>} />)}
  </Label.Group>
)

const mapStateToProps = (state, { datagrid }) => {
  let cfg = state.admin.config[state.admin.currentTab]
  
  return {
    config: cfg,
    filterCasIds: state.admin.filterCasIds,
    filterValue: state.admin.filterValue,
    currentTab: state.admin.currentTab,
    casListDataRequest: state.admin.casListDataRequest,
    rows: datagrid.rows.map(d => {
      return {
        id: d.id,
        casIndexName: d.casIndexName,
        casNumber: d.casNumber,
        chemicalName: d.chemicalName,
        packagingGroup: !!d.packagingGroup ? d.packagingGroup.groupCode : '',
        unNumberCode: !!d.unNumber ? d.unNumber.unNumberCode : '',
        unNumberId: !!d.unNumber ? d.unNumber.id : '',
        unNumber: !!d.unNumber ? {
          id: d.unNumber.id,
          title: d.unNumber.unNumberCode,
          description: d.unNumber.description
        } : null,
        hazardClasses: transformHazardClasses(d.hazardClasses),
        // Prepare initial values for editing form
        packagingGroupId: !!d.packagingGroup ? d.packagingGroup.id : '',
        hazardClassesId: !!d.hazardClasses ? (d.hazardClasses.map(a => a.id)) : [],
      }
    }),
    confirmMessage: state.admin.confirmMessage,
    deleteRowById: state.admin.deleteRowById,
  }
}

export default withDatagrid(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CasProductsTable)))