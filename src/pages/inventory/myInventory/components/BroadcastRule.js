import React, {Component} from 'react';
import './BroadcastRule.css';
import BroadcastTargets from "./BroadcastTargets";

class BroadcastRule extends Component {
    render() {
        return (
            <div className="broadcast-rule">
                <div>
                    <div>
                        <span className="left">
                            <div>CUSTOM BROADCAST</div>
                            <div>Broadcasting to: x/x</div>
                        </span>
                        <span className="right">
                            <input type="text"/>
                        </span>
                    </div>
                    <div>
                        <span className="left">
                            <select>
                                {this.props.selections.map((selection, index) => (
                                    <option key={index} selected={selection.active}  onClick={selection.callback()}>{selection.name}</option>
                                ))}
                            </select>
                        </span>
                        <span className="right">
                            <select>
                                <option value="">Select template</option>
                            </select>
                        </span>
                    </div>
                </div>
                <div>
                    <BroadcastTargets targetGroups={this.props.targetGroups} />
                </div>
            </div>
        );
    }
}
export default BroadcastRule;