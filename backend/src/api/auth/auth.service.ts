import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private readonly adminData = {
    login: this.configService.get<string>('ADMIN_LOGIN'),
    password: this.configService.get<string>('ADMIN_PASSWORD'),
  };

  async validateUser(loginDto: LoginDto): Promise<string | null> {
    const { login, password } = loginDto;
    if (
      login === this.adminData.login &&
      password === this.adminData.password
    ) {
      const payload = { login };
      return this.jwtService.sign(payload);
    }
    return null;
  }
}
