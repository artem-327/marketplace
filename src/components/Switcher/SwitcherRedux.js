
import React from 'react';
import { Control } from 'react-redux-form';
import Switcher from './Switcher';

const SwitcherRedux = (props) => {
  const { isrounded, model } = props;
  return (
    <Control.checkbox
      model={model}
      component={Switcher}
      mapProps={{
        value: (props) => props.viewValue,
      }}
      controlProps={{
        isrounded: { isrounded }
      }}
      {...props}
    />
  );
};

export default SwitcherRedux;
