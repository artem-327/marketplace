import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Grid, Divider } from 'semantic-ui-react'
import Layout from "../../../pages/dashboard";




class Profile extends Component {

    render() {

        return (
            <Layout title="Dashboard">
                <h1>My Profile 123</h1>
            </Layout>



        )
    }
}


const mapStateToProps = state => {
    return {
        ...state.profile,
    }
}

export default connect(mapStateToProps, null)(Profile)