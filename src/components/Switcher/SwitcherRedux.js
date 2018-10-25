import React, { Component } from 'react';
import { actions } from 'react-redux-form';
import Switcher from './Switcher';

class SwitcherRedux extends Component {
  handleChange(value) {
    const { model, dispatch } = this.props;
    dispatch(actions.change(model, value));
    if (this.props.onChange) this.props.onChange(value);
  }

  render() {
    const { isRounded, defaultValue } = this.props;
    return <Switcher
      isRounded={isRounded}
      defaultValue={defaultValue}
      onChange={value => this.handleChange(value)}
    />
  }
}

export default SwitcherRedux;




