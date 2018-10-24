import React,{Component} from 'react';
import './SavedFilters.css';
import SaveFilterItem from "./SaveFilterItem";

class SavedFilters extends Component {

renderSaveItems(saved){
    console.log(saved);
    return saved.map((item, index) => {
        const {filterName} = item;
        let final = [];
        for(let key in item){
            if(item[key] === 'filterName') continue;
            final.push({name:key, value: item[key]})
        }
        return <SaveFilterItem fillFilter={this.props.fillFilter} filterFunc={this.props.filterFunc} filterName={filterName} key={index} toolTipContent={final}/>
    })
}

render () {
        return (
            <ul className="saved-filters">
                {this.renderSaveItems(this.props.saveFilters)}
            </ul>
        )
    }
}


export default SavedFilters