import React, {Component} from 'react';
import PropTypes from "prop-types";
import Header from "./components/Header";

class DataTable extends Component {

    constructor(props){
        super(props);
        this.initDataTable();
    }

    initDataTable(){
        if(!this.props.dataTables[this.props.id]){
            this.props.initDataTable(this.props.id, this.props.header);
        }
    }


    render() {
        if(!this.props.dataTables[this.props.id]) return null;
        return <table>
            <Header header={this.props.header} />

        </table>
    }
}

DataTable.propTypes = {
    dataTables: PropTypes.any,
    id: PropTypes.string,
    rows: PropTypes.arrayOf(
        PropTypes.object
    ),
    header: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            sort: PropTypes.bool,
            visible: PropTypes.bool,
        })
    )
};

export default DataTable;
