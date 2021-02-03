// Services
import { getSafe } from '~/utils/functions'

/**
 * @param {object} sectionState Object with section statuses
 * @return {string} Name of section to open for edit/accept
 */
export const findSectionToOpen = (sectionState) => {
  const keys = Object.keys(sectionState)
  const index = keys.findIndex(el => sectionState[el].accepted === false)

  if (index >= 0) {
    return keys[index]
  } else {
    return ''
  }
}

/**
 * @param {string} name
 * // ! ! ...
 *
 * @return object Default component attributes and event handlings (isExpanded, onButtonClick, onChangeButtonClick, etc.)
 */
export const getComponentParameters = (name, openSection, setOpenSection, sectionState, setSectionState) => {

  return {
    isExpanded: openSection === name,
    sectionState: sectionState[name],
    onChangeButtonClick: () => setOpenSection(name),
    onCloseButtonClick: () => {
      const sectionToOpen = findSectionToOpen(sectionState)
      setOpenSection(sectionToOpen)
    },
    onSubmitClick: () => {
      if (name) {

        const newSectionState = {
          ...sectionState,
          [name]: {
            ...sectionState[name],
            accepted: true
          }
        }
        const sectionToOpen = findSectionToOpen(newSectionState)
        setSectionState(newSectionState)
        setOpenSection(sectionToOpen)
      }
    }
  }
}