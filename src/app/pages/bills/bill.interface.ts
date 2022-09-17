export interface Bill {
  id: string;
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  sum: number;
  payment?: BillPayment;
}

export type BillPayment = 'monthly' | 'bi-monthly' | 'weekly' | 'yearly';
