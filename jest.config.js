require("dotenv").config({ path: ".env.test" });

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.[jt]s?(x)", "**/*.test.[jt]s?(x)"],
  globals: {
    "ts-jest": {
      isolatedModules: true, // TypeScript 모듈을 독립적으로 처리하도록 설정
    },
  },
  setupFiles: ["dotenv/config"],
};
