import { passwordValidator } from "./../middleware/passwordValidator";
import { Request, Response, Router } from "express";
import { signIn, signUp } from "./../controller/user.controller";

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
 *                   type: objcet
 *                   example: {
 *                username: "JIN HO",
 *               nickname: "Mentos",
 *               authorities: [
 *                 {
 *                   authorityName: "ROLE_USER",
 *                 },
 *               ],
 *             },
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

/**
 * @swagger
 *  /user/login:
 *   post:
 *    tags:
 *      - users
 *    summary: 로그인
 *    description: 로그인 API입니다.
 *    requestBody:
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/LoginDto'
 *    responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "eyakdzkl.asdf.erwsa"
 *       400:
 *         description: 잘못된 username 혹은 password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "username 혹은 password를 확인해주세요"
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
router.post("/login", async (req: Request, res: Response) => {
  await signIn(req, res);
});

export default router;
