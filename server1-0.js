const http = require('http');

// req는 요청 객체, res는 응답 객체이다.
// write()과 end()의 인자는 클라이언트로 보낼 데이터이다.
const server = http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server</p>');
});

server.listen(8080);

server.on('listening', () => {
    console.log('8080번 포트에서 서버 대기 중입니다.');
});

server.on('error', (error) => {
    console.log(error);
});