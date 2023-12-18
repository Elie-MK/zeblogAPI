import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto) {
   try {
    createUserDto.createAt = new Date()
    createUserDto.pictureProfile = ''
    return await this.authService.createUser(createUserDto);
   } catch (error) {
    throw new ConflictException('User already exists')
    
   }
  }

  @Post('/login')
  login(@Body() createUserDto: CreateUserDto) {
    try {
      const user = this.authService.login(createUserDto);
      if (!user) {
        throw new NotFoundException('Invalid credentials');
      }
      return user;
    } catch (error) {
      return {
        message: 'Internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get('/users')
  findUser() {
    const users = this.authService.findUser();
    if (!users) {
      throw new Error('Users not found');
    }
    return users;
  }

  @Get('/users/:id')
  findByIdUser(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = this.authService.findByIdUser(id);
      if (!user) {
        throw new NotFoundException('User Not Found');
      }
      return user;
    } catch (error) {
        return {
            message: 'Internal server error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          };
    }
  }

    @Delete('/users/:id')
    deleteUser(@Param('id', ParseIntPipe) id: number) {
      try {
        const user = this.authService.deleteUser(id);
        if (!user) {
          throw new NotFoundException('User Not Found');
        }
        return console.log("User deleted succefully");
      } catch (error) {
        return {
            message: 'Internal server error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          };
      }
    }

    @Post('/users/:id')
    modifyUser(@Param('id', ParseIntPipe) id: number, @Body() createUserDto: CreateUserDto) {
      try {
        const user =  this.authService.modifyUser(id, createUserDto);
        if (!user) {
          throw new NotFoundException('User Not Found');
        }
        return user
      } catch (error) {
        return {
            message: 'Internal server error',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          };
      }
    }
}
