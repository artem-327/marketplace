import React, { Component } from 'react'

import {Label, Popup, List, Header} from 'semantic-ui-react'
import { string, array, number } from "prop-types"
import styled from 'styled-components'

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: row-reverse nowrap;
`

const ProductLabel = styled(Label)`
  margin-left: 5px !important;
`

const ItemLabel = styled(Label)`
  height: 22px !important;
  border-radius: 2px !important;
  padding: 3px 12px !important;
  background: #2599d5 !important;
  font-family: 'HelveticaNeueLTPro-Md', sans-serif;
  font-size: 12px !important;
  color: #fff !important;
  line-height: 16px !important;
`

const ProductFirstItem = styled.div`
  white-space: nowrap;
`

export default class ArrayToFirstItem extends Component {
  render() {
    let { values, rowItems } = this.props
    if (!values || values.length === 0) return null

    let rowValues = values.slice()
    rowValues.splice(rowItems)

    if (values.length > rowItems) {
      return (
        <FlexWrapper>
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
          <ProductFirstItem>{rowValues.map(val => <ItemLabel>{val}</ItemLabel>)}</ProductFirstItem>
        </FlexWrapper>
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