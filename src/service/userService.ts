import { PrismaClient, Role } from "@prisma/client";
import { CreateUserDto, LoginDto } from "./../dto/createUserDto";
const prisma = new PrismaClient();
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export const createUser = async (createUser: CreateUserDto) => {
  const { username, nickname, password } = createUser;
  try {
    const duplicateUser = await prisma.user.findUnique({
      where: { username }, // username만 중복 확인
    });
    if (duplicateUser) {
      return {
        error: "username혹은 nickname을 확인해주세요.",
        statusCode: 400,
      };
    }

    const duplicateNickname = await prisma.user.findUnique({
      where: { nickname }, // nickname만 중복 확인
    });

    if (duplicateNickname) {
      return {
        error: "nickname 혹은 username을 확인해주세요",
        statusCode: 400,
      };
    }
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

export const login = async (loginDto: LoginDto) => {
  const { username, password } = loginDto;
  const user = await prisma.user.findUnique({
    where: { username },
  });

  const checkPassword = await Bcrypt.compare(password, user?.password);
  if (!user || !checkPassword)
    return { error: "username 혹은 password를 확인해주세요.", statusCode: 400 };

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "30m",
    }
  );

  const response = {
    token,
  };
  const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_KEY, {
    expiresIn: "1d",
  });

  const saveToekn = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: { refreshToken },
  });

  return { result: response, statusCode: 200 };
};

export default { createUser, login };
