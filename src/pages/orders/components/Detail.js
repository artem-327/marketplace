import React, {Component} from 'react'
import CollapsiblePanel from '../../../components/CollapsiblePanel'
import '../../../pages/inventory/addInventory/AddInventory.css'
class Detail extends Component {

    componentWillMount() {
        this.props.loadDetail(this.props.match.params.id)
    }

    render() {
        const {detail, isDetailFetching} = this.props

        return (
            <div className="page">
                <h1 className='header'>Sales Order {isDetailFetching ? 'Loading...' : '# '+detail.id}</h1>

                <CollapsiblePanel header="Detail of order">
                    
                </CollapsiblePanel>
            </div>
        )
    }
}

export default Detail
