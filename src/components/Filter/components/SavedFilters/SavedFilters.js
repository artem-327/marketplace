import React,{Component} from 'react';
import './SavedFilters.css';
import PropTypes from "prop-types";
import classnames from 'classnames';
import Tooltip from "../../../Tooltip/Tooltip";

class SavedFilters extends Component {

render () {
        return (
            <React.Fragment>
            <table className="saved-filters">
                <tr><td id="filter" className="filter-name">SAVED FILTER 1</td><td id="filter2" className="filter-delete">DELETE<span className="close-external"><i className="close" /></span></td></tr>
                <tr><td id="filter" className="filter-name">SAVED FILTER 2</td><td id="filter2" className="filter-delete">DELETE<span className="close-external"><i className="close" /></span></td></tr>
                <tr><td id="filter" className="filter-name">SAVED FILTER 3</td><td id="filter2" className="filter-delete">DELETE<span className="close-external"><i className="close" /></span></td></tr>
                <tr><td id="filter" className="filter-name">SAVED FILTER 4</td><td id="filter2" className="filter-delete">DELETE<span className="close-external"><i className="close" /></span></td></tr>
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