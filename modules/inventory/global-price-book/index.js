import PriceBook from '../../settings/components/PriceBook'
import { Container, Grid } from 'semantic-ui-react'
import Tutorial from '../../tutorial/Tutorial'
import { SettingsGrid, CustomGridColumn } from '../styles'

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
