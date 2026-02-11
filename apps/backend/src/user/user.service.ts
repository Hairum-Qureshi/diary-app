import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/User';
import * as admin from 'firebase-admin';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject('FIREBASE_ADMIN') private firebase: admin.app.App,
  ) {}

  async deleteUserData(uid: string) {
    // Delete all entries associated with the user
    await this.userModel.deleteMany({ uid: uid });

    // delete the user account itself
    await this.userModel.deleteOne({ _id: uid });

    // delete the user's email from Firebase too
    await this.firebase.auth().deleteUser(uid);
  }
}
