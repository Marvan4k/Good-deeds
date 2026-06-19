import { IsString, IsOptional } from 'class-validator';

export class UpdateGoodDeedDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;
}