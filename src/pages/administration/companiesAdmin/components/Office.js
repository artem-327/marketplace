import React from 'react';

const Office = props => (
    <div className="companies">
        <b>{props.name}</b>
        <button className="button small" onClick={()=>props.removeOffice(props.id)}>
            Remove
        </button>
        <button className="button small" onClick={()=>props.history.push('/administration/offices/' + props.id)}>
            Edit
        </button>
    </div>
);

export default Office;