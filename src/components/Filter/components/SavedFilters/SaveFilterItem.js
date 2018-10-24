import React, {Component} from 'react';
import './SavedFilters.css';
import TooltipFilter from "./TooltipFilter";

class SaveFilterItem extends Component {

    state={showTooltip: false};

    formatNameToStore(name){
        switch(name) {
            case 'chemicalName' : return 'search';
            case 'quantityFrom' : return 'qntylb';
            case 'quantityTo' : return 'qntyub';
            case 'priceFrom' : return 'prclb';
            case 'priceTo' : return 'prcub';
            case 'distanceLimit' : return 'Distance limit';
            case 'containers' : return 'pckgs';
            case 'grades' : return 'grade';
            case 'forms' : return 'form';
            case 'conditions' : return 'condition';
            case 'origin' : return 'origin';
            case 'manufacturer' : return 'manufacturer';
            case 'zip' : return 'zip';
            default : return name;
        }
    }

    fillFilter(){
        let inputs = this.props.toolTipContent.reduce((ac, item) => (
            { ...ac, [this.formatNameToStore(item.name)] : Array.isArray(item.value) ? item.value.reduce((acc, cur) => ({ ...acc, [cur.id]: true }), {})
                    : typeof item.value === 'object' ? item.value.id : item.value}
        ), {});
        this.props.fillFilter(inputs);
        this.props.filterFunc(inputs);
    }

    render() {
        return (
            <li onMouseEnter={() => this.setState({showTooltip: true})} onMouseLeave={() => this.setState({showTooltip: false})}>
                <div onClick={() => this.fillFilter()} className="filter-name"><TooltipFilter name={this.props.filterName} isVisible={this.state.showTooltip} content={this.props.toolTipContent}/></div>
                <div className="filter-delete">DELETE<span className="close-external"><i className="close"/></span>
                </div>
            </li>
        )
    }
}

export default SaveFilterItem