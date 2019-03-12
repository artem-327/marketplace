import React from 'react';
import Button from '../../../../components/Button/Button'
import {FormattedMessage} from 'react-intl';

const Office = ({office, id, deleteOffice, history}) => (
    <tr className="company-row">
        <td><b>{office.name}</b></td>
        <td>
            <Button color="red" onClick={()=>deleteOffice(id)}>
                <FormattedMessage
                    id='global.remove'
                    defaultMessage='Remove'
                />
            </Button>
            <Button onClick={()=>history.push('/administration/offices/' + id)}>
                <FormattedMessage
                    id='global.edit'
                    defaultMessage='Edit'
                />
            </Button>
        </td>
    </tr>
);

export default Office;