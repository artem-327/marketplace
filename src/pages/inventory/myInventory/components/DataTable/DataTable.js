import React, {Component} from 'react';
import SelectableTable from 'react-selectable-table/build'
import './dataTable.css'
import {Translate} from 'react-localize-redux'
// import Item from "./components/Item"
import MappedForm from "./components/MappedForm"

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndicies: [ ],
            showMapped : false
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

    changeShowMapped() {
        let { showMapped } = this.state;
        this.setState({
            showMapped: !showMapped
        });
    }

    render() {
        const { showMapped} = this.state;

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
            <td className="table-item-mapped" onClick={() => {
                this.changeShowMapped()
            }}>NO</td>
        </tr>;

        let mappedForm = showMapped ? <MappedForm onClick={() => { this.changeShowMapped() }}/> : <div></div>;

        return (
            <div className="App-data-table">
                <div className="row table-header">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <Translate id="inventoryPage.myInventory.table.myInventory"/>
                    </div>
                </div>
                <SelectableTable onChange={this.onSelectionChange.bind(this)} ref="table">
                    <thead>
                    <tr>
                        <th><Translate id="inventoryPage.myInventory.table.chemicalName"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.pkgAvbl"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.packaging"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.pkgSize"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.quantity"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.cost"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.fobPrice"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.mfr"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.origin"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.incoterms"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.exp"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.assay"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.condition"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.form"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.location"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.zipCode"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.brd"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.markUps"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.anon"/></th>
                        <th><Translate id="inventoryPage.myInventory.table.mapped"/></th>
                    </tr>
                    </thead>
                    <tbody>
                        {bodyRow}
                        {bodyRow}

                    </tbody>
                </SelectableTable>
                {mappedForm}

                {/*<p>Selected Indicies: {this.state.selectedIndicies.join(', ')}</p>*/}
                <div className="clearfix"> </div>
            </div>
        );
    }
}

export default DataTable;