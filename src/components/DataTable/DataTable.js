import React, {Component} from 'react';
import PropTypes from "prop-types";
import Header from "./components/Header";
import Rows from "./components/Rows";
import './dataTable.css';

class DataTable extends Component {

    constructor(props){
        super(props);
        this.initDataTable();
    }

    initDataTable(){
        if(!this.props.dataTable){
            let header = this.props.headerInit.map((item, index) => ({
                index: index,
                name: item.name,
                sort: item.sort !== undefined ? item.sort : true,
                visible: item.visible !== undefined ? item.visible : true,
            }));
            let rows = this.props.rowsInit.map((item, index) => (
                {
                    ...item,
                    index: index,
                    rows: item.rows.map((row, index2)=>({selected: false, index: index2, row: row.data, id: row.id}))
                }
            ));
            this.props.initDataTable(this.props.id, header, rows);
        }
    }

    render() {
        if(!this.props.dataTable) return null;
        return <div className="data-table-wr"><table className="data-table">
            <Header data={this.props.dataTable.header}
                    sortFunc={this.props.sortFunc}
                    contextMenu={this.props.contextMenu.length !== 0}
                    toggleColumn={(headerId, value) => this.props.toggleVisibleColumn(this.props.id, headerId, value)}
                    selectable={this.props.selectable}/>
            <Rows data={this.props.dataTable.rows}
                  selectable={this.props.selectable}
                  contextMenu={this.props.contextMenu}
                  headers={this.props.dataTable.header}
                  selectGroupFunc={(groupId, rows) => this.props.selectGroup(this.props.id, groupId, rows)}
                  selectFunc={(groupId, rowId, value) => this.props.selectRow(this.props.id, groupId, rowId, value)}
            />
        </table></div>
    }
}

DataTable.propTypes = {
    dataTable: PropTypes.any,
    id: PropTypes.string,
    selectable: PropTypes.bool,
    contextMenu: PropTypes.array,
    selectGroupFunc: PropTypes.func,
    rowsInit: PropTypes.arrayOf(
        PropTypes.object
    ),
    headerInit: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            sort: PropTypes.bool,
            visible: PropTypes.bool,
        })
    ),
    sortFunc: PropTypes.func,

};

export default DataTable;
