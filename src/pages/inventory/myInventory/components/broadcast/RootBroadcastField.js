import React from 'react';
import BroadcastField from "./BroadcastField";
import RegionBroadcastField from "./RegionBroadcastField";

const RootBroadcastField = ({
  rootData, 
  handleExpanded, 
  storedRegions, 
  handleRuleClick, 
  statesExpanded, 
  regionsExpanded, 
  dispatch, 
  isList, 
  storedRoot,
  storedStates
}) => {
  const partly = storedRoot && storedRoot["1"].broadcastPartly
  
  return (
    <>
      <BroadcastField
        name="Root"
        type="root"
        dispatch={dispatch}
        isList={isList}
        id={rootData.id}
        isExpanded={true}
        hasChildren={rootData.regions.length > 0}
        partly={partly}
        handleExpanded={handleExpanded}
        handleRuleClick={handleRuleClick}
      />

      {true && rootData.regions.map(i => {
        return <RegionBroadcastField
        type="region"
        dispatch={dispatch}
        isList={isList}
        key={i.id}
        regionsExpanded={regionsExpanded}
        statesExpanded={statesExpanded}
        regionsData={i}
        storedRegion={storedRegions && storedRegions.find(j => j.id === i.id)}
        storedStates={storedStates}
        handleExpanded={handleExpanded}
        handleRuleClick={handleRuleClick}
      />
      })}
    </>
  );
};

export default RootBroadcastField;
