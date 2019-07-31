const http = require('http');
const fs = require('fs');

// 8081번 포트로 요청이 들어오면 fs 모듈로 html 파일을 읽고 data 변수에 저장된 버퍼를 그대로 클라이언트에게 보낸다.
http.createServer((req, res) => {
    fs.readFile('./server2.html', (err, data) => {
        if (err) {
            throw err;
        }
        res.end(data);
    });
}).listen(8081, () => {
    console.log('8081번 포트에서 서버 대기 중!');
});