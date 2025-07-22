import { IsInt } from 'class-validator';

export class AddRemoveMemberDto {
  @IsInt()
  userId: number;
} 