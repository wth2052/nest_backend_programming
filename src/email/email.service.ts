import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: this.configService.get('NODEMAILER_SERVICE'),
      auth: {
        user: this.configService.get('NODEMAILER_EMAIL'),
        pass: this.configService.get('NODEMAILER_PASSWORD'),
      },
    });
  }

  async sendMemberJoinVerification(
    emailAddress: string,
    signupVerifyToken: string,
  ) {
    const baseUrl = this.configService.get('NODEMAILER_BASEURL');
    console.log('베이스', baseUrl);
    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
      가입확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
      <form action="${url}" method="POST">
        <button>가입확인</button>
      </form>
      `,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
