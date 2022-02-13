import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from '@shared/dtos/auth/login.dto';
import { UserService } from '@modules/users/user.service';
import { LoginStatus } from './interfaces/login-status.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { User } from '@shared/entities/user/user.entity';
import { UserDTO } from '@shared/dtos/user/user.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<LoginStatus> {
    const user = await this.userService.findByLogin(loginDTO);  
    const token = this._createToken(user);
    return {
      username: user.username,
      ...token,
    };
  }

  async validateUser(jwtPayload: JwtPayload): Promise<UserDTO> {
    const user = await this.userService.findByPayload(jwtPayload);
    if (!user) {
      throw new HttpException('Invalid token!', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }

  private _createToken({ username }: any): any {
    const expiresIn = process.env.EXPIRES_IN || '1d';
    const user: JwtPayload = { username };
    const accessToken = this.jwtService.sign(user);
    return { expiresIn, accessToken };
  }
}