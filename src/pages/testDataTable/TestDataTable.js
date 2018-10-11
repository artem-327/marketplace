import React, {Component} from 'react';
import DataTable from "../../components/DataTable";


class TestPage extends Component {

    render() {
        return (
            <div>
                <h1 className='header inv-header'>Test Table</h1>
                <DataTable id="test"
                           selectable
                           sortFunc={(nameColumn) => console.log(nameColumn)}
                           headerInit={[{name: 'test'}, {name: 'test2'}, {name: null}]}
                           contextMenu={
                               [
                                   {action: (id)=>this.props.history.push(`/inventory/edit-inventory/${id}`), label: 'Edit Listing',},
                                   {action: (id)=>console.log('BR'), label: 'Custom Broadcast'},
                                   {action: (id)=>console.log('delete'), label: 'Delete Listing'}
                               ]
                           }
                           rowsInit={[
                               {
                                   group: 'test',
                                   countLabel: 'Product Offerings: ',
                                   rows: [
                                       {
                                           id:24,
                                           data:['text', 'testtest1', <button className='info-button'>INFO</button>]
                                       },
                                       {
                                           id:24,
                                           data:['text', 'testtest1', <button className='info-button'>INFO2</button>]
                                       }
                                   ]
                               },
                           ]}
                />
            </div>
        )
    }
}

export default TestPage;