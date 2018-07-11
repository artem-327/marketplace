import React, {Component} from 'react';
import BroadcastTargetGroup from './BroadcastTargetGroup';
import './BroadcastTargets.css';
import Radio from "../../../../components/Radio/Radio";

class BroadcastConfig extends Component {
    constructor(props){
        super(props);
        this.state = {
            status: 'include',
            mark: 'prcnt'
        }
    }

    changeRadio(name, value){
        this.setState({[name]: value})
    }

    render() {
        let brOpns = this.props.item ? [{value:'include', label:'Include'}, {value:'exclude', label:'Exclude'}] :
            [{value:'include', label:'Include'}, {value:'exclude', label:'Exclude'}, {value:'custom', label:'Custom'}];
        return (
            <div className='br-config'>
                <div className='br-config-divider'>
                    <span className='br-config-header'>Broadcast</span>
                    <Radio onChange={(value)=>this.changeRadio('status', value)}
                           name='status'
                           className='br-config-radio'
                           opns={brOpns}
                           checked={this.state.status}/>
                </div>
                <div className='br-config-divider price'>
                    <span className='br-config-header'>Mark Up/Down</span>
                    <input />
                    <Radio onChange={(value)=>this.changeRadio('mark', value)}
                           name='mark'
                           className='small br-config-radio'
                           opns={[{value:'prcnt', label:'%'}, {value:'dolar', label:'$'}]}
                           checked={this.state.mark}/>
                </div>
            </div>
        );
    }
}
export default BroadcastConfig;