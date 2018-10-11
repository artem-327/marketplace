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
                           rowsInit={[
                               {
                                   group: 'test',
                                   rows: [
                                       ['text', 'testtest1', <button className='info-button'>INFO</button>],
                                       ['text2', 'testtest2', <button className='info-button'>INFO</button>],
                                       ['text3', 'testtest3', <button className='info-button'>INFO</button>]
                                   ]
                               },
                               {
                                   rows: [
                                       ['text4', 'testtest4', <button className='info-button'>INFO</button>],
                                       ['text5', 'testtest5', <button className='info-button'>INFO</button>],
                                       ['text6', 'testtest6', <button className='info-button'>INFO</button>]
                                   ]
                               },
                           ]}
                />
            </div>
        )
    }
}

export default TestPage;