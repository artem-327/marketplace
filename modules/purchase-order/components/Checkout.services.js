// Services
import { getSafe } from '~/utils/functions'

/**
 * @param {number} rowIndex
 *
 *
 * @return object Default component attributes and event handlings (isExpanded, onButtonClick, onChangeButtonClick, etc.)
 */
export const getComponentParameters = (rowIndex, openIndex, setOpenIndex, sectionState, setSectionState) => {

  return {
    isExpanded: openIndex === rowIndex,
    sectionState: sectionState[rowIndex],
    onChangeButtonClick: () => setOpenIndex(rowIndex),
    onCloseButtonClick: () => setOpenIndex(-1), // ! ! Tohle predelat

    onSubmitClick: () => {                  // pokud uz zpracovane vsechny kategorie tak Place order?
      let newState = sectionState.slice()
      newState[rowIndex].accepted = true
      setSectionState(newState)
      setOpenIndex(rowIndex + 1)
    }
  }
}