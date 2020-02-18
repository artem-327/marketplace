import React, { Component } from 'react'

import {Label, Popup, List, Header} from 'semantic-ui-react'
import { string, array } from "prop-types"
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
            trigger={<ProductLabel className='bordered right'>{values.length - 1}+</ProductLabel>}
          />
          <ProductFirstItem>{values[0]}</ProductFirstItem>
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