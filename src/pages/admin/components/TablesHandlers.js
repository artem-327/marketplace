import React, { Component } from "react";
import { connect } from "react-redux";

import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import { openAddPopup, handleFiltersValue } from '../actions'
import { Menu, Button, Input, Dropdown } from 'semantic-ui-react'



class TablesHandlers extends Component {
    state = {
        filterFieldCurrentValue: 'None'
    }

    handleChangeSelectField = (event, value) => {
        this.setState({
            filterFieldCurrentValue: value
        })
    }


    render() {
        const {
            handleFiltersValue,
            currentTab,
            openAddPopup
        } = this.props

        const {
            //filterFieldCurrentValue
        } = this.state


        return (
            <Menu secondary>
                <Menu.Item header><h1>Admin Settings</h1></Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' placeholder="Search..."
                               onChange={ e => handleFiltersValue(e.target.value)} />
                    </Menu.Item>
                    <Menu.Item>
                        <Button primary onClick={ openAddPopup }>
                            Add new { currentTab }
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        )
    }


}

const mapStateToProps = state => {
    return {
        currentTab: state.admin.currentTab
    }
}

const mapDispatchToProps = {
    openAddPopup,
    handleFiltersValue
}

export default connect(mapStateToProps, mapDispatchToProps)(TablesHandlers)