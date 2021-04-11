import { useEffect, useState  } from 'react'
import { array, bool, func } from 'prop-types'
import { Grid } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
//Styles
import { GridInsurance, DivTitle, RectangleSubTitle, GridRowAddRow } from './Insurance.styles'
//Components
import ProdexTable from '../../../../components/table'
import BasicButton from '../../../../components/buttons/BasicButton'
import InsurancePopup from './InsurancePopup/InsurancePopup'
import ConfirmationPopup from '../../../../components/confirmation-popup/ConfirmationPopup'

//Constants
import { COLUMNS } from './Insurance.constants'
//Services
import { getRows } from './Insurance.services'

/**
 * @category My TradePass - Insurance
 * @component
 */
const Insurance = ({ rows, loading, getInsuranceDocuments, openPopup, isOpenPopup }) => {
  const [isOpenSuccessPopup, setIsOpenSuccessPopup] = useState(false)

  useEffect(() => {
    getInsuranceDocuments()
  }, [])

  return (
    <>
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
                rows={getRows(rows, { openPopup })}
                estimatedRowHeight={1000}
              />
            </div>
          </Grid.Column>
        </Grid.Row>
        <GridRowAddRow>
          <Grid.Column>
            <BasicButton
              onClick={() => openPopup()}
              data-test='settings_insurance_add_document_btn'>
              <b><FormattedMessage id='global.add' defaultMessage='Add' /></b>
            </BasicButton>
          </Grid.Column>
        </GridRowAddRow>
      </GridInsurance>
      {isOpenPopup && <InsurancePopup onUpload={() => setIsOpenSuccessPopup(true)} />}
      {isOpenSuccessPopup && (
        <ConfirmationPopup
          header={<FormattedMessage id='insurance.success' defaultMessage='Success!' />}
          description={
            <FormattedMessage
              id='insurance.yourInsuranceWillBe'
              defaultMessage='Your Insurance will be verified in 24-48 hours'
            />}
          onClose={() => setIsOpenSuccessPopup(false)}
          closeCaption={
            <FormattedMessage id='insurance.close' defaultMessage='Close'>
              {text => text}
            </FormattedMessage>
          }
        />
        )}
    </>
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
