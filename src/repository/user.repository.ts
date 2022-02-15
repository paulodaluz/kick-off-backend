import { Injectable, Logger } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { db } from '../database/configuration.database';
import { ErrorUtils } from '../utils/error.utils';
import { collection, doc, setDoc } from "firebase/firestore";

@Injectable()
export class UserRepository {
  private className = 'UserRepository';

  private databaseName: string;

  constructor() {
    this.databaseName = 'users';
  }

  public async registerUser(user: User): Promise<void> {
    Logger.log(`user = ${user.name}`, `${this.className} - ${this.registerUser.name}`);

    await setDoc(doc(db, this.databaseName, user.uuid), user)
      .catch((error: any) => {
        Logger.error(
          `user = ${user.name} - error = ${error}`,
          '',
          `${this.className} - ${this.registerUser.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`user = ${user.name} - SUCCESS`, `${this.className} - ${this.registerUser.name}`);
  }

  public async getUserByUuid(uuid: string): Promise<any> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getUserByUuid.name}`);

    /* const user: any = await db
      .collection(this.databaseName)
      .doc(uuid)
      .get()
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.getUserByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.getUserByUuid.name}`);

    return user.data(); */
  }

  public async getUserByEmail(email: string): Promise<any> {
    Logger.log(`email = ${email}`, `${this.className} - ${this.getUserByEmail.name}`);

    /* const snapshot = await db
      .collection(this.databaseName)
      .where('email', '==', email)
      .get()
      .catch((error: any) => {
        Logger.error(
          `email = ${email} - error = ${error}`,
          '',
          `${this.className} - ${this.getUserByEmail.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    if (snapshot.empty) {
      Logger.log(
        `email = ${email} - SUCCESS - NOT FOUND DATA`,
        `${this.className} - ${this.getUserByEmail.name}`,
      );
      return null;
    }

    Logger.log(
      `email = ${email} - SUCCESS`,
      `${this.className} - ${this.getUserByEmail.name}`,
    );

    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
  }); */
  }

  public async updateUserInfo(uuid: string, userInfo: Partial<User>): Promise<void> {
    Logger.log(
      `uuid = ${uuid} - userInfo = ${JSON.stringify(userInfo)}`,
      `${this.className} - ${this.updateUserInfo.name}`,
    );

    /* await db
      .collection(this.databaseName)
      .doc(uuid)
      .update(userInfo)
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.updateUserInfo.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });
 */
    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.updateUserInfo.name}`);
  }

  public async deleteUserByUuid(uuid: string): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.deleteUserByUuid.name}`);

   /*  await db
      .collection(this.databaseName)
      .doc(uuid)
      .delete()
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.deleteUserByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });
 */
    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.deleteUserByUuid.name}`);
  }
}
