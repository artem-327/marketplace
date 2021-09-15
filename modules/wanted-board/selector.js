import { createSelector } from 'reselect'
import { Header } from 'semantic-ui-react'

//Services
import { getSafe } from '../../utils/functions'

const getPopupValues = state => getSafe(() => state?.wantedBoard?.popupValues, null)
const getUpdating = state => state?.wantedBoard?.sending
const getHazardClasses = state => state.globalData.hazardClasses.map((d, id) => {
    return {
      key: id,
      text: d.classCode,
      value: d.id,
      content: <Header content={d.classCode} subheader={d.description} style={{ fontSize: '1em' }} />
    }
  })

export const makeGetPopupValues = () => {
    return createSelector([getPopupValues], popupValues => popupValues)
}

export const makeGetUpdating = () => {
  return createSelector([getUpdating], updating => updating)
}

export const makeGetHazardClasses = () => {
  return createSelector([getHazardClasses], hazardClasses => hazardClasses)
}