import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from '../pages/dashboard'
import Inventory from "../pages/inventory/products";
import Orders from "../pages/orders/Orders";
import Clients from "../pages/clients/Clients"
import Reports from "../pages/reports/Reports"
import Settings from "../pages/settings/Settings"
import Support from "../pages/support/Support"
import MyInventory from "../pages/inventory/myInventory";
import AddInventory from "../pages/inventory/addInventory";


class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Dashboard}/>
                    <Route exact path="/inventory" component={Inventory}/>
                    <Route exact path="/orders" component={Orders}/>
                    <Route exact path="/clients" component={Clients}/>
                    <Route exact path="/reports" component={Reports}/>
                    <Route exact path="/settings" component={Settings}/>
                    <Route exact path="/support" component={Support}/>
                    <Route exact path="/myInventory" component={MyInventory}/>
                    <Route exact path="/addInventory" component={AddInventory}/>
                </Switch>
            </div>
        );
    }
}

export default Main