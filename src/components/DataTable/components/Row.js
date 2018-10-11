import React from 'react';
import CheckboxControlled from "../../Checkbox/CheckboxControlled";

const Row = props => (
    <tr>
        {props.selectable ? <td><CheckboxControlled value={props.data.selected} onChange={(value) => props.selectFunc(props.groupId, props.data.id, value)}/></td> : null}
        {props.data.row.map((cell, index) => {
            if(!props.headers[index].visible) return null;
            return <td key={index}>{cell}</td>
            })}
    </tr>

);

export default Row;
