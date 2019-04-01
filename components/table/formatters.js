import React from 'react' 
import { connect } from 'react-redux' 
import { Dropdown } from 'semantic-ui-react'


export function rowActionsCellFormatter({column: {actions}, row}) {
  
	return (
		<Dropdown icon='ellipsis vertical'>
			<Dropdown.Menu>
        {actions.map((a,i) => (
          <Dropdown.Item 
            key={i}
            text={a.text} 
            onClick={ () => a.callback(row) }
          />
        ))}
			</Dropdown.Menu>
		</Dropdown>	
	)
}