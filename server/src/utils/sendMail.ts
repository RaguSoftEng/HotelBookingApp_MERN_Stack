import nodemailer from 'nodemailer';

async function sendMail(emialObj: any): Promise<boolean | Error> {
	try {
		console.log(process.env.EMAIL_USER + ' : ' + process.env.EMAIL_PASS);
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: Number(process.env.EMAIL_PORT),
			secure: false,
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASS
			}
		});

		const res = await transporter.sendMail({
			from: process.env.EMAIL_USER,
			to: emialObj.to,
			subject: emialObj.subject,
			text: emialObj.textBody
		});

		if (!res.messageId) {
			throw new Error('Unable to send the email.');
		}

		return true;
	} catch (error) {
		throw error;
	}
}

export default sendMail;
