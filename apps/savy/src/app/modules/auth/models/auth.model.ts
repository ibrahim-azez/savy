export abstract class Auth {
  abstract signup(...args: any[]): any;

  abstract login(...args: any[]): any;

  abstract forgotPassword(...args: any[]): any;

  abstract confirmNewPassword(...args: any[]): any;
}
