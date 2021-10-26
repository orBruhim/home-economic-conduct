export interface Bill {
    id: number;
    title: string;
    startDate: Date;
    endDate: Date;
    sum: number;
    payment: string
}