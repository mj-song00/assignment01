import { PrismaClient, Role } from "@prisma/client";
import { CreateUserDto, LoginDto } from "./../dto/createUserDto";
const prisma = new PrismaClient();
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const createUser = async (createUser: CreateUserDto) => {
  const { username, nickname, password } = createUser;
  try {
    const duplicateUser = await prisma.user.findUnique({
      where: { nickname, username },
    });
    if (duplicateUser)
      return { error: "email 혹은 username이 존재합니다.", statusCode: 400 };

    const salt = await Bcrypt.genSalt();
    const pwhash = await Bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { username, nickname, password: pwhash, role: Role.User },
    });

    const response = {
      username,
      nickname,
      authorities: [
        {
          authorityName: `ROLE_${newUser.role.toUpperCase()}`,
        },
      ],
    };

    return { result: response, statusCode: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Error to creating user" };
  }
};

// export const login = async (loginDto: LoginDto) => {
//   const { email, password } = loginDto;
//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   const checkPassword = await Bcrypt.compare(password, user?.password);
//   if (!user || !checkPassword)
//     return { error: "email 혹은 password를 확인해주세요." };

//   const accessToken = jwt.sigin({ userId: user.id }, process.env.SECRET_KEY, {
//     expiresIn: "30m",
//   });

//   const refreshToken = jwt.sigin({ userId: user.id }, process.env.REFRESH_KEY, {
//     expiresIn: "1d",
//   });
// };

export default { createUser };
