import ProdexTable from '../../../components/table'
import { columns } from '../constants'

const CalculationsTable = (props) => {

    return (
        <div className='flex stretched table-detail-rows-wrapper vertically-aligned' style={{marginLeft: 50, height: '600px', width: '90%'}}>
            <ProdexTable
                tableName='broadcast-calculations-table'
                columns={columns}
                rows={props.rows}
            />
        </div>
    )
}

export default CalculationsTable