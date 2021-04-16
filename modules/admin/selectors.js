import { createSelector } from 'reselect'
const getUnitsOfMeasures = state => state?.admin?.unitsOfMeasures

export const makeGetUnitsOfMeasures = () => createSelector([getUnitsOfMeasures], unitsOfMeasures => unitsOfMeasures?.map(d => {
    return {
      key: d.id,
      text: d.name,
      value: d.id
    }
  })
)
