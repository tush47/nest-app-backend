import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class UpdateSettlementDto {
  @IsOptional()
  @IsInt()
  group_id?: number;

  @IsOptional()
  @IsInt()
  paid_by?: number;

  @IsOptional()
  @IsInt()
  paid_to?: number;

  @IsOptional()
  @IsNumber()
  amount?: number;
} 