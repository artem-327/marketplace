import React from 'react';
import BroadcastField from "./BroadcastField";

const CompanyBroadcastField = ({dispatch, storedCompany, companyData, flattenOffices, companiesExpanded, handleExpanded, handleRuleClick, isClientList}) => {

  const isExpanded = companiesExpanded.includes(companyData.id)
  const partlyBrc = storedCompany && storedCompany.broadcastPartly
  const partlyAnonym = storedCompany && storedCompany.anonymousPartly
  const officesInThisCompany = flattenOffices.filter(i => i.companyId === companyData.id)
  return (
    <>
      <BroadcastField
        name={companyData.name}
        type="company"
        dispatch={dispatch}
        isClientList={isClientList}
        id={companyData.id}
        partlyBrc={partlyBrc}
        isExpanded={isExpanded}
        handleExpanded={handleExpanded}
        hasChildren={companyData.offices.length > 0}
        handleRuleClick={handleRuleClick}
        partlyAnonym={partlyAnonym}
      />
      {isExpanded && officesInThisCompany.map(i => {
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
    </>
  );
};

export default CompanyBroadcastField;