import cn from 'classnames'

const Cell = ({
  className, colSpan, row, column,
  expanded, onToggle,
  children, tableRow, tableColumn,
  iconComponent: Icon, contentComponent: Content,
  ...restProps
}) => {
  const handleClick = () => onToggle()
  
  return (
    <td
      colSpan={colSpan}
      className={cn('dx-g-bs4-cursor-pointer', className)}
      onClick={handleClick}
      {...restProps}
    >
      <Content
        column={column}
        row={row}
      >
        {children}
      </Content>
      <Icon
        expanded={expanded}
        onToggle={onToggle}
        className="mr-2"
      />
    </td>
  )
}

export default Cell