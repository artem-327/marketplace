//MAIN COMPONENTS
import React from 'react'
import { Popup } from 'semantic-ui-react'
//STYLES
import './style.scss'

export const TablePopUp = props => {
  const opts = props.row.allUserRoles
  const Roles = opts.slice(0, 2).map(item => <span key={item.id}>{item.name}</span>)
  const PopUpStr = opts.slice(2).map((item, i) => <span key={i}>{item.name}</span>)
  return (
    <React.Fragment>
      {Roles}
      {opts.length > 2 ? (
        <Popup trigger={<span>{` + ${opts.length - 2}`}</span>} className='popup-custom' content={PopUpStr} />
      ) : null}
    </React.Fragment>
  )
}
