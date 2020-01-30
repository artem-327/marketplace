import { getSafe } from '~/utils/functions'

export const normalizeTree = (tree, init = true) => {
  if (init) initTree(tree)

  tree.walk(n => {
    if (n.hasChildren()) {
      setBroadcast(n)
    }
  })

  return tree
}

export const initTree = tree => {
  tree.walk(node => {
    if (getSafe(() => getSafe(() => node.parent.model.rule.broadcast, node.parent.model.broadcast) === 1, false)) {
      node.model.rule ? (node.model.rule.broadcast = 1) : (node.model.broadcast = 1)
    }
  })

  return tree
}

export const getNodeStatus = item => {
  let allChildrenBroadcasting = false,
    anyChildBroadcasting = false

  if (item.hasChildren()) {
    var all = item.all(n => !n.hasChildren()).length
    var broadcasted = item.all(n => !n.hasChildren() && getSafe(() => n.model.rule.broadcast, n.model.broadcast) === 1)
      .length
    anyChildBroadcasting = !!item.first(n => {
      return (
        getSafe(() => n.model.rule.broadcast, n.model.broadcast) === 1 &&
        getSafe(() => n.model.rule.id, n.model.id) !== item.model.id
      )
    })

    allChildrenBroadcasting = all !== 0 && broadcasted !== 0 && all === broadcasted
  }

  return { allChildrenBroadcasting, anyChildBroadcasting }
}

export const getBroadcast = node => {
  let { allChildrenBroadcasting, anyChildBroadcasting } = getNodeStatus(node)
  let broadcast = 0
  if (allChildrenBroadcasting) broadcast = 1
  else if (anyChildBroadcasting) broadcast = 2

  return broadcast
}

export const setBroadcast = node => {
  let broadcast = getBroadcast(node)

  getSafe(() => node.model.rule.broadcast, null) !== null
    ? (node.model.rule.broadcast = broadcast)
    : (node.model.broadcast = broadcast)

  return broadcast
}
