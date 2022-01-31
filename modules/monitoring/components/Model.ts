export interface BroadcastCalculationHistory {
    calculationTarget: CalculationTarget,
    branch?: number,
    productOffer?: number,
    start: string,
    end: string,
    viewsFound: number,
    threadId: number,
    durationMs: number
}

export interface CalculationsTableRow {
    id: number,
    entityType: string,
    entityId: number,
    durationMs: number,
    viewsFound: number,
    threadId: number,
    endDate: string,
    startDate: string
}

export enum CalculationTarget {
    PRODUCT_OFFER = 'PRODUCT_OFFER',
    BRANCH = 'BRANCH'
}

export interface CurrentBroadcastCalculations {
    count: number,
    records: BroadcastCalculationHistory[]
}

export interface GraphPoint {
    running: number,
    waiting: number,
}

export enum GraphPointType {
    RUNNING = 'Running',
    WAITING = 'Waiting'
}