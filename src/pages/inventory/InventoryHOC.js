import React from 'react';
import SubMenu from '../../components/SubMenu';

export default function InventoryHOC(ComposedComponent) {
    return class inventoryWrapper extends React.Component {
        render() {
            if (this.props.location.pathname === '/inventory/my-inventory' || this.props.location.pathname === '/inventory/all-inventory') {
                return (
                    <div>
                        <SubMenu/>
                        <ComposedComponent {...this.props}/>
                    </div> 
                ) 
            } else {          
                return (
                    <div>
                        <ComposedComponent {...this.props}/>
                    </div>               
                )
            }
        }
    }
}

