import {IsString, MinLength} from 'class-validator';
import { Transform } from 'class-transformer';
export class GroupsDto {
    id: number;

    @Transform(({value}) =>{
        if(value == "Admin"){
            value = "Owner";
        }
        return value;
    })
    @IsString()
    @MinLength(3)
    name: string;
}