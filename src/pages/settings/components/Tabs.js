import React from 'react';

function Tabs(props) {
  const { tabsNames, handleActiveTab, currentTab } = props;
  
  return (					
    <div className="tabs-wrapper col-xs-2 center-xs">
      { tabsNames.map(tab => {
          return (
            <button
              key={ tab }
              className="tabs-wrapper__tabs-btn uppercase col-xs-10" 
              data-tab-name={ tab } 
              onClick={handleActiveTab}
            >	
            {
            currentTab === tab ?	
              <div className="b-tabs active" data-tab-name={ tab }>
                { tab }
              </div> :
              <div className="b-tabs" data-tab-name={ tab }>
                { tab }
              </div>
            }		
            </button>
          )								
        })
      }
    </div>
  );
}

export default Tabs;