const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "한달인턴 과제 API",
      description: "한달인턴 과제 API입니다.",
      contact: {
        name: "송민지",
        email: "niveus128@gmail.com",
        // url: "https://mixedcode.com",
      },
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Development",
      },
      {
        url: "http://13.125.244.132:3000/",
        description: "배포서버",
      },
      // {
      //   url: "http://real.co.kr/",
      //   description: "Real Server",
      // },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "사용자 닉네임",
              example: "송민지",
            },
            nickname: {
              type: "string",
              description: "nickname",
              example: "모코코",
            },
            password: {
              type: "string",
              description: "비밀번호",
              example: "Asdf1234!",
            },
          },
        },
        LoginDto: {
          type: "object",
          properties: {
            username: {
              type: "string",
              description: "사용자 닉네임",
              example: "송민지",
            },
            password: {
              type: "string",
              description: "비밀번호",
              example: "Asdf1234!",
            },
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "에러 메세지",
              example: "user not found",
            },
            statusCode: {
              type: "integer",
              description: "http code",
              example: 400,
            },
          },
        },
        Responses: {
          type: "object",
          properties: {
            message: {
              type: "string",
              description: "요청 완료",
              example: "success",
            },
            statusCode: {
              type: "integer",
              description: "http code",
              example: 200,
            },
          },
        },
      },
    },
  },
  apis: ["src/routes/*.ts", "./swagger/*"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
