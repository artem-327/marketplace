import React, {Component} from "react";
import {connect} from "react-redux";
import ProdexTable from '~/components/table'
import { getCasProductByFilter } from '../../actions'


let listDataRequest = {
  pageSize: 50,
  pageStart: 0
}

class CasProductsTable extends Component {



  componentDidMount() {
    console.log('xxxxxxxxxxxxxxxx - CasProductsTable - listDataRequest - ', listDataRequest);
    //console.log('xxxxxxxxxxxxxxxx - CasProductsTable - casProductsRows 1- ', this.props.casProductsRows);
    this.props.getCasProductByFilter(listDataRequest);
    //console.log('xxxxxxxxxxxxxxxx - CasProductsTable - casProductsRows 2- ', this.props.casProductsRows);
  }

  render() {
    const {
      config,
      rows,
      filterValue,  //! !
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

        />
      </React.Fragment>
    )
  }


}

const mapDispatchToProps = {
  getCasProductByFilter,
}

const mapStateToProps = state => {
  let cfg = state.admin.config[state.admin.currentTab];
  return {
    config: cfg,
    rows: state.admin.casProductsRows,
    filterValue: state.admin.filterValue,
    currentTab: state.admin.currentTab,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CasProductsTable)