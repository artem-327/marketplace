import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { GridRow, List } from 'semantic-ui-react'

import { getSafe } from '~/utils/functions'

import { StyledGrid, TableSegment, StyledList, DetailMessage, ColumnDetail } from './styles'

function Header({ row, attributes, as }) {
  return (
    <GridRow>
      <ColumnDetail width={16}>
        <TableSegment>
          <StyledList divided relaxed horizontal size='large'>
            {attributes.map((attr, i) => (
              <List.Item key={i}>
                <List.Content>
                  <List.Header as='label'>
                    <FormattedMessage id={`detailRow.${attr}`} defaultMessage='Title' />
                  </List.Header>
                  <List.Description as={as}>{getSafe(() => row[attr], '')}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </StyledList>
        </TableSegment>
      </ColumnDetail>
    </GridRow>
  )
}

Header.propTypes = {
  row: PropTypes.object,
  attributes: PropTypes.array,
  as: PropTypes.string
}

Header.defaultProps = {
  row: {},
  attributes: [],
  as: 'span'
}

export default Header
