import React, { Component } from "react"
import { connect } from "react-redux"

import SearchIcon from "@material-ui/icons/Search"
import InputBase from "@material-ui/core/InputBase"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"

import { Header, Menu, Button, Input, Dropdown } from "semantic-ui-react"

import { openAddPopup, handleFiltersValue } from "../actions"
import unitedStates from "../../../components/unitedStates"

class TablesHandlers extends Component {
  state = {
    filterFieldCurrentValue: "None"
  }

  handleChangeSelectField = (event, value) => {
    this.setState({
      filterFieldCurrentValue: value
    })
  }

  handleChangeFieldsCurrentValue = fieldStateName => event => {
    this.setState({
      [fieldStateName]: event.target.value
    })
  }

  render() {
    const { handleFiltersValue, currentTab, openAddPopup } = this.props

    const { filterFieldCurrentValue } = this.state

    return (
      <Menu secondary>
        <Menu.Item header>
          <Header as="h1" size="medium">
            {currentTab}
          </Header>
        </Menu.Item>

        <Menu.Menu position="right">
          {/* {currentTab === 'Users' 
            ? <Dropdown item text='Language' scrolling
                
              >
                <Dropdown.Menu>
                  {unitedStates.map(option => (
                    <Dropdown.Item key={option.name} value={option.name}>{option.name}</Dropdown.Item> 
                  ))}
                </Dropdown.Menu>
            </Dropdown>
            : null
          } */}

          <Menu.Item>
            <Input
              style={{ width: 340 }}
              size="large"
              icon="search"
              placeholder="Search users by name, title or branch ..."
              onChange={e => handleFiltersValue(e.target.value)}
            />
          </Menu.Item>
          <Menu.Item>
            <Button
              size="large"
              primary
              onClick={() => openAddPopup(currentTab)}
            >
              Add {currentTab}
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentTab: state.settings.currentTab
  }
}

const mapDispatchToProps = {
  openAddPopup,
  handleFiltersValue
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TablesHandlers)
