import React from 'react';

export default function InventoryHOC(ComposedComponent) {
    return class inventoryWrapper extends React.Component {
        render() {
            return (
                <div>
                    <ComposedComponent {...this.props}/>
                </div>
            )
        }
    }
}

