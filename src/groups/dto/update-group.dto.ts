import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateGroupDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;
} 