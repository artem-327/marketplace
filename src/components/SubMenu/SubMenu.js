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
            filterVisible: false
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
                <span>Filters</span>
                <span className="arrow-down"></span>
            </div>
        )
    }

    render() {
        console.log(this.props.filterVisible);
        return (
            <div className="submenu">
                {this.renderLinks()}
                {this.props.filterVisible ? this.renderFilterButton() : null}
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
    filterVisible: PropTypes.bool
};




export default SubMenu;



// constructor(props) {
//     super(props);
//     this.state = {
//         loginMenuVisible : false,
//         registerMenuVisible : false,
//         mainMenuVisible : false
//     };
//     console.log(this.state);
//     //this.triggerMenu = this.triggerMenu.bind(this);
// }
//
// render() {
//     return (
//         <div className="site__navigation">
//             <Menu />
//             <header className="site__header">
//
//                 <a href="/"><img src="img/logo-full-color.png" alt="meatFree" /></a>
//
//                 <ul className="header__navigation">
//                     <li className="header__navigation__item">
//                         <a href="/register"  onClick={this.toggleMenu.bind(this, 'register')}>Register</a>
//                         <ul className={this.state.registerMenuVisible ? "dropdown visible" : "dropdown"}>
//                             <li>
//                                 <LoginForm />
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="header__navigation__item">
//                         <a href="#" onClick={this.toggleMenu.bind(this, 'login')}>Login</a>
//                         <ul className={this.state.loginMenuVisible ? "dropdown visible" : "dropdown"}>
//                             <li>
//                                 <LoginForm />
//                             </li>
//                         </ul>
//                     </li>
//                     <li className="header__navigation__item">
//                         <a href="" className="nav__toggle">
//                             Menu
//                         </a>
//                     </li>
//                 </ul>
//
//             </header>
//         </div>
//     );
// }
//
// toggleMenu(type, e) {
//     e.preventDefault();
//     console.log(type);
//     switch(type) {
//         case 'login':
//             if(this.state.loginMenuVisible) {
//                 this.setState({loginMenuVisible : false});
//             } else {
//                 this.setState({
//                     registerMenuVisible : false,
//                     loginMenuVisible :  true
//                 });
//             }
//             break;
//
//         case 'register':
//             if(this.state.registerMenuVisible) {
//                 this.setState({registerMenu : false});
//             } else {
//                 this.setState({
//                     registerMenuVisible : true
//                 });
//             }
//             break;
//
//         case 'menu':
//             this.setState({mainMenuVisible : true });
//     }
// }
