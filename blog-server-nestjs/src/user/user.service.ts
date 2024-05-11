import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginUserDTO } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findOne(loginUserDTO: LoginUserDTO) {
    const { username, password } = loginUserDTO;
    const user = await this.userRepository.findOneBy({ username, password });
    if (user) {
      const payload = {
        username: user.username,
        id: user.id,
        realname: user.realname,
      };
      return {
        token: await this.jwtService.signAsync(payload),
      };
    }

    throw new HttpException('用户名或密码错误', HttpStatus.BAD_REQUEST);
  }
}
