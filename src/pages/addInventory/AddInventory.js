import React, {Component} from 'react';
import './AddInventory.css'
import AddForm from './components/AddForm';
import Dropdown from './components/Dropdown';

class AddInventory extends Component {

    render() {
        return (
            <div className="dashboard">
                <Dropdown/>
                {/*<AddForm {...this.props}/>*/}
            </div>
        );
    }
}

export default AddInventory;
