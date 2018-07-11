import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from '../pages/dashboard'
import Inventory from "../pages/inventory/InventoryHOC";
import Orders from "../pages/orders/Orders";
import Clients from "../pages/clients/Clients";
import Reports from "../pages/reports/Reports";
import Settings from "../pages/settings/Settings";
import Support from "../pages/support/Support";
import AddInventory from "../pages/inventory/addInventory";
import AllInventory from "../pages/inventory/allInventory";
import MyInventory from "../pages/inventory/myIventory";
import TestPage from "../pages/test";
import { withAuth } from '../utils/auth';

class Main extends Component {
    render() {
        return (
            <div className="app-inner-main">
                <Switch>
                    <Route exact path="/" component={withAuth(Dashboard)}/>
                    <Route exact path="/inventory/my-inventory" component={withAuth(Inventory(MyInventory))}/>
                    <Route exact path="/inventory/all-inventory" component={withAuth(Inventory(AllInventory))}/>
                    <Route exact path="/inventory/add-inventory" component={withAuth(Inventory(AddInventory))}/>
                    <Route exact path="/orders" component={withAuth(Orders)}/>
                    <Route exact path="/clients" component={withAuth(Clients)}/>
                    <Route exact path="/reports" component={withAuth(Reports)}/>
                    <Route exact path="/settings" component={withAuth(Settings)}/>
                    <Route exact path="/support" component={withAuth(Support)}/>
                    <Route exact path="/test-page" component={TestPage}/>
                </Switch>
            </div>
        );
    }
}

export default Main