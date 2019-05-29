import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from '../user/services/user.service';
import { ResponseData } from '../interfaces/response-data.interface';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { Token } from '../interfaces/token.interface';
import { auth } from '../../../data/config.json';
import { User } from '../interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private createToken(user: JwtPayload): Token {
    const expiresIn = new Date(+(new Date()) + auth.expires * 1000);
    return {
      expiresIn,
      accessToken: this.jwtService.sign(user, { expiresIn: auth.expires }),
    };
  }

  async validateUserByPassword(
    loginAttempt: LoginUserDto,
  ): Promise<ResponseData> {
    const { name, password } = await this.userService.findOneByName(
      loginAttempt.name,
    );

    if (!compareSync(loginAttempt.password, password)) {
      throw new UnauthorizedException();
    }

    return {
      user: await this.userService.findUserInfoByName(name),
      token: this.createToken({ name }),
    };
  }

  async validateUserByJwt(payload: JwtPayload): Promise<User> {
    const user = await this.userService.findUserInfoByName(payload.name);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
