/**
 * @category Dashboard - CustomTooltip
 * @function
 */
export const CustomTooltip = ({ payload, label, active, unitsCurrency }) => {
    if (active) {
      return (
        <div
          className='recharts-default-tooltip'
          style={{
            margin: '0px',
            padding: '10px',
            backgroundColor: 'rgb(255, 255, 255)',
            border: '1px solid rgb(204, 204, 204)',
            whiteSpace: 'nowrap'
          }}>
          <p className='recharts-tooltip-label' style={{ margin: '0px' }}>
            {label}
          </p>
          <ul className='recharts-tooltip-item-list' style={{ padding: '0px', margin: '0px' }}>
            <li
              className='recharts-tooltip-item'
              style={{ display: 'block', paddingTop: '4px', paddingBottom: '4px', color: 'rgb(37, 153, 213)' }}>
              <span className='recharts-tooltip-item-name'>{payload[0].name}</span>
              <span className='recharts-tooltip-item-separator'> : </span>
              <span className='recharts-tooltip-item-value'>{payload[0].value}</span>
              <span className='recharts-tooltip-item-unit'>
                {unitsCurrency === 0
                  ? '$'
                  : unitsCurrency === 1
                    ? 'k$'
                    : unitsCurrency === 2
                      ? 'M$'
                      : unitsCurrency === 3
                        ? 'B$'
                        : 'T$'}
              </span>
            </li>
          </ul>
        </div>
      )
    }
    return null
}
/**
 * @category Dashboard - formatYAxis
 * @function
 */
export const formatYAxis = tickItem => {
    return `$${tickItem}`
}