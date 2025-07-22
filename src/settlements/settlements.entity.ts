export interface Settlement {
  id: number;
  group_id: number;
  paid_by: number;
  paid_to: number;
  amount: number;
  created_at: Date;
} 