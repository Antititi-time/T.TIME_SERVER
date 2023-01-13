# T.Time-Server
### 나와 팀이 함께 성장하는 시간, T.time

T.time은 **협업에서 발생하는 다양한 감정들을 솔직하게 공유하며 나와 팀 함께 발전할 수는 없을까?** 라는 고민에서 시작되었습니다. 다양한 질문을 통해 나와 팀의 감정을 살피고 건강한 팀 문화를 만들어가도록 돕는 서비스입니다. 🙂

## 🔗 서비스 URL
https://www.ttime.site

## ✅ 서비스 핵심 기능

<img src= "https://user-images.githubusercontent.com/82744423/212005999-50c153ba-67fb-458f-afcb-0448c728d2d1.png" width = 600px>


## 🧑‍💻 Server Developer
|강민재|임채영|
|:-:|:-:|
|<img src="https://avatars.githubusercontent.com/u/82744423?v=4" width="200px" />|<img src="https://avatars.githubusercontent.com/u/102947253?v=4" width="200px" />|
|[@m1njae](https://github.com/m1njae)|[@cha2y0oung](https://github.com/cha2y0ung)|
| 프로젝트 초기 세팅<br>DB 설계<br>API 구현<br>테스트 코드 작성<br>https 설정|AWS 세팅<br>DB 설계<br>API 구현<br>테스트 코드 작성|


## ☕ T.TIME API Docs
### 👉 [API Docs](https://groovy-need-069.notion.site/API-a6065ff471c74b25a8977c0f50ad7b8d)<br>
## 💼 API Roles & Progess Status

|                 기능명                 |     담당자     | 완료 여부 |
| :------------------------------------: | :------------: | :-------: |
|              초대장 생성                |    임채영     |    ✅     |
|          초대장으로 팀 입장             |     강민재     |    ✅    |
|         해피니스 체크 답변 받기         |    임채영      |    ✅       |
|         개인 결과 뷰 조회               |    임채영     |     ✅       |
|          팀 해피니스 체크 유무          |     강민재     |    ✅    |
|        개인 해피니스 체크 완료          |     임채영     |    ✅     |
|           팀 상세 결과 조회             |     강민재     |    ✅     |
|             팀 결과 조회                |    강민재     |    ✅    |
|           팀 결과 항목별 점수 조회       |     강민재     |    ✅     |
|           팀 정보 조회                   |     임채영     |    ✅     |


## 📍 Code Convention

<details>
<summary>변수명</summary>   
<div markdown="1">       
      
 
 1. Camel Case 사용 
   - lower Camel Case
 2. 함수의 경우 동사+명사 사용 
   - ex) getInformation()
 3. flag로 사용 되는 변수는 조동사 + flag 종류로 구성 
   - ex) isNum
 4. 약어는 되도록 사용하지 않는다.
   - 부득이하게 약어가 필요하다고 판단되는 경우 팀원과 상의를 거친다.
 
</div>
</details>

<details>
<summary>주석</summary>
<div markdown="1">

1.  한줄 주석은 // 를 사용한다.

```typescript
// 한줄 주석일 때
/**
 * 여러줄
 * 주석일 때
 */
```

2.  함수에 대한 주석

```typescript
/**
 * @route Method /Route
 * @desc Function Description
 * @access Public
 */
```

3.  Bracket 사용 시 내부에 주석을 작성한다.

```typescript
if (a == 5) {
  // 주석
}
```

</div>
</details>

<details>
<summary>Bracket</summary>
<div markdown="1">

1.  한줄 if 문은 여러 줄로 작성한다.

```typescript
// 한줄 if 문 - 여러 줄로 작성
if (trigger) {
  return;
}
```

2. 괄호는 한칸 띄우고 사용한다.

```typescript
// 괄호 사용 한칸 띄우고 사용한다.
if (left == true) {
  return;
}
```

3. Bracket 양쪽 사이를 띄어서 사용한다.

```typescript
const { userId } = request.user;
```

</div>
</details>

<details>
<summary>비동기 함수의 사용</summary>
<div markdown="1">

1.  async, await 함수 사용을 지향한다.
2.  Promise 사용은 지양한다.
3.  다만 로직을 짜는 데 있어 promise를 불가피하게 사용할 경우, 주석으로 표시하고 commit에 그 이유를 작성한다.

</div>
</details>

## 📌 Commit Convention

### [TAG] 메시지

