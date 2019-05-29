import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly name: string;

  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  readonly role: string;

  readonly avatarUrl: string;

  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly lastName: string;

  readonly group: number;
}
