import React, { Component } from 'react'

import { Label, Popup, List } from 'semantic-ui-react'
import { string, array } from "prop-types";

import { FormattedMessage } from 'react-intl'


export default class ArrayToMultiple extends Component {
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
            trigger={<Label><FormattedMessage id='global.multiple' defaultMessage='Multiple' /></Label>}
          />
        </div>
      )
    }
    else {
      return values[0]
    }
  }
}

ArrayToMultiple.propTypes = {
  values: array
}

ArrayToMultiple.defaultProps = {
  values: null
}