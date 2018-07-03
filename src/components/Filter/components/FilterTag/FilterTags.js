import React, {Component} from 'react';
import FilterTag from "./FilterTag";

class FilterTags extends Component {

    renderTags() {

        return this.props.filterTags.map((tag, index)=>{
            return <FilterTag key={index} name={tag.name} value={tag.value} close={()=>this.props.closeFilterTag(index)}/>
        })
    }

    render() {
        return this.renderTags();
    }
}

export default FilterTags;