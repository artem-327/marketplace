import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import { Motion, spring } from "react-motion"
import { Translate } from 'react-localize-redux';
import './nav.css'

import logo from '../../images/nav/Logo.png';
import dashboard from '../../images/nav/dashboard.png';
import orders from '../../images/nav/orders.png';
import settings from '../../images/nav/settings.png';
import clients from '../../images/nav/clients.png';
import inventory from '../../images/nav/inventory.png';
import reports from '../../images/nav/reports.png';
import support from '../../images/nav/support.png';
import userIcon from '../../images/nav/user.png';
import arrowIcon from '../../images/nav/Arrow.png';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.toggleMenu = this.toggleMenu.bind(this);
        this.state = {
            isScreenBig: true,
            menuOpen: false,
            navMenuActive : "dashboard"
        }
    }

    handleResize() {
        if(window.innerWidth < 1025) {
            this.setState({isScreenBig: false})
        } else {
            this.setState({isScreenBig: true});
        }
    }

    changeNavState(actualNavMenu){
        this.setState({
            navMenuActive: actualNavMenu
        });
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

    mobileNavStyleInit(){
        return {
            width: spring(-80,{ stiffness: 400, damping: 20 })
        }
    }

    mobileNavStyleFinal() {
        return {
            width: spring(-320, {stiffness: 400, damping: 20})
        }
    }

    render() {
        const { isScreenBig, menuOpen } = this.state;
        const hamStyle = menuOpen ? "hamburger hamburger-toggled" : "hamburger";
        const mobileStyle = menuOpen ? this.mobileNavStyleInit() : this.mobileNavStyleFinal();
        const questLinks = <div>
            <Link to="/" name="menu-item ScrollInfo" className={ this.state.navMenuActive === "dashboard" ? 'active': '' } onClick={() => {this.changeNavState("dashboard")}} > <div className="header-menu-item"> <img src={dashboard} alt="Logo" /></div>
                <span>
                    <Translate id="topMenu.dashboard" ></Translate>
                </span>
            </Link>
            <Link to="/inventory" name="menu-item ScrollInfo" className={ this.state.navMenuActive === "inventory" ? 'active': '' } onClick={() => {this.changeNavState("inventory")}}> <div className="header-menu-item"> <img src={inventory} alt="Logo" /></div>
                <span><Translate id="topMenu.inventory" ></Translate></span>
            </Link>
            <Link to="/orders" name="menu-item ScrollInfo" className={ this.state.navMenuActive === "orders" ? 'active': '' } onClick={() => {this.changeNavState("orders")}}> <div className="header-menu-item"> <img src={orders} alt="Logo" /></div>
                <span> <Translate id="topMenu.orders" ></Translate>
                </span>
            </Link>
            <Link to="/clients" name="menu-item ScrollInfo" className={ this.state.navMenuActive === "clients" ? 'active': '' } onClick={() => {this.changeNavState("clients")}}> <div className="header-menu-item"> <img src={clients} alt="Logo" /></div>
                <span> <Translate id="topMenu.clients" ></Translate></span>
            </Link>
            <Link to="/reports" name="menu-item ScrollInfo" className={ this.state.navMenuActive === "reports" ? 'active': '' } onClick={() => {this.changeNavState("reports")}}> <div className="header-menu-item" > <img src={reports} alt="Logo" /></div>
                <span> <Translate id="topMenu.reports" ></Translate></span>
            </Link>
            <Link to="/settings" name="menu-item ScrollInfo" className={ this.state.navMenuActive === "settings" ? 'active': '' } onClick={() => {this.changeNavState("settings")}}> <div className="header-menu-item"> <img src={settings} alt="Logo" /></div>
                <span> <Translate id="topMenu.settings" ></Translate></span>
            </Link>
        </div>;

        const supportLink = <div>
            <Link to="/support" name="menu-item ScrollInfo" className={ this.state.navMenuActive === "support" ? 'active': '' } onClick={() => {this.changeNavState("support")}} > <div className="header-menu-item"> <img src={support} alt="Logo" /></div>
                <span> <Translate id="topMenu.support" ></Translate></span>
            </Link>
        </div>;

        const profileLink = <div>
            <Link to="/myInventory" name="ScrollInfo" className={ this.state.navMenuActive === "inventory" ? 'active': '' }  onClick={() => {this.changeNavState("inventory")}}> <div className="nav-menu-profile"> <img src={userIcon} alt="Logo" /></div><span> John Dee <img src={arrowIcon} className="nav-profile-arrow" alt="Logo" /></span></Link>
        </div>;

        let guestNav = isScreenBig ?
            <div className="nav-inside guest">
                <div className="nav-wr">
                    <div className="nav-image">
                        <Link to="/" onClick={() => {this.changeNavState("dashboard")}}><img alt="Logo" src={logo}/></Link>
                    </div>
                    <div className="nav-options">{questLinks}</div>
                    <div className="nav-search">
                        <input placeholder="Search ..." className="nav-search-input" />
                    </div>
                    <div className="nav-options ">
                        {supportLink}
                    </div>
                    <div className="nav-profile">
                        {profileLink}
                    </div>
                </div>
            </div>
            :
            <div className="nav-inside guest">
                <div className="nav-wr">
                    <div className="nav-image">
                        <Link to="/"><img src={logo} alt="Prodex"/></Link>
                    </div>
                    <span className="ham-position"> <button className={hamStyle} onClick={this.toggleMenu}><span> </span></button></span>
                </div>
                <Motion style={mobileStyle}>
                    {({width}) => <div className="nav-option-mobile" style={{right: `${width}px`}}>{questLinks}</div>}
                </Motion>
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