import React from 'react';
import { Control } from 'react-redux-form';

const CheckboxBroadcastRedux = (props) => {
  const { model, label, onClick, partlyanonym } = props;
  return (
    <Control.checkbox
      model={model}
      component={CheckboxBroadcast}
      onClick={e => onClick(e)}
      mapProps={{
        value: (props) => props.viewValue,
      }}
      controlProps={{
        label: label,
        partlyanonym: partlyanonym
      }}
      {...props}
    />
  );
};

export default CheckboxBroadcastRedux;

const CheckboxBroadcast = (props) => {
  return (
    <label className={"input-checkbox"}><p>{props.label}</p>
      <input type="checkbox"
        {...props} />
      <span className={`checkmark ${props.partlyanonym ? "partlyanonym" : ""}`}></span>
    </label>
  );
};

