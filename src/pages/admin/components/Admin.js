import React, { Component } from 'react'
import { connect } from 'react-redux'


import TablesHandlers from './TablesHandlers'

import { Container, Grid, Divider } from 'semantic-ui-react'
class Admin extends Component {

    renderContent = () => {
        const {} = this.props


    }

    render() {
        return (
            <Container fluid style={{ marginTop: 20 }}>
                <TablesHandlers />
                <Divider />
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            Tabs
                        </Grid.Column>
                        <Grid.Column>
                            {this.renderContent()}
                            contents
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