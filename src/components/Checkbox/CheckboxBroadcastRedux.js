import React from 'react';
import { Control } from 'react-redux-form';
import { Checkbox } from 'semantic-ui-react';

const CheckboxBroadcastRedux = (props) => {
  const { model, label, onClick, partlyanonym } = props;
  return (
    <Control.checkbox
      component={Checkbox}
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
    <Checkbox />
    // <label className={"input-checkbox"}><p>{props.label}</p>
    //   <input type="checkbox"
    //     {...props} />
    //   <span className={`checkmark ${props.partlyanonym ? "partlyanonym" : ""}`}></span>
    // </label>
  );
};

