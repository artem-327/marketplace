import React, { Component } from 'react'
import cn from 'classnames'
import { Checkbox } from 'semantic-ui-react'
import styled from 'styled-components'
import _ from 'lodash'

const GroupCheckbox = styled(Checkbox)`
  margin: 0px 10px 0 5px;
  vertical-align: middle !important;
  height: 21px;
`

const Cell = ({
  className, colSpan, row, column,
  expanded, onToggle,
  children, tableRow, tableColumn,
  iconComponent: Icon, contentComponent: Content,
  selection,
  onSelectionChange,
  rowSelection,
  checked,
  indeterminate,
  ...restProps
}) => {
  
  const handleClick = () => onToggle()
  const groupCheckboxClick = (e) => onSelectionChange(row.key, !checked)

  return (
    <td
      key={row.key}
      colSpan={colSpan}
      className={cn('dx-g-bs4-cursor-pointer', className)}
      onClick={handleClick}
      {...restProps}
    >
      {rowSelection && (
        <GroupCheckbox
          checked={checked}
          indeterminate={indeterminate}
          onChange={groupCheckboxClick}
          onClick={e => { e.stopPropagation(); e.preventDefault() }}
          data-test='GroupCheckbox_onChange_chckb'
        />
      )}
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
        data-test='GroupCheckbox_onToggle_icon'
      />
    </td>
  )
}

export default Cell