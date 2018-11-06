import React from 'react';
import BroadcastField from "./BroadcastField";
import StateBroadcastField from "./StateBroadcastField";

const RegionBroadcastField = ({ regionsExpanded, storedStates, filterInput, statesExpanded, storedRegion, handleExpanded, handleRuleClick, dispatch, regionData, isClientList}) => {
  const isExpanded = regionsExpanded.includes(regionData.id)
  const partlyBrc = storedRegion && storedRegion.broadcastPartly
  const partlyAnonym = storedRegion && storedRegion.anonymousPartly
  const isFiltering = filterInput !== "";
  const filteredStates = regionData.states.filter(i => i.name.toLowerCase().startsWith(filterInput.toLowerCase()))
  const showedStates = isFiltering ? filteredStates : regionData.states
  return (
    <React.Fragment>
      <BroadcastField
        name={regionData.name}
        type="region"
        dispatch={dispatch}
        isClientList={isClientList}
        id={regionData.id}
        isExpanded={isExpanded}
        handleExpanded={handleExpanded}
        hasChildren={regionData.states.length > 0}
        handleRuleClick={handleRuleClick}
        partlyBrc={partlyBrc}
        partlyAnonym={partlyAnonym}
      />
      {isExpanded && showedStates.map(i => {
        return <StateBroadcastField
        type="state"
        statesExpanded={statesExpanded}
        storedState={storedStates && storedStates.find(j => j.id === i.id)}
        handleExpanded={handleExpanded}
        stateData={i}
        dispatch={dispatch}
        isClientList={isClientList}
        key={i.id}
        handleRuleClick={handleRuleClick}
        filterInput={filterInput}
      />
      })}
    </React.Fragment>
  );
};

export default RegionBroadcastField;