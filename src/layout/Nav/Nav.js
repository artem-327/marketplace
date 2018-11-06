import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './nav.css'

import logo from '../../images/nav/Logo.png';
// import dashboard from '../../images/nav/dashboard.png';
// import orders from '../../images/nav/orders.png';
// import settings from '../../images/nav/settings.png';
// import clients from '../../images/nav/clients.png';
// import inventory from '../../images/nav/inventory.png';
// import reports from '../../images/nav/reports.png';
// import myAccount from '../../images/nav/myAccount.svg';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.state = {
            isScreenBig: true,
            menuOpen: false,
            dropdown: {
                administration: false,
                settings: false,
                reports: false,
                clients: false,
                orders: false,
                inventory: false,
                dashboard: false
            }
        }
    }

    handleClickOutside() {
        this.setState({dropdown: {
                administration: false,
                settings: false,
                reports: false,
                clients: false,
                orders: false,
                inventory: false,
                dashboard: false
            }}, () => document.removeEventListener('click', this.handleClickOutside, false))
    }

    handleResize() {
        if(window.innerWidth < 1025) {
            this.setState({isScreenBig: false})
        } else {
            this.setState({isScreenBig: true});
        }
    }

    componentWillMount() {
        this.handleResize();
    }

    componentDidMount(){
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    toggleMenu(e){
        e.stopPropagation();
        let { menuOpen } = this.state;
        this.setState({
            menuOpen: !menuOpen
        });
    }

    openDropdown(id){
        document.addEventListener('click', this.handleClickOutside, false);
        this.setState({dropdown: {[id]: !this.state.dropdown[id]}})
    }

    renderDropdown(id, links, name, img = null){
        const activeClass = this.props.location.pathname.split('/')[1] === id || this.state.dropdown[id] ? 'active' : null;
        const dropdown = <div className="dropdown-nav-inside">
            {links.map((link, index) => (<NavLink key={index} to={link.url} className='dropdown-nav-item' activeClassName='active'>{link.name}</NavLink>
            ))}</div>;
        return <div className={"dropdown-nav " + activeClass} onClick={()=>this.openDropdown(id)}>
            <span className='dropdown-link-center'>{img ? <img src={img}  alt={"Dropdown " + name}/> : null}{name}  <i className="icon fas fa-angle-down dropdown-nav-icon"/></span>
            {this.state.dropdown[id] ? dropdown : null}
        </div>
    }

    render() {
        const { isScreenBig } = this.state;
        // const mobileState = menuOpen ? 'open' : '';
        let guestNav = isScreenBig ?
            <div className="nav-inside guest">
                {/*<div className="logo">*/}
                    {/*<NavLink to="/" >*/}
                        {/*<img src={logo} alt='ECHO' />*/}
                    {/*</NavLink>*/}
                {/*</div>*/}
                <div className='links'>
                    {this.renderDropdown('dashboard', [
                        {name: 'Dashboard', url: '/'},
                    ], 'Dashboard')}
                    {this.renderDropdown('inventory', [
                        {name: 'All Inventory', url: '/inventory/all-inventory'},
                        {name: 'My Inventory', url: '/inventory/my-inventory'},
                        {name: 'Add Inventory', url: '/inventory/add-inventory'},
                    ], 'Inventory')}
                    {this.renderDropdown('orders', [
                        {name: 'Orders', url: '/orders'},
                    ], 'Orders')}
                    {this.renderDropdown('clients', [
                        {name: 'Clients', url: '/clients'},
                    ], 'Clients')}
                    {this.renderDropdown('reports', [
                        {name: 'Reports', url: '/reports'},
                    ], 'Reports')}
                    {this.renderDropdown('settings', [
                        {name: 'Settings', url: '/settings'},
                    ], 'Settings')}
                    {/* Temporary hide */}
                    {this.renderDropdown('administration', [
                        {name: 'Companies', url: '/administration/companies/'},
                        {name: 'Names', url: '/administration/names-synonyms'},
                        {name: 'Merchants', url: '/administration/merchants'},
                        {name: 'New users', url: '/administration/users'},
                        {name: 'Operators', url: '/administration/operators'},
                        ], 'Administration')}
                    {/*<span className="logout" onClick={() => this.props.logout()}>*/}
                        {/*<NavLink to="/login" className='nav-link' activeClassName='active'>*/}
                            {/*<span className='link-center'>*/}
                                {/*<img src={myAccount} alt='My account'/>*/}
                                {/*LOGOUT*/}
                            {/*</span>*/}
                        {/*</NavLink>*/}
                    {/*</span>*/}
                </div>
            </div>
            :
            <div className="nav-inside guest">
            </div>;

        return (
            <nav className="App-nav">
                {guestNav}
                <div className="clearfix"> </div>
            </nav>
        );
    }
}

export default Nav;