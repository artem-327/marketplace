import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
// import { filterTypes } from '../constants/filter'
import { findByTestAttr, mountWithIntl, checkProps, storeFactory } from '../../../../test/testUtils'
//Components
import AddCertifications from './AddCertifications'

/**
 * @description Helper console.log view to see in each test what exactly is rendered in test.
 * console.log(component.debug()) // see what is exactly rendered
 */

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  onClose: () => {},
  onUpload: () => {},
  popupValues: { docType: null, uploadedFile: null }
}

describe('`AddCertifications` render component', () => {

  test('does not throw warning with expected props', () => {
    //It checks components with default props.
    checkProps(AddCertifications, defaultProps)
  })

})
