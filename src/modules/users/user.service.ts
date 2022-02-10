import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { alreadyExists } from '@shared/constants/errors';
import { User } from '@shared/entities/user/user.entity';
import { UserRepository } from '@modules/users/repository/user.repository';
import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';
import { UpdateUserDto } from '@shared/dtos/user/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findOne(options?: object): Promise<User> {
    return await this.userRepository.findOne(options);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(createUserDTO: CreateUserDTO): Promise<User> {
    const { email } = createUserDTO;
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new ConflictException(alreadyExists('email'));
    }
    const user = await this.userRepository.createUser(createUserDTO);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    let user: User = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST,);
    }
    const data = {
        ...user,
        ...updateUserDto,
    };
    await this.userRepository.update({ id }, data);
    user = await this.userRepository.findOne({where: { id } });
    return user;
  }

  async remove(id: string): Promise<User> {
    const user: User = await this.userRepository.findOne({where: { id },});
    if (!user) {
      throw new HttpException("User doesn't exist", HttpStatus.BAD_REQUEST);
    }
    await this.userRepository.delete({ id });
    return user;
  }
}
