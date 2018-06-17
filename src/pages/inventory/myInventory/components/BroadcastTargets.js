import React, {Component} from 'react';
import './BroadcastTargets.css';

class BroadcastTargets extends Component {
    render() {
        return (
            <div>
                {this.props.targetGroups.map((group, index) => (
                    <div key={index}>
                        {group.name}

                        {group.targets.map(target => (
                            <div>{target.name}</div>
                        ))}
                    </div>
                ))}
            </div>
        );
    }
}
export default BroadcastTargets;