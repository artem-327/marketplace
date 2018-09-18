import React from 'react';

const Company = props => (
    <div className="companies">
        <b>{props.name}</b> · {props.noOffices + " Offices"}
        <button className="button small" onClick={()=>props.history.push('/administration/companies/' + props.id)}>
            Edit company
        </button>
    </div>
);

export default Company;