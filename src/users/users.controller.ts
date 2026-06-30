import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() data: CreateUserDto) {
    return this.usersService.create(data);
  }

  @Post('teacher')
  createTeacher(@Body() data: CreateUserDto) {
    return this.usersService.createTeacher(data);
  }

  @UseGuards(AuthGuard)
  @Get('test')
  test(@Req() req) {
    return {
      message: 'passou zezinho',
      user: req.user,
    };
  }
}
