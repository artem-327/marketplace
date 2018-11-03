import React from 'react';
import BroadcastField from "./BroadcastField";
import RegionBroadcastField from "./RegionBroadcastField";

const RootBroadcastField = ({rootData, handleExpanded, handleRuleClick, statesExpanded, regionsExpanded, dispatch, isList}) => {
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
        handleExpanded={handleExpanded}
        handleRuleClick={handleRuleClick}
      />
      })}
    </>
  );
};

export default RootBroadcastField;
