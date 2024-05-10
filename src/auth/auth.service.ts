import {
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UploadService } from 'src/upload/upload.service';
import { ConfigService } from '@nestjs/config';
import { JWTTokenDto } from './dto/jwtToken.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
 
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
    private readonly uploadService: UploadService,
    private configService: ConfigService,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    file: Express.Multer.File,
  ): Promise<Users> {
    const findUser = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });

    const key = `${file.fieldname}${Date.now()}`;
    const imageUrl = await this.uploadService.uploadFile(file, key);

    if (!findUser) {
      const salt = bcrypt.genSaltSync();
      createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
      createUserDto.pictureProfile = imageUrl;
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } else {
      throw new ConflictException('User already exists');
    }
  }

  async login(loginDto: LoginDto): Promise<JWTTokenDto> {
    const {email, username,  password} = loginDto

      const user = await this.userRepository.findOne({
        where: [
          {
            username: username,
          },
          { email: email },
        ]
      });
      if (!user) {
        throw new HttpException('Invalid credentials', 400)
      }
      const isPasswordValid = bcrypt.compareSync(
        password,
        user.password,
      );

      if (!isPasswordValid) {
        throw new HttpException('Invalid credentials', 400)
      }
      return this.getTokens(user)
  }

  private async getTokens(user: LoginDto): Promise<JWTTokenDto> {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
            idUser: user.idUser,
            username: user.username,
            email: user.email,
            gender: user.gender
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION',
          ),
        },
      ),

      this.jwtService.signAsync(
        {
          idUser: user.idUser,
          username: user.username,
          email: user.email,
          gender: user.gender,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION',
          ),
        },
      ),
    ]);
    return {
      token,
      refreshToken,
    };
  }

  async refreshToken(token: string): Promise<JWTTokenDto> {
   try {
    const { idUser, username, email, gender} = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET')
    })
    const user = await this.userRepository.findOneOrFail({where: {idUser, username, email, gender}})
    return this.getTokens(user)
   } catch (error) {
    throw new HttpException('Invalid credentials', 400)
   }
  }

  async findUser() {
    try {
      const users = await this.userRepository.find();
      const sanitizedUsers = users.map((user) => ({
        id: user.idUser,
        username: user.username,
        gender: user.gender,
        email: user.email,
        pictureProfile: user.pictureProfile,
        createAt: user.createAt,
      }));
      return sanitizedUsers;
    } catch (error) {
      throw new NotFoundException('Not Found Users');
    }
  }

  async findByIdUser(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { idUser: id },
        relations: ['articles'],
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      const datasUser = {
        idUser: user.idUser,
        username: user.username,
        email: user.email,
        gender: user.gender,
        pictureProfile: user.pictureProfile,
        createAt: user.createAt,
        articles: user.articles,
      };

      return datasUser;
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { idUser: id } });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async modifyUser(id: number, createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { idUser: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.userRepository.update(id, createUserDto);
  }

  async modifyCurrentUser(reqId, createUserDto: CreateUserDto) {
    try {
      const userFind = await this.userRepository.findOne({
        where: { idUser: reqId },
      });
      if (userFind) {
        const dataUser = {
          username: createUserDto.username,
          email: createUserDto.email,
        };

        return await this.userRepository.update(reqId, dataUser);
      } else {
        throw new NotFoundException(`User with ID ${reqId} not found`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async modifyPassword(reqId, createUserDto: CreateUserDto) {
    try {
      const userFind = await this.userRepository.findOne({
        where: { idUser: reqId },
      });

      if (userFind) {
        const salt = bcrypt.genSaltSync();
        const dataUser = {
          password: bcrypt.hashSync(createUserDto.password, salt),
        };

        return await this.userRepository.update(reqId, dataUser);
      }
    } catch (error) {}
  }
}
