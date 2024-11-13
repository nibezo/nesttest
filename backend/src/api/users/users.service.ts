import { Injectable } from '@nestjs/common';
import { User } from './dto/user.dto';
import { UsersList } from './users_list';
@Injectable()
export class UsersService {
  private users: User[] = UsersList;

  findAll(): User[] {
    return this.users;
  }
}
