import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { handleActiveTab } from '../actions';

function Tabs(props) {
  const { tabsNames, handleActiveTab, currentTab } = props;
  
  return (					
    <ul className="tabs-wrapper col-xs-2 middle-xs">
      { tabsNames.map((tab, i) => {
          return (
            <li
              key={ i }
              className="tabs-wrapper__b-tabs uppercase"
              onClick={ handleActiveTab }
            >
            {
            currentTab === tab.name ?	
              <a className="tab-link active"
                data-tab-name={ tab.name }
                key={ tab.id }
              >
                { tab.name }
              </a> :
              <a className="tab-link" 
                data-tab-name={ tab.name }
                key={ tab.id }
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


const mapStateToProps = state => {
  return {
    tabsNames: state.settings.tabsNames,
    currentTab: state.settings.currentTab
  }
}

const mapDispatchToProps = {   
  handleActiveTab
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);