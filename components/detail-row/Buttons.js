import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import { GridRow, GridColumn, List, Button } from 'semantic-ui-react'

import { getSafe } from '~/utils/functions'

import { ColumnDetail, CustomButton } from './styles'

function Buttons({ row, buttons }) {
  return (
    <GridRow>
      {buttons.map(act => (
        <ColumnDetail width={act.columnWidth || 16}>
          <CustomButton
            buttonStyles={act.buttonStyles}
            fluid={act.fluid}
            primary={act.primary}
            secondary={act.secondary}
            type='button'
            onClick={() => act.action()}>
            <FormattedMessage id={`detailRow.${act.name}`} defaultMessage='Button'>
              {text => text}
            </FormattedMessage>
          </CustomButton>
        </ColumnDetail>
      ))}
    </GridRow>
  )
}

Buttons.propTypes = {
  row: PropTypes.object,
  buttons: PropTypes.array
}

Buttons.defaultProps = {
  row: {},
  buttons: []
}

export default Buttons
