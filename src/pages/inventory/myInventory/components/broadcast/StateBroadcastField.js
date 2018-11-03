import React from 'react';
import BroadcastField from "./BroadcastField";

const StateBroadcastField = ({dispatch, stateData, handleRuleClick, isList}) => {
  const offices = stateData.companies.map(i => i.offices)
  const flattenOffices = offices.flat()

  return (
    <React.Fragment>
      <BroadcastField
        name={stateData.name}
        type="state"
        dispatch={dispatch}
        isList={isList}
        id={stateData.id}
        isExpanded={true}
        hasChildren={flattenOffices.length > 0}
        handleRuleClick={handleRuleClick}
      />

      {true && flattenOffices.map(i => {
        return <BroadcastField
        name={i.name}
        type="office"
        dispatch={dispatch}
        isList={isList}
        id={i.id}
        key={i.id}
        handleRuleClick={handleRuleClick}
      />
      })}
    </React.Fragment>
  );
};

export default StateBroadcastField;