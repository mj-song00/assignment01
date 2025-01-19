"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const passwordValidator_1 = require("./../middleware/passwordValidator");
const express_1 = require("express");
const user_controller_1 = require("./../controller/user.controller");
const router = (0, express_1.Router)();
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
router.post("/signup", passwordValidator_1.passwordValidator, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_controller_1.signUp)(req, res);
}));
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
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, user_controller_1.signIn)(req, res);
}));
exports.default = router;
