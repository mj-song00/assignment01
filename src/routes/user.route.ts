import { passwordValidator } from "./../middleware/passwordValidator";
import { Request, Response, Router } from "express";
import { signUp } from "./../controller/user.controller";

const router = Router();

/**
 * @swagger
 *  /user/signup:
 *   post:
 *    tags:
 *      - users
 *    summary: 회원가입
 *    description: '신규 회원가입'
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *    responses:
 *       200:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: 존재하는 nicknmae 혹은 username
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "nickname 혹은 username이 존재합니다."
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "서버에서 문제가 발생했습니다."
 */
router.post(
  "/signup",
  passwordValidator,
  async (req: Request, res: Response) => {
    await signUp(req, res);
  }
);

export default router;
