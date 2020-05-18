import React, { Component } from 'react'
import { Grid, Segment, Container } from 'semantic-ui-react'
//Commponents
import Layout from 'components/Layout'
import securePage from '~/hocs/securePage'
import Settings from '~/components/settings'
//Styled
import styled from 'styled-components'

const FixyWrapper = styled.div`
  position: relative;
  transform: translateY(0);
`

const ScrollableSegment = styled(Segment)`
  max-height: 90vh;
  overflow-y: auto;
`

import { injectIntl } from 'react-intl'

class Index extends Component {
  render() {
    const {
      intl: { formatMessage }
    } = this.props
    return (
      <Layout
        title={formatMessage({
          id: 'adminSettings.title',
          defaultMessage: 'Admin Settings'
        })}>
        <Container fluid className='flex stretched'>
          <Grid
            columns='equal'
            className='flex stretched'
            style={{ marginTop: '0', marginBottom: '0', padding: '0 32px' }}>
            <Grid.Row>
              <Grid.Column style={{ marginTop: '10px' }} className='flex stretched'>
                <FixyWrapper>
                  <ScrollableSegment basic padded='very'>
                    <Settings inputsInGroup={3} asModal={false} role='admin' />
                  </ScrollableSegment>
                </FixyWrapper>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Layout>
    )
  }
}

export default securePage(injectIntl(Index))
