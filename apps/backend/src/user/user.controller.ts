import { Controller, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import * as types from 'src/types';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Delete()
  @UseGuards(AuthGuard())
  async deleteUserAndEntries(@CurrentUser() user: types.UserPayload) {
    await this.userService.deleteUserData(user._id);
  }
}
