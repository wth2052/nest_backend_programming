import * as uuid from 'uuid';
import * as ulid from 'ulid';
import { CreateUserHandler } from './create-user.handler';
import { UserFactory } from '../../domain/user.factory';
import { UserRepository } from '../../infra/db/repository/UserRepository';
import { Test } from '@nestjs/testing';
import { CreateUserCommand } from './create-user.command';
import { UnprocessableEntityException } from '@nestjs/common';

//CreateUserHandler.execute 내에서 uuid ulid 라이브러리 사용
//외부 라이브러리가 생성하는 임의의 문자열이 항상 같은 값이 나오도록 함

jest.mock('uuid');
jest.mock('ulid');
jest.spyOn(uuid, 'v1').mockReturnValue('0000-0000-0000-0000');
jest.spyOn(ulid, 'ulid').mockReturnValue('ulid');

describe('CreateUserHandler', () => {
  //테스트 대상인 CreateUserhandler와 의존하고 있는 클래스를 선언
  let createUserHandler: CreateUserHandler;
  let userFactory: UserFactory;
  let userRepository: UserRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        {
          //UserFactory를 모의 객체로 제공
          provide: UserFactory,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          //UserRepository를 모의 객체로 제공
          provide: 'UserRepository',
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    createUserHandler = module.get(CreateUserHandler);
    userFactory = module.get(UserFactory);
    userRepository = module.get('UserRepository');
  });
  //항상 같은 값을 가지는 변수를 미리 선언, 재사용
  const id = ulid.ulid();
  const name = '우태현1';
  const email = 'wth2053@gmail.com';
  const password = 'dkssudgktpdygg1';
  const signupVerifyToken = uuid.v1();

  describe('execute', () => {
    it('should execute CreateUserCommand', async () => {
      // Given
      //기본 테스트 케이스를 위해 userRepository에 저장된 유저가 없는 조건을 설정
      userRepository.findByEmail = jest.fn().mockResolvedValue(null);
      // When
      await createUserHandler.execute(
        new CreateUserCommand(name, email, password),
      );
      // Then
      //UserFactory 테스트는 테스트 대상 클래스가 의존하고 있는 객체의 함수를 단순히 홏루하는지만 검증했다면,
      //이번에는 인수까지 제대로 넘기고 있는지를 검증해야함.
      expect(userRepository.save).toBeCalledWith(
        id,
        name,
        email,
        password,
        signupVerifyToken,
      );
      expect(userFactory.create).toBeCalledWith(
        id,
        name,
        email,
        signupVerifyToken,
        password,
      );
    });
    it('should throw UnprocessableEntityException when user exists', async () => {
      //Given
      userRepository.findByEmail = jest.fn().mockResolvedValue({
        id,
        name,
        email,
        password,
        signupVerifyToken,
      });

      //When
      //Then
      await expect(
        createUserHandler.execute(new CreateUserCommand(name, email, password)),
      ).rejects.toThrowError(UnprocessableEntityException);
    });
  });
});
