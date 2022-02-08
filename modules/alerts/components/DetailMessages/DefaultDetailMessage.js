import { GridRow, GridColumn } from 'semantic-ui-react'

// Styles
import { DetailMessage, StyledGrid } from '../Alerts.styles'


const DefaultDetailMessage = props => {
  const { content } = props

  return (
    <DetailMessage>
      <StyledGrid>
        <GridRow>
          <GridColumn width={16}>
            {content}
          </GridColumn>
        </GridRow>
      </StyledGrid>
    </DetailMessage>
  )
}

export default DefaultDetailMessage