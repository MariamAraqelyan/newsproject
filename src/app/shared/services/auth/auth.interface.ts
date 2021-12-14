export interface ILoginParams {
  phone_number: string;
  password: string;
}

export interface ISignUpParams {
  avatar: File;
  username: string;
  phone_number: string;
  email: string;
  password: string;
}

export interface ILoginResponse {
  id: number;
  email: string;
  access: string;
  refresh: string;
}

export interface IRefreshResponse {
  access: string;
}
