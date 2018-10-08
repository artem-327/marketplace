import React, {Component} from 'react';
import PropTypes from "prop-types";
import Header from "./components/Header";
import Rows from "./components/Rows";

class DataTable extends Component {

    constructor(props){
        super(props);
        this.initDataTable();
    }

    initDataTable(){
        if(!this.props.dataTable){
            let header = this.props.headerInit.map((item, index) => ({
                id: item.id || index,
                name: item.name,
                sort: item.sort || false,
                visible: item.visible || true,
            }));
            let rows = this.props.rowsInit.map((item) => (
                {
                    ...item,
                    rows: item.rows.map((row)=>({selected: false, row}))
                }
            ));
            this.props.initDataTable(this.props.id, header, rows);
        }
    }

    render() {
        if(!this.props.dataTable) return null;
        return <table>
            <Header data={this.props.dataTable.header} sortFunc={this.props.sortFunc}/>
            <Rows data={this.props.dataTable.rows}/>
        </table>
    }
}

DataTable.propTypes = {
    dataTable: PropTypes.any,
    id: PropTypes.string,
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
