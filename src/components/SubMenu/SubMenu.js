import React, {Component} from 'react';
// import { Translate } from 'react-localize-redux';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import './submenu.css';
import {Control, Form} from 'react-redux-form';

import searchIcon from '../../images/subMenu/search-icon-transparent.png';
import filterIcon from '../../images/subMenu/filter-icon-transparent.png';

class SubMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchOpen: false,
            filterOpen: false,
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            filterOpen: nextProps.filterOpen
        })
    }

    renderLinks(){
        if(!this.props.links) return;
        let links = this.props.links.map((link, index) => {
            return link.exact ?
                <NavLink exact key={index} to={link.url} className={link.class || 'submenu-link'} activeClassName='active'>
                    {link.label}
                </NavLink> :
                <NavLink key={index} to={link.url} className={link.class || 'submenu-link'} activeClassName='active'>
                    {link.label}
                </NavLink> ;
        });
        return <div className='submenu-links'>{links}</div>;
    };

    renderSearch(){
        if(!this.props.search) return;
        let searchInput = this.state.searchOpen ?
        <Form model="forms.searchForm" onSubmit={(val) => this.handleSubmit(val)}>
            <Control.text model="forms.searchForm.fulltext"/>
        </Form>
        : null;
        return (
        <div className='submenu-search'>
            {searchInput}
            <div className='search-icon' onClick={()=>{this.setState({searchOpen: !this.state.searchOpen})}}>
                <img src={searchIcon} alt='open search' />
            </div>
        </div>
        )
    }

    renderFilterButton(){
        if(!this.props.filter) return;
        return (
            <div className='submenu-filter' onClick={()=>{this.props.toggleFilter()}}>
                <img src={filterIcon} alt='open filter' />
                <span>Filter</span>
            </div>
        )
    }

    render() {
        return (
            <div className="submenu">
                {this.renderLinks()}
                {this.renderFilterButton()}
                {this.renderSearch()}
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
    filter: PropTypes.bool,
};




export default SubMenu;