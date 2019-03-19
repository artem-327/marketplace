import React, { Component } from 'react'
import { connect } from 'react-redux'

import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'

import {Menu, Button, Input, Dropdown} from 'semantic-ui-react'

import { handleAddNewWarehousePopup, handleFiltersValue } from '../actions'
import unitedStates from '../../../components/unitedStates'



class TablesHandlers extends Component {
	state = {		
		filterFieldCurrentValue: 'None'
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
    const {
      handleFiltersValue, 
      currentTab,
      handleAddNewWarehousePopup
    } = this.props
    
    const {      
      filterFieldCurrentValue
    } = this.state

    return (
      <Menu secondary>
        <Menu.Item header><h1>Users Settings</h1></Menu.Item>
        
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder="Search..."
            onChange={ e => handleFiltersValue(e.target.value)} />
          </Menu.Item>
          <Menu.Item>
            <Button primary onClick={ handleAddNewWarehousePopup }>
              Add new { currentTab }
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )

    return (			

      <div className="b-search col-xs-6">
        { currentTab === 'Users' ?
          <TextField
            select
            className="b-search__select-field col-xs-3"
            value={ filterFieldCurrentValue }
            onChange={ this.handleChangeFieldsCurrentValue('filterFieldCurrentValue') }
            variant="outlined"
            onClick={ (e) => { 
                if(e.target.value === undefined) return
                if(e.target.value === 'None') return handleFiltersValue('')
                return handleFiltersValue(e.target.value)
              } 
            }
          > 
            <MenuItem  
              value={ 'None' }
            >
              { 'None' }
            </MenuItem>
            {unitedStates.map(option => (
              <MenuItem 
                key={ option.name }  
                value={ option.name }
              >
                { option.name }
              </MenuItem>
            ))}
          </TextField> 
        : null }
        <div className="b-search__search-field col-xs-5">
          <div className="search-icon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search..."
            classes={{ input: "input-base" }}
            onChange={ e => {
                return handleFiltersValue(e.target.value)
              }
            }
            fullWidth
          />
        </div>
        <button
          onClick={ handleAddNewWarehousePopup }
          className="b-search__add-user-btn capitalize col-xs-4"
        >
          Add new { currentTab }
        </button>
      </div>
    );  
  }  
}

const mapStateToProps = state => {
  return {
    currentTab: state.settings.currentTab
  }
}

const mapDispatchToProps = {
  handleAddNewWarehousePopup,
  handleFiltersValue
}

export default connect(mapStateToProps, mapDispatchToProps)(TablesHandlers)