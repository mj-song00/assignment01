export interface CreateUserDto {
  username: string;
  nickname: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}
