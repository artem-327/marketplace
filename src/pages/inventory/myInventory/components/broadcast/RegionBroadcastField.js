import React from 'react';
import BroadcastField from "./BroadcastField";
import StateBroadcastField from "./StateBroadcastField";

const RegionBroadcastField = ({ regionsExpanded, statesExpanded, handleExpanded, handleRuleClick, dispatch, regionsData, isList}) => {
  const isExpanded = regionsExpanded.includes(regionsData.id)
  return (
    <React.Fragment>
      <BroadcastField
        name={regionsData.name}
        type="region"
        dispatch={dispatch}
        isList={isList}
        id={regionsData.id}
        isExpanded={isExpanded}
        handleExpanded={handleExpanded}
        hasChildren={regionsData.states.length > 0}
        handleRuleClick={handleRuleClick}
      />
      {isExpanded && regionsData.states.map(i => {
        return <StateBroadcastField
        type="state"
        statesExpanded={statesExpanded}
        handleExpanded={handleExpanded}
        stateData={i}
        dispatch={dispatch}
        isList={isList}
        key={i.id}
        handleRuleClick={handleRuleClick}
      />
      })}
    </React.Fragment>
  );
};

export default RegionBroadcastField;