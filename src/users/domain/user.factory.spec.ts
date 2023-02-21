import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { UserFactory } from './user.factory';
import { User } from './user';

//describe()와  : 구문은 첫번째 인수로 문자열을 받음
describe('UserFactory', () => {
  //Test suite 전체에서 사용할 UserFactory 선언
  let userFactory: UserFactory;
  let eventBus: jest.Mocked<EventBus>;
  //Test.createTestingModule() 함수를 이용해 테스트 모듈 생성
  //모듈을 가져오는 것은 전체 Test Suite 한번만 하면 되니 beforeAll 구문 내에서 실행.
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserFactory,
        {
          provide: EventBus,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
      //Test.createTestingModule 함수의 리턴값은 TestingModuleBuilder이고, compile 함수를 수행해서 모듈 생성을 완료한다, 비동기 작업으로 처리됨
    }).compile();
    userFactory = module.get(UserFactory);
    eventBus = module.get(EventBus);
  });

  describe('유저 생성', () => {
    it('생성한 유저가 일치 하는지 검사', () => {
      //Given
      //When
      //UserFactory가 create 함수를 수행
      const user = userFactory.create(
        'user-id',
        '우태현',
        'wth2052@gmail.com',
        'signup-verify-token',
        'pass1234',
      );
      //Then
      // 수행결과가 맞는지 검증
      const expected = new User(
        'user-id',
        '우태현',
        'wth2052@gmail.com',
        'pass1234',
        'signup-verify-token',

      );
      //UserFactory.create를 통해 생성한 User객체가 원하는 객체가 맞는지 검사
      expect(expected).toEqual(user);
      //한번 호출되었는지 판단
      expect(eventBus.publish).toBeCalledTimes(1);
    });
  });
  describe('reconsitute', () => {
    it('should reconstitute user', () => {
      //Given
      //When
      const user = userFactory.reconstitute(
        'user-id',
        '우태현',
        'wth2052@gmail.com',
        'signup-verify-token',
        'pass1234',
      );
      //Then
      const expected = new User(
        'user-id',
        '우태현',
        'wth2052@gmail.com',
        'pass1234',
        'signup-verify-token',
      );
      expect(expected).toEqual(user);
    });
  });
});
