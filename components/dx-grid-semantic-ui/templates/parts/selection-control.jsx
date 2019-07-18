import * as React from 'react'
import * as PropTypes from 'prop-types'
import classNames from 'classnames'

import { Checkbox } from 'semantic-ui-react'

export const SelectionControl = ({
  disabled, checked, indeterminate, onChange, className, ...restProps
}) => (
  <Checkbox
    className={classNames({
    }, className)}
    type="checkbox"
    disabled={disabled}
    checked={checked}
    indeterminate={indeterminate}
    onChange={() => {
      if (disabled) return
      onChange()
    }}
    onClick={e => e.stopPropagation()}
    {...restProps}
  />
)

SelectionControl.propTypes = {
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  className: PropTypes.string,
}

SelectionControl.defaultProps = {
  disabled: false,
  checked: false,
  indeterminate: false,
  onChange: () => {},
  className: undefined,
}