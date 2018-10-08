import React, {Component} from 'react';
import DataTable from "../../components/DataTable";


class TestPage extends Component {

    render() {
        return (
            <div>
                <h1 className='header inv-header'>Test Table</h1>
                <DataTable id="test"
                           headerInit={[{name: 'test'}, {name: ''}]}
                           rowsInit={[
                               {
                                   group: 'test',
                                   rows: [
                                       ['text', '', <button className='info-button'>INFO</button>],
                                       ['text2', <button className='info-button'>INFO</button>],
                                       ['text3', <button className='info-button'>INFO</button>]
                                   ]
                               },
                               {
                                   rows: [
                                       ['text4', '', <button className='info-button'>INFO</button>],
                                       ['text5', <button className='info-button'>INFO</button>],
                                       ['text6', <button className='info-button'>INFO</button>]
                                   ]
                               },
                           ]}
                />
            </div>
        )
    }
}

export default TestPage;