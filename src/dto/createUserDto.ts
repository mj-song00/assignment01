export interface CreateUserDto {
  username: string;
  nickname: string;
  password: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
