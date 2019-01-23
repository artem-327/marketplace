import React,{Component} from 'react';
import './SavedFilters.css';
import SaveFilterItem from "./SaveFilterItem";

class SavedFilters extends Component {

componentDidMount(){
    this.props.fetchSavedFilters();
}

renderSaveItems(saved){
    return saved.map((item, index) => {
        const {filterName} = item;
        let final = [];
        for(let key in item){
            if(key === 'filterName' || key === 'id' || !item[key]) continue;
            final.push({name:key, value: item[key]})
        }
        console.log(final)
        return (
            <SaveFilterItem
                id={item.id}
                deleteSaveFilter={this.props.deleteSaveFilter}
                fillFilter={this.props.fillFilter}
                filterFunc={this.props.filterFunc}
                filterName={filterName}
                key={index}
                toolTipContent={final}/>
        );
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