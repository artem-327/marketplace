import React, {Component} from "react"
import {connect} from "react-redux"
import { Label } from 'semantic-ui-react'
import ProdexTable from '~/components/table'
import { getCasProductByFilter, openEditCasPopup, casDeleteItem } from '../../actions'


class CasProductsTable extends Component {
  componentDidMount() {
    this.props.getCasProductByFilter(this.props.casListDataRequest)
  }

  render() {
    const {
      config,
      rows,
      filterValue,
      currentTab,
      openEditPopup,
      openEditCasPopup,
      casDeleteItem,
      deleteItem,
    } = this.props

    const { columns } = config.display

    return (
      <React.Fragment>
        <ProdexTable
          filterValue={filterValue}
          columns={columns}
          rows={rows}
          rowActions={[
            {text: 'Edit', callback: (row) => openEditCasPopup(row)},
            {text: 'Delete', callback: (row) => casDeleteItem(row.id)}
          ]}
        />
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = {
  getCasProductByFilter,
  openEditCasPopup,
  casDeleteItem
}

const transformHazardClasses = classes => (
  <Label.Group color='blue'>
    {classes.map((b,i) => <Label size='tiny' key={i} title={b.description}>{b.classCode}</Label>)}
  </Label.Group>
)

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab]
  return {
    config: cfg,
    filterValue: state.admin.filterValue,
    currentTab: state.admin.currentTab,
    casListDataRequest: state.admin.casListDataRequest,
    //rows: state.admin.casProductsRows,
    rows: state.admin.casProductsRows.map(d => {
      return {
        id: d.id,
        casIndexName: d.casIndexName,
        casNumber: d.casNumber,
        chemicalName: d.chemicalName,
        packagingGroup: d.packagingGroup,
        unNumber: d.unNumber,
        hazardClasses: transformHazardClasses(d.hazardClasses)
      }
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CasProductsTable)