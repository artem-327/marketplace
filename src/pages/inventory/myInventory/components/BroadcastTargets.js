import React, {Component} from 'react';
import BroadcastTargetGroup from './BroadcastTargetGroup';
import './BroadcastTargets.scss';

class BroadcastTargets extends Component {

    constructor(props){
        super(props);
        this.state = {}
    }

    addToTargets(id, targets){
        this.setState({[id]: targets},()=>{
            console.log("BRCTargets", id, targets);
            this.props.getData(this.state);
        })
    }


    render() {
        
        if(!this.props.targetGroups) return null;
        return (
            <div className='broadcast-rule-targets'>
                {this.props.targetGroups.map((group, index) => (
                    <BroadcastTargetGroup updateTargets={(id, targets)=>this.addToTargets(id, targets)}
                                          index={index}
                                          id={group.id}
                                          type={group.type}
                                          key={index}
                                          name={group.name}
                                          items={group.targets}/>
                ))}
            </div>
        );
    }
}
export default BroadcastTargets;