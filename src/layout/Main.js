import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from '../pages/dashboard'
import Inventory from "../pages/inventory/Inventory";
import Orders from "../pages/orders/Orders";
import Clients from "../pages/clients/Clients"
import Reports from "../pages/reports/Reports"
import Settings from "../pages/settings/Settings"
import Support from "../pages/support/Support"
import MyInventory from "../pages/myInventory/MyInventory";


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
                </Switch>
            </div>
        );
    }
}

export default Main