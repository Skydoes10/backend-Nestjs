import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env.development',
		}),
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.SECRET_KEY,
			signOptions: { expiresIn: '1h' },
		}),],
	controllers: [AuthController],
	providers: [AuthService, LocalStrategy, JwtStrategy],
	exports: [AuthService],

})
export class AuthModule { }
