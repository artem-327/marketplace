import Enzyme from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, mountWithIntl, checkProps, storeFactory } from '../../../test/testUtils'
//Components
import AddBankAccounts from './AddBankAccounts'

/**
 * @description Helper console.log view to see in each test what exactly is rendered in test.
 * console.log(component.debug()) // see what is exactly rendered
 */

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
    getVellociToken: () => {},
    getVellociBusinessId: () => {},
    addVellociAcount: () => {},
    onEventVelloci: () => {},
    vellociToken: '',
    vellociBusinessId: '',
    magicToken: '',
    loading: false,
    toastManager: null
}

describe('`My Network` renders InviteModal', () => {
  
  test('does not throw warning with expected props', () => {
    //It checks components with default props.
    checkProps(AddBankAccounts, defaultProps)
  })

})
