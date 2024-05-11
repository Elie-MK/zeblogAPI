import {
  Body,
  Controller,
  Delete,
  Get,
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
import { UserDto } from './dto/user.dto';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ApiBadRequestResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JWTTokenDto } from './dto/jwtToken.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '../shared/decorators/role';
import { RoleGuard } from '../shared/guards/autorization.guard';
import { RoleEnum } from '../shared/Enums/roleEnum';

@ApiTags('User')
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @UseInterceptors(FileInterceptor('pictureProfile'))
  @Post('/auth/register')
  async create(
    @Body() userDto: UserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.authService.createUser(userDto, file);
  }

  @ApiResponse({ status: 201, description: 'Connected' })
  @ApiBadRequestResponse({ description: 'Invalid credentials' })
  @Post('/auth/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Post('/refresh-token')
  async refreshToken(@Body() { refreshToken }: JWTTokenDto) {
    return await this.authService.refreshToken(refreshToken);
  }

  @Role(RoleEnum.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('/users')
  async findUser() {
    return this.authService.findUser();
  }

  @Role(RoleEnum.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Get('/users/:id')
  async findByIdUser(@Param('id', ParseIntPipe) id: number) {
    return this.authService.findByIdUser(id);
  }

  @Role(RoleEnum.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Delete('/users/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.authService.deleteUser(id);
  }

  @Role(RoleEnum.ADMIN)
  @UseGuards(AuthGuard, RoleGuard)
  @Put('/users/:id')
  async modifyUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userDto: UserDto,
  ) {
    return this.authService.modifyUser(id, userDto);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  async getProfile(@Request() req) {
    const user = req.user;
    return this.authService.getUserProfile(user.idUser);
  }

  @UseGuards(AuthGuard)
  @Put('/profile')
  async modifyProfile(@Request() req, @Body() userDto: UserDto) {
    const user = req.user;
    const result = this.authService.modifyCurrentUser(user.idUser, userDto);
    return result;
  }

  @UseGuards(AuthGuard)
  @Put('/profile/password')
  async modifyPassword(@Request() req, @Body() userDto: UserDto) {
    const user = req.user;
    const result = this.authService.modifyPassword(user.idUser, userDto);
    return result;
  }
}
