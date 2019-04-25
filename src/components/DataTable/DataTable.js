import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Rows from './components/Rows';
import './dataTable.scss';
import Spinner from '../Spinner/Spinner';
import PerfectScrollbar from 'react-perfect-scrollbar';

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
      align: item.align ? item.align : '',
      sort: item.sort !== undefined ? item.sort : true,
      visible: item.visible !== undefined ? item.visible : true
    }));
    let rowsOpns = this.props.rows.map((item, index) => {
        return ({
            ...item,
            index: index,
            rows: item.rows.map((row, index2) => ({
                disabled: false,
                selected: false,
                index: index2,
                id: row.id
            }))
        });
    });
    this.props.initDataTable(this.props.id, header, rowsOpns);
    // }
  }

  handleScrollY() {
    let topPosition = document.querySelector('#datatable-wrapper > .scrollbar-container').scrollTop;
    let fixHeader = document.querySelectorAll('#datatable-wrapper th > .fix-header');
    for (let i = 0; i < fixHeader.length; i++) {
      fixHeader[i].style.top = topPosition + 'px';
    }
    let xScrollbar = document.querySelector('#datatable-wrapper > .scrollbar-container > .ps__rail-x');
    let yScrollbar = document.querySelector('#datatable-wrapper > .scrollbar-container > .ps__rail-y');
    xScrollbar.style.marginBottom = -topPosition + 'px';
    yScrollbar.style.marginTop = topPosition + 'px';
  }

  handleScrollX() {
    let leftPosition = document.querySelector('#datatable-wrapper > .scrollbar-container').scrollLeft;
    let xScrollbar = document.querySelector('#datatable-wrapper > .scrollbar-container > .ps__rail-x');
    let yScrollbar = document.querySelector('#datatable-wrapper > .scrollbar-container > .ps__rail-y');
    xScrollbar.style.marginLeft = leftPosition + 'px';
    yScrollbar.style.marginRight = -leftPosition + 'px';
  }

  render() {
    if (!this.props.dataTable || !this.props.rows) return null;
    if (this.props.isFetching) return <Spinner />;
    if (this.props.rows.length !== this.props.dataTable.rowsOpns.length) {
      console.error("DataTable error, rowsOpns don't belong to rows, TODO::15");
      return <h4>DataTable Error</h4>;
    }
    return (
      <div id="datatable-wrapper" className="data-table-wr">
        <PerfectScrollbar onScrollY={this.handleScrollY} onScrollX={this.handleScrollX}>
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
              onRowClick={this.props.onRowClick}
              tableType={this.props.id}
              addPopup={this.props.addPopup}
              removePopup={this.props.removePopup}
              history={this.props.history}
              location={this.props.location}
              rows={this.props.rows}
              rowsOpns={this.props.dataTable.rowsOpns}
              selectable={this.props.selectableRows}
              contextMenu={this.props.contextMenu}
              rowComponent={this.props.rowComponent}
              headers={this.props.dataTable.header}
              selectGroupFunc={(data) =>
                this.props.selectGroup(this.props.id, data)
              }
              selectFunc={(data) =>
                this.props.selectRow(this.props.id, data)
              }
            />
          </table>
        </PerfectScrollbar>
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
