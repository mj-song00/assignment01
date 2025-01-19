"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./src/routes/user.route"));
const cors = require("cors");
const { swaggerUi, specs } = require("./swagger/swagger");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("아 속편하다 ㅠㅠ 자동저장이라니 ㅠㅠ");
});
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use("/user", user_route_1.default);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use((req, res) => {
    res.status(404).send("Page Not Found!");
});
const startServer = () => {
    app.listen(port, () => {
        console.log(`연결완료`);
    });
};
if (require.main === module) {
    startServer(); // 서버가 직접 실행될 때만 서버 시작
}
module.exports = { app, startServer };
