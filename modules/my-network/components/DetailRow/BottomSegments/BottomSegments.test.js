import Enzyme, { shallow, ShallowWrapper } from 'enzyme'
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17'

// Utils
import { findByTestAttr, mountWithIntl, checkProps } from '../../../../../test/testUtils'
//Components
import ColumnSegment from './ColumnSegment'

/**
 * @description Helper console.log view to see in each test what exactly is rendered in test.
 * console.log(component.debug()) // see what is exactly rendered
 */
//Configure Enzyme with adapter for React 17
Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = { titleId: '', data: {}, blueValue: '' }

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props Object props for component.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  //Shallow method is used to render the single component that we are testing. It does not render child components.
  return shallow(<ColumnSegment {...props} />)
}

describe('renders ColumnSegment with default props', () => {
  test('does not throw warning with expected props', () => {
    //It checks components with default props.
    checkProps(ColumnSegment, defaultProps)
  })

  test('renders text `Title` when prop titleId is empty', () => {
    const props = { ...defaultProps, data: { id: 1 } }
    //It needs te be used mountWithIntl because in the component is react-intl.
    const wrapperIntl = mountWithIntl(<ColumnSegment {...props} />)
    //It finds specific node with data-test='component-column-segment-title' from component.
    const component = findByTestAttr(wrapperIntl, 'component-column-segment-title')
    //It expects text `Title` in component if props `titleId` is empty.
    expect(component.text()).toEqual('Title')
  })
})

describe('renders ColumnSegment only with empty required props', () => {
  let wrapper
  //Function allows us to setup some variables or functions for all bellow tests in `describe` statement (function).
  beforeEach(() => {
    wrapper = setup({ data: {} })
  })

  test('renders without error with no props', () => {
    //It finds specific node (component) with data-test='component-column-segment-row' from component.
    const component = findByTestAttr(wrapper, 'component-column-segment-row')
    //It expects no rows and without error in the component if props `data` is empty object.
    expect(component.length).toBe(1)
  })
})

describe('renders ColumnSegment with values in props `data`', () => {
  let wrapper
  const props = { data: { name: 'name', surname: 'surname' } }
  //Function allows us to setup some variables or functions for all bellow tests in `describe` statement (function).
  beforeEach(() => {
    wrapper = setup(props)
  })

  test('correct number of rows if props `data` has some attributes', () => {
    //It finds specific node (component) with data-test='component-column-segment-row' from component.
    const rows = findByTestAttr(wrapper, 'component-column-segment-row')
    //It expects some divValues in object if provides props `data`.
    expect(rows.length).toBe(Object.keys(props.data).length)
  })

  test('correct values in rows if props `data` has some attributes', () => {
    //It finds specific node (component) with data-test='component-column-segment-value' from component.
    const divValues = findByTestAttr(wrapper, 'component-column-segment-value')
    //Tests all divValues components if they have correct value from props `data`.
    divValues.forEach((div, i) => {
      const propsValues = Object.keys(props.data)
      //It expects the same value in components which are presents in props `data`.
      expect(div.text()).toEqual(propsValues[i])
    })
  })
})
