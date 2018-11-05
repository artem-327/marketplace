import React from 'react';
import BroadcastField from "./BroadcastField";

const CompanyBroadcastField = ({dispatch, storedCompany, companyData, companiesExpanded = [], handleExpanded, handleRuleClick, isClientList}) => {
  const offices = companyData.offices.map(i => i.offices)
  const flattenOffices = offices.flat()
  const isExpanded = companiesExpanded.includes(companyData.id)
  const partlyBrc = storedCompany && storedCompany.broadcastPartly
  const partlyAnonym = storedCompany && storedCompany.anonymousPartly
  return (
    <>
      <BroadcastField
        name={companyData.name}
        type="state"
        dispatch={dispatch}
        isClientList={isClientList}
        id={companyData.id}
        partlyBrc={partlyBrc}
        isExpanded={isExpanded}
        handleExpanded={handleExpanded}
        hasChildren={flattenOffices.length > 0}
        handleRuleClick={handleRuleClick}
        partlyAnonym={partlyAnonym}
      />

      {/* {isExpanded && flattenOffices.map(i => {
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
      })} */}
    </>
  );
};

export default CompanyBroadcastField;