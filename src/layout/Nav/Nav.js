import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
import './nav.css'

import logo from '../../images/nav/Logo.png';
import dashboard from '../../images/nav/dashboard.png';
import orders from '../../images/nav/orders.png';
import settings from '../../images/nav/settings.png';
import clients from '../../images/nav/clients.png';
import inventory from '../../images/nav/inventory.png';
import reports from '../../images/nav/reports.png';
import myAccount from '../../images/nav/myAccount.svg';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            isScreenBig: true,
            menuOpen: false,
            dropdown: {
                administration: false
            }
        }
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

    renderDropdown(id, links, name, img = null){
        const activeClass = this.props.location.pathname.split('/')[1] === 'administration' ? 'active' : null;
        const dropdown = <div className="dropdown-nav-inside">
            {links.map((link, index) => {
            return <NavLink key={index} to={link.url} className='dropdown-nav-item' activeClassName='active'>
                {link.name}
            </NavLink>
            })}</div>;
        return <div className={"dropdown-nav " + activeClass} onClick={()=>this.setState({dropdown: {[id]: !this.state.dropdown[id]}})}>
            <span className='link-center'>
                {img ? <img src={img}  alt={"Dropdown " + name}/> : null}
                {name}
            </span>
            {this.state.dropdown[id] ? dropdown : null}
        </div>
    }

    render() {
        const { isScreenBig } = this.state;
        // const mobileState = menuOpen ? 'open' : '';
        let guestNav = isScreenBig ?
            <div className="nav-inside guest">
                <div className="logo">
                    <NavLink to="/" >
                        <img src={logo} alt='ECHO' />
                    </NavLink>
                </div>
                <div className='links'>
                    <NavLink exact to="/" className='nav-link' activeClassName='active'>
                        <span className='link-center'>
                            <img src={dashboard}  alt='Navigate to Dashboard'/>
                            DASHBOARD
                        </span>
                    </NavLink>
                    <NavLink to="/inventory/all-inventory" className='nav-link' activeClassName='active'>
                        <span className='link-center'>
                            <img src={inventory}  alt='Navigate to Inventory'/>
                            INVENTORY
                        </span>
                    </NavLink>
                    <NavLink to="/orders" className='nav-link' activeClassName='active'>
                        <span className='link-center'>
                            <img src={orders}  alt='Navigate to Orders'/>
                            ORDERS
                        </span>
                    </NavLink>
                    <NavLink to="/clients" className='nav-link' activeClassName='active'>
                        <span className='link-center'>
                            <img src={clients}  alt='Navigate to Clients'/>
                            CLIENTS
                        </span>
                    </NavLink>
                    <NavLink to="/reports" className='nav-link' activeClassName='active'>
                        <span className='link-center'>
                            <img src={reports}  alt='Navigate to Reports'/>
                            REPORTS
                        </span>
                    </NavLink>
                    <NavLink to="/settings" className='nav-link' activeClassName='active'>
                        <span className='link-center'>
                            <img src={settings}  alt='Navigate to Settings'/>
                            SETTINGS
                        </span>
                    </NavLink>
                    {/* Temporary hide */}
                    {/* {this.renderDropdown('administration', [
                        {name: 'Companies', url: '/administration/companies/'},
                        {name: 'Names', url: '/administration/names-synonyms'},
                        {name: 'Merchants', url: '/administration/merchants'},
                        {name: 'New users', url: '/administration/users'},
                        {name: 'Operators', url: '/administration/operators'},
                        ], 'ADMIN', admin)} */}
                    <span className="logout" onClick={() => this.props.logout()}>
                        <NavLink to="/login" className='nav-link' activeClassName='active'>
                            <span className='link-center'>
                                <img src={myAccount} alt='My account'/>
                                LOGOUT
                            </span>
                        </NavLink>
                    </span>
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