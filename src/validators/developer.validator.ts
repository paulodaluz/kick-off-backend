import { IsString, IsEmail, IsUUID } from 'class-validator';
import { Developer } from 'src/interfaces/dev.interface';

export class RegisterDeveloperValidator implements Developer {
  @IsUUID()
  uuid: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  name: string;
}
