/** 
 * http2 모듈은 SSL 암호화와 더불어 최신 HTTP 프로토콜인 http/2를 사용할 수 있게 해준다.
 * http/2는 요청 및 응답 방식이 기존 http/1.1 보다 개선되어 훨씬 효율적으로 요청을 보내고 웹의 속도도 많이 개선된다.
 * createServer() 메소드 대신 createSecureServer() 메소드를 사용한다.
*/
const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
    cert : fs.readFileSync(),
    key : fs.readFileSync(),
    ca : [
        fs.readFileSync(),
        fs.readFileSync(),
    ],
}, (req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(443, () => {
    console.log('443번 포트에서 서버 대기 중!');
});