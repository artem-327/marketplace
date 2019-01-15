import React from 'react';
import BroadcastField from "./BroadcastField";
import RegionBroadcastField from "./RegionBroadcastField";
import CompanyBroadcastField from "./CompanyBroadcastField";
import {filterByUniqueProperty} from "../../../../../utils/functions";
import Spinner from '../../../../../components/Spinner/Spinner'

const RootBroadcastField = ({
  rootData, 
  handleExpanded, 
  storedRegions, 
  handleRuleClick, 
  statesExpanded, 
  regionsExpanded, 
  companiesExpanded,
  dispatch, 
  isClientList, 
  storedRoot,
  storedStates,
  storedCompanies,
  filterInput,
  categoryFilter,
  filteredRegions, 
  filteredStates, 
  filteredCompanies, 
  filteredOffices
}) => {
  if (!rootData.regions) return <Spinner />
  const partlybrc = storedRoot && storedRoot["1"].broadcastPartly
  const partlyanonym = storedRoot && storedRoot["1"].anonymousPartly
  const statessData =  rootData.regions.map(i => i.states)
  const flattenStates = statessData.flat()
  const companiesData =  flattenStates.map(i => i.companies)
  const flattenCompanies = companiesData.flat()
  const officesData =  flattenCompanies.map(i => i.branches)
  const flattenOffices = officesData.flat()
  const uniqueCompanies = filterByUniqueProperty(flattenCompanies, "id")

  const isFiltering = filterInput !== "";

  const companiesOfFilteredOfficesIds = filteredOffices.map(i => i.companyId)
  const companiesOfFilteredOffices = flattenCompanies.filter(i => companiesOfFilteredOfficesIds.includes(i.id))
  const finalFilteredCompanies = [...filteredCompanies, ...companiesOfFilteredOffices]
  const showedCompanies = isFiltering ? filterByUniqueProperty(finalFilteredCompanies, "id") : uniqueCompanies

  const regionsOfFilteredStatesIds = filteredStates.map(i => i.regionId)
  const regionsOfFilteredStatess = rootData.regions.filter(i => regionsOfFilteredStatesIds.includes(i.id))

  const regionsOfFilteredOfficesIds = filteredOffices.map(i => i.regionId)
  const regionsOfFilteredOffices = rootData.regions.filter(i => regionsOfFilteredOfficesIds.includes(i.id))

  const finalFilteredRegions = [...filteredRegions, ...regionsOfFilteredStatess, ...regionsOfFilteredOffices]
  const showedRegions = isFiltering? filterByUniqueProperty(finalFilteredRegions, "id") : rootData.regions

  return (
    <>
      <BroadcastField
        name={categoryFilter==="allregions" ? "All Regions" : "All Companies" }
        type="root"
        dispatch={dispatch}
        isClientList={isClientList}
        id={1}
        isExpanded={true}
        hasChildren={rootData.regions.length > 0}
        partlybrc={partlybrc}
        partlyanonym={partlyanonym}
        handleExpanded={handleExpanded}
        handleRuleClick={handleRuleClick}
        isFiltering={isFiltering}
      />

      {categoryFilter==="allregions" && showedRegions.map(i => {
        return <RegionBroadcastField
        type="region"
        dispatch={dispatch}
        isClientList={isClientList}
        key={i.id}
        regionsExpanded={regionsExpanded}
        statesExpanded={statesExpanded}
        regionData={i}
        storedRegion={storedRegions && storedRegions.find(j => j.id === i.id)}
        storedStates={storedStates}
        filterInput={filterInput}
        handleExpanded={handleExpanded}
        handleRuleClick={handleRuleClick}
        filteredOffices={filteredOffices}
        filteredStates={filteredStates}
        flattenStates={flattenStates}
        isFiltering={isFiltering}
      />
      })}
      {categoryFilter==="allcompanies" && showedCompanies.map(i => {
        return <CompanyBroadcastField
        type="comapny"
        dispatch={dispatch}
        isClientList={isClientList}
        key={i.id + "S" + i.stateId}
        companyData={i}
        filterInput={filterInput}
        companiesExpanded={companiesExpanded}
        handleExpanded={handleExpanded}
        handleRuleClick={handleRuleClick}
        flattenOffices={flattenOffices}
        storedCompany={storedCompanies && storedCompanies.find(j => j.id === i.id)}
        filteredOffices={filteredOffices}
        isFiltering={isFiltering}
      />
      })}
    </>
  );
};

export default RootBroadcastField;
