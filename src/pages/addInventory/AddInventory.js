import React, {Component} from 'react';
import './AddInventory.css'
import AddForm from './components/AddForm';
import Dropdown from './components/Dropdown/Dropdown';
import {Field} from 'react-redux-form';

class AddInventory extends Component {

//     render() {
//         return (
//             <div className="AddInventory">
//                 <Dropdown/>
//                 {/*<AddForm {...this.props}/>*/}
//             </div>
//
// };

    render() {
        return (
            <div>
                <Dropdown/>
            </div>
        );
    }
}
export default AddInventory;

