import React, {Component} from 'react';
import './BroadcastTargets.css';

class BroadcastTargets extends Component {
    render() {
        if(!this.props.targetGroups) return null;
        console.log(this.props.targetGroups)
        return (
            <div>
                {this.props.targetGroups.map((group, index) => (
                    <div key={index}>
                        {group.name}
                        {group.targets.map((target, index2) => (
                            <div key={index2 + target.name}>{target.name}</div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}
export default BroadcastTargets;