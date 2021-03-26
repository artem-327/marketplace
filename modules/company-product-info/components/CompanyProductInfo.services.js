import { GridRow, GridColumn, Table } from 'semantic-ui-react'
import { FormattedMessage } from 'react-intl'

/**
 * Get table of TDS fields.
 * @param {{elements: {property: string, specifications: any}[]}} elements
 * @returns
 */
export const getTdsElements = ({ elements }) => {
  return (
    <>
      <GridRow className='table-name'>
        <GridColumn width={16}></GridColumn>
      </GridRow>
      <Table celled table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              <FormattedMessage id='global.property' defaultMessage='Property' />
            </Table.HeaderCell>
            <Table.HeaderCell>
              <FormattedMessage id='global.specifications' defaultMessage='Specifications' />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {elements.map((element, index) => (
            <Table.Row key={index}>
              <Table.Cell>{element?.property}</Table.Cell>
              <Table.Cell>{element?.specifications}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}
