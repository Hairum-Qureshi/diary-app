import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateEntry {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
