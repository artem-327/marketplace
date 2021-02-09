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
export const getComponentParameters = (
  name,
  openSection,
  setOpenSection,
  sectionState,
  setSectionState,
  setSummaryButtonCaption,
  setSummarySubmitFunction,
  setSectionSubmitValue
) => {

  return {
    id: name, // ! ! temporary
    isExpanded: openSection === name,
    sectionState: sectionState[name],
    onChangeButtonClick: () => setOpenSection(name),
    onCloseButtonClick: () => {
      const sectionToOpen = findSectionToOpen(sectionState)
      setOpenSection(sectionToOpen)
    },
    onSubmitClick: (value = null) => {
      if (name) {

        const newSectionState = {
          ...sectionState,
          [name]: {
            ...sectionState[name],
            accepted: true,
            value
          }
        }
        const sectionToOpen = findSectionToOpen(newSectionState)
        setSectionState(newSectionState)
        setOpenSection(sectionToOpen)
      }
    },
    onChangeSubmitButton: value => {
      setSummaryButtonCaption(value.caption)
      setSummarySubmitFunction(() => value.submitFunction)
    },
    value: name && sectionState[name] ? sectionState[name].value : null,
    setSectionSubmitValue: (val) => setSectionSubmitValue(val)
  }
}