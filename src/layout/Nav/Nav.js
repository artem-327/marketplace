import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './nav.css'

//import logo from '../../images/nav/Logo.png';
import dashboard from '../../images/nav/dashboard.png';
import orders from '../../images/nav/orders.png';
import settings from '../../images/nav/settings.png';
import clients from '../../images/nav/clients.png';
import inventory from '../../images/nav/inventory.png';
import reports from '../../images/nav/reports.png';
import myAccount from '../../images/nav/myAccount.svg';
import {FormattedMessage} from 'react-intl';

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
        if(window.innerWidth < 800) {
            this.setState({isScreenBig: false})
        } else {
            this.setState({isScreenBig: true});
        }
    }

    componentWillMount() {
        this.handleResize();
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize.bind(this));
    }

    toggleMenu(e) {
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

    renderDropdown(id, links, name){
        const activeClass = this.props.location.pathname.split('/')[1] === id || this.state.dropdown[id] ? 'active' : null;
        const dropdown =
            <div
                className="dropdown-nav-inside">
            {links.map((link, index) => (
                    <NavLink
                        key={index}
                        to={link.url}
                        className='dropdown-nav-item'
                        activeClassName='active'>
                        <FormattedMessage
                            id={'nav.dropdown.' + link.name.split(' ').join('')}
                            defaultMessage={link.name}
                        />
                    </NavLink>
            ))}
            </div>;
        return (
            <div
                className={"dropdown-nav parent " + activeClass}
                onClick={()=>this.openDropdown(id)}>
                <span
                    className='dropdown-link-center'>
                    <FormattedMessage
                        id={'nav.' + name}
                        defaultMessage={name}
                    />
                    <i className="icon down dropdown-nav-icon"/>
                </span>
            {this.state.dropdown[id] ? dropdown : null}
            </div>
        );
    }

    renderMenuItem(id, link, name){
        const activeClass = this.props.location.pathname.split('/')[1] === id ? 'active' : null;
        return (
            <div
                className={"dropdown-nav " + activeClass}>
                <NavLink
                    to={id === 'dashboard' ? '/' : '/' + id}
                    activeClassName='active'>
                        <span className='dropdown-link-center'>
                            <FormattedMessage
                                id={'nav.' + name}
                                defaultMessage={name}
                            />
                        </span>
                </NavLink>
        </div>
        );
    }

    /*
    renderLogout() {
        return <div className="dropdown-nav">
            <span onClick={()=> this.props.logout()}>
                <NavLink to="/login"><img id='logout' src={myAccount} alt='Logout'></img></NavLink>
            </span>
        </div>
    }
    */

    renderMyAccount(id, links){
        const activeClass = this.props.location.pathname.split('/')[1] === id || this.state.dropdown[id] ? 'active' : null;
        const dropdown = <div className="dropdown-nav-inside-myaccount">
            {links.map((link, index) =>
            
            link.name === 'Logout' ?

            (<div
                key={index}
                to={link.url}
                className='dropdown-nav-item'
                onClick={this.props.logout}
                activeClassName='active'>
                    <FormattedMessage
                        id={'nav.' + link.name}
                        defaultMessage={link.name}
                    />
            </div>)
            
            : 

            (<NavLink key={index} to={link.url} className='dropdown-nav-item' activeClassName='active'>{link.name}</NavLink>)
            
            )}
            
            </div>;
        return <div className={"dropdown-nav " + activeClass} onClick={()=>this.openDropdown(id)}>
            <span className='dropdown-link-center'><img src={myAccount} alt='Logout'></img></span>
            {this.state.dropdown[id] ? dropdown : null}
        </div>
    }

    render() {
        const { isScreenBig } = this.state;

        let currentLogo;
        const path = this.props.location.pathname;

        if (path.includes('/inventory')) {
            currentLogo = inventory
        } else if (path.includes('/settings')) {
            currentLogo = settings
        } else if (path.includes('/orders')) {
            currentLogo = orders
        } else if (path.includes('/clients')) {
            currentLogo = clients
        } else if (path.includes('/reports')) {
            currentLogo = reports
        } else if (path.includes('/settings')) {
            currentLogo = settings
        } else if (path.includes('/administration')) {
            currentLogo = myAccount
        } else {
            currentLogo = dashboard
        }

        // const mobileState = menuOpen ? 'open' : '';
        let guestNav = isScreenBig ?
            <div className="nav-inside guest">
                <div className="logo">
                        <img src={currentLogo} alt='LOGO'/>
                </div>
                <div className='links'>
                    {this.renderMenuItem('dashboard', [
                        {name: 'Dashboard', url: '/'},
                    ], 'Dashboard')}
                    {this.renderDropdown('inventory', [
                        {name: 'My Inventory', url: '/inventory/my-inventory'},
                        {name: 'Marketplace', url: '/inventory/all-inventory'},
                        {name: 'Add Inventory', url: '/inventory/add-inventory'},
                        {name: 'Shopping Cart', url: '/cart/shopping-cart'}
                    ], 'Inventory')}
                    {this.renderDropdown('orders', [
                        {name: 'Sales Orders', url: '/orders/sales'},
                        {name: 'Purchase Orders', url: '/orders/purchase'}
                    ], 'Orders')}
                    {this.renderMenuItem('clients', [
                        {name: 'Clients', url: '/clients'},
                    ], 'Clients')}
                    {this.renderMenuItem('reports', [
                        {name: 'Reports', url: '/reports'},
                    ], 'Reports')}
                    {this.renderMenuItem('settings', [
                        {name: 'Settings', url: '/settings'},
                    ], 'Settings')}
                </div>
                <div className='logout'>
                    {this.renderMyAccount('myaccount', [
                        {name: 'Logout'},
                    ], 'My Account')}
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