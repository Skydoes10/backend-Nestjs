import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('register')
    async register(@Request() req) {
        return this.authService.register(req.body);
    }

    @UseGuards(JwtAuthGuard)
    @Post('check')
    async checkAuth(@Request() req) {
        return this.authService.checkAuth(req.user);
    }
}