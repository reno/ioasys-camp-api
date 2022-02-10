import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { instanceToInstance } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { UserGuard } from '@shared/guards/user.guard';
import { User } from '@shared/entities/user/user.entity';
import { UserService } from './user.service';
import { CreateUserDTO } from '@shared/dtos/user/createUser.dto';
import { UpdateUserDto } from '@shared/dtos/user/updateUser.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map(user => instanceToInstance(user));
  }

  @Get(':id')
  //@UseGuards(AuthGuard('jwt'), UserGuard)
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne({id});
    return instanceToInstance(user);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: User })
  @ApiBadRequestResponse({
    description: 'This will be returned when has validation error',
  })
  public async create(@Body() CreateUserDTO: CreateUserDTO) {
    const user = await this.userService.create(CreateUserDTO);
    return instanceToInstance(user);
  }

  @Patch(':id')
  //@UseGuards(AuthGuard('jwt'), UserGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,){
    const user = await this.userService.update(id, updateUserDto);
    return instanceToInstance(user);
  }
  
  @Delete(':id')
  //@UseGuards(AuthGuard('jwt'), UserGuard)
  async delete(@Param('id') id: string) {
    const user = await this.userService.remove(id);
    return instanceToInstance(user);
  }
}
