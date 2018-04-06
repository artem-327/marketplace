import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Dashboard from '../pages/dashboard'
import Login from '../pages/login'


class Main extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/" component={Dashboard}/>
                </Switch>
            </div>
        );
    }
}

export default Main