import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './submenu.css';
import filterIconClose from '../../images/subMenu/filter-icon-transparent.png';
import filterIconOpen from '../../images/subMenu/filter-icon-transparent-active.png';
import classNames from 'classnames';


class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchOpen: false,
            filterOpen: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({filterOpen:nextProps.filterOpen})
    }

    renderFilterButton() {
        let filterIcon = this.props.filterOpen ? filterIconOpen : filterIconClose;
        let filterClass = this.props.filterOpen ? 'opened' : 'closed';
        return (
            <div className={classNames('submenu-filter', filterClass)} onClick={() => this.props.toggleFilter()}>
                <img src={filterIcon} alt='open filter'/>Filters
            </div>
        )
    }

    render() {
        return (
            <div className="submenu">
                {this.renderFilterButton()}
            </div>
        );
    }
}

SubMenu.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            url: PropTypes.string,
            class: PropTypes.string,
            exact: PropTypes.bool,
        })
    ),
    search: PropTypes.bool,
    filter: PropTypes.bool
};


export default SubMenu;