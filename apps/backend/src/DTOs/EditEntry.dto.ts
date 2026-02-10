import { IsNotEmpty, IsString } from 'class-validator';

export class EditEntry {
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
