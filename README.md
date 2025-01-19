# 한달 인턴 backend node.js 과제입니다.

## 실행방법

npm 설치
npm install 

prisma 설정
npx prisma generate
npx prisma db push
npm install -g nodemon
npm run dev

## 기술스택
express, typescript, prisma, mysql

## API 
![스크린샷 2025-01-19 오후 9 27 49](https://github.com/user-attachments/assets/d546fbf7-16be-4116-bd6e-5c77ef5727d0)

회원가입과 login API 두개가 존재합니다. 
회원가입시 username, nickname, password가 필요합니다. username과 nickname은 unique값을 주었습니다.
회원가입시 passwordValidator middleware를 통해 비밀번호 길이와 대,소문자, 특수문자를 검증합니다.

로그인은 username, passwrod가 필요합니다.
로그인 성공시 token이 발급되며 시간은 30분입니다. refreshToken은 db에 저장됩니다.

로그인 실패경우는 
1. username 불일치
2. password 불일치
경우에 실패됩니다.

## 배포와 swagger
배포 서버는 http://13.125.244.132:3000입니다. 
현재 localhost:3000/doc 으로 접속할 경우 API가 제대로 보이지만, http://13.125.244.132:3000/doc으로 접속할 경우 API목록이 보이지 않습니다.
