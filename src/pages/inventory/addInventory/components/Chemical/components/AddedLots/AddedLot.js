import React,{Component} from 'react';
import './AddedLots.css';
import UploadLot from "../../../Upload/UploadLot";

class AddedLot extends Component {

    constructor(props){
        super(props);
        this.state = {
            isUploaded: true
        }
    }

    render(){

        const productName = this.props.lot.productName !== '' ? this.props.lot.productName : 'No Product Name';
        const casNumber = this.props.lot.casNumber !== '' ? this.props.lot.casNumber : 'No CAS Number';
        const lotNumber = this.props.lot.lotNumber !== '' ? this.props.lot.lotNumber : 'No Lot Number';

        //console.log(this.props)
        return (
        <div className='lots-item-container'>
            <div className='lots-item-info'>
                <span className='addLotNumber'>{this.props.position}</span>
                {productName + ' • ' +
                casNumber + ' • ' +
                lotNumber}
            </div>
            <div className="vm">
            <div className='lots-item-docs'>
                <UploadLot/>
            </div>
            </div>
            <div className="vl"></div>
            <div className='lots-item-button-text'>
                REMOVE
                <button onClick={()=>{this.props.removeLots()}} className="lots-item-button"></button>
            </div>
        </div>
        )
    }
}

export default AddedLot;