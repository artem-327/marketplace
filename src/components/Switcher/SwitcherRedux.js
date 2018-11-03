
import React from 'react';
import { Control } from 'react-redux-form';
import Switcher from './Switcher';

const SwitcherRedux = (props) => {
  const { isrounded, partly, model, onClick } = props;
  return (
    <Control.checkbox
      model={model}
      component={Switcher}
      onClick={e => onClick(e)}
      mapProps={{
        show: (props) => props.modelValue === false ? 0 : 1,
      }}
      controlProps={{
        isrounded,
        partly: partly
      }}
      {...props}
    />
  );
};

export default SwitcherRedux;
