import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { UserCreatedEvent } from './user-created.event';
import { User } from './user';

@Injectable()
export class UserFactory {
  // EventBus를 주입합니다.
  constructor(private eventBus: EventBus) {}

  // 유저 객체를 생성하는 create 함수를 제공.
  create(
    id: string,
    name: string,
    email: string,
    signupVerifyToken: string,
    password: string,
  ): User {
    //유저 객체를 생성하고 UserCreatedEvent를 발행하고, 생성한 유저 도메인 객체를 리턴함.
    const user = new User(id, name, email, password, signupVerifyToken);

    this.eventBus.publish(new UserCreatedEvent(email, signupVerifyToken));

    return user;
  }

  reconstitute(
    id: string,
    name: string,
    email: string,
    signupVerifyToken: string,
    password: string,
  ): User {
    return new User(id, name, email, password, signupVerifyToken);
  }
}
