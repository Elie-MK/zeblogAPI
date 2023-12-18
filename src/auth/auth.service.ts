import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const salt = bcrypt.genSaltSync();
    createUserDto.password = bcrypt.hashSync(createUserDto.password, salt);
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });
   
    if (user && bcrypt.compareSync(createUserDto.password, user.password)) {
        const payload = { username: user.username, sub: user.id };
        
        return {
          access_token: this.jwtService.sign(payload),
        };
    } 
  }

  async findUser(){
        return await this.userRepository.find();
  }

  async findByIdUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
  
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  
    return user;
  }

  async deleteUser(id:number){
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.userRepository.delete(id);
  }

  async modifyUser(id:number, createUserDto:CreateUserDto){
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return await this.userRepository.update(id, createUserDto);
  }
  // async findUserByEmail(email:string):Promise<User>{
  //     return await this.userRepository.findOne({where:{email}});
  // }
}
