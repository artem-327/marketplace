import { Icon, Checkbox } from 'semantic-ui-react'
import PriceControl from './PriceControl'
import { Rule } from './Broadcast.style'


const EmptyIconSpace = () => <span style={{ width: '1.18em', display: 'inline-block', marginRight: '0.25rem' }}>&nbsp;</span>


const RuleItem = (props) => {
  const {
    onChange,
    onPriceChange,
    onRowClick,
    item,
    offer,
    item: { model: { name, rule } },
    hideFobPrice,
    filter,
    tree
  } = props

  const handleChange = (propertyName, e) => {
    e.preventDefault()
    e.stopPropagation()

    const value = rule[propertyName]
    const newValue = value === 1 ? 0 : 1

    const setBroadcast = node => {
      let { allChildrenBroadcasting, anyChildBroadcasting } = getNodeStatus(node)

      if (allChildrenBroadcasting) node.model.rule.broadcast = 1
      else if (anyChildBroadcasting) node.model.rule.broadcast = 2
      else node.model.rule.broadcast = 0
    }

    rule[propertyName] = newValue

    if (item.hasChildren()) {
      item.walk((node) => {
        node.model.rule.broadcast = newValue
      })
    }

    // let path = item.getPath()
    // path.pop()
    // path.forEach(n => setBroadcast(n))

    onChange(item)
  }

  const handleRowClick = (i) => {
    onRowClick(i)
  }

  const getNodeStatus = item => {
    let allChildrenBroadcasting = false, anyChildBroadcasting = false

    if (item.hasChildren()) {
      var all = item.all(n => !n.hasChildren()).length
      var broadcasted = item.all(n => !n.hasChildren() && n.model.rule.broadcast === 1).length

      anyChildBroadcasting = broadcasted > 0
      allChildrenBroadcasting = (all !== 0 && broadcasted !== 0 && all === broadcasted)
    }

    return { allChildrenBroadcasting, anyChildBroadcasting }

  }

  const nodePath = item.getPath()
  let { allChildrenBroadcasting } = getNodeStatus(item)

  const broadcastedParents = nodePath.reverse().slice(1).filter(n => n.model.rule.broadcast === 1)
  const parentBroadcasted = broadcastedParents.reverse()[0]
  const nodeBroadcast = rule.broadcast === 1 || allChildrenBroadcasting ? 1 : 0


  // const toggleDisabled = !!parentBroadcasted
  // const priceDisabled = rule.broadcast === 0 //!(rule.broadcast === 1 && !parentBroadcasted) //allChildrenBroadcasting || rule.broadcast !== 1 || toggleDisabled

  return (
    <>
      <Rule.Row depth={nodePath.length} type={rule.type} onClick={() => rule.type !== 'root' && handleRowClick(item)} data-test='broadcast_rule_row_click'>
        <Rule.RowContent>
          {(item.children.length > 0 && rule.type !== 'root') ? <Icon name={`chevron ${item.model.expanded ? 'down' : 'right'}`} /> : <EmptyIconSpace />}
          <span>{name}</span>
        </Rule.RowContent>

        <Rule.Toggle>
          <Checkbox
            className={(rule.priceOverride && nodeBroadcast === 1) && 'independent'}
            data-test='broadcast_rule_toggle_chckb'
            toggle
            fitted
            indeterminate={rule.broadcast === 2}
            checked={rule.broadcast === 1}
            // disabled={toggleDisabled}
            onClick={(e) => handleChange('broadcast', e)}
          />
        </Rule.Toggle>

        <PriceControl
          hideFobPrice={hideFobPrice}
          data-test='broadcast_price_control'
          offer={offer}
          disabled={rule.broadcast === 0}
          rootRule={parentBroadcasted ? parentBroadcasted.model.rule : null}
          rule={rule}
          item={item}
          onChange={onPriceChange}
        />

      </Rule.Row>

      {(item.model.expanded || rule.type === 'root') && item.children.map((i, idx) => (
        <RuleItem
          filter={filter}
          hideFobPrice={hideFobPrice}
          data-test={`broadcast_rule_item_${i}`}
          key={idx}
          item={i}
          tree={item}
          offer={offer}
          onRowClick={onRowClick}
          onPriceChange={onPriceChange}
          onChange={onChange}
        />
      ))}
    </>
  )
}

export default RuleItem