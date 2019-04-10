import React, { Component } from "react"
import { connect } from "react-redux"

import SearchIcon from "@material-ui/icons/Search"
import InputBase from "@material-ui/core/InputBase"
import MenuItem from "@material-ui/core/MenuItem"
import TextField from "@material-ui/core/TextField"

import { Header, Menu, Button, Input, Dropdown } from "semantic-ui-react"

import { openAddPopup, handleFiltersValue } from "../actions"
import unitedStates from "../../../components/unitedStates"

const textsTable = {
  "Users"             : {BtnAddText: 'Add User'             , SearchText: 'Search users by name, title or branch ...'},
  "Branches"          : {BtnAddText: 'Add Branch'           , SearchText: 'Search branch by name, address or contact ...'},
  "Warehouses"        : {BtnAddText: 'Add Warehouse'        , SearchText: 'Search warehouse by name, address or contact ...'},
  "Product catalog"   : {BtnAddText: 'Add Product Catalog'  , SearchText: 'Search product catalog by name, number ...'},
  "Global Broadcast"  : {BtnAddText: 'Add Global Broadcast' , SearchText: 'Search global broadcast by name ...'},
  "Credit cards"      : {BtnAddText: 'Add Credit Card'      , SearchText: 'Search credit card ...'},
  "Bank accounts"     : {BtnAddText: 'Add Bank Account'     , SearchText: 'Search bank account ...'},
}

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
            <Input style={{width: 340}} size="large" icon='search' placeholder={ textsTable[currentTab].SearchText }
            onChange={ e => handleFiltersValue(e.target.value)} />
          </Menu.Item>
          <Menu.Item>
            <Button size="large" primary onClick={() => openAddPopup(currentTab) }>
              { textsTable[currentTab].BtnAddText }
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
