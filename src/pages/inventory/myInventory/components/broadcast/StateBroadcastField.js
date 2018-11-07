import React from 'react';
import BroadcastField from "./BroadcastField";

const StateBroadcastField = ({dispatch, storedState, stateData, filterInput, statesExpanded, handleExpanded, handleRuleClick, isClientList}) => {
  const offices = stateData.companies.map(i => i.offices)
  const flattenOffices = offices.flat()
  const partlybrc = storedState && storedState.broadcastPartly
  const partlyanonym = storedState && storedState.anonymousPartly

  const isFiltering = filterInput !== "";
  const filteredOffices = flattenOffices.filter(i => i.name.toLowerCase().startsWith(filterInput.toLowerCase()))
  const showedOffices = isFiltering ? filteredOffices : flattenOffices
  const isExpanded = statesExpanded.includes(stateData.id) || isFiltering
  return (
    <React.Fragment>
      <BroadcastField
        name={stateData.name}
        type="state"
        dispatch={dispatch}
        isClientList={isClientList}
        id={stateData.id}
        isExpanded={isExpanded}
        handleExpanded={handleExpanded}
        hasChildren={flattenOffices.length > 0}
        handleRuleClick={handleRuleClick}
        partlyanonym={partlyanonym}
        partlybrc={partlybrc}
        isFiltering={isFiltering}
      />

      {isExpanded && showedOffices.map(i => {
        return <BroadcastField
        name={i.name}
        type="office"
        dispatch={dispatch}
        isClientList={isClientList}
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