import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Headers,
  UseGuards,
  Inject,
  LoggerService,
  InternalServerErrorException, Logger
} from "@nestjs/common";
import { CreateUserDto } from './dto/create-user.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserInfo } from './userInfo';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  // 회원가입
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<void> {
    // this.printWinstonLog(dto);
    this.printLoggerServiceLog(dto);
    const { name, email, password } = dto;
    // console.log(dto);
    await this.userService.createUser(name, email, password);
  }
  private printLoggerServiceLog(dto) {
    try {
      throw new InternalServerErrorException('test');
    } catch (e) {
      this.logger.error('error: ' + JSON.stringify(dto), e.stack);
    }
    this.logger.warn('warn: ' + JSON.stringify(dto));
    this.logger.log('log: ' + JSON.stringify(dto));
    this.logger.verbose('verbose: ' + JSON.stringify(dto));
    this.logger.debug('debug: ' + JSON.stringify(dto));
  }

  @Post('/email-verify')
  async verifyEmail(@Query() dto: VerifyEmailDto): Promise<string> {
    const { signupVerifyToken } = dto;
    console.log('토큰', signupVerifyToken);
    return await this.userService.verifyEmail(signupVerifyToken);
  }

  @Post('/login')
  async login(@Body() dto: LoginUserDto): Promise<string> {
    const { email, password } = dto;
    return await this.userService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getUserInfo(
    @Headers() headers: any,
    @Param('id') userId: string,
  ): Promise<UserInfo> {
    const jwtString = headers.authorization.split('Bearer ')[1];
    this.authService.verify(jwtString);
    return this.userService.getUserInfo(userId);
  }
}
