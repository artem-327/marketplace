import React,{Component} from 'react';
import "./keepshopping.scss";

class KeepShopping extends Component {

    render(){
        return (
            <div className="message">
                <div className="shopping-header">
                    <div className="shopping-header-text">KEEP SHOPPING</div>
                    <div className="fas fa-times close-mark" onClick={()=>this.props.removePopup()}> </div>
                </div>
                <div className="line-break"></div>
                <div className="shopping-message">
                    <p>You can only add items from the same merchant</p>
                    <p>and the same location to a single purchase order.</p>
                    <p className="continue-advice">Would you like to continue?</p>
                    <div className='button-group'>
                        <button className='button grey'>Cancel</button>
                        <button className='button green'>Yes</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default KeepShopping;