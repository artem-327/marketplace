import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import { MoreVertical } from 'react-feather'
import { getSafe } from '~/utils/functions'

const getDropdownItems = (actions = [], row) =>
  actions.map((a, i) =>
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

function getContainerDimensions(element) {
  let parentEl = element.parentElement
  while (!parentEl.classList.contains("table-responsive") && parentEl !== null) {
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
  const bottomSpace = viewport.height - (element.parentNode.offsetTop - viewport.container.scrollTop) - element.offsetTop - element.clientHeight

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

export function rowActionsCellFormatter({ column: { actions }, row }) {
  const dropdownItems = getDropdownItems(actions, row)

  // Don't display if all dropdownItems are null
  const displayMenu = dropdownItems.findIndex(p => p !== null) >= 0

  return displayMenu ? (
    <Dropdown icon='' trigger={
      <MoreVertical data-test={`action_${row.id ? row.id : getSafe(() => row.key.replace(' ', '_'), 'undefined')}`} />
    } onOpen={(e) => repositionMenu(e.currentTarget)}>
      <Dropdown.Menu>{dropdownItems}</Dropdown.Menu>
    </Dropdown>
  ) : null
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
