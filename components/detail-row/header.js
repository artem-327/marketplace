import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { GridRow, List } from 'semantic-ui-react'

import { getSafe } from '~/utils/functions'

import { StyledGrid, TableSegment, StyledList, DetailMessage, HeaderColumn } from './styles'

function Header({ row, attributes }) {
  return (
    <DetailMessage>
      <StyledGrid>
        <GridRow>
          <HeaderColumn width={16}>
            <TableSegment>
              <StyledList divided relaxed horizontal size='large'>
                {attributes.map(attr => (
                  <List.Item>
                    <List.Content>
                      <List.Header as='label'>
                        <FormattedMessage id={`orders.${attr}`} defaultMessage='Title' />
                      </List.Header>
                      <List.Description as='span'>{getSafe(() => row[attr], '')}</List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </StyledList>
            </TableSegment>
          </HeaderColumn>
        </GridRow>
      </StyledGrid>
    </DetailMessage>
  )
}

Header.propTypes = {
  row: PropTypes.object,
  attributes: PropTypes.array
}

Header.defaultProps = {
  row: {},
  attributes: []
}

export default Header
