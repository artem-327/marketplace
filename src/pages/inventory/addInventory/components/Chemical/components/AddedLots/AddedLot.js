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
        console.log(this.props)
        //console.log(this.props.productOfferingForm.tradeName)

        let productName;
        let casNumber;
        let lotNumber;

        if(!this.props.edit) {
            productName = this.props.lot.productName !== '' ? this.props.lot.productName : 'No Product Name';
            casNumber = this.props.lot.casNumber !== '' ? this.props.lot.casNumber : 'No CAS Number';
            lotNumber = this.props.lot.lotNumber !== '' ? this.props.lot.lotNumber : 'No Lot Number';
        } else if (this.props.edit) {
            productName = this.props.productOffer.productName !== '' ? this.props.productOffer.productName : 'No Product Name';
            casNumber = typeof this.props.productOffer.product !== 'undefined' && this.props.productOffer.product.casNumber !== '' ? this.props.productOffer.product.casNumber : 'No CAS Number';
            lotNumber = this.props.lot.lotNumber !== '' ? this.props.lot.lotNumber : 'No Lot Number';
        }
        
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
                <span onClick={()=>{this.props.removeLots()}} className="lots-item-button"></span>
            </div>
        </div>
        )
    }
}

export default AddedLot;