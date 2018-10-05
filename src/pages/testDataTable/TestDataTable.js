import React,{Component} from 'react';
import DataTable from "../../components/DataTable";


class TestPage extends Component {

    render(){
        return (
            <div>
                <h1 className='header inv-header'>Test Table</h1>
                <DataTable id="test" header={[{name: 'test'}]}/>
            </div>
        )
    }
}

export default TestPage;