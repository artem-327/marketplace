
import React from 'react';
import { Control } from 'react-redux-form';
import Switcher from './Switcher';
import { Checkbox } from 'semantic-ui-react';

const SwitcherRedux = (props) => {
  const { isrounded, partlybrc, model, onClick } = props;
  return (
    <Control.checkbox
      component={Checkbox}
      toggle
      model={model}
      onClick={e => onClick(e)}
      mapProps={{
        show: (props) => props.modelValue === false ? 0 : 1,
      }}
      controlProps={{
        isrounded,
        partlybrc: partlybrc
      }}
      data-test='SwitcherRedux_action_chckb'
      {...props}
    />
  );
};

export default SwitcherRedux;
