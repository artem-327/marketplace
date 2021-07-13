import { Container, Grid } from 'semantic-ui-react'
// Components
import PriceBook from '../../settings/components/PriceBook'
import Tutorial from '../../tutorial/Tutorial'
// Styles
import { SettingsGrid, CustomGridColumn } from '../styles'

/**
 * GlobalPriceBook Component
 * @category Inventory - Global Price Book
 * @components
 */
const GlobalPriceBook = props => {
  return (
    <Container fluid className='flex stretched' style={{ padding: '30px 0' }}>
      <Tutorial marginGlobalPrice={true} isTutorial={false} isBusinessVerification={true} />
      <SettingsGrid columns='equal' className='flex stretched' style={{ padding: '0 30px' }}>
        <Grid.Row>
          <CustomGridColumn className='flex stretched'>
            <PriceBook />
          </CustomGridColumn>
        </Grid.Row>
      </SettingsGrid>
    </Container>
  )
}

export default GlobalPriceBook
