import { useRef } from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'

// Styles
import { RowDropdown } from '../../styles'

const DropdownFixedOptions = props => {
  const ref = useRef(null)
  const { trigger, options } = props
  return (
    <RowDropdown
      ref={ref}
      onOpen={(e, data) => {
        const dropdownElement = ref.current.ref.current
        const dropdownList = dropdownElement.querySelector('.menu')
        const tableResponsive = dropdownElement.closest('div.table-responsive')
        dropdownList.setAttribute('style', `top: ${dropdownElement.getBoundingClientRect().top}px !important;`)
        tableResponsive.addEventListener("scroll", () => {
          ref.current?.close()
        })
      }}
      onClose={(e, data) => {
        const dropdownElement = ref.current.ref.current
        const dropdownList = dropdownElement.querySelector('.menu')
        const tableResponsive = dropdownElement.closest('div.table-responsive')
        dropdownList.setAttribute('style', ``)
        tableResponsive.removeEventListener("scroll", () => {
          ref.current?.close()
        })
      }}
      trigger={trigger}>
      <Dropdown.Menu>{options}</Dropdown.Menu>
    </RowDropdown>
  )
}

DropdownFixedOptions.propTypes = {
  trigger: PropTypes.node,
  options: PropTypes.array
}

DropdownFixedOptions.defaultProps = {
  trigger: null,
  options: []
}

export default DropdownFixedOptions