import React, {Component} from "react";
import {connect} from "react-redux";
import ProdexTable from '~/components/table'



class CasProductsTable extends Component {


  render() {
    const {
      config,
      rows,
      filterValue,
      currentTab,
      openEditPopup,
      deleteItem,
    } = this.props;

    const { columns } = this.props.config.display;

    return (
      <React.Fragment>
        <ProdexTable
          filterValue={filterValue}
          columns={columns}
          rows={rows}
          rowActions={[
            {text: 'Edit', callback: (row) => openEditPopup(config, row)},
            {text: 'Delete', callback: (row) => deleteItem(config, row.id)}
          ]}
        />
      </React.Fragment>
    )
  }


}

const mapDispatchToProps = {

}

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab];
  return {
    config: cfg,
    rows: state.admin[cfg.api.get.dataName],
    filterValue: state.admin.filterValue,
    currentTab: state.admin.currentTab,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CasProductsTable)