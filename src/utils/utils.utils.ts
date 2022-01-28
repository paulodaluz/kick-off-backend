export class Utils {
  public static avoidIncorrectUpdate(object: { email?: string; uuid?: string }): void {
    if (object.email) {
      delete object.email;
    }

    if (object.uuid) {
      delete object.uuid;
    }
  }
}
