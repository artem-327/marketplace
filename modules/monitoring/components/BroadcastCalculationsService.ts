import {BroadcastCalculationHistory, CalculationsTableRow, CalculationTarget, GraphPoint} from "./Model"

const getEntityId = (calculation: BroadcastCalculationHistory): number => {
    return calculation.calculationTarget === CalculationTarget.PRODUCT_OFFER ? calculation.productOffer : calculation.branch;
}

const formatDate = (date: Date): string => {
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}

const formatEntityType = (entityType: CalculationTarget): string => {
    return entityType === CalculationTarget.PRODUCT_OFFER ? "Product Offer" : "Branch";
}

export const getRows = (calculations: BroadcastCalculationHistory[]): CalculationsTableRow[] => {
    if (calculations) {
        return calculations.map((calculation, index) => ({
            id: index,
            entityType: formatEntityType(calculation.calculationTarget),
            entityId: getEntityId(calculation),
            viewsFound: calculation.viewsFound,
            durationMs: calculation.durationMs,
            threadId: calculation.threadId,
            endDate: formatDate(new Date(calculation.end)),
            startDate: formatDate(new Date(calculation.start))
        }))
    }
    return []
}

export const prepareGraphData = (data: GraphPoint[],maxPoints: number, running?: number, waiting?: number): GraphPoint[] => {
    if (data.length > maxPoints ) {
        data = data.slice(1, data.length)
    }
    return [
        ...data,
        {
            running: running || running === 0 ? running : data[data.length - 1].running,
            waiting: waiting || waiting === 0 ? waiting : data[data.length - 1].waiting
        }
    ]
}