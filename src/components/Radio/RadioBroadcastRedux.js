import React from 'react';
import { Control } from 'react-redux-form';

const RadioBroadcastRedux = (props) => {
  const { model, value, label} = props;
  return (
    <Control.radio
      model={model}
      component={RadioBroadcast}
      value={value}
      mapProps={{
        value: (props) => props.viewValue,
      }}
      controlProps={{
        label: label
      }}
      {...this.props}
    />)
};

export default RadioBroadcastRedux;

const RadioBroadcast = (props) => {
  return (
    <label className="radioButton"><p>{props.label}</p>
      <input type="radio"
        name={props.model}
        {...props}
      />
      <span className={"radiomark"} />
    </label>
  );
};

