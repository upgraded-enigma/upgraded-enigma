/**
 * User contacts interface with initialization.
 */
export class UserContact {
  public email = '';

  public phone = '';

  constructor(input?: UserContact) {
    if (typeof input !== 'undefined') {
      const keys = Object.keys(input);
      for (const key of keys) {
        this[key] = Boolean(input[key]) ? input[key] : this[key];
      }
    }
  }
}
