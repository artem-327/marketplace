import React, {Component} from 'react';
import './SavedFilters.css';
import TooltipFilter from "./TooltipFilter";

class SaveFilterItem extends Component {

    state={showTooltip: false};

    render() {
        return (
            <li onMouseEnter={() => this.setState({showTooltip: true})} onMouseLeave={() => this.setState({showTooltip: false})}>
                <div className="filter-name"><TooltipFilter name={this.props.filterName} isVisible={this.state.showTooltip} content={this.props.toolTipContent}/></div>
                <div className="filter-delete">DELETE<span className="close-external"><i className="close"/></span>
                </div>
            </li>
        )
    }
}

export default SaveFilterItem