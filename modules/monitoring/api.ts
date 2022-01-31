import api from '../../api'
import { BroadcastCalculationHistory, CalculationTarget } from './components/Model'

export default {
    getBroadcastCalculationsHistory: (filter?: { entityType: CalculationTarget, entityId: number}): Promise<BroadcastCalculationHistory[]> => {
        let url: string = `/prodex/api/admin/broadcasted-offers/calculation-history`
        if (filter) {
            const { entityId, entityType } = filter
            url = url.concat('?entityId=' + (entityId ? entityId : '') + '&entityType=' + (entityType ? entityType : ''))
        }
        return api
                .get(url)
                .then(res => res.data)
                .catch(err => console.error(err))
    }
}