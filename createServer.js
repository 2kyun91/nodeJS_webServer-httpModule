// http 서버가 있어야 웹 브라우저의 요청을 처리할 수 있다. 요청이 들어올 때마다 매번 콜백 함수가 실행된다.
const http = require('http');

http.createServer((req, res) => {
    console.log('서버 생성!');
});