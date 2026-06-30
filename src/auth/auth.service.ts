import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTime: string;
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTime = this.configService.get<string>(
      'JWT_EXPIRATION_TIME',
    )!;
  }

  async login(user: LoginDto) {
    const userExists = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (
      !userExists ||
      !(await bcrypt.compare(user.password, userExists.password))
    ) {
      throw new UnauthorizedException('Credentials invalid');
    }
    const payload = {
      sub: userExists.id,
      email: userExists.email,
      role: userExists.role,
    };
    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTime };
  }
}
