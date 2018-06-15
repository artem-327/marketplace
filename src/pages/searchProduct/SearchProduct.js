import React, {Component} from 'react';
import './searchProduct.css';
import Search from './components/Search';


class AddInventory extends Component {


    render() {
        return (
            <div>
                <Search {...this.props}/>
            </div>
        );
    }
}
export default AddInventory;

