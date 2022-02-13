import { EntityRepository, Repository } from 'typeorm';
import { User } from '@shared/entities/user/user.entity';
import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | undefined> {
    return this.findOne(id);
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<User> {
    const user = this.create(createUserDTO);
    return this.save(user);
  }
}
