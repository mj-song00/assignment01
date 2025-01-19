const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = require("../app").app; // app만 가져오기
const request = require("supertest");
const dotenv = require("dotenv");
let token;

dotenv.config({ path: ".env.test" });
jest.setTimeout(50000); // 테스트 타임아웃 설정

let server; // 서버 변수 설정

beforeAll(async () => {
  // jest.mock("../../src/prisma", () => ({
  //   prisma: {
  //     user: {
  //       create: jest.fn(),
  //       findUnique: jest.fn(),
  //     },
  //     refreshToken: {
  //       create: jest.fn(),
  //     },
  //   },
  // }));
  // Prisma Client 연결
  await prisma.$connect();
  // 테스트에서는 app.listen을 호출하지 않음
});

describe("회원가입", () => {
  it("회원가입 성공", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "송민지",
      nickname: "모코모코",
      password: "Asdf1234!",
    });
    expect(response.status).toBe(200);
  });

  it("회원가입 실패 - 중복된 username", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "송민지",
      nickname: "모코코",
      password: "Asdf1234!",
    });
    expect(response.status).toBe(400);
  });

  it("회원가입 실패 - 중복된 nickname", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "송민지1",
      nickname: "모코모코",
      password: "Asdf1234!",
    });
    expect(response.status).toBe(400);
  });

  it("회원가입 실패 - 비밀번호 대문자 미포함", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "송민지2",
      nickname: "모코코",
      password: "asdf1234!",
    });
    expect(response.status).toBe(400);
  });

  it("회원가입 실패 - 비밀번호 특수문자 미포함", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "송민지2",
      nickname: "모코코",
      password: "Asdf1234",
    });
    expect(response.status).toBe(400);
  });

  it("회원가입 실패 - 비밀번호 최소길이 불일치", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "송민지2",
      nickname: "모코코",
      password: "Asf14!",
    });
    expect(response.status).toBe(400);
  });

  it("회원가입 실패 - 비밀번호 최대길이 초과", async () => {
    const response = await request(app).post("/user/signup").send({
      username: "송민지2",
      nickname: "모코코",
      password: "Asdff1244ad3i202!",
    });
    expect(response.status).toBe(400);
  });
});

describe("로그인", () => {
  it("로그인성공 - token 반환", async () => {
    const response = await request(app).post("/user/login").send({
      username: "송민지",
      password: "Asdf1234!",
    });

    token = "Bearer " + response.body.message.token;
    expect(response.status).toBe(200);
  });

  it("로그인 성공 - refreshToken 저장", async () => {
    const userData = {
      username: "송민지",
      nickname: "모코모코",
      password: "Asdf1234!",
    };

    prisma.user.create.mockResolvedValue({
      id: 1,
      username: userData.username,
      nickname: userData.nickname,
    });

    const refreshToken = generateRefreshToken(); // 실제 token 생성 로직
    prisma.refreshToken.create.mockResolvedValue({
      userId: 1,
      token: refreshToken,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const user = await createUser(userData);

    const savedRefreshToken = await prisma.refreshToken.create({
      data: {
        userId: user.id,
        token: refreshToken,
      },
    });

    expect(savedRefreshToken).toHaveProperty("token");
    expect(savedRefreshToken.token).toBe(refreshToken);

    expect(prisma.refreshToken.create).toHaveBeenCalledWith({
      data: {
        userId: user.id,
        token: refreshToken,
      },
    });
  });

  it("로그인 실패 - username 불일치", async () => {
    const response = await request(app).post("/user/login").send({
      username: "송민지231",
      password: "Asdf1234!",
    });
    console.log(response);
    expect(response.status).toBe(400);
  });
});

afterAll(async () => {
  // 데이터 정리 작업 (예시로 모든 모델 삭제)
  await prisma.user.deleteMany();
  // Prisma Client 연결 종료
  await prisma.$disconnect();

  // 서버 종료 (테스트 후 종료)
  if (server) {
    server.close(); // 서버 종료
    console.log("Test server closed.");
  }
});
