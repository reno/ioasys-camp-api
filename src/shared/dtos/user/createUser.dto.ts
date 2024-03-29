import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateUserDTO {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public lastName: string;
 
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  //@Min(8)
  @Matches((/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*=(+){}|'";\\:[><.\],?/-]).{8,}$/), { message: 'password-is-too-weak' })
  public password: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public address: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public phone: string;
}
