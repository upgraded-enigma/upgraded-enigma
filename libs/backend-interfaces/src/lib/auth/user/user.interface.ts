export interface IUserPassword {
  name: string;
  password: string;
  timestamp: number;
}

export interface IUserKeys {
  public: string;
  private: string;
}

export interface IUser {
  email: string;
  password: string;
  token: string;
  keys: IUserKeys;
  passwords: IUserPassword[];
  encrypted: boolean;
}

export const defaultUserObject: IUser = {
  email: '',
  password: '',
  token: '',
  keys: {
    public: '',
    private: '',
  },
  passwords: [],
  encrypted: false,
};
