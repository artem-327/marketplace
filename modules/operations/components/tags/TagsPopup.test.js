import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, checkProps } from '../../../../test/testUtils'
//Components
import TagsPopup from './TagsPopup'

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  popupValues: null,
  rowId: null,
  closePopup: () => { },
  updateTag: () => { },
  createTag: () => { },
  intl: () => { }
}

/**
 * @test { TagsPopup }
 */
describe('`TagsPopup` render component', () => {
  test('does not throw warning with expected props', () => {
    checkProps(TagsPopup, defaultProps)
  })
})
