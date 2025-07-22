import { IsInt, IsString, MinLength, IsNumber, IsOptional } from 'class-validator';

export class UpdateExpenseDto {
  @IsOptional()
  @IsInt()
  group_id?: number;

  @IsOptional()
  @IsString()
  @MinLength(3)
  description?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsInt()
  paid_by?: number;
} 