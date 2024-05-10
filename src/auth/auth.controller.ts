import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpStatus,
  MaxFileSizeValidator,
  NotFoundException,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  ParseUUIDPipe,
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
import { classToPlain } from 'class-transformer';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JWTTokenDto } from './dto/jwtToken.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('User')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({status:201, description: 'User created successfully'})
  @ApiBadRequestResponse({description: 'User can not register, try again'})
  @UseInterceptors(FileInterceptor('pictureProfile'))
  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {       
    return await this.authService.createUser(createUserDto, file);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
      return await this.authService.login(loginDto);
      
  }

  @Post('/refresh-token')
  async refreshToken(@Body() {refreshToken}:JWTTokenDto){
    return await this.authService.refreshToken(refreshToken);
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