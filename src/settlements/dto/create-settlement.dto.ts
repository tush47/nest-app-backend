import { IsInt, IsNumber } from 'class-validator';

export class CreateSettlementDto {
  @IsInt()
  group_id: number;

  @IsInt()
  paid_by: number;

  @IsInt()
  paid_to: number;

  @IsNumber()
  amount: number;
} 