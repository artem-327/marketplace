import React, {Component} from 'react';
import './inventory.css';
import SubMenu from '../../components/SubMenu';
import ImportXLS from './components/ImportXLS';

class Inventory extends Component {

    componentDidMount() {

    }
    componentWillUnmount() {

    }

    submenuLinks(){
        return [
            {
                url: '/inventory',
                label: 'My Inventory',
                exact: true
            },
            {
                url: '/inventory/all-inventory',
                label: 'All Inventory'
            },
            {
                url: '/inventory/consilidated',
                label: 'Consilidated'
            },
            {
                url: '/inventory/unmapped-inventory',
                label: 'Unmapped Inventory'
            },
        ]
    }

    render() {
        return (
            <div>
                <SubMenu links={this.submenuLinks()} search filter/>
                <p>Inventory</p>
                <ImportXLS />
            </div>
        );
    }
}

export default Inventory;

