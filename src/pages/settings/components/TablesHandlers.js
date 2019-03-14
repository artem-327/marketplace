import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { handleAddNewWarehousePopup } from '../actions';
import unitedStates from '../../../components/unitedStates';

class TablesHandlers extends Component {
	state = {		
		filterFieldCurrentValue: 'None'
  }

  handleChangeSelectField = (event, value) => {
		this.setState({ 
			filterFieldCurrentValue: value 
		});
  };
  
  handleChangeFieldsCurrentValue = fieldStateName => event => {
		this.setState({ 
			[fieldStateName]: event.target.value 
		});
	};
  
  render() {
    const {
      filtersHandler, 
      currentTab,
      handleAddNewWarehousePopup
    } = this.props;
    
    const {
      handleChangeFieldsCurrentValue,
      filterFieldCurrentValue
    } = this.state;

    return (					
      <div className="b-search col-xs-6">
        { currentTab === 'Users' ?
          <TextField
            select
            className="b-search__select-field col-xs-3"
            value={ filterFieldCurrentValue }
            onChange={ handleChangeFieldsCurrentValue('filterFieldCurrentValue') }
            variant="outlined"
            onClick={ (e) => { 
                if(e.target.value === undefined) return;
                if(e.target.value === 'None') return filtersHandler('');
                return filtersHandler(e.target.value);
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
                return filtersHandler(e.target.value);
              }
            }
            fullWidth
          />
        </div>
        <button
          onClick={ handleAddNewWarehousePopup }
          className="b-search__add-user-btn capitalize col-xs-3"
        >
          Add new { currentTab }
        </button>
      </div>
    );  
  }  
}

const mapDispatchToProps = {   
  handleAddNewWarehousePopup
};

export default connect(null, mapDispatchToProps)(TablesHandlers);