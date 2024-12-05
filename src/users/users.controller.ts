import { Controller, Post, Body} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/sign-up-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  signUp(@Body() param: SignUpUserDto) {
    return this.usersService.signUp(param);
  }
}
