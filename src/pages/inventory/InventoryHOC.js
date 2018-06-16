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
                    <ComposedComponent {...this.props}/>
                </div>
            );
        }
    }
}

