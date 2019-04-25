//MAIN COMPONENTS
import React, { Component } from 'react'
import { Table } from '@devexpress/dx-react-grid-bootstrap4'
import { Popup } from 'semantic-ui-react'

//STYLES
import './style.scss'

export const TableCells = props => {
  if (props.column.title === 'Roles') {
    const opts = props.row.allUserRoles
    const Roles = opts
      .slice(0, 2)
      .map(item => <div key={item.id}>{item.name}</div>)
    const PopUpStr = opts.slice(2).map((item, i) => <p key={i}>{item.name}</p>)
    return (
      <Table.Cell>
        {Roles}
        {opts.length > 2 ? (
          <Popup
            trigger={<span>+ X more</span>}
            className="popup-custom"
            content={PopUpStr}
          />
        ) : null}
      </Table.Cell>
    )
  }
  return <Table.Cell {...props} />
}
