export class Utils {
  public static avoidIncorrectUpdate(object: {
    email?: string;
    uuid?: string;
    typeOfUser: string;
  }): void {
    if (object.email) {
      delete object.email;
    }

    if (object.uuid) {
      delete object.uuid;
    }

    if (object.typeOfUser) {
      delete object.typeOfUser;
    }
  }
}
