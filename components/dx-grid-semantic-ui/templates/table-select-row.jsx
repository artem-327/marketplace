import * as PropTypes from 'prop-types'

export const TableSelectRow = ({
  selected,
  children,
  style,
  onToggle,
  selectByRowClick,
}) => (
  <tr
    style={style}
    className={selected ? 'table-active' : ''}
    onClick={(e) => {
      if (!selectByRowClick) return
      e.stopPropagation()
      onToggle()
    }}
  >
    {children}
  </tr>
)

TableSelectRow.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node,
  onToggle: PropTypes.func,
  selectByRowClick: PropTypes.bool,
  style: PropTypes.object,
}

TableSelectRow.defaultProps = {
  children: null,
  onToggle: () => {},
  selected: false,
  selectByRowClick: false,
  style: null,
}