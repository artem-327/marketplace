import React from 'react';
import BroadcastField from "./BroadcastField";

const StateBroadcastField = ({dispatch, stateData, statesExpanded, handleExpanded, handleRuleClick, isList}) => {
  const offices = stateData.companies.map(i => i.offices)
  const flattenOffices = offices.flat()
  const isExpanded = statesExpanded.includes(stateData.id)
  return (
    <React.Fragment>
      <BroadcastField
        name={stateData.name}
        type="state"
        dispatch={dispatch}
        isList={isList}
        id={stateData.id}
        isExpanded={isExpanded}
        handleExpanded={handleExpanded}
        hasChildren={flattenOffices.length > 0}
        handleRuleClick={handleRuleClick}
      />

      {isExpanded && flattenOffices.map(i => {
        return <BroadcastField
        name={i.name}
        type="office"
        dispatch={dispatch}
        isList={isList}
        id={i.id}
        key={i.id}
        handleRuleClick={handleRuleClick}
        handleExpanded={handleExpanded}
      />
      })}
    </React.Fragment>
  );
};

export default StateBroadcastField;