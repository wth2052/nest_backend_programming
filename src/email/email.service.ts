import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';

interface EamilOptions {
	to: string;
	subject: string;
	html: string;
}

@Injectable()
export class EmailService {
	private transporter: Mail;

	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: '',
				pass: '',
			},
		});
	}

	async sendMemberJoinVerification(
		emailAddress: string,
		signupVerifyToken: string,
	) {
		const baseUrl = 'http://localhost:3000';

		const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`;

		const mailOptions: EamilOptions = {
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
