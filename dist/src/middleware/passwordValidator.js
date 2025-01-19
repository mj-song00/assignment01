"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordValidator = void 0;
const passwordValidator = (req, res, next) => {
    const { password } = req.body;
    if (!password) {
        res.status(400).json({ message: "비밀번호를 입력해주세요" });
        return;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{8,12}$/;
    https: if (!regex.test(password)) {
        res.status(400).json({
            message: "비밀번호는 대문자 1개 이상, 특수문자를 포함해야 하며 8자리 이상이어야 합니다.",
        });
        return;
    }
    next();
};
exports.passwordValidator = passwordValidator;
