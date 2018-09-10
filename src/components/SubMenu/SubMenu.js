import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import './submenu.css';
import filterIconClose from '../../images/subMenu/filter-icon-transparent.png';
import filterIconOpen from '../../images/subMenu/old/filter-icon-transparent.png';


class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchOpen: false,
            filterOpen: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({filterOpen:nextProps.filterOpen});
    }

    renderLinks() {
        if (!this.props.links) return;
        let links = this.props.links.map((link, index) => {
            return <NavLink exact={link.exact} key={index} to={link.url} className={link.class || 'submenu-link'} activeClassName='active'>
                {link.label}
            </NavLink>
        });
        return <div className='submenu-links'>{links}</div>;
    };

    renderFilterButton() {
        if (!this.props.filter) return;
        let filterIcon = this.props.filterOpen ? filterIconOpen : filterIconClose;
        return (
            <div className='submenu-filter' onClick={() => this.props.toggleFilter()}>
                <img src={filterIcon} alt='open filter'/>
                <span>Filters</span>
                <span className="arrow-down" />
            </div>
        )
    }

    render() {
        return (
            <div className="submenu">
                {this.renderLinks()}
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