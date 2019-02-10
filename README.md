# RESTAPI USING NODE EXPRESS
- 참조 : http://webframeworks.kr/tutorials/nodejs

> restapi를 nodejs와 express를 통해 구현해보며 이해한다.

## Node.js

## Express.js
> node를 기반으로 한 웹서버를 간단하게 만들 수 있게하는 프레임워크

### Application
- express 객체를 app이라는 변수에 할당하게되면 익스프레스 어플리케이션이라는 객체가 할당된다.
- app.use : 서버 구성요소 셋팅을 진행한다.
- app.listen : 어플리케이션 객체를 통해 서버를 구동한다.
- app.get app.post : 클라이언트의 요청을 서버의 로직으로 전달하는 라우팅 역할을 진행한다 -> application의 Router클래스를 활용한다.

### Request
- 라우팅 함수의 콜백함수의 첫 번째 파라미터로 익스프레스 요청 객체라고 칭한다.
- 해당 객체는 서버로 요청한 클라이언트의 요청 정보들이 들어있다.
- req.params : url 파라매터 정보 조회
- req.query : 쿼리문자열 조회
- req.body : post 요청 바디(요청정보) 조회

### Response
- 라우팅 함수의 콜백함수의 두 번째 파라미터로 익스프레스 응답 객체라고 칭한다.
- res.send : 유저에게 데이터를 전달한다.
- res.json : 유저에게 json 형태의 데이터를 전달한다.
- res.status : 유저에게 상태를 전달한다.

## Rest API?
> 서버 데이터를 구조적으로 활용하기 위한 API 디자인을 REST API라고 한다.
- 기본형 : Method(api의 동작을 지시/GET,POST,PUT,DELETE) + 명확한 자원의 표현

### 서버 REST API
- 헤더
    - 상태코드 : 상태코드를 이용하여 상황에 맞게 다양한 정보를 담아 클라이언트로 전송할 수 있다.
        - 200 : 일반적인 성공 응답 반환 코드
        - 201 : post 요청을 통한 데이터 생성 성공 응답 반환 코드
        - 204 : 요청에 대한 처리를 성공했지만 응답할 body가 없을 경우 반환 코드
        - 400 : 파라미터가 잘못되었을 경우 반환 코드
        - 401 : 인증이 필요한 api에 인증되지 않은 요청이 들어올 경우 반환 코드
        - 404 : 응답할 자원이 없는 경우
        - 409 : post 요청을 통해 데이터를 생성할 경우 이미 그 데이터가 존재하여 충돌이 발생한 경우

- 폴더 구조
    - app.js : 익스프레스 서버 설정 및 구동
    - api : 각 데이터 자원 폴더
    - api/user/index : user 데이터 api에 대한 라우팅 설정
    - api/user/user.controller : user 데이터 api에 대한 실제 로직

## TEST !!!
> 해당 예제에서는 mocha를 이용해 test를 실시하였다.

### Mocha
- 테스트 코드를 실행시켜주는 테스트 러너이다.
- 테스트는 테스트 수트(suite)와 테스트(test)로 구분할 수 있다.
    - suite : 테스트를 진행할 하나의 환경 == describe
    - test : 환경안에서 확인되야할 하나의 요건 == it

### SuperTest
- API 테스트를 가능하게 해주는 모듈

# Nodejs 몰랐던 점!

## 1. CommonJS !!
- nodejs에서 기본적으로 설정한 모듈 불러내기/불러오기 에 사용된다.
- CommonJS는 nodejs 에서 모듈을 불러내기를 할 때 사용되는 require가 대표적인 예시이다.
- module.exports 와 exports의 차이!?
    - module.exports 변수에 딱 하나의 객체를 할당하여 내보낼 때 사용된다.
    - exports 는 여러 개의 객체를 내보낼 경 변수의 속성으로 할당한다. (예제 api/user/user.controller)
