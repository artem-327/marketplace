import styled from 'styled-components'
import { Label } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment/moment'
import { getLocaleDateFormat } from '../../../../components/date-format'
//Services
import { getSafe } from '../../../../utils/functions'

const StyledStatusLabel = styled(Label)`
  font-size: 12px !important;
  height: 22px !important;
  font-weight: normal !important;
  font-stretch: normal;
  font-style: normal;
  color: #ffffff !important;
  border-radius: 11px !important;

  padding: 0.3333em 1.16667em 0.16667em 1.16667em !important;

  &.false {
    background-color: #f16844 !important;
  }
  &.true {
    background-color: #84c225 !important;
  }
`


const StatusLabel = val => (
    <StyledStatusLabel className={val ? 'true' : 'false'}>
      {val ? (
        <FormattedMessage id='global.yes' defaultMessage='Yes' />
      ) : (
        <FormattedMessage id='global.no' defaultMessage='No' />
      )}
    </StyledStatusLabel>
)


export const getRows = datagrid => datagrid?.rows?.map(d => {
    const requestedByName = getSafe(() => d.requestedBy.name, null)
    const requestedByCompany = getSafe(() => d.requestedBy.company.cfDisplayName, null)

    return {
        id: d.id,
        rawData: d,
        attachments: d.attachments,
        productName: (
            <div style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.productName}</div>
        ),
        notes: <div style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{d.notes}</div>,
        processed: StatusLabel(d.processed),
        processed2: d.processed ? (
            <FormattedMessage id='global.yes' defaultMessage='Yes' />
        ) : (
            <FormattedMessage id='global.no' defaultMessage='No' />
        ),
        processedAt: d.processedAt && moment(d.processedAt).format(getLocaleDateFormat()),
        requestedAt: d.requestedAt && moment(d.requestedAt).format(getLocaleDateFormat()),
        requestedBy: requestedByName
            ? requestedByCompany
            ? requestedByName + ', ' + requestedByCompany
            : requestedByName
            : requestedByCompany
            ? requestedByCompany
            : 'N/A'
    }
})