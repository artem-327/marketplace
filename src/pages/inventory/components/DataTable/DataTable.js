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

        const calculate_delivery_component = <div className="calculate-delivery-popup">
            <div className="delivery-popup-item">
                <input placeholder="Quantity"></input>
            </div>
            <div className="delivery-popup-item">
                <input placeholder="Delivery Zip"></input>
            </div>
            <div className="delivery-popup-item">
                <select className="">
                    <option>Grade</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                </select>
            </div>
            <div className="delivery-popup-item">
                <button>Calculate</button>
            </div>
        </div>;



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