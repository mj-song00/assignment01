import express, { Application, Request, Response } from "express";
import UserRouter from "./src/routes/user.route";

const { swaggerUi, specs } = require("./swagger/swagger");
const app: Application = express();
const port: number = 3000;

app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("아 속편하다 ㅠㅠ 자동저장이라니 ㅠㅠ");
});

app.use("/user", UserRouter);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use((req: Request, res: Response) => {
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
