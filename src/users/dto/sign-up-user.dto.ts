import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { Roles } from "../enum/user.enum";

export class SignUpUserDto {
  @ApiProperty()
  @IsString()
  name: string

  @ApiProperty()
  @IsString()
  lastName: string

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsEnum(Roles, { each: true })
  role: Roles;
}