| 태그 이름  |                               설명                                |
| :--------: | :---------------------------------------------------------------: |
|  chore   |                     코드 수정, 내부 파일 수정                     |
|   feat   |                         새로운 기능 구현                          |
|   add    | FEAT 이외의 부수적인 코드 추가, 라이브러리 추가, 새로운 파일 생성 |
|   fix    |                          버그, 오류 해결                          |
|   style    |      코드에 관련 없는 주석 달기, 줄바꿈                          |
|   docs   |                   README나 WIKI 등의 문서 개정                    |

### 🪵 Branch Strategy

<details>
<summary>Git Workflow</summary>
<div markdown="1">

```
main → develop → feature_# / fix_#
feature, fix 이하 번호는 issue 번호에 맞게 생성

1. issue 생성
2. local - feature_# / fix_# 에서 각자 기능 작업
3. remote - feature_# / fix_# 에 Push
4. remote - develop 으로 PR
5. 코드 리뷰 후 Confirm 받고 remote - develop Merge
6. remote - develop 에 Merge 될 때 마다 모든 팀원 local - develop pull 받아 최신 상태 유지
```

</div>
</details>

| Branch Name |           설명           |
| :---------: | :----------------------: |
|    main     |      초기 세팅 존재      |
|   develop   |     구현 완료 브랜치     |
| feature\_/#  | 이슈 별 기능 구현 브랜치 |
|   fix\_/#    |   이슈 별 픽스 브랜치    |

## 📄 T.TIME ERD

<img src="https://user-images.githubusercontent.com/82744423/212005846-354db590-6d45-4056-8517-e069564fd64f.png" width="400px" /><br>

## 📁 Project Foldering

```
🗃️ 3-Layer Architecture 적용

📂T.TIME_SERVER
└── 📂prisma
         ├── schema.prisma
└── 📂src
    ├── 📂config
            ├── index.ts
    ├── 📂controller
            ├── chatController.ts
            ├── index.ts
            ├── resultController.ts
            ├── teamController.ts
    ├── 📂interfaces
            ├── DTO.ts
    ├── 📂middleware
            ├── 📂error
                    ├── errorGenerator.ts
                    ├── errorHandler.ts
                    ├── errorValidator.ts
    ├── 📂modules
            ├── 📂constants
                     ├── index.ts
                     ├── responseMessage.ts
                     ├── statusCode.ts
                     ├── util.ts
            ├── makeTeamId.ts
            ├── returnToSlackMessage.ts
            ├── slackAPI.ts
    ├── 📂router
            ├── chatRouter.ts
            ├── index.ts
            ├── resultRouter.ts
            ├── teamRouter.ts
    ├── 📂service
            ├── chatService.ts
            ├── index.ts
            ├── resultService.ts
            ├── teamService.ts
    ├── index.ts
```
## 🔎 Dependencies Module

```json
{
  "name": "T-Time",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "dev": "nodemon",
    "build": "tsc && node dist",
    "prepare": "husky install",
    "lint": "./node_modules/.bin/eslint .",
    "prettier": "./node_modules/.bin/prettier .",
    "test": "jest --silent --runInBand --detectOpenHandles --verbose --forceExit"
  },
  "dependencies": {
    "@prisma/client": "^4.8.0",
    "axios": "^1.2.2",
    "babel-jest": "^29.3.1",
    "cors": "^2.8.5",
    "cross-env": "^7.0.3",
    "dayjs": "^1.11.7",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-validator": "^6.14.2",
    "jest": "^29.3.1",
    "prisma": "^4.8.0",
    "supertest": "^6.3.3"
  },
  "devDependencies": {
    "@babel/core": "^7.20.12",
    "@babel/preset-env": "^7.20.2",
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.15",
    "@types/express-validator": "^3.0.0",
    "@types/jest": "^29.2.5",
    "@types/node": "^18.11.18",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.47.1",
    "@typescript-eslint/parser": "^5.47.1",
    "eslint": "^8.31.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "husky": "^8.0.0",
    "nodemon": "^2.0.20",
    "prettier": "^2.8.1",
    "ts-jest": "^29.0.3",
    "typescript": "^4.9.4"
  }
}
```
## ⚙️ Server Architecture
<img src= "https://user-images.githubusercontent.com/82744423/212049109-5520d587-b8b8-41a8-b53d-13f2461f358b.jpg" width= "800px">




