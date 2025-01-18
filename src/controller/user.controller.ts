import userService from "./../service/userService";
import { CreateUserDto } from "./../dto/createUserDto";
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
