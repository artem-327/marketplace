import React, { Component } from 'react'

import {Label, Popup, List, Header} from 'semantic-ui-react'
import { string, array, number } from "prop-types"
import styled from 'styled-components'

const ProductLabel = styled(Label)`
  margin-left: 5px !important;
`

const ProductFirstItem = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`

export default class ArrayToFirstItem extends Component {
  render() {
    let { values, rowItems } = this.props
    if (!values || values.length === 0) return null

    let rowValues = values.slice()
    rowValues.splice(rowItems)

    if (values.length > rowItems) {
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
            trigger={<div><ProductLabel className='bordered right'>{values.length - rowItems}+</ProductLabel></div>}
          />
          <ProductFirstItem>{rowValues.join(', ')}</ProductFirstItem>
        </div>
      )
    }
    else {
      return rowValues.join(', ')
    }
  }
}

ArrayToFirstItem.propTypes = {
  values: array,
  rowItems: number
}

ArrayToFirstItem.defaultProps = {
  values: null,
  rowItems: 1
}