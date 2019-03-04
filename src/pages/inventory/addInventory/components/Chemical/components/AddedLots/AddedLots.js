import React,{Component} from 'react';
import './AddedLots.css';
import AddedLot from './AddedLot';
import {FormattedMessage} from 'react-intl';

class AddedLots extends Component {

    removeLots(index){
        this.props.removeLot(index)
    }

    renderLots(){

            const props = {
                productOffer: this.props.productOffer,
                edit: this.props.edit,
                productOffering: this.props.productOffering,
                removeAttachment: this.props.removeAttachment,
                removeAttachmentLink: this.props.removeAttachmentLink
            }

            return this.props.lots.map((value,index)=>{
                return (
                <AddedLot
                    position={index + 1}
                    lot={value}
                    removeLots={()=>this.removeLots(index)}
                    key={index}
                    {...props}
                />);
            });
    }

    render(){
        //console.log(this.props.lots)
        return (
        <div className='lots-container'>
                <div className='lots-header'>
                    <h3>
                        <FormattedMessage
                            id='addInventory.addedLots'
                            defaultMessage='ADDED LOTS'
                        />
                    </h3>
                </div>
                {this.renderLots()}
        </div>
        )
    }
}

export default AddedLots;