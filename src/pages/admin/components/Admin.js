import React, { Component } from 'react'
import { connect } from 'react-redux'
import TablesHandlers from './TablesHandlers'
import { Container, Grid, Divider } from 'semantic-ui-react'
import Tabs from './Tabs'

import DataTable from './DataTable/DataTable'
import AddNewPopup3Parameters from './DataTable/AddNewPopup3Parameters'
import AddNewPopup2Parameters from './DataTable/AddNewPopup2Parameters'
import AddNewPopup1Parameter from './DataTable/AddNewPopup1Parameter'

import EditPopup3Parameters from './DataTable/EditPopup3Parameters'
import EditPopup2Parameters from './DataTable/EditPopup2Parameters'
import EditPopup1Parameter from './DataTable/EditPopup1Parameter'


const tables = {
    'Units of Measure': <DataTable />,
    'Units of Packaging': <DataTable />,
    'Manufacturers': <DataTable />,
    'Grades': <DataTable />,
    'Forms': <DataTable />,
    'Conditions': <DataTable />,
}

const editForms = {
    'Units of Measure': <EditPopup3Parameters />,
    'Units of Packaging': <EditPopup2Parameters />,
    'Manufacturers': <EditPopup1Parameter />,
    'Grades': <EditPopup1Parameter />,
    'Forms': <EditPopup1Parameter />,
    'Conditions': <EditPopup1Parameter />,
}

const addForms = {
    'Units of Measure': <AddNewPopup3Parameters />,
    'Units of Packaging': <AddNewPopup2Parameters />,
    'Manufacturers': <AddNewPopup1Parameter />,
    'Grades': <AddNewPopup1Parameter />,
    'Forms': <AddNewPopup1Parameter />,
    'Conditions': <AddNewPopup1Parameter />,
}

class Admin extends Component {

    renderContent = () => {
        const {
            currentEditForm,
            currentAddForm,
            currentTab,
        } = this.props

        return (
            <>
                {currentAddForm && addForms[currentTab]}
                {currentEditForm && editForms[currentTab]}
                {tables[currentTab] || <p>This page is still under construction</p>}
            </>
        )

    }

    render() {
        if (!this.props.auth.identity.isAdmin) return "Access denied!";

        return (
            <Container fluid>
                <TablesHandlers />
                <Grid columns='equal'>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Tabs />
                        </Grid.Column>
                        <Grid.Column key={ this.props.currentTab }>
                            {this.renderContent()}
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {...state.admin, auth: state.auth}
}

export default connect(mapStateToProps, null)(Admin)