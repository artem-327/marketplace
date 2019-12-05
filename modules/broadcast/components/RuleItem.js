import { Icon, Checkbox } from 'semantic-ui-react'
import PriceControl from './PriceControl'
import { Rule } from './Broadcast.style'
import { getNodeStatus, setBroadcast } from '~/modules/broadcast/utils'
import { getSafe } from '~/utils/functions'

const EmptyIconSpace = () => (
  <span style={{ width: '1.18em', display: 'inline-block', marginRight: '0.25rem' }}>&nbsp;</span>
)

const RuleItem = props => {
  const {
    onChange,
    onPriceChange,
    onRowClick,
    item,
    offer,
    item: {
      model: { name, rule }
    },
    hideFobPrice,
    filter,
    loadingChanged,
    asSidebar
    // tree,
  } = props

  const handleChange = (propertyName, e) => {
    // loadingChanged(true)

    e.preventDefault()
    e.stopPropagation()

    const value = rule[propertyName]
    const newValue = value === 1 ? 0 : 1

    rule[propertyName] = newValue

    if (item.hasChildren()) {
      item.walk(node => {
        node.model.rule.broadcast = newValue
      })
    }

    // let path = item.getPath()
    // path.pop()
    // path.forEach(n => setBroadcast(n))
    onChange(item)
  }

  const handleRowClick = i => {
    onRowClick(i)
  }

  const nodePath = item.getPath()
  let { allChildrenBroadcasting, anyChildBroadcasting } = getNodeStatus(item)

  const broadcastedParents = nodePath
    .reverse()
    .slice(1)
    .filter(n => n.model.rule.broadcast === 1)
  const parentBroadcasted = broadcastedParents.reverse()[0]
  const nodeBroadcast = rule.broadcast === 1 || allChildrenBroadcasting ? 1 : 0

  const companyName =
    getSafe(() => item.model.rule.type, '') === 'branch' &&
    getSafe(() => item.parent.model.rule.elements[0].type, '') === 'company' &&
    getSafe(() => item.parent.model.rule.elements[0].name, '')
      ? `${item.parent.model.rule.elements[0].name} - `
      : ''

  // const toggleDisabled = !!parentBroadcasted
  // const priceDisabled = rule.broadcast === 0 //!(rule.broadcast === 1 && !parentBroadcasted) //allChildrenBroadcasting || rule.broadcast !== 1 || toggleDisabled

  return (
    <>
      <Rule.Row
        depth={nodePath.length}
        type={rule.type}
        onClick={() => rule.type !== 'root' && handleRowClick(item)}
        data-test='broadcast_rule_row_click'
        style={asSidebar ? { 'justify-content': 'flex-end' } : {}}>
        <Rule.RowContent>
          {item.children.length > 0 && rule.type !== 'root' ? (
            <Icon name={`chevron ${item.model.expanded ? 'down' : 'right'}`} />
          ) : (
            <EmptyIconSpace />
          )}
          <span>{`${companyName} ${name}`}</span>
        </Rule.RowContent>

        <Rule.Toggle style={asSidebar ? { flex: '0 0 60px' } : null}>
          <Checkbox
            className={rule.priceOverride && nodeBroadcast === 1 && 'independent'}
            data-test='broadcast_rule_toggle_chckb'
            toggle
            fitted
            indeterminate={!allChildrenBroadcasting && anyChildBroadcasting}
            checked={rule.broadcast === 1 || allChildrenBroadcasting}
            // disabled={toggleDisabled}
            onClick={e => handleChange('broadcast', e)}
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

      {(item.model.expanded || rule.type === 'root') &&
        item.children.map((i, idx) => (
          <RuleItem
            loadingChanged={loadingChanged}
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
            asSidebar={asSidebar}
          />
        ))}
    </>
  )
}

export default RuleItem
