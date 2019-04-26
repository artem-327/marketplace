//MAIN COMPONENTS
import React from 'react'
import { Popup } from 'semantic-ui-react'
//STYLES
import './style.scss'

export const TablePopUp = props => {
  const opts = props.row.allUserRoles
  const Roles = opts
    .slice(0, 2)
    .map(item => <div key={item.id}>{item.name}</div>)
  const PopUpStr = opts.slice(2).map((item, i) => <p key={i}>{item.name}</p>)
  return (
    <React.Fragment>
      {Roles}
      {opts.length > 2 ? (
        <Popup
          trigger={<span>+ X more</span>}
          className="popup-custom"
          content={PopUpStr}
        />
      ) : null}
    </React.Fragment>
  )
}
