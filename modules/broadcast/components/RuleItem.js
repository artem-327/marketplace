import { Icon, Checkbox } from 'semantic-ui-react'
import PriceControl from './PriceControl'
import { Rule } from './Broadcast.style'
import { getSafe } from '~/utils/functions'

const EmptyIconSpace = () => <span style={{ width: '1.18em', display: 'inline-block', marginRight: '0.25rem' }}>&nbsp;</span>


const RuleItem = (props) => {
  const {
    onChange,
    onPriceChange,
    onRowClick,
    item,
    offer,
    item: { model: { name, rule } },
    hideFobPrice
  } = props

  const handleChange = (propertyName, e) => {
    e.preventDefault()
    e.stopPropagation()

    const value = rule[propertyName]
    const newValue = value === 1 ? 0 : 1

    rule[propertyName] = newValue

    if (item.hasChildren()) {
      item.walk((node) => {
        node.model.rule.broadcast = newValue
      })
    } else {
      // If node has no children, than user changed leaf node
      let { parent } = item
      let { allChildrenBroadcasting, anyChildBroadcasting } = getNodeStatus(parent)

      // Meaning, if children of parent of clicked/changed leaf node are:

      // All Broadcasting - then parent must be broadcasting as well
      if (allChildrenBroadcasting) parent.model.rule.broadcast = 1
      // Only some of them broadcasting - parent must be indepedent
      else if (anyChildBroadcasting) parent.model.rule.broadcast = 2
      // None of them broadcasting - parent is not broadcasting as well
      else parent.model.rule.broadcast = 0
    }

    onChange(rule)
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
            checked={nodeBroadcast === 1 || (getSafe(() => item.parent.model.rule.broadcast === 1, false) && !item.hasChildren())}
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
          hideFobPrice={hideFobPrice}
          data-test={`broadcast_rule_item_${i}`}
          key={idx}
          item={i}
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