import React,{Component} from 'react';
import './SavedFilters.css';
import PropTypes from "prop-types";
import classnames from 'classnames';
import Tooltip from "../../../Tooltip/Tooltip";
import TooltipFilter from "./TooltipFilter";

class SavedFilters extends Component {


render () {
    let tooltipContent = "test";
        return (
            <React.Fragment>
            <table className="saved-filters">
                <tr><td id="filter" className="filter-name"><TooltipFilter name="SAVED FILTER 1" content={tooltipContent}/></td><td id="filter2" className="filter-delete">DELETE<span className="close-external"><i className="close" /></span></td></tr>
                <tr><td id="filter" className="filter-name"><TooltipFilter name="SAVED FILTER 2"/></td><td id="filter2" className="filter-delete">DELETE<span className="close-external"><i className="close" /></span></td></tr>
                <tr><td id="filter" className="filter-name"><TooltipFilter name="SAVED FILTER 3"/></td><td id="filter2" className="filter-delete">DELETE<span className="close-external"><i className="close" /></span></td></tr>
                <tr><td id="filter" className="filter-name"><TooltipFilter name="SAVED FILTER 4"/></td><td id="filter2" className="filter-delete">DELETE<span className="close-external"><i className="close" /></span></td></tr>
            </table>
            </React.Fragment>
        )
    }
}

    SavedFilters.propTypes = {
        content: PropTypes.string,
        className: PropTypes.string,
    };

export default SavedFilters