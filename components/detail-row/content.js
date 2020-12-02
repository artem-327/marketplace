import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { GridRow } from 'semantic-ui-react'

import {
  StyledGrid,
  DivTable,
  DivHeaderTable,
  DivHeaderColumnTable,
  DivBodyTable,
  DivBodyRowTable,
  DivBodyColumnTable,
  ColumnDetail
} from './styles'

function Content({ items, attributes }) {
  return (
    <GridRow>
      <ColumnDetail width={16}>
        <DivTable>
          <DivHeaderTable>
            {attributes.map(attr => (
              <DivHeaderColumnTable widthProp={attr.width}>
                <FormattedMessage id={`detailRow.${attr.name}`} defaultMessage='Title' />
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
      </ColumnDetail>
    </GridRow>
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
