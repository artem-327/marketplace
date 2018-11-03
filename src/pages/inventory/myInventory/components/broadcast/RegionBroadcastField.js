import React from 'react';
import BroadcastField from "./BroadcastField";
import StateBroadcastField from "./StateBroadcastField";

const RegionBroadcastField = ({ regionsExpanded, storedStates, statesExpanded, storedRegion, handleExpanded, handleRuleClick, dispatch, regionsData, isList}) => {
  const isExpanded = regionsExpanded.includes(regionsData.id)
  const partly = storedRegion && storedRegion.broadcastPartly
  return (
    <React.Fragment>
      <BroadcastField
        name={regionsData.name}
        type="region"
        dispatch={dispatch}
        isList={isList}
        id={regionsData.id}
        isExpanded={isExpanded}
        partly={partly}
        handleExpanded={handleExpanded}
        hasChildren={regionsData.states.length > 0}
        handleRuleClick={handleRuleClick}
      />
      {isExpanded && regionsData.states.map(i => {
        return <StateBroadcastField
        type="state"
        statesExpanded={statesExpanded}
        storedState={storedStates && storedStates.find(j => j.id === i.id)}
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