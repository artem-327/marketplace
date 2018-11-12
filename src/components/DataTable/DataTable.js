import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Rows from './components/Rows';
import './dataTable.css';
import Spinner from '../Spinner/Spinner';

class DataTable extends Component {
  componentDidMount() {
    this.initDataTable();
  }

  initDataTable() {
    //TODO::don't rewrite store if exists, but beware of filter (reload data)
    // if(!this.props.dataTable){
    let header = this.props.headerInit.map((item, index) => ({
      index: index,
      name: item.name,
      sort: item.sort !== undefined ? item.sort : true,
      visible: item.visible !== undefined ? item.visible : true
    }));
    let rowsOpns = this.props.rows.map((item, index) => ({
      ...item,
      index: index,
      rows: item.rows.map((row, index2) => ({
        selected: false,
        index: index2,
        id: row.id
      }))
    }));
    this.props.initDataTable(this.props.id, header, rowsOpns);
    // }
  }

  render() {
    if (!this.props.dataTable || !this.props.rows) return null;
    if (this.props.isFetching) return <Spinner />;
    if (this.props.rows.length !== this.props.dataTable.rowsOpns.length) {
      console.error("DataTable error, rowsOpns don't belong to rows, TODO::15");
      return <h4>DataTable Error</h4>;
    }
    return (
      <div className="data-table-wr">
        <table className="data-table">
          <Header
            data={this.props.dataTable}
            sortFunc={this.props.sortFunc}
            selectTable={rows =>
              this.props.selectDataTable(this.props.id, rows)
            }
            contextMenu={
              this.props.contextMenu && this.props.contextMenu.length !== 0
            }
            toggleColumn={(headerId, value) =>
              this.props.toggleVisibleColumn(this.props.id, headerId, value)
            }
            selectable={this.props.selectableHeader}
            selectableRows={this.props.selectableRows}
          />
          <Rows
            tableType={this.props.id}
            addPopup={this.props.addPopup}
            rows={this.props.rows}
            rowsOpns={this.props.dataTable.rowsOpns}
            selectable={this.props.selectableRows}
            contextMenu={this.props.contextMenu}
            rowComponent={this.props.rowComponent}
            headers={this.props.dataTable.header}
            selectGroupFunc={(groupId, rows) =>
              this.props.selectGroup(this.props.id, groupId, rows)
            }
            selectFunc={(groupId, rowId, value) =>
              this.props.selectRow(this.props.id, groupId, rowId, value)
            }
          />
        </table>
      </div>
    );
  }
}

DataTable.propTypes = {
  dataTable: PropTypes.any,
  id: PropTypes.string,
  selectable: PropTypes.bool,
  contextMenu: PropTypes.array,
  selectGroupFunc: PropTypes.func,
  isFetching: PropTypes.bool,
  rows: PropTypes.arrayOf(PropTypes.object),
  rowsOpns: PropTypes.arrayOf(PropTypes.object),
  headerInit: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      sort: PropTypes.bool,
      visible: PropTypes.bool
    })
  ),
  sortFunc: PropTypes.func,
  rowComponent: PropTypes.element
};

export default DataTable;
