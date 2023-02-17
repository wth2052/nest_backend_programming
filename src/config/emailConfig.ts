import { registerAs } from '@nestjs/config';
import * as process from 'process';

export default registerAs('email', () => ({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASSWORD,
  },
  baseUrl: process.env.MAIL_BASE_URL,
}));