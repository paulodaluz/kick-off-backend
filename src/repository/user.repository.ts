import { Injectable, Logger } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import { db } from '../database/configuration.database';
import { ErrorUtils } from '../utils/error.utils';
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";

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

  public async getUserByUuid(uuid: string): Promise<User> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.getUserByUuid.name}`);

    const docRef = doc(db, this.databaseName, uuid);
    const user = await getDoc(docRef)
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.getUserByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.getUserByUuid.name}`);

    if (!user.exists()) {
      return null;
    }

    return user.data() as User;
  }

  public async getUserByEmail(email: string): Promise<User> {
    Logger.log(`email = ${email}`, `${this.className} - ${this.getUserByEmail.name}`);
    const user = []

    const userRef = collection(db, this.databaseName);

    const queryToSearch = query(userRef, where("email", "==", email));

    const snapshot = await getDocs(queryToSearch).catch((error: any) => {
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
      user.push(Object.assign(doc.data(), { uuid: doc.id }));
    });

    return user[0];
  }

  public async updateUserInfo(uuid: string, userInfo: Partial<User>): Promise<void> {
    Logger.log(
      `uuid = ${uuid} - userInfo = ${JSON.stringify(userInfo)}`,
      `${this.className} - ${this.updateUserInfo.name}`,
    );

    const userRef = doc(db, this.databaseName, uuid);

    await updateDoc(userRef, userInfo)
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.updateUserInfo.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.updateUserInfo.name}`);
  }

  public async deleteUserByUuid(uuid: string): Promise<void> {
    Logger.log(`uuid = ${uuid}`, `${this.className} - ${this.deleteUserByUuid.name}`);

    await deleteDoc(doc(db, this.databaseName, uuid))
      .catch((error: any) => {
        Logger.error(
          `uuid = ${uuid} - error = ${error}`,
          '',
          `${this.className} - ${this.deleteUserByUuid.name}`,
        );

        ErrorUtils.throwSpecificError(500);
      });

    Logger.log(`uuid = ${uuid} - SUCCESS`, `${this.className} - ${this.deleteUserByUuid.name}`);
  }
}
