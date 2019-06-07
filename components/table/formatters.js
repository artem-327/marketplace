import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'

export function rowActionsCellFormatter({ column: { actions }, row }) {
  return (
    <Dropdown icon="" trigger={<Icon name="ellipsis vertical" size="large" />}>
      <Dropdown.Menu>
        {actions.map((a, i) => 'hidden' in a && typeof a.hidden === 'function' && Boolean(a.hidden(row)) ? null : (
          <Dropdown.Item
            key={i}
            text={a.text}
            onClick={() => a.callback(row)}
          />
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export const dropdownFormatter = ({ column: { options }, row }) => {
  const opts = options.map(p => ({
    text: p.text,
    value: p.value,
    key: p.value,
    callback: p.callback
  }))

  return (
    <Dropdown
      style={{ margin: '-6px' }}
      placeholder="Select permission"
      selection
      fluid
      defaultValue={opts[0].value}
      options={opts}
    />
  )
}
