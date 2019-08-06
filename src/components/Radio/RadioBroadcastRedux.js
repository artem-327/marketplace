import React from 'react'
import { Control } from 'react-redux-form'
import { Radio } from 'semantic-ui-react'

const RadioBroadcastRedux = (props) => {
  return (
    <Control.checkbox
      labelPosition='left'
      label={props.label}
      component={Radio}
      model={props.model}
      value={props.value}
      onClick={e => props.onClick(e)} id={props.id}
      data-test={`RadioBroadcastRedux_id_${props.id}_action`}/>
  )
  {/* <span className={"radiomark"} /> */ }
}

export default RadioBroadcastRedux;