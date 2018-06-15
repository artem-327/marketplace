import React, { Component } from 'react';

import './app.css';

import TestProfile from "./pages/test";
import Registration from "./pages/registration";
import Login from "./pages/login";
import {withAuth} from "./utils/auth";
import AllInventory from "./pages/inventory/allInventory";
import Inventory from "./pages/inventory/InventoryHOC";
// import MyInventory from "./pages/inventory/myInventory";
import Settings from "./pages/settings/Settings";
import Reports from "./pages/reports/Reports";
import AddInventory from "./pages/addInventory";
import Orders from "./pages/orders/Orders";
import Support from "./pages/support/Support";
import Dashboard from "./pages/dashboard";
import Clients from "./pages/clients/Clients";
import SearchProduct from "./pages/searchProduct";

import {Switch, Route} from 'react-router-dom';
import Layout from "./layout/Layout";

class App extends Component {
  render() {
    return (
        <div className="App" >
            <Switch>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/registration" component={Registration}/>
                <Route exact path="/profile-test" component={withAuth(TestProfile)} />
            </Switch>
            <Switch>
                <Layout>
                    <Route exact path="/" component={Dashboard}/>
                    <Route path="/inventory/all-inventory" component={Inventory(AllInventory)}/>
                    {/*<Route path="/inventory/my-inventory" component={Inventory(MyInventory)}/>*/}
                    <Route exact path="/orders" component={Orders}/>
                    <Route exact path="/clients" component={Clients}/>
                    <Route exact path="/reports" component={Reports}/>
                    <Route exact path="/settings" component={Settings}/>
                    <Route exact path="/support" component={Support}/>
                    <Route exact path="/add-inventory" component={AddInventory}/>
                    <Route exact path="/search-product" component={SearchProduct}/>
                </Layout>
            </Switch>
        </div>
    );
  }
}

export default App;
