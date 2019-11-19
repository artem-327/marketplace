import React from 'react'
import BroadcastField from './BroadcastField'

const CompanyBroadcastField = ({
  filteredOffices,
  dispatch,
  storedCompany,
  companyData,
  filterInput,
  flattenOffices,
  companiesExpanded,
  handleExpanded,
  handleRuleClick,
  isClientList
}) => {
  const partlybrc = storedCompany && storedCompany.broadcastPartly
  const partlyanonym = storedCompany && storedCompany.anonymousPartly
  const officesInThisCompany = flattenOffices.filter(i => i.companyId === companyData.id)
  const isFiltering = filterInput !== ''
  const isExpanded = companiesExpanded.includes(companyData.id) || isFiltering
  const showedOffices = isFiltering ? filteredOffices.filter(i => i.companyId === companyData.id) : officesInThisCompany
  return (
    <>
      <BroadcastField
        name={companyData.name}
        type='company'
        dispatch={dispatch}
        isClientList={isClientList}
        id={companyData.id}
        partlybrc={partlybrc}
        isExpanded={isExpanded}
        handleExpanded={handleExpanded}
        hasChildren={companyData.elements.length > 0}
        handleRuleClick={handleRuleClick}
        partlyanonym={partlyanonym}
        isFiltering={isFiltering}
      />
      {isExpanded &&
        showedOffices.map(i => {
          return (
            <BroadcastField
              name={i.name}
              type='office'
              dispatch={dispatch}
              isClientList={isClientList}
              id={i.id}
              key={i.id}
              handleRuleClick={handleRuleClick}
              handleExpanded={handleExpanded}
            />
          )
        })}
    </>
  )
}

export default CompanyBroadcastField
