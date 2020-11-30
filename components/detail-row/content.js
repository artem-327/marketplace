import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { GridRow, GridColumn } from 'semantic-ui-react'

import {
  StyledGrid,
  DivTable,
  DivHeaderTable,
  DivHeaderColumnTable,
  DivBodyTable,
  DivBodyRowTable,
  DivBodyColumnTable
} from './styles'

function Content({ items, attributes }) {
  return (
    <StyledGrid>
      <GridRow>
        <GridColumn width={16}>
          <DivTable>
            <DivHeaderTable>
              {attributes.map(attr => (
                <DivHeaderColumnTable widthProp={attr.width}>
                  <FormattedMessage id={`orders.${attr.name}`} defaultMessage='Title' />
                </DivHeaderColumnTable>
              ))}
            </DivHeaderTable>
            <DivBodyTable>
              {items.map((item, index) => (
                <DivBodyRowTable isLastRow={index === items.length - 1}>
                  {attributes.map(attr => (
                    <DivBodyColumnTable widthProp={attr.width}>{item[attr.name]}</DivBodyColumnTable>
                  ))}
                </DivBodyRowTable>
              ))}
            </DivBodyTable>
          </DivTable>
        </GridColumn>
      </GridRow>
    </StyledGrid>
  )
}

Content.propTypes = {
  items: PropTypes.object,
  attributes: PropTypes.array
}

Content.defaultProps = {
  items: {},
  attributes: []
}

export default Content
