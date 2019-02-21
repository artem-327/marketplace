import React from 'react';
import { Link } from 'react-router-dom';

import UsersTable from './UserTable/UsersTable';

function Tabs(props) {
  const { tabsNames, handleActiveTab, currentTab } = props;
  
  return (					
    <ul className="tabs-wrapper col-xs-2 middle-xs">
      { tabsNames.map(tab => {
          return (
            <li
              key={ tab.link }
              className="tabs-wrapper__b-tabs uppercase"               
              onClick={ handleActiveTab }
            >	
            {
            currentTab === tab.name ?	
              <a className="tab-link active"
                data-tab-name={ tab.name } 
              >
                { tab.name }
              </a> :
              <a className="tab-link" 
                data-tab-name={ tab.name }
              >
                { tab.name }
              </a>
            }		
            </li>
          )								
        })
      }
    </ul>
  );
}

export default Tabs;