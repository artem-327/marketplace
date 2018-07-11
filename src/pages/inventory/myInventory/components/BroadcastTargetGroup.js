import React, {Component} from 'react';
import BroadcastConfig from './BroadcastConfig'

class BroadcastTargetGroup extends Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
        }
    }

    renderItems(){
        return this.props.items.map((item, index) => (
            <div key={index} className='br-item-header'>
                <div className='left-group'>
                    {item.name}
                </div>
                <BroadcastConfig item/>
                <div className='clearfix' > </div>
            </div>))
    }

    render() {
        return (
            <div>
               <div className='br-group-header' onClick={()=>this.setState({isOpen: !this.state.isOpen})}>
                   <div className='left-group'>
                       {this.state.isOpen ? <i className="icon fas fa-angle-up"/> : <i className="icon fas fa-angle-down"/>}
                       {this.props.name}
                       {!this.state.isOpen ?<span className='no-targets'>undefined / {this.props.items.length} Companies</span> : null}
                   </div>
                   <BroadcastConfig/>
                   <div className='clearfix' > </div>
               </div>
                {this.state.isOpen ? this.renderItems() : null}
            </div>
        );
    }
}
export default BroadcastTargetGroup;