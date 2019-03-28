import React, { Component } from 'react'
import { connect } from 'react-redux'


import TablesHandlers from './TablesHandlers'

import { Container, Grid, Divider } from 'semantic-ui-react'
import Tabs from './Tabs'

class Admin extends Component {

    renderContent = () => {
        const {
            currentTab,
        } = this.props

        return ('nejaky obsah')

    }

    render() {
        return (
            <Container fluid style={{ marginTop: 20 }}>
                <TablesHandlers />
                <Divider />
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Tabs />
                        </Grid.Column>
                        <Grid.Column>
                            {this.renderContent()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return state.admin
}


export default connect(mapStateToProps, null)(Admin)