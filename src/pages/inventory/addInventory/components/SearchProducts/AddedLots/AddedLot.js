import React,{Component} from 'react';
import './AddedLots.css';

class AddedLot extends Component {

    render(){

        return (
        <div className='lots-item-container'>
            <div className='lots-item-info'>
                {this.props.lot.name}
            </div>
            <div className="vl"></div>
            <div className='lots-item-docs'>
                {this.props.lot.CAS_Number}
            </div>
            <div className="vl"></div>
            <div className='lots-item-button-text'>
                REMOVE
                <button onClick={()=>{this.props.removeLots(this.props.lot.id)}} className="lots-item-button">X</button>
            </div>
        </div>
        )
    }
}

export default AddedLot;