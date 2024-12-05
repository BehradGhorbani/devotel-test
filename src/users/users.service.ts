import { BadRequestException, Injectable } from "@nestjs/common";
import { SignUpUserDto } from './dto/sign-up-user.dto';
import app from 'firebase-admin';

@Injectable()
export class UsersService {
  constructor() {}

  async signUp(param: SignUpUserDto): Promise<any> {
    const { email, password, name, lastName, role } = param;
    try {
      const createdUser = await app.auth().createUser({
        email,
        password,
        displayName: `${name} ${lastName}`,
      });
      await app.auth().setCustomUserClaims(createdUser.uid, { role });

      return createdUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

}
