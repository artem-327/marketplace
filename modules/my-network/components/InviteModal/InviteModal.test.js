import React from 'react'
import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, mountWithIntl, checkProps } from '../../../../test/testUtils'
//Components
import InviteModal from './InviteModal'
import { initialState } from '../../../add-bank-accounts/reducer'

//mock entire module for destructuring useState on import
const mockSetValue = jest.fn()
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: initialState => [initialState, mockSetValue]
}))

/**
 * @description Helper console.log view to see in each test what exactly is rendered in test.
 * console.log(component.debug()) // see what is exactly rendered
 */

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = {
  open: true, //needs to be true for open the Modal
  isError: false,
  loading: false,
  updating: false,
  onClose: () => {},
  search: () => {},
  detailCompany: null,
  buttonActionsDetailRow: () => {},
  openGlobalAddForm: null,
  intl: { formatMessage: () => {} }
}

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props Object props for component.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setProps = { ...defaultProps, ...props }
  //It needs to be used wrapped component for all Modals
  //Shallow method is used to render the single component that we are testing. It does not render child components.
  return shallow(<InviteModal.WrappedComponent {...setProps} />)
}

describe('renders InviteModal with default props', () => {
  test('does not throw warning with expected props', () => {
    //It checks components with default props.
    checkProps(InviteModal, defaultProps)
  })
  test('state updates with value of input box upon on change', () => {
    //It needs te be used mountWithIntl because in the component is react-intl.
    //It needs to be used wrapped component `WrappedComponent` for all Modals.
    //The method renders the full DOM including the child components of the parent component that we are running the tests.
    const wrapper = mountWithIntl(<InviteModal.WrappedComponent {...defaultProps} />)
    //Finds specific semantic Input from component.
    const divSemanticInput = findByTestAttr(wrapper, 'component-invite-modal-input')
    //Semantic Input is div and child is input. It's necessary to find input.
    const inputBox = divSemanticInput.find('input')
    //Setups value for input.
    const mockEvent = { target: { value: 'train' } }
    //Simulates onChange event on the input.
    inputBox.simulate('change', mockEvent)
    //Expect that React.useState will be called with value 'train'.
    expect(mockSetValue).toHaveBeenCalledWith('train')
  })
})
