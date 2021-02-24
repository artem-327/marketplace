import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'
//Components
import Header from '../../../../components/detail-row/header'

const DetailRow = props => {
  return (
    <Grid>
      <Header
        row={{
          insuranceRequirement: '$2,000,000 Generaly Liability',
          daysBeyondTerm: '> 15',
          creditRisk: 'Low',
          violations: '0',
          socialPresence: '>3 SocialHandles'
        }}
        attributes={['insuranceRequirement', 'daysBeyondTerm', 'creditRisk', 'violations', 'socialPresence']}
      />
    </Grid>
  )
}

DetailRow.propTypes = {
  row: PropTypes.object
}

DetailRow.defaultProps = {
  row: null
}

export default DetailRow
