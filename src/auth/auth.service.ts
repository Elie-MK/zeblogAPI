import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const findUser = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });
    if (!findUser) {
      const salt = bcrypt.genSaltSync();
      createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
      createUserDto.pictureProfile = '';
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } else {
      throw new ConflictException('User already exists');
    }
  }

  async login(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.findOne({
        where: {
          username: createUserDto.username,
        },
      });
      if (user && bcrypt.compareSync(createUserDto.password, user.password)) {
        const payload = { username: user.username, sub: user.idUser };
        return {
          access_token: this.jwtService.sign(payload),
        };
      } else {
        throw new UnauthorizedException('Invalid credentials');
      }
    } catch (error) {
      throw new NotFoundException('User not exist');
    }
  }

  async findUser() {
    try {
      const users = await this.userRepository.find();
      const sanitizedUsers = users.map((user) => ({
        id: user.idUser,
        username: user.username,
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
      const user = await this.userRepository.findOne({ where: { idUser: id } });
      const datasUser = {
        id: user.idUser,
        username: user.username,
        email: user.email,
        pictureProfile: user.pictureProfile,
        createAt: user.createAt,
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
  // async findUserByEmail(email:string):Promise<User>{
  //     return await this.userRepository.findOne({where:{email}});
  // }
}
