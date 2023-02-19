import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import * as uuid from 'uuid';
import { EmailService } from '../email/email.service';
import { UserInfo } from './userInfo';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import { ulid } from 'ulid';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(UserEntity)
    private userEntiyRepository: Repository<UserEntity>,
    private dataSource: DataSource, // typeorm에서 제공하는 DataSource 객체를 주입
  ) {}

  // 회원가입
  async createUser(name: string, email: string, password: string) {
    const userExist = await this.checkUserExists(email);
    if (userExist) {
      throw new UnauthorizedException('이미 가입된 메일 입니다.');
    }

    const signupVerifyToken = uuid.v1();

    // await this.saveUser(name, email, password, signupVerifyToken);
    // await this.sendMemberJoinEmail(email, signupVerifyToken);

    await this.saveUserUsingQueryRunner(
      name,
      email,
      password,
      signupVerifyToken,
    );
  }

  // 유저 조회
  private async checkUserExists(email: string): Promise<boolean> {
    const user = await this.userEntiyRepository.findOne({
      where: { email },
    });

    return user !== null;
  }

  // 이메일 인증 로직
  async verifyEmail(signupVerifyToken: string): Promise<string> {
    // TODO
    // 1. DB에서 Token으로 회원 가입 처리중인 유저가 있는지 조회하고 없다면 에러 처리
    // 2. 바로 로그인 상태가 되도록 JWT를 발급
    throw new Error('Method not implemented');
  }

  // 회원가입 데이터 저장
  private async saveUser(
    name: string,
    email: string,
    password: string,
    signupVerifyToken: string,
  ) {
    const user = new UserEntity(); // 새로운 유저 엔티티 객체를 생성
    user.id = ulid(); // 인수로 전달받은 유저 정보를 엔티티에 설정
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;
    await this.userEntiyRepository.save(user); // 저장소를 이용하여 엔티티를 데이터베이스에 저장.
  }

  // 트랜잭션
  private async saveUserUsingQueryRunner(
    name: string,
    email: string,
    password: string,
    signupVeriyToken: string,
  ) {
    const queryRunner = this.dataSource.createQueryRunner(); // 1. 주입받은 DataSource 객체에서 QueryRunner를 생성

    await queryRunner.connect(); // 2. QueryRunner에서 DB에 연결 후 트랜잭션을 시작
    await queryRunner.startTransaction(); // 2

    try {
      const user = new UserEntity();
      user.id = ulid();
      user.name = name;
      user.email = email;
      user.password = password;
      user.signupVerifyToken = signupVeriyToken;

      await queryRunner.manager.save(user); // 3. 정상 동작을 수행핬다면 트랜잭션을 커밋하여 영속화 한다.

      // throw new InternalServerErrorException(); //5.  일부러 에러를 발생시켜 본다

      // await queryRunner.commitTransaction(); // 4. DB 작업을 수행한 후 커밋을 해서 영속화를 완료합니다.
    } catch (e) {
      // 에러가 발생하면 롤백
      await queryRunner.rollbackTransaction(); // 5. 에러가 발생하면 직접 롤백을 수행합니다.
    } finally {
      // 직접 생성한 QueryRunner는 해제시켜 주어야 함
      await queryRunner.release(); // 6. finally 구문을 통해 생성한 queryRunner 객체를 해제합니다. 생성한 QueryRunner는 해제해야한다.
    }
  }

  // 인증메일 전송
  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(
      email,
      signupVerifyToken,
    );
  }

  // 로그인
  async login(email: string, password: string): Promise<string> {
    // TODO
    // 1. email, password를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에러 처리
    // 2. JWT를 발급

    throw new Error('Method not implemented');
  }

  // 유저 정보 조희
  async getUserInfo(userId: string): Promise<UserInfo> {
    // TODO
    // 1. userId를 가진 유저가 존재하는지 DB에서 확인하고 없다면 에처리
    // 2. 조회된 데이터를 UserInfo 타입으로 응답

    throw new Error('Method not implemented');
  }
}
