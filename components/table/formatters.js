import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import { MoreVertical } from 'react-feather'
import { getSafe } from '~/utils/functions'
import styled from 'styled-components'

const DropdownActions = styled(Dropdown)`
  display: block !important;
`

const getDropdownItems = (actions = [], row) => {
  if (!getSafe(() => actions.length, false)) return
  return actions.map((a, i) =>
    'hidden' in a && typeof a.hidden === 'function' && a.hidden(row) ? null : (
      <Dropdown.Item
        data-test={`action_${row.id}_${i}`}
        key={i}
        text={typeof a.text !== 'function' ? a.text : a.text(row)}
        disabled={getSafe(() => a.disabled(row), false)}
        onClick={() => a.callback(row)}
      />
    )
  )
}

function getContainerDimensions(element) {
  let parentEl = element.parentElement
  while (parentEl !== null && !parentEl.classList.contains('table-responsive')) {
    parentEl = parentEl.parentElement
  }

  const width = parentEl ? parentEl.clientWidth : null
  const height = parentEl ? parentEl.clientHeight : null

  return {
    container: parentEl,
    width,
    height
  }
}

function repositionMenu(element) {
  const viewport = getContainerDimensions(element)

  // Calculate free space around dropdown
  const topSpace = element.parentNode.offsetTop - viewport.container.scrollTop + element.offsetTop
  const bottomSpace =
    viewport.height -
    (element.parentNode.offsetTop - viewport.container.scrollTop) -
    element.offsetTop -
    element.clientHeight

  // Changing dropdown behavior as we know more about available space (top/bottom)
  if (topSpace > bottomSpace) {
    if (!element.getAttribute('data-upward')) {
      element.setAttribute('data-upward', true)
    }
  } else {
    if (element.getAttribute('data-upward')) {
      element.removeAttribute('data-upward')
    }
  }
}

export function rowActionsCellFormatter({ column: { actions, name }, row, groupLength }) {
  const dropdownItems = getDropdownItems(actions, row)

  // Don't display if all dropdownItems are null
  const displayMenu = getSafe(() => dropdownItems.length, false) ? dropdownItems.findIndex(p => p !== null) >= 0 : false

  let trigger = row[name]
  if (row.groupedBy && row.key) {
    const nameGroup = row.key.split('_')[0]
    trigger = (
      <span style={{ fontWeight: '600', color: '#2599d5' }}>
        {nameGroup ? nameGroup : 'Unmapped'} <span style={{ color: '#848893' }}>({groupLength})</span>
      </span>
    )
  }

  return displayMenu ? (
    <DropdownActions icon='' trigger={trigger} onOpen={e => repositionMenu(e.currentTarget)}>
      <Dropdown.Menu>{dropdownItems}</Dropdown.Menu>
    </DropdownActions>
  ) : (
    trigger
  )
}

export const dropdownFormatter = ({ column: { options }, row }) => {
  const opts = options.map(p => ({
    text: p.text,
    value: p.value,
    key: p.value,
    callback: p.callback
  }))

  return (
    <Dropdown
      style={{ margin: '-6px' }}
      placeholder='Select permission'
      selection
      fluid
      defaultValue={opts[0].value}
      options={opts}
    />
  )
}
