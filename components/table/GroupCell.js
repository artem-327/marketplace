import React, { Component } from 'react'
import cn from 'classnames'
import { Checkbox } from 'semantic-ui-react'
import { ChevronDown, ChevronRight } from 'react-feather'
import styled from 'styled-components'
import _ from 'lodash'

const GroupCheckbox = styled(Checkbox)`
  margin: 1px 0px;
  vertical-align: top !important;
  height: 17px;
`

const Cell = ({
  className,
  colSpan,
  row,
  column,
  expanded,
  onToggle,
  actionsDropdown,
  children,
  tableRow,
  tableColumn,
  iconComponent: Icon,
  contentComponent: Content,
  selection,
  onSelectionChange,
  rowSelection,
  checked,
  indeterminate,
  hideCheckboxes,
  ...restProps
}) => {
  const handleClick = () => onToggle()
  const groupCheckboxClick = e => onSelectionChange(row.key, !checked)

  return (
    <>
      <td className="p-0"></td>
      {rowSelection && !hideCheckboxes && (
        <td className="text-center">
          <GroupCheckbox
            checked={checked}
            indeterminate={indeterminate}
            onChange={groupCheckboxClick}
            onClick={e => {
              e.stopPropagation()
              e.preventDefault()
            }}
            data-test='GroupCheckbox_onChange_chckb'
          />
        </td>
      )}
      <td className="actions">
        {actionsDropdown}
      </td>
      <td
        key={row.key}
        colSpan={colSpan - ((rowSelection && !hideCheckboxes) ? 4 : 3)}
        className={cn('dx-g-bs4-cursor-pointer', className)}
        onClick={handleClick}
        {...restProps}>
        <div className='group-right'>
          {expanded ? (
            <ChevronDown onToggle={onToggle} data-test='GroupCheckbox_onToggle_icon' />
          ) : (
            <ChevronRight onToggle={onToggle} data-test='GroupCheckbox_onToggle_icon' />
          )}
        </div>
        <div className='group-content'>
          <Content column={column} row={row}>
            {children}
          </Content>
        </div>
      </td>
      <td className="p-0"></td>
    </>
  )
}

export default Cell
