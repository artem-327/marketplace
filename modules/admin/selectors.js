import { createSelector } from 'reselect'
const getUnitsOfMeasures = state => state?.admin?.unitsOfMeasures

export const makeGetDimensionUnits = () => createSelector([getUnitsOfMeasures], unitsOfMeasures => unitsOfMeasures?.filter(d=>{return d.measureType.name === "length"}).map(d => {
  return {
    key: d.id,
    text: d.name,
    value: d.id
  }
})
)

export const makeGetWeightUnits = () => createSelector([getUnitsOfMeasures], unitsOfMeasures => unitsOfMeasures?.filter(d=>{return d.measureType.name === "weight"}).map(d => {
    return {
      key: d.id,
      text: d.name,
      value: d.id
    }
  })
)
