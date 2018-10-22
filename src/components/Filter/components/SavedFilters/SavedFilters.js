import React,{Component} from 'react';
import './SavedFilters.css';
import SaveFilterItem from "./SaveFilterItem";

class SavedFilters extends Component {

renderSaveItems(saved){
    return saved.map((item) => {
        const {filterName, id} = item;
        delete item.filterName;
        delete item.id;
        let final = []
        for(let key in item){
            final.push({name:key, value: item[key]})
        }
        return <SaveFilterItem filterName={filterName} key={id} toolTipContent={final}/>
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