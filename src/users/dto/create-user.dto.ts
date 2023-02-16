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
  // params) => params.value.trim() 공백 제거해서 유효성 검증 할꺼얌
  @Transform((params) => params.value.trim())
  @NotIn('password', {
    message: '비밀번호는 이름과 같은 문자열을 포함할 수 없습니다.',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsEmail()
  @MaxLength(60)
  readonly email: string;

  @IsString()
  @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/)
  readonly password: string;
}
