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

Enzyme.configure({ adapter: new EnzymeAdapter() })

const defaultProps = { titleId: '', data: {}, blueValue: '' }

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} props Object props for component.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  return shallow(<ColumnSegment {...props} />)
}

describe('renders ColumnSegment with default props', () => {
  test('does not throw warning with expected props', () => {
    checkProps(ColumnSegment, defaultProps)
  })

  test('renders text `Title` when prop titleId is empty', () => {
    const props = { ...defaultProps, data: { id: 1 } }
    const wrapperIntl = mountWithIntl(<ColumnSegment {...props} />)
    const component = findByTestAttr(wrapperIntl, 'component-column-segment-title')

    expect(component.text()).toEqual('Title')
  })
})

describe('renders ColumnSegment with no props', () => {
  let wrapper

  beforeEach(() => {
    wrapper = setup({ data: {} })
  })

  test('renders without error with no props', () => {
    const component = findByTestAttr(wrapper, 'component-column-segment-row')
    expect(component.length).toBe(0)
  })
})

describe('renders ColumnSegment with values in props', () => {
  let wrapper
  const props = { data: { name: 'name', surname: 'surname' } }

  beforeEach(() => {
    wrapper = setup(props)
  })

  test('correct number of rows with props `data`', () => {
    const rows = findByTestAttr(wrapper, 'component-column-segment-row')
    expect(rows.length).toBe(Object.keys(props.data).length)
  })

  test('correct values in rows with props `data`', () => {
    const divValues = findByTestAttr(wrapper, 'component-column-segment-value')
    expect(divValues.length).toBe(Object.keys(props.data).length)
    divValues.forEach((div, i) => {
      const propsValues = Object.keys(props.data)
      expect(div.text()).toEqual(propsValues[i])
    })
  })
})
