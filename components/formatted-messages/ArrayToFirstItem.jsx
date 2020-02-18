import React, { Component } from 'react'

import { Label, Popup, List } from 'semantic-ui-react'
import { string, array } from "prop-types"


export default class ArrayToFirstItem extends Component {
  render() {
    let {values} = this.props
    if (!values || values.length === 0) return null

    if (values.length > 1) {
      return (
        <div>
          <Popup
            wide='very'
            data-test='array_to_multiple_list'
            content={
              <List>
                {values.map((text, i) => (
                  <List.Item key={i}>
                    <List.Content>
                      {text}
                    </List.Content>
                  </List.Item>
                ))}
              </List>}
            position='right center'
            trigger={<Label className='bordered right'>{values.length - 1}+</Label>}
          />
          <div>{values[0]}</div>
        </div>
      )
    }
    else {
      return values[0]
    }
  }
}

ArrayToFirstItem.propTypes = {
  values: array
}

ArrayToFirstItem.defaultProps = {
  values: null
}