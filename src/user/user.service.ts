import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { createHash } from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    user.secret = createHash('sha256').update(Date()).digest('hex');
    const userCreated = await this.userRepo.save(user);
    return {
      label: userCreated.label,
      apiKey: userCreated.apiKey,
      secret: userCreated.secret,
    };
  }

  findAll() {
    return this.userRepo.find();
  }
}
