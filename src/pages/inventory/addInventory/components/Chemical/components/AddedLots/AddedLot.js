import React,{Component} from 'react';
import './AddedLots.css';

class AddedLot extends Component {

    render(){
        return (
        <div className='lots-item-container'>
            <div className='lots-item-info'>
                {this.props.position + ' ' +
                this.props.lot.productName + ' ' +
                this.props.lot.casNumber + ' ' +
                this.props.lot.lotNumber}
            </div>
            <div className="vl"></div>
            <div className='lots-item-docs'>
            </div>
            <div className="vl"></div>
            <div className='lots-item-button-text'>
                REMOVE
                <button onClick={()=>{this.props.removeLots()}} className="lots-item-button">X</button>
            </div>
        </div>
        )
    }
}

export default AddedLot;