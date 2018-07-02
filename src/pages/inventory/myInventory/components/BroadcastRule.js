import React, {Component} from 'react';
import './BroadcastRule.css';
import BroadcastTargets from "./BroadcastTargets";
import Dropdown from "../../../../components/Dropdown/Dropdown";

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
                    </div>
                    <div>
                        <span className="left">
                            <Dropdown opns={this.props.selections}
                                      onCustomChange={(type) => this.props.setFilter(type)}
                                      placeholder='Select filter'
                                      currentValue={this.props.currentSelected} />
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