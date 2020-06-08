import React, { Component } from 'react'

import {Label, Popup, List, Header} from 'semantic-ui-react'
import { string, array, number, bool } from "prop-types"
import styled from 'styled-components'

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start !important;
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

const ProductFirstTags = styled.div`
  order: 1;
  white-space: nowrap;
`

const ProductFirstItem = styled.div`
  order: 1;
  overflow: hidden;
  text-overflow: ellipsis;
`

const ProductMoreItems = styled.div`
  order: 2;
`

export default class ArrayToFirstItem extends Component {
  render() {
    let { values, rowItems, tags } = this.props
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
            trigger={<ProductMoreItems><ProductLabel className='bordered right'>{values.length - rowItems}+</ProductLabel></ProductMoreItems>}
          />
          {tags ? (
            <ProductFirstTags>{rowValues.map(val => <ItemLabel>{val}</ItemLabel>)}</ProductFirstTags>
          ) : (
            <ProductFirstItem>{rowValues.join(', ')}</ProductFirstItem>
          )}
        </FlexWrapper>
      )
    } else {
      if (tags) {
        return (<ProductFirstTags>{rowValues.map(val => <ItemLabel>{val}</ItemLabel>)}</ProductFirstTags>)
      } else {
        return rowValues.join(', ')
      }
    }
  }
}

ArrayToFirstItem.propTypes = {
  values: array,
  rowItems: number,
  tags: bool
}

ArrayToFirstItem.defaultProps = {
  values: null,
  rowItems: 1,
  tags: false
}