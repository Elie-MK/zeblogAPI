import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UploadService } from 'src/upload/upload.service';
import { ConfigService } from '@nestjs/config';
import { JWTTokenDto } from './dto/jwtToken.dto';
import { LoginDto } from './dto/login.dto';
import { RoleEnum } from 'src/shared/Enums/roleEnum';
import { ZohoService } from 'src/zoho/zoho.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
    private readonly uploadService: UploadService,
    private readonly zohoService: ZohoService,
    private configService: ConfigService,
  ) {}

  calculateAge(dateOfBirth: Date): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const age = today.getFullYear() - birthDate.getFullYear();
    return age;
  }

  async createUser(
    userDto: UserDto,
    file: Express.Multer.File,
  ): Promise<Users> {
    const findUser = await this.userRepository.findOne({
      where: {
        username: userDto.username,
        email: userDto.email,
      },
    });

    const key = `${file.fieldname}${Date.now()}`;
    const imageUrl = await this.uploadService.uploadFile(file, key);

    const age = this.calculateAge(userDto.dateOfBirth);

    if (age < 18) {
      throw new HttpException('You must be 18 years old to register', 400);
    }

    if (!findUser) {
      const salt = bcrypt.genSaltSync();
      userDto.password = bcrypt.hashSync(userDto.password, salt);
      userDto.pictureProfile = imageUrl;
      this.zohoService.createNewLead(userDto);
      const user = this.userRepository.create(userDto);
      return await this.userRepository.save(user);
    } else {
      throw new HttpException('Invalid credentials', 400);
    }
  }

  async login(loginDto: LoginDto): Promise<JWTTokenDto> {
    const { email, username, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: [
        {
          username: username,
        },
        { email: email },
      ],
    });
    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', 400);
    }
    return this.getTokens(user);
  }

  private async getTokens(user: LoginDto): Promise<JWTTokenDto> {
    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          idUser: user.idUser,
          email: user.email,
          gender: user.gender,
          pictureProfile: user.pictureProfile,
          username: user.username,
          role: user.role,
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
          email: user.email,
          gender: user.gender,
          pictureProfile: user.pictureProfile,
          username: user.username,
          role: user.role,
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
      const { idUser: idUser } = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });
      const user = await this.userRepository.findOneOrFail({
        where: { idUser },
      });
      return this.getTokens(user);
    } catch (error) {
      throw new HttpException('Invalid credentials', 400);
    }
  }

  async findUser() {
    try {
      const users = await this.userRepository.find();
      const sanitizedUsers = users.map((user: UserDto) => ({
        id: user.idUser,
        username: user.username,
        gender: user.gender,
        email: user.email,
        pictureProfile: user.pictureProfile,
        createAt: user.createAt,
      }));
      return sanitizedUsers;
    } catch (error) {
      throw new HttpException('Invalid credentials', 400);
    }
  }

  async findByIdUser(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { idUser: id },
        relations: ['articles'],
        select: [
          'idUser',
          'username',
          'articles',
          'comments',
          'countryName',
          'createAt',
          'dateOfBirth',
          'email',
          'fullName',
          'gender',
          'likes',
          'pictureProfile',
          'streetAdress',
        ],
      });

      if (!user) {
        throw new HttpException('Invalid credentials', 400);
      }
      return user;
    } catch (error) {
      throw new HttpException('Invalid credentials', 400);
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { idUser: id } });
      if (!user) {
        throw new HttpException('Invalid credentials', 400);
      }
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new HttpException('Invalid credentials', 400);
    }
  }

  async modifyUser(id: number, userDto: UserDto) {
    const user = await this.userRepository.findOne({ where: { idUser: id } });
    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }
    return await this.userRepository.update(id, userDto);
  }

  async getUserProfile(id: number) {
    const user = await this.userRepository.findOne({
      where: { idUser: id },
      relations: ['articles', 'comments', 'likes'],
      select: [
        'idUser',
        'username',
        'articles',
        'comments',
        'countryName',
        'createAt',
        'dateOfBirth',
        'email',
        'fullName',
        'gender',
        'likes',
        'pictureProfile',
        'streetAdress',
      ],
    });
    if (!user) {
      throw new HttpException('Invalid credentials', 400);
    }

    return user;
  }

  async modifyCurrentUser(reqId, userDto: UserDto) {
    try {
      const userFind = await this.userRepository.findOne({
        where: { idUser: reqId },
      });
      if (userFind) {
        const dataUser = {
          username: userDto.username,
          email: userDto.email,
        };

        return await this.userRepository.update(reqId, dataUser);
      } else {
        throw new NotFoundException(`User with ID ${reqId} not found`);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async modifyPassword(reqId, userDto: UserDto) {
    try {
      const userFind = await this.userRepository.findOne({
        where: { idUser: reqId },
      });

      if (userFind) {
        const salt = bcrypt.genSaltSync();
        const dataUser = {
          password: bcrypt.hashSync(userDto.password, salt),
        };

        return await this.userRepository.update(reqId, dataUser);
      }
    } catch (error) {}
  }

  async getWriters() {
    try {
      const writers = await this.userRepository.find({
        where: { role: RoleEnum.USER },
        select: [
          'idUser',
          'username',
          'fullName',
          'email',
          'pictureProfile',
          'createAt',
        ],
      });
      return writers;
    } catch (error) {
      throw new HttpException('Invalid credentials', 400);
    }
  }
}
