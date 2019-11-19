import React from 'react'

const Company = props => (
  <tr className='company-row'>
    <td>
      <b>{props.name}</b>
    </td>
    <td>
      <button className='button small' onClick={() => props.history.push('/administration/companies/' + props.id)}>
        Edit company
      </button>
    </td>
  </tr>
)

export default Company
