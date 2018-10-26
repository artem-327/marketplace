
import React from 'react';
import { Control } from 'react-redux-form';
import Switcher from './Switcher';

const SwitcherRedux = (props) => {
  const { isRounded, model } = props;
  return (
    <Control.checkbox
      model={model}
      component={Switcher}
      mapProps={{
        value: (props) => props.viewValue,
      }}
      controlProps={{
        isrounded: { isRounded }
      }}
      {...this.props}
    />
  );
};

export default SwitcherRedux;
