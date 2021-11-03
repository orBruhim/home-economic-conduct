export interface Bill {
    id: number;
    title: string;
    startDate: Date | string;
    endDate: Date | string;
    sum: number;
    payment?: string
}