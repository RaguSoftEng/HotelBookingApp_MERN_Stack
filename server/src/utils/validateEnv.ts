import { cleanEnv, str, port } from 'envalid';

function validateEnv(): void {
	cleanEnv(process.env, {
		MONGO_PATH: str(),
		MONGO_USER: str(),
		MONGO_PASSWORD: str(),
		PORT: port({ default: 8080 }),
		JWT_SECRET: str(),
		EMAIL_HOST: str(),
		EMAIL_PORT: port({ default: 587 }),
		EMAIL_USER: str(),
		EMAIL_PASS: str()
	});
}

export default validateEnv;
