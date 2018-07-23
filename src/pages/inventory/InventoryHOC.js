import React from 'react';
import SubMenu from '../../components/SubMenu';


export default function InventoryHOC(ComposedComponent) {
    return class inventoryWrapper extends React.Component {
        submenuLinks() {
            return [
                {
                    url: '/inventory/my-inventory',
                    label: 'My Inventory',
                    exact: true
                },
                {
                    url: '/inventory/all-inventory',
                    label: 'All Inventory'
                },
                {
                    url: '/inventory/add-inventory/',
                    label: 'Add inventory'
                }
            ]
        }
        render() {
            let filter = this.props.location.pathname !== '/inventory/add-inventory/';
            return (
                <div>
                    <SubMenu links={this.submenuLinks()} filter={filter}/>
                    <ComposedComponent {...this.props}/>
                </div>
            );
        }
    }
}

