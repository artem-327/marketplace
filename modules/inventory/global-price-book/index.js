import { Component } from 'react'
//import MyProductsPage from './components/MyProducts'
import PriceBook from '~/modules/settings/components/PriceBook'
import { Container, Grid, GridColumn, Segment } from 'semantic-ui-react'
import Tutorial from '~/modules/tutorial/Tutorial'
import styled from 'styled-components'

const SettingsGrid = styled(Grid)`
  flex-direction: column !important;
  margin-top: 0;
  margin-bottom: 0 !important;
  padding-bottom: 1em !important;

  > .row {
    flex-direction: column !important;
    flex-grow: 1 !important;
    flex-shrink: 1 !important;
    height: calc(100% + 1px) !important;
    padding-bottom: 0 !important;

    > .column {
      flex-grow: 1 !important;
      flex-shrink: 1 !important;
      height: 100%;
      padding-bottom: 0 !important;

      > [class*='FixyWrapper'] {
        height: 100%;

        > .segment {
          height: 100%;
        }
      }
    }
  }
`

const CustomGridColumn = styled(Grid.Column)`
  > form + .ui.segment {
    margin-top: 0;
  }
  padding-top: '10px';
  padding-bottom: '10px';
`

class GlobalPriceBook extends Component {
  render() {
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
}

export default GlobalPriceBook
