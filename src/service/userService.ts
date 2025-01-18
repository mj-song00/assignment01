import { PrismaClient } from "@prisma/client";
import { CreateUserDto } from "./../dto/createUserDto";
const prisma = new PrismaClient();
const Bcrypt = require("bcrypt");

export const createUser = async (createUser: CreateUserDto) => {
  const { username, email, password } = createUser;
  try {
    const duplicateUser = await prisma.user.findUnique({
      where: { email, username },
    });
    if (duplicateUser)
      return { error: "email 혹은 username이 존재합니다.", statusCode: 400 };

    const salt = await Bcrypt.genSalt();
    const pwhash = await Bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { username, email, password: pwhash },
    });

    return { result: "success", statusCode: 200 };
  } catch (error) {
    console.error(error);
    return { error: "Error to creating user" };
  }
};

export default { createUser };
