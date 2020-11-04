import { getSafe } from '~/utils/functions'

export const normalizeTree = (tree, init = true) => {
  // if (init) initTree(tree)
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
      if (!getSafe(() => node.model.rule.hidden)) {
        node.model.rule ? (node.model.rule.broadcast = 1) : (node.model.broadcast = 1)
      }
    }
  })

  return tree
}

export const getNodeStatus = (item, additionalCondition = () => true) => {
  let allChildrenBroadcasting = false,
    anyChildBroadcasting = false

  if (item.hasChildren()) {
    // vyber mi všechny nody (array of node) které nemají potomky a dej mi length toho array
    var all = item.all(n => !n.hasChildren()).length
    // dej mi length z array of nodes které nemají potomky a mají označení broadcasted = 1
    var broadcasted = item.all(n => {
      return !n.hasChildren() && getSafe(() => n.model.rule.broadcast, n.model.broadcast) === 1
    }).length
    // true nebo false pokud najde broadcast a n model.id se nerovná item.model.id (pravděpodobně root id)
    // v podstatě jestli je nějaký potom již broadcasted (toggled)
    anyChildBroadcasting = !!item.first(n => {
      return (
        getSafe(() => n.model.rule.broadcast, n.model.broadcast) === 1 &&
        getSafe(() => n.model.rule.id, n.model.id) !== item.model.id &&
        additionalCondition(n)
      )
    })
    // dej tru pokud jsou všichni potomci broadcasted (toggled)
    allChildrenBroadcasting = all !== 0 && broadcasted !== 0 && all === broadcasted
  }

  return { allChildrenBroadcasting, anyChildBroadcasting }
}

export const getBroadcast = node => {
  // vrátí se true nebo false pokud jsou všichni nebo jen nějací potomci broadcasted (toggled)
  let { allChildrenBroadcasting, anyChildBroadcasting } = getNodeStatus(node)
  let broadcast = 0
  if (allChildrenBroadcasting) broadcast = 1
  else if (anyChildBroadcasting) broadcast = 2
  // vrátí stav broadcastu (toogle), může být vypnutý (0, null, undefined), zapnutý zelený (1), zapnutý modrý (2)
  return broadcast
}

export const setBroadcast = node => {
  let broadcast = getBroadcast(node)
  // označí se celý root nebo parent podle brodcastu vypnutý (0, null, undefined), zapnutý zelený (1), zapnutý modrý (2)
  getSafe(() => node.model.rule.broadcast, null) !== null
    ? (node.model.rule.broadcast = broadcast)
    : (node.model.broadcast = broadcast)

  return broadcast
}
