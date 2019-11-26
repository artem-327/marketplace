import React from 'react'
import BroadcastField from './BroadcastField'
import StateBroadcastField from './StateBroadcastField'
import { filterByUniqueProperty } from '../../../../../utils/functions'

const RegionBroadcastField = ({
  regionsExpanded,
  filteredOffices,
  filteredStates,
  flattenStates,
  storedStates,
  filterInput,
  statesExpanded,
  storedRegion,
  handleExpanded,
  handleRuleClick,
  dispatch,
  regionData,
  isClientList
}) => {
  const partlybrc = storedRegion && storedRegion.broadcastPartly
  const partlyanonym = storedRegion && storedRegion.anonymousPartly

  const statesOfFilteredOfficesIds = filteredOffices.map(i => i.stateId)
  const statesOfFilteredOffices = flattenStates.filter(i => statesOfFilteredOfficesIds.includes(i.id))
  const finalFilteredStates = [...filteredStates, ...statesOfFilteredOffices]

  const isFiltering = filterInput !== ''
  const isExpanded = regionsExpanded.includes(regionData.id) || isFiltering
  const showedStates = isFiltering
    ? filterByUniqueProperty(finalFilteredStates, 'id').filter(i => i.regionId === regionData.id)
    : regionData.elements
  return (
    <React.Fragment>
      <BroadcastField
        name={regionData.name}
        type='region'
        dispatch={dispatch}
        isClientList={isClientList}
        id={regionData.id}
        isExpanded={isExpanded}
        handleExpanded={handleExpanded}
        hasChildren={regionData.elements.length > 0}
        handleRuleClick={handleRuleClick}
        partlybrc={partlybrc}
        partlyanonym={partlyanonym}
        isFiltering={isFiltering}
      />
      {isExpanded &&
        showedStates.map(i => {
          return (
            <StateBroadcastField
              type='state'
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
          )
        })}
    </React.Fragment>
  )
}

export default RegionBroadcastField
