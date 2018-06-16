import React, {Component} from 'react';
import {NavLink} from 'react-router-dom'
// import { Translate } from 'react-localize-redux';
import './nav.css'

import logo from '../../images/nav/Logo.png';
import dashboard from '../../images/nav/dashboard.png';
import orders from '../../images/nav/orders.png';
import settings from '../../images/nav/settings.png';
import clients from '../../images/nav/clients.png';
import inventory from '../../images/nav/inventory.png';
import reports from '../../images/nav/reports.png';
// import support from '../../images/nav/support.png';
// import userIcon from '../../images/nav/user.png';
// import arrowIcon from '../../images/nav/Arrow.png';
// import NavDropdown from './components/NavDropdown';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            isScreenBig: true,
            menuOpen: false,
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
                    <span onClick={() => this.props.logout()}>
                        <NavLink to="/login" className='nav-link' activeClassName='active'>
                            <span className='link-center'>
                                <i className="fas fa-sign-out-alt"/>
                                Logout
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