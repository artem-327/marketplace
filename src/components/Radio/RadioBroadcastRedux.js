import React from 'react';
import { Control } from 'react-redux-form';

const RadioBroadcastRedux = (props) => {
  return (
    <label className="radioButton"><p>{props.label}</p>
      <Control.radio model={props.model} value={props.value} onClick={e => props.onClick(e)} id={props.id}/>
      <span className={"radiomark"} />
    </label>
  );
};

export default RadioBroadcastRedux;