import React,{Component} from 'react';
import './SavedFilters.css';
import TooltipFilter from "./TooltipFilter";

class SavedFilters extends Component {

render () {
    let content = [{name: 'Chemical Name', value: 'Isopropyl Alcohol'}, {name: 'Chemical Name', value: 'Isopropyl Alcohol'}, {name: 'Chemical Name', value: 'Isopropyl Alcohol'}]
        return (
            <ul className="saved-filters">
                <li><div className="filter-name"><TooltipFilter name="SAVED FILTER 1" content={content}/></div><div className="filter-delete">DELETE<span className="close-external"><i className="close" /></span></div></li>
                <li><div className="filter-name"><TooltipFilter name="SAVED FILTER 1" content={content}/></div><div className="filter-delete">DELETE<span className="close-external"><i className="close" /></span></div></li>
                <li><div className="filter-name"><TooltipFilter name="SAVED FILTER 1" content={content}/></div><div className="filter-delete">DELETE<span className="close-external"><i className="close" /></span></div></li>
            </ul>
        )
    }
}


export default SavedFilters