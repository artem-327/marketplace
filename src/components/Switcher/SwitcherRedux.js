import React, {Component} from 'react';
//import { actions } from 'react-redux-form';
import { Control } from 'react-redux-form';
import Switcher from './Switcher';

class SwitcherRedux extends Component {

    render() {
        return <Control
            model={this.props.model}
            component={Switcher}
            redux
            onChange={value => this.handleChange(value)}
            {...this.props}
        />
    }
}

export default SwitcherRedux;




