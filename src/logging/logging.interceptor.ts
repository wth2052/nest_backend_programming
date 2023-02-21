import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: Logger) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, url, body } = context.getArgByIndex(0);
    this.logger.log(`Request to ${method}, ${url}`);
    return next
      .handle()
      .pipe(
        tap((data) =>
          this.logger.log(
            `${method}, ${url}로 부터 들어온 응답입니다. ${JSON.stringify(
              data,
            )}`,
          ),
        ),
      );
  }
}