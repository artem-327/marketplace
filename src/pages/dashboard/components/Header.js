import React from 'react';
import {Link} from 'react-router-dom'

import {scrollToComponent} from '../../../utils/scroll'
// import NavMenu from './NavMenuItem'

import menuIcon from '../../../images/menu_icon.png';

const imgStyle = {
    width: '50px',
    height: '50px',
    float: 'left',
};

const dashboardItem = <Link to="/" name="Dashboard">Dashboard</Link>;
    {/*<div id='dashboardNav'>*/}
    {/*<img src={menuIcon} alt="Logo" className="headerLogo" />*/}
    {/*<span>Dashboard</span>*/}
{/*</div>*/}

const inventoryItem = <Link to="/" name="Inventory">Inventory</Link>;
    {/*<div id='inventoryNav'>*/}
    {/*<img src={menuIcon} alt="Logo" className="headerLogo" />*/}
    {/*<span>Inventory</span>*/}
{/*</div>;*/}
const ordersItem =  <Link to="/" name="Orders">Orders</Link>;
    {/*<div  id='ordersNav'>*/}
    {/*<img src={menuIcon} alt="Logo" className="headerLogo" />*/}
    {/*<span>Orders</span>*/}
{/*</div>;*/}
const clientsItem = <Link to="/" name="Clients">Clients</Link>;
    {/*<div  id='clientsNav'>*/}
    {/*<img src={menuIcon} alt="Logo" className="headerLogo" />*/}
    {/*<span>Clients</span>*/}
{/*</div>;*/}
const reportsItem = <Link to="/" name="Reports">Reports</Link>;
    {/*<div  id='reportsNav'>*/}
    {/*<img src={menuIcon} alt="Logo" className="headerLogo" />*/}
    {/*<span>Reports</span>*/}
{/*</div>;*/}
const settingsItem =  <Link to="/" name="Settings">Settings</Link>;
    {/*<div  id='settingsNav'>*/}
    {/*<img src={menuIcon} alt="Logo" className="headerLogo" />*/}
    {/*<span>Settings</span>*/}
{/*</div>;*/}

const menuItems = [
    {dashboardItem},
    {inventoryItem},
    {ordersItem},
    {clientsItem},
    {reportsItem},
    {settingsItem},
];

const listItems = menuItems.map((item) =>
    <li className="list-inline-item">{item}</li>
);

const Header = (props) => {
    return <header>

    </header>;
};


export default Header;