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
                id: index,
                name: item.name,
                sort: item.sort !== undefined ? item.sort : true,
                visible: item.visible !== undefined ? item.visible : true,
            }));
            let rows = this.props.rowsInit.map((item, index) => (
                {
                    ...item,
                    id: index,
                    rows: item.rows.map((row, index2)=>({selected: false, id: index2, row}))
                }
            ));
            this.props.initDataTable(this.props.id, header, rows);
        }
    }

    render() {
        if(!this.props.dataTable) return null;
        return <table>
            <Header data={this.props.dataTable.header}
                    sortFunc={this.props.sortFunc}
                    toggleColumn={(headerId, value) => this.props.toggleVisibleColumn(this.props.id, headerId, value)}
                    selectable={this.props.selectable}/>
            <Rows data={this.props.dataTable.rows}
                  selectable={this.props.selectable}
                  headers={this.props.dataTable.header}
                  selectGroupFunc={(groupId, rows) => this.props.selectGroup(this.props.id, groupId, rows)}
                  selectFunc={(groupId, rowId, value) => this.props.selectRow(this.props.id, groupId, rowId, value)}
            />
        </table>
    }
}

DataTable.propTypes = {
    dataTable: PropTypes.any,
    id: PropTypes.string,
    selectable: PropTypes.bool,
    rowsInit: PropTypes.arrayOf(
        PropTypes.arrayOf(PropTypes.any)
    ),
    headerInit: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string.isRequired,
            sort: PropTypes.bool,
            visible: PropTypes.bool,
        })
    ),
    sortFunc: PropTypes.func,

};

export default DataTable;
