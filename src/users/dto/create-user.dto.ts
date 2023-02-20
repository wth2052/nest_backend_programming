import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { NotIn } from '../../utils/decorators/not-in';

export class CreateUserDto {
  // @Transform(({ value, obj }) => {
  //   if (obj.password.include(obj.name.trim())) {
  //     throw new BadRequestException('비번에 아디는 들어가면 앙대염');
  //   }
  //   return value.trim();
  // })
  @Transform((params) => params.value.trim())
  @NotIn('password', { message: '비밀번호에 아이디가 포함될 수 없습니다.' })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  // @Matches(/^[A-za-z\d!@#$%^&*()]{8, 30}$/)
  readonly password: string;
}
