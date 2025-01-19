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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const userService_1 = __importDefault(require("./../service/userService"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const createUserDto = req.body;
    if (!createUserDto.nickname || !createUserDto.username) {
        return res.status(400).json({
            message: "nickname, username은 필수로 작성해주세요",
        });
    }
    try {
        const data = yield userService_1.default.createUser(createUserDto);
        if (data.statusCode === 400) {
            return res.status(400).json({ message: data.error });
        }
        return res.status(200).json({ message: data.result });
    }
    catch (error) {
        return res.json({ message: error });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const loginDto = req.body;
    if (!loginDto.password || !loginDto.username) {
        return res.status(400).json({
            message: "username 또는 nickname을 입력해주세요",
        });
    }
    try {
        const data = yield userService_1.default.login(loginDto);
        if (data.statusCode === 400) {
            return res.status(400).json({ message: data.error });
        }
        return res.status(200).json({ message: data.result });
    }
    catch (error) {
        return res.json({ message: error });
    }
});
exports.signIn = signIn;
