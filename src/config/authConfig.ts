import * as process from 'process';
import 'dotenv/config';
import { registerAs } from '@nestjs/config';
export default registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
}));

console.log(process.env.TEST);
