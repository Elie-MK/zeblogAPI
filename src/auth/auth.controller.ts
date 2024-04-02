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
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from './auth.guard';
import * as CircularJSON from 'circular-json';
import { classToPlain } from 'class-transformer';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';


@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @UseInterceptors(FileInterceptor('pictureProfile', {
    storage:diskStorage({
      destination:'./files',
      filename : (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = extname(file.originalname)
        const fileName = `${uniqueSuffix}${ext}`
        cb(null, fileName )
      }
    })
  }))
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() file:Express.Multer.File) {
    //  console.log("file", file.path);
    
      return await this.authService.createUser(createUserDto, file.path);
  }

  @Post('/login')
  async login(@Body() createUserDto: CreateUserDto) {
      const result = await this.authService.login(createUserDto);
      return result;
  }

  @UseGuards(AuthGuard)
  @Get('/users')
  async findUser() {
    const users = this.authService.findUser();
    if (!users) {
      throw new Error('Users not found');
    }
    return users;
  }


  @UseGuards(AuthGuard)
  @Get('/users/:id')
  async findByIdUser(@Param('id', ParseIntPipe) id: number) {
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

  @UseGuards(AuthGuard)
  @Delete('/users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = this.authService.deleteUser(id);
      if (!user) {
        throw new NotFoundException('User Not Found');
      }
      return console.log('User deleted succefully');
    } catch (error) {
      return {
        message: 'Internal server error',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @UseGuards(AuthGuard)
  @Put('/users/:id')
  async modifyUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const user = this.authService.modifyUser(id, createUserDto);
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

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Request() req){
    const user = req.user
    return classToPlain(user, { excludePrefixes: ['_'] });

  }

  @UseGuards(AuthGuard)
  @Put('/profile')
 async modifyProfile(@Request() req, @Body() createUserDto: CreateUserDto, ){
    const user = req.user
    const result = this.authService.modifyCurrentUser( user.idUser, createUserDto)
    return result
  }

  @UseGuards(AuthGuard)
  @Put('/profile/password')
  async modifyPassword(@Request() req, @Body() createUserDto: CreateUserDto, ){
    const user = req.user
    const result = this.authService.modifyPassword( user.idUser, createUserDto)
    return result
  }
}