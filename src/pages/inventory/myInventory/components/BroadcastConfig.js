import React, {Component} from 'react';
import './BroadcastTargets.css';
import Radio from "../../../../components/Radio/Radio";

class BroadcastConfig extends Component {

    changeRadio(value){
        this.props.changeBrConfig(this.props.id, value)
    }

    render() {
        let brOpns = this.props.item ? [{value:'include', label:'Include'}, {value:'exclude', label:'Exclude'}] :
            [{value:'include', label:'Include'}, {value:'exclude', label:'Exclude'}, {value:'custom', label:'Custom'}];
        return (
            <div className='br-config'>
                <div className='br-config-divider'>
                    <span className='br-config-header'>Broadcast</span>
                    <Radio onChange={(value)=>this.changeRadio(value)}
                           name={this.props.name + 'status'}
                           className='br-config-radio'
                           opns={brOpns}
                           checked={this.props.value}/>
                </div>
                <div className='br-config-divider price'>
                    <span className='br-config-header'>Mark Up/Down</span>
                    <input />
                    <Radio onChange={(value)=>this.changeRadio('mark', value)}
                           name={this.props.name + 'mark'}
                           className='small br-config-radio'
                           opns={[{value:'priceMultiplication', label:'%'}, {value:'priceAddition', label:'$'}]}
                           />
                </div>
            </div>
        );
    }
}
export default BroadcastConfig;