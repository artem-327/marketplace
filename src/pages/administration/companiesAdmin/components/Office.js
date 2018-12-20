import React from 'react';
import Button from '../../../../components/Button/Button'

const Office = ({office, id, deleteOffice, history}) => (
    <tr className="company-row">
        <td><b>{office.name}</b></td>
        <td>
            <Button color="red" onClick={()=>deleteOffice(id)}>
                Remove
            </Button>
            <Button onClick={()=>history.push('/administration/offices/' + id)}>
                Edit
            </Button>
        </td>
    </tr>
);

export default Office;