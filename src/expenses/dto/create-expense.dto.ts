import { IsInt, IsString, MinLength, IsNumber } from 'class-validator';

export class CreateExpenseDto {
  @IsInt()
  group_id: number;

  @IsString()
  @MinLength(3)
  description: string;

  @IsNumber()
  amount: number;

  @IsInt()
  paid_by: number;
} 