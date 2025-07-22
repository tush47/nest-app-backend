import { IsArray, ArrayNotEmpty, IsInt, IsNumber } from 'class-validator';

export class SplitExpenseDto {
  @IsArray()
  @ArrayNotEmpty()
  userIds: number[];

  @IsArray()
  @ArrayNotEmpty()
  shares: number[];
} 