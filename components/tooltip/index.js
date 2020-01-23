import React, { Component } from 'react'
import { Popup } from 'semantic-ui-react'
import { any } from "prop-types";

export default class Tooltip extends Component {
  render() {
    return (
      <Popup
        {...this.props}
        data-test='tooltip'
      />
    )
  }
}

Tooltip.propTypes = {
  content: any,
  trigger: any
}

Tooltip.defaultProps = {
  content: null,
  trigger: null
}