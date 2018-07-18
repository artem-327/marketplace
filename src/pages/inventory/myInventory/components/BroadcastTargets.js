import React, {Component} from 'react';
import BroadcastTargetGroup from './BroadcastTargetGroup';
import './BroadcastTargets.css';

class BroadcastTargets extends Component {
    render() {
        if(!this.props.targetGroups) return null;
        return (
            <div>
                {this.props.targetGroups.map((group, index) => (
                    <BroadcastTargetGroup filter={this.props.filter} key={index} name={group.name} items={group.targets}/>
                ))}
            </div>
        );
    }
}
export default BroadcastTargets;