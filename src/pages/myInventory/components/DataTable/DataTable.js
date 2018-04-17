import React, {Component} from 'react';
import SelectableTable from 'react-selectable-table/build'
import './dataTable.css'
import {Translate} from 'react-localize-redux'
import TableItem from './components/TableItem'

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndicies: [ ]
        }
    }

    componentWillMount() {

    }

    componentDidMount(){
    }

    componentWillUnmount() {
    }

    onSelectionChange() {
        this.setState({ selectedIndicies: this.refs.table.getSelectedIndices() })
    }

    render() {
        const bodyRow =  <tr>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>test</td>
            <td>YES</td>
            <td>NO</td>
        </tr>;

        return (
            <div className="App-data-table">
                <div className="row table-header">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <Translate id="myInventory.table.myInventory"/>
                    </div>
                </div>
                <SelectableTable onChange={this.onSelectionChange.bind(this)} ref="table">
                    <thead>
                    <tr>
                        <th><Translate id="myInventory.table.chemicalName"/></th>
                        <th><Translate id="myInventory.table.pkgAvbl"/></th>
                        <th><Translate id="myInventory.table.packaging"/></th>
                        <th><Translate id="myInventory.table.pkgSize"/></th>
                        <th><Translate id="myInventory.table.quantity"/></th>
                        <th><Translate id="myInventory.table.cost"/></th>
                        <th><Translate id="myInventory.table.fobPrice"/></th>
                        <th><Translate id="myInventory.table.mfr"/></th>
                        <th><Translate id="myInventory.table.origin"/></th>
                        <th><Translate id="myInventory.table.incoterms"/></th>
                        <th><Translate id="myInventory.table.exp"/></th>
                        <th><Translate id="myInventory.table.assay"/></th>
                        <th><Translate id="myInventory.table.condition"/></th>
                        <th><Translate id="myInventory.table.form"/></th>
                        <th><Translate id="myInventory.table.location"/></th>
                        <th><Translate id="myInventory.table.zipCode"/></th>
                        <th><Translate id="myInventory.table.brd"/></th>
                        <th><Translate id="myInventory.table.markUps"/></th>
                        <th><Translate id="myInventory.table.anon"/></th>
                        <th><Translate id="myInventory.table.mapped"/></th>
                    </tr>
                    </thead>
                    <tbody>
                        {bodyRow}
                        {bodyRow}
                        <TableItem/>
                    </tbody>
                </SelectableTable>
                <p>Selected Indicies: {this.state.selectedIndicies.join(', ')}</p>
                <div className="clearfix"> </div>
            </div>
        );
    }
}

export default DataTable;