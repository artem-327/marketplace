import React, { Component } from 'react';
import { Control  } from 'react-redux-form';
import Switcher from './Switcher';

class SwitcherRedux extends Component {
  render() {
    const { isRounded, model } = this.props;
    return <Control.checkbox
    model={model}
    component={Switcher}
    mapProps={{
      value: (props) => props.viewValue,
    }}
    {...this.props}
    controlProps={{
      isRounded: {isRounded}
    }}
  />
  }

}

export default SwitcherRedux;




