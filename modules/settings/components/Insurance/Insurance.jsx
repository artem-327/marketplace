import { useEffect } from 'react'
import { array, bool, func } from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
//Styles
import { GridInsurance, DivTitle, RectangleSubTitle } from './Insurance.styles'
//Components
import ProdexTable from '../../../../components/table'
//Constants
import { COLUMNS } from './Insurance.constants'

/**
 * @category My TradePass - Insurance
 * @component
 */
const Insurance = ({ rows, loading, getInsuranceDocuments }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getInsuranceDocuments()
    }
    //fetchData() // Uncommented after BE returns data
  }, [])

  return (
    <GridInsurance>
      <Grid.Row>
        <Grid.Column>
          <DivTitle>
            <FormattedMessage id='global.insurance' defaultMessage='Insurance' />
          </DivTitle>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <RectangleSubTitle>
            <FormattedMessage
              id='insurance.subTitle'
              defaultMessage='Add any Certificates of Insurance that you may have.'
            />
          </RectangleSubTitle>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <div className='flex stretched table-detail-rows-wrapper'>
            <ProdexTable
              tableName='insurance'
              columns={COLUMNS}
              loading={loading}
              rows={rows}
              estimatedRowHeight={1000}
            />
          </div>
        </Grid.Column>
      </Grid.Row>
    </GridInsurance>
  )
}

Insurance.propTypes = {
  rows: array,
  loading: bool,
  getInsuranceDocuments: func
}

Insurance.defaultProps = {
  rows: [],
  loading: false,
  getInsuranceDocuments: () => {}
}

export default Insurance
