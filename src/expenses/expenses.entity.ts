export interface Expense {
  id: number;
  group_id: number;
  description: string;
  amount: number;
  paid_by: number;
  created_at: Date;
} 