import userService from "./../service/userService";
import { CreateUserDto, LoginDto } from "./../dto/createUserDto";
import { Request, Response } from "express";

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const createUserDto: CreateUserDto = req.body;

  if (!createUserDto.nickname || !createUserDto.username) {
    return res.status(400).json({
      message: "nickname, username은 필수로 작성해주세요",
    });
  }

  try {
    const data = await userService.createUser(createUserDto);
    if (data.statusCode === 400) {
      return res.status(400).json({ message: data.error });
    }
    return res.status(200).json({ message: data.result });
  } catch (error) {
    return res.json({ message: error });
  }
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const loginDto: LoginDto = req.body;

  if (!loginDto.password || !loginDto.username) {
    return res.status(400).json({
      message: "username 또는 nickname을 입력해주세요",
    });
  }

  try {
    const data = await userService.login(loginDto);
    if (data.statusCode === 400) {
      return res.status(400).json({ message: data.error });
    }

    return res.status(200).json({ message: data.result });
  } catch (error) {
    return res.json({ message: error });
  }
};
