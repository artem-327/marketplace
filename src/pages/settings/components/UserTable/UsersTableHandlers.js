import React from 'react';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

function UsersTableHandlers(props) {
  const { filterFieldSelectValues, filterFieldCurrentValue, handleChangeFieldsCurrentValue, filtersHandler } = props;
  
  return (					
    <div className="b-search col-xs-6">
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
        {filterFieldSelectValues.map(option => (
          <MenuItem 
            key={ option.name }  
            value={ option.name }
          >
            { option.name }
          </MenuItem>
        ))}
      </TextField>					
      <div className="b-search__search-field col-xs-5">
        <div className="search-icon">
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search users by name, title or branch"
          classes={{ input: "input-base" }}
          onChange={ e => {
              return filtersHandler(e.target.value);
            }
          }
          fullWidth
        />
      </div>
      <button className="b-search__add-user-btn capitalize col-xs-3">
        Add new user
      </button>
    </div>
  );
}

export default UsersTableHandlers;