import React, {Component} from 'react';

import './dataTable.css'
import TableHeader from './components/TableHeader'
import TableBody from "./components/TableBody";



class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {

    }

    componentDidMount(){
    }

    componentWillUnmount() {
    }


    render() {




        return (
            <div className="App-data-table">
                <TableHeader/>
                <TableBody/>
                <div className="clearfix"> </div>
            </div>
        );
    }
}

export default DataTable;