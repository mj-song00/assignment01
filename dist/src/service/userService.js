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
exports.login = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createUser = (createUser) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, nickname, password } = createUser;
    try {
        const duplicateUser = yield prisma.user.findUnique({
            where: { username }, // username만 중복 확인
        });
        if (duplicateUser) {
            return {
                error: "username혹은 nickname을 확인해주세요.",
                statusCode: 400,
            };
        }
        const duplicateNickname = yield prisma.user.findUnique({
            where: { nickname }, // nickname만 중복 확인
        });
        if (duplicateNickname) {
            return {
                error: "nickname 혹은 username을 확인해주세요",
                statusCode: 400,
            };
        }
        const salt = yield Bcrypt.genSalt();
        const pwhash = yield Bcrypt.hash(password, salt);
        const newUser = yield prisma.user.create({
            data: { username, nickname, password: pwhash, role: client_1.Role.User },
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
    }
    catch (error) {
        console.error(error);
        return { error: "Error to creating user" };
    }
});
exports.createUser = createUser;
const login = (loginDto) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = loginDto;
    const user = yield prisma.user.findUnique({
        where: { username },
    });
    if (!user)
        return { error: "username 혹은 password를 확인해주세요.", statusCode: 400 };
    const checkPassword = yield Bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!checkPassword)
        return { error: "username 혹은 password를 확인해주세요.", statusCode: 400 };
    const token = jwt.sign({
        userId: user.id,
    }, process.env.SECRET_KEY, {
        expiresIn: "30m",
    });
    const response = {
        token,
    };
    const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_KEY, {
        expiresIn: "1d",
    });
    const saveToekn = yield prisma.user.update({
        where: {
            id: user.id,
        },
        data: { refreshToken },
    });
    return { result: response, statusCode: 200 };
});
exports.login = login;
exports.default = { createUser: exports.createUser, login: exports.login };
